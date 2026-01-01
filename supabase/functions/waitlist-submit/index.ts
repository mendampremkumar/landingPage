import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxEMIaUFMhxULou17uOPyXhsz_XMdl6G2WbBNTIaHzAX2JASxbroCA-mbU8u-OUGQjk/exec';

// Generate idempotency key from email + timestamp
async function generateIdempotencyKey(email: string, timestamp: string): Promise<string> {
  const data = `${email}:${timestamp}`;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Send webhook with retry logic
async function sendWebhook(payload: Record<string, string>, maxRetries: number = 2): Promise<{ success: boolean; error?: string }> {
  let lastError: string | undefined;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`Webhook attempt ${attempt}/${maxRetries}`);
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log(`Webhook response status: ${response.status}`);
      
      // Read response text
      const responseText = await response.text();
      console.log(`Webhook response body: ${responseText}`);

      // Parse response - accept true, "true", or { success: true }
      let isSuccess = false;
      
      if (responseText.trim() === 'true') {
        isSuccess = true;
      } else if (responseText.trim().toLowerCase() === '"true"') {
        isSuccess = true;
      } else {
        try {
          const jsonResponse = JSON.parse(responseText);
          if (jsonResponse === true || jsonResponse.success === true) {
            isSuccess = true;
          }
        } catch {
          // Not JSON, check if response is ok
          if (response.ok) {
            // If status is 2xx, consider it a success even if response is not exactly "true"
            console.log('Response was OK, treating as success');
            isSuccess = true;
          }
        }
      }

      if (isSuccess) {
        console.log('Webhook succeeded');
        return { success: true };
      } else {
        lastError = `Webhook returned non-true response: ${responseText}`;
        console.log(lastError);
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Webhook attempt ${attempt} failed:`, lastError);
    }
  }

  return { success: false, error: lastError };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, emailAddress, phoneNumber, city, userType } = await req.json();

    // Validate required fields
    if (!fullName || !emailAddress) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the exact payload structure required
    const timestamp = new Date().toISOString();
    const payload = {
      timestamp,
      name: fullName,
      email: emailAddress,
      source: 'homepage_waitlist_form',
      message: `Phone: ${phoneNumber || 'N/A'}; City: ${city || 'N/A'}; UserType: ${userType || 'N/A'}`,
    };

    console.log('Payload to send:', JSON.stringify(payload));

    // Generate idempotency key
    const idempotencyKey = await generateIdempotencyKey(emailAddress, timestamp);
    console.log('Idempotency key:', idempotencyKey);

    // Initialize Supabase client with service role for DB access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check for existing submission with same idempotency key
    const { data: existingSubmission } = await supabase
      .from('waitlist_submissions')
      .select('*')
      .eq('idempotency_key', idempotencyKey)
      .single();

    if (existingSubmission) {
      console.log('Found existing submission:', existingSubmission.status);
      
      if (existingSubmission.status === 'sent') {
        // Already sent successfully, return success without resending
        return new Response(
          JSON.stringify({ success: true, message: 'Already submitted' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (existingSubmission.status === 'pending' && existingSubmission.attempt_count >= 2) {
        // Max retries reached
        return new Response(
          JSON.stringify({ success: false, error: 'Max retries exceeded' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Insert or update submission record as pending
    const { error: upsertError } = await supabase
      .from('waitlist_submissions')
      .upsert({
        idempotency_key: idempotencyKey,
        email: emailAddress,
        payload,
        status: 'pending',
        attempt_count: (existingSubmission?.attempt_count || 0) + 1,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'idempotency_key' });

    if (upsertError) {
      console.error('Failed to upsert submission record:', upsertError);
    }

    // Send to webhook with retry
    const result = await sendWebhook(payload);

    // Update status based on result
    const newStatus = result.success ? 'sent' : 'failed';
    await supabase
      .from('waitlist_submissions')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('idempotency_key', idempotencyKey);

    if (result.success) {
      console.log('Submission successful');
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      console.error('Submission failed after retries:', result.error);
      return new Response(
        JSON.stringify({ success: false, error: result.error }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Server-side validation schema matching client-side
const formSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(100, 'Name must be less than 100 characters'),
  emailAddress: z.string().trim().email('Please enter a valid email').max(255, 'Email must be less than 255 characters'),
  phoneNumber: z.string().trim().min(10, 'Please enter a valid phone number').max(15, 'Phone number must be less than 15 characters'),
  city: z.enum(['Hyderabad', 'Bangalore', 'Mumbai'], { errorMap: () => ({ message: 'Please select a valid city' }) }),
  userType: z.enum(['customer', 'maker'], { errorMap: () => ({ message: 'Please select a valid role' }) }),
});

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS_PER_WINDOW = 5;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();

  try {
    // Get webhook URL from environment variable
    const WEBHOOK_URL = Deno.env.get('GOOGLE_WEBHOOK_URL');
    if (!WEBHOOK_URL) {
      console.error(`[${requestId}] GOOGLE_WEBHOOK_URL not configured`);
      return new Response(
        JSON.stringify({ success: false, message: 'Service temporarily unavailable' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check content length to prevent oversized payloads
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10000) {
      return new Response(
        JSON.stringify({ success: false, message: 'Request too large' }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate request body
    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid request format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Server-side validation using Zod
    const validationResult = formSchema.safeParse(rawBody);
    if (!validationResult.success) {
      console.log(`[${requestId}] Validation failed:`, validationResult.error.errors);
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid input data. Please check your form fields.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { fullName, emailAddress, phoneNumber, city, userType } = validationResult.data;

    // Initialize Supabase client for rate limiting
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting by email
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count, error: countError } = await supabase
      .from('waitlist_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('email', emailAddress)
      .gte('created_at', windowStart);

    if (countError) {
      console.error(`[${requestId}] Rate limit check error:`, countError);
    } else if (count && count >= MAX_SUBMISSIONS_PER_WINDOW) {
      console.log(`[${requestId}] Rate limit exceeded for email`);
      return new Response(
        JSON.stringify({ success: false, message: 'Too many submissions. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log sanitized data (no sensitive details)
    console.log(`[${requestId}] Processing submission for city: ${city}, userType: ${userType}`);

    // Prepare payload for webhook
    const payload = {
      fullName,
      emailAddress,
      phoneNumber,
      city,
      userType,
    };

    // Send to Google Apps Script webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log(`[${requestId}] Webhook response status: ${response.status}`);

    // Parse response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { success: responseText.trim().toLowerCase() === 'true', message: responseText };
    }

    if (result.success === true || result === true) {
      console.log(`[${requestId}] Submission successful`);
      return new Response(
        JSON.stringify({ success: true, message: 'Form submitted successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      console.log(`[${requestId}] Webhook returned failure`);
      return new Response(
        JSON.stringify({ success: false, message: 'Unable to complete submission. Please try again.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    // Log detailed error for debugging, but return generic message to client
    console.error(`[${requestId}] Edge function error:`, error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ success: false, message: 'Unable to process your submission. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

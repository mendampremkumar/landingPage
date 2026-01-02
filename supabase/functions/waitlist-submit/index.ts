import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxEMIaUFMhxULou17uOPyXhsz_XMdl6G2WbBNTIaHzAX2JASxbroCA-mbU8u-OUGQjk/exec';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, emailAddress, phoneNumber, city, userType } = await req.json();

    console.log('Received form data:', { fullName, emailAddress, phoneNumber, city, userType });

    // Validate required fields
    if (!fullName || !emailAddress) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ success: false, message: 'Full name and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send exact payload to Google Apps Script with matching field names
    const payload = {
      fullName,
      emailAddress,
      phoneNumber: phoneNumber || '',
      city: city || '',
      userType: userType || '',
    };

    console.log('Sending payload to webhook:', JSON.stringify(payload));

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log('Webhook response status:', response.status);
    console.log('Webhook response body:', responseText);

    // Parse response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      // If not JSON, treat as plain text
      result = { success: responseText.trim().toLowerCase() === 'true', message: responseText };
    }

    if (result.success === true || result === true) {
      console.log('Webhook succeeded');
      return new Response(
        JSON.stringify({ success: true, message: 'Form submitted successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      console.log('Webhook returned failure:', result.message);
      return new Response(
        JSON.stringify({ success: false, message: result.message || 'Submission failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ success: false, message: error instanceof Error ? error.message : 'Server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

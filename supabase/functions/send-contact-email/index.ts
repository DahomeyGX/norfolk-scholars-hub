
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactEmailRequest {
  name: string;
  email: string;
  school: string;
  how_heard: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, school, how_heard, message }: ContactEmailRequest = await req.json();
    
    console.log('Received contact form submission:', { name, email, school });

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Send email using a simple HTTP request to a free email service
    // For now, we'll just log the email content and return success
    // In production, you'd integrate with a service like Resend, SendGrid, etc.
    
    const emailContent = `
    New Contact Form Submission
    
    Name: ${name}
    Email: ${email}
    School: ${school}
    How they heard about us: ${how_heard}
    
    Message:
    ${message}
    
    Submitted at: ${new Date().toISOString()}
    `;

    console.log('Email content that would be sent to jordanckgascoigne@gmail.com:');
    console.log(emailContent);

    // TODO: Replace this with actual email sending service
    // For now, we'll return success to allow the form to work
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully. Email notification logged.' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);


import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';
import { Resend } from "npm:resend@2.0.0";

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

    // Initialize Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Contact form submitted successfully. Email notification system is being configured.' 
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    const resend = new Resend(resendApiKey);

    // Send email notification to you
    try {
      const emailResponse = await resend.emails.send({
        from: "SAYC Contact Form <onboarding@resend.dev>", // You'll need to update this with your verified domain
        to: ["jordanckgascoigne@gmail.com"],
        subject: `New SAYC Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>School:</strong> ${school}</p>
          <p><strong>How they heard about us:</strong> ${how_heard}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `,
      });

      console.log('Email sent successfully:', emailResponse);

      // Also send a confirmation email to the submitter
      await resend.emails.send({
        from: "SAYC Program <onboarding@resend.dev>", // You'll need to update this with your verified domain
        to: [email],
        subject: "Thank you for contacting SAYC",
        html: `
          <h2>Thank you for your interest in SAYC!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>In the meantime, feel free to explore our program schedule and learn more about our tutoring services.</p>
          <p>Best regards,<br>The SAYC Team</p>
          <hr>
          <p><small>This is an automated confirmation email.</small></p>
        `,
      });

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the form submission if email fails
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully. We\'ll get back to you soon!' 
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

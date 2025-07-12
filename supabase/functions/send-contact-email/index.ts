
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
    
    console.log('🚨 NEW CONTACT FORM SUBMISSION 🚨');
    console.log('====================================');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`School: ${school}`);
    console.log(`How they heard about us: ${how_heard}`);
    console.log(`Message:`);
    console.log(message);
    console.log(`Submitted at: ${new Date().toLocaleString()}`);
    console.log('====================================');

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store in database (this was already working)
    // The contact form component handles the database insertion
    
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

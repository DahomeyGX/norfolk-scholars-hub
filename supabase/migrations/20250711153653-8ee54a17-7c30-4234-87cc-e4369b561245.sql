
-- Create a table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  school TEXT NOT NULL,
  how_heard TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  spam_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'spam'))
);

-- Create an index for better query performance
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);

-- Add Row Level Security (RLS) - only allow inserts for now
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact submissions (public form)
CREATE POLICY "Anyone can submit contact form" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create a function to check for potential spam (rate limiting by IP)
CREATE OR REPLACE FUNCTION check_submission_rate_limit(ip_addr TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if more than 3 submissions in the last hour from same IP
  IF (SELECT COUNT(*) FROM public.contact_submissions 
      WHERE ip_address = ip_addr 
      AND created_at > NOW() - INTERVAL '1 hour') >= 3 THEN
    RETURN FALSE;
  END IF;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

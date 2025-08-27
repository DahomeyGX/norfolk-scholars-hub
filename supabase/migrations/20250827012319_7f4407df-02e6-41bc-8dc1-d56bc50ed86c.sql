
-- Update the generate_invite_code function to use a supported method
CREATE OR REPLACE FUNCTION public.generate_invite_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Generate a random string using a combination of random bytes and characters
  RETURN upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 16));
END;
$$;

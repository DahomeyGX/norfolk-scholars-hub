
-- Create invites table
CREATE TABLE public.invites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invite_code TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'user'::app_role,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  used_at TIMESTAMP WITH TIME ZONE NULL,
  used_by UUID REFERENCES auth.users(id) NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on invites table
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Create policies for invites table
CREATE POLICY "Admins can manage invites" 
  ON public.invites 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view valid unused invites by code" 
  ON public.invites 
  FOR SELECT 
  USING (expires_at > now() AND used_at IS NULL);

-- Function to generate invite codes
CREATE OR REPLACE FUNCTION public.generate_invite_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN encode(gen_random_bytes(16), 'base64url');
END;
$$;

-- Function to use an invite (when someone signs up)
CREATE OR REPLACE FUNCTION public.use_invite(
  p_invite_code TEXT,
  p_user_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  invite_record RECORD;
BEGIN
  -- Get the invite
  SELECT * INTO invite_record 
  FROM public.invites 
  WHERE invite_code = p_invite_code 
    AND expires_at > now() 
    AND used_at IS NULL;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid or expired invite code';
  END IF;
  
  -- Mark invite as used
  UPDATE public.invites 
  SET used_at = now(), used_by = p_user_id 
  WHERE id = invite_record.id;
  
  -- Add the role to the user
  INSERT INTO public.user_roles (user_id, role) 
  VALUES (p_user_id, invite_record.role)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

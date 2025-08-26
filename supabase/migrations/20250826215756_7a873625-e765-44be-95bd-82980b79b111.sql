
-- Create sessions table for admin management
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_date DATE NOT NULL,
  session_time TIME NOT NULL DEFAULT '11:00:00',
  session_end_time TIME NOT NULL DEFAULT '15:00:00',
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on sessions table
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for sessions table
CREATE POLICY "Anyone can view active sessions" 
  ON public.sessions 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage all sessions" 
  ON public.sessions 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to update user roles (admin only)
CREATE OR REPLACE FUNCTION public.update_user_role(
  target_user_id UUID,
  new_role app_role
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the calling user is an admin
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Only admins can update user roles';
  END IF;
  
  -- Remove existing roles for this user
  DELETE FROM public.user_roles WHERE user_id = target_user_id;
  
  -- Add the new role
  INSERT INTO public.user_roles (user_id, role) 
  VALUES (target_user_id, new_role);
END;
$$;

-- Insert default session dates starting October 4th, 2025
INSERT INTO public.sessions (session_date, session_time, session_end_time, is_active) VALUES
('2025-10-04', '11:00:00', '15:00:00', true),
('2025-10-11', '11:00:00', '15:00:00', true),
('2025-10-18', '11:00:00', '15:00:00', true),
('2025-10-25', '11:00:00', '15:00:00', true),
('2025-11-01', '11:00:00', '15:00:00', true),
('2025-11-08', '11:00:00', '15:00:00', true),
('2025-11-15', '11:00:00', '15:00:00', true),
('2025-11-22', '11:00:00', '15:00:00', true),
('2025-11-29', '11:00:00', '15:00:00', true),
('2025-12-06', '11:00:00', '15:00:00', true),
('2025-12-13', '11:00:00', '15:00:00', true),
('2025-12-20', '11:00:00', '15:00:00', false),
('2025-12-27', '11:00:00', '15:00:00', false),
('2026-01-03', '11:00:00', '15:00:00', true),
('2026-01-10', '11:00:00', '15:00:00', true),
('2026-01-17', '11:00:00', '15:00:00', true),
('2026-01-24', '11:00:00', '15:00:00', true),
('2026-01-31', '11:00:00', '15:00:00', true),
('2026-02-07', '11:00:00', '15:00:00', true),
('2026-02-14', '11:00:00', '15:00:00', true),
('2026-02-21', '11:00:00', '15:00:00', true),
('2026-02-28', '11:00:00', '15:00:00', true),
('2026-03-07', '11:00:00', '15:00:00', true);

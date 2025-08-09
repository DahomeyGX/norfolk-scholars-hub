
-- First, update the app_role enum to include volunteer types
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'volunteer_math';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'volunteer_ela';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'volunteer_adlo';

-- Create a table for scheduled sessions
CREATE TABLE public.scheduled_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_date DATE NOT NULL,
  session_time TIME NOT NULL DEFAULT '11:00:00',
  session_end_time TIME NOT NULL DEFAULT '15:00:00',
  session_type TEXT NOT NULL DEFAULT 'regular', -- regular, special, makeup, etc.
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_date, session_time)
);

-- Create a table for volunteer availability responses
CREATE TABLE public.volunteer_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  volunteer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id UUID REFERENCES public.scheduled_sessions(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('attending', 'not_attending', 'maybe')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(volunteer_id, session_id)
);

-- Enable RLS on both tables
ALTER TABLE public.scheduled_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_availability ENABLE ROW LEVEL SECURITY;

-- RLS policies for scheduled_sessions
CREATE POLICY "Volunteers and admins can view scheduled sessions" 
  ON public.scheduled_sessions 
  FOR SELECT 
  USING (
    has_role(auth.uid(), 'admin') OR 
    has_role(auth.uid(), 'volunteer_math') OR 
    has_role(auth.uid(), 'volunteer_ela') OR 
    has_role(auth.uid(), 'volunteer_adlo')
  );

CREATE POLICY "Admins can manage scheduled sessions" 
  ON public.scheduled_sessions 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'));

-- RLS policies for volunteer_availability
CREATE POLICY "Volunteers can view their own availability" 
  ON public.volunteer_availability 
  FOR SELECT 
  USING (auth.uid() = volunteer_id);

CREATE POLICY "Volunteers can manage their own availability" 
  ON public.volunteer_availability 
  FOR ALL 
  USING (auth.uid() = volunteer_id);

CREATE POLICY "Admins can view all volunteer availability" 
  ON public.volunteer_availability 
  FOR SELECT 
  USING (has_role(auth.uid(), 'admin'));

-- Insert the scheduled sessions for 2025-2026
INSERT INTO public.scheduled_sessions (session_date, session_time, session_end_time) VALUES
  ('2025-10-18', '11:00:00', '15:00:00'),
  ('2025-10-25', '11:00:00', '15:00:00'),
  ('2025-11-01', '11:00:00', '15:00:00'),
  ('2025-11-08', '11:00:00', '15:00:00'),
  ('2025-11-15', '11:00:00', '15:00:00'),
  ('2025-11-22', '11:00:00', '15:00:00'),
  ('2025-11-29', '11:00:00', '15:00:00'),
  ('2025-12-06', '11:00:00', '15:00:00'),
  ('2025-12-13', '11:00:00', '15:00:00'),
  ('2026-01-03', '11:00:00', '15:00:00'),
  ('2026-01-10', '11:00:00', '15:00:00'),
  ('2026-01-17', '11:00:00', '15:00:00'),
  ('2026-01-24', '11:00:00', '15:00:00'),
  ('2026-01-31', '11:00:00', '15:00:00'),
  ('2026-02-07', '11:00:00', '15:00:00'),
  ('2026-02-14', '11:00:00', '15:00:00'),
  ('2026-02-21', '11:00:00', '15:00:00'),
  ('2026-02-28', '11:00:00', '15:00:00'),
  ('2026-03-07', '11:00:00', '15:00:00');

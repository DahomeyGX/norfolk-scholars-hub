
-- Create the database functions that the code is expecting

-- Function to get scheduled sessions
CREATE OR REPLACE FUNCTION public.get_scheduled_sessions()
RETURNS TABLE (
  id UUID,
  session_date DATE,
  session_time TIME,
  session_end_time TIME,
  session_type TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT 
    id,
    session_date,
    session_time,
    session_end_time,
    session_type,
    notes,
    created_at,
    updated_at
  FROM public.scheduled_sessions
  ORDER BY session_date ASC;
$$;

-- Function to get volunteer availability for a specific user
CREATE OR REPLACE FUNCTION public.get_volunteer_availability(volunteer_user_id UUID)
RETURNS TABLE (
  id UUID,
  session_id UUID,
  status TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT 
    id,
    session_id,
    status,
    notes,
    created_at,
    updated_at
  FROM public.volunteer_availability
  WHERE volunteer_id = volunteer_user_id;
$$;

-- Function to upsert volunteer availability
CREATE OR REPLACE FUNCTION public.upsert_volunteer_availability(
  volunteer_user_id UUID,
  session_uuid UUID,
  availability_status TEXT,
  availability_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result_id UUID;
BEGIN
  INSERT INTO public.volunteer_availability (volunteer_id, session_id, status, notes, updated_at)
  VALUES (volunteer_user_id, session_uuid, availability_status, availability_notes, NOW())
  ON CONFLICT (volunteer_id, session_id)
  DO UPDATE SET 
    status = EXCLUDED.status,
    notes = EXCLUDED.notes,
    updated_at = NOW()
  RETURNING id INTO result_id;
  
  RETURN result_id;
END;
$$;

-- Function to get sessions with availability data for admin dashboard
CREATE OR REPLACE FUNCTION public.get_sessions_with_availability(from_date DATE)
RETURNS TABLE (
  id UUID,
  session_date DATE,
  session_time TIME,
  session_end_time TIME,
  session_type TEXT,
  notes TEXT,
  volunteer_availability JSONB
)
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT 
    s.id,
    s.session_date,
    s.session_time,
    s.session_end_time,
    s.session_type,
    s.notes,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'status', va.status,
          'notes', va.notes,
          'volunteer_id', va.volunteer_id
        )
      ) FILTER (WHERE va.id IS NOT NULL),
      '[]'::jsonb
    ) as volunteer_availability
  FROM public.scheduled_sessions s
  LEFT JOIN public.volunteer_availability va ON s.id = va.session_id
  WHERE s.session_date >= from_date
  GROUP BY s.id, s.session_date, s.session_time, s.session_end_time, s.session_type, s.notes
  ORDER BY s.session_date ASC;
$$;

-- Function to update user roles
CREATE OR REPLACE FUNCTION public.update_user_role(
  target_user_id UUID,
  new_role TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete existing roles for the user
  DELETE FROM public.user_roles WHERE user_id = target_user_id;
  
  -- Insert the new role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, new_role::app_role);
END;
$$;

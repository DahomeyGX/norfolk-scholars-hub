// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kzvxgjponwkwqblvevdb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dnhnanBvbndrd3FibHZldmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDcyODEsImV4cCI6MjA2NzgyMzI4MX0.e1nY7xuJXx6YjLMCbsJZP7utjN0w0awoCOSFneQ07DY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
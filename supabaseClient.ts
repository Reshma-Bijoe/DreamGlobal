import { createClient } from '@supabase/supabase-js'

// We use 'as any' to force TypeScript to stop complaining
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
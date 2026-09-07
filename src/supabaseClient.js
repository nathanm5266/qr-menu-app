import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // This will show up loudly in the browser console instead of failing silently,
  // which saves a lot of "why is my menu blank" debugging later.
  console.error(
    'Missing Supabase env vars. Create a .env file from .env.example and restart the dev server.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient.js'

// Tracks the current Supabase auth session, live. This is what makes the
// admin dashboard "password-protected": Supabase Auth issues a signed
// session token on login, and every write to the database is checked
// against that session by the Row Level Security policies in schema.sql.
export function useAuth() {
  const [session, setSession] = useState(undefined) // undefined = still loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return {
    session,
    loading: session === undefined,
    isLoggedIn: !!session,
  }
}

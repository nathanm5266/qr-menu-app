import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import { useAuth } from '../hooks/useAuth.js'

export default function AdminLogin() {
  const { isLoggedIn, loading: authLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!authLoading && isLoggedIn) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)
    if (signInError) setError('Email or password is incorrect.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl text-ink text-center mb-1">Owner sign in</h1>
        <p className="text-ink/50 text-sm text-center mb-8">Manage today's menu</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-ink/70 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line bg-white/60 rounded-sm px-3 py-2 text-ink focus:outline-none focus:border-gold"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-ink/70 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line bg-white/60 rounded-sm px-3 py-2 text-ink focus:outline-none focus:border-gold"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-rust text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-ink text-paper font-body py-2.5 rounded-sm hover:bg-ink/90 disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

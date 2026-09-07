import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function RequireAuth({ children }) {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink/60 font-body">
        Checking your session…
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

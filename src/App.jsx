import { Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import RequireAuth from './components/RequireAuth.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

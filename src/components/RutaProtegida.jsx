// Envuelve rutas que solo puede ver un administrador
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function RutaProtegida({ children }) {
  const { usuario, esAdmin } = useAuth()
  const ubicacion = useLocation()

  // Sin sesión: al login (recordando a dónde quería ir)
  if (!usuario) return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />

  // Con sesión pero sin rol de admin: a la tienda
  if (!esAdmin) return <Navigate to="/" replace />

  return children
}

export default RutaProtegida

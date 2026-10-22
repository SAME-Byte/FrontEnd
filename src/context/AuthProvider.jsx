// Guarda quién inició sesión y lo comparte con toda la app mediante AuthContext
import { useEffect, useState } from 'react'
import { AuthContext } from './auth-context'
import { leerSesion, guardarSesion, borrarSesion } from '../services/api'
import { iniciarSesion as loginApi } from '../services/auth'

function AuthProvider({ children }) {
  // Al cargar la página se recupera la sesión guardada (si existe)
  const [sesion, setSesion] = useState(() => leerSesion())

  const iniciarSesion = async (email, contrasena, recordar) => {
    const datos = await loginApi(email, contrasena) // { token, usuario }
    guardarSesion(datos, recordar)
    setSesion(datos)
    return datos.usuario
  }

  const cerrarSesion = () => {
    borrarSesion()
    setSesion(null)
  }

  // Si la API responde 401 (token vencido), api.js lanza este evento y se cierra la sesión
  useEffect(() => {
    const alExpirar = () => {
      borrarSesion()
      setSesion(null)
    }
    window.addEventListener('sesion-expirada', alExpirar)
    return () => window.removeEventListener('sesion-expirada', alExpirar)
  }, [])

  const valor = {
    usuario: sesion?.usuario ?? null,
    esAdmin: sesion?.usuario?.rol === 'admin',
    iniciarSesion,
    cerrarSesion,
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export default AuthProvider

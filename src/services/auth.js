// Llamadas a /api/auth
import { peticion } from './api'

// -> { token, usuario: { id, nombre, email, rol } }
export const iniciarSesion = (email, contrasena) =>
  peticion('/auth/login', { metodo: 'POST', cuerpo: { email, contrasena } })

// -> { usuario }
export const registrarse = (nombre, email, contrasena) =>
  peticion('/auth/registro', { metodo: 'POST', cuerpo: { nombre, email, contrasena } })

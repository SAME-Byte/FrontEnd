// Cliente base para hablar con la API.
// Todas las llamadas pasan por aquí: arma la URL, agrega el token y convierte los errores.

// Por defecto '/api': Vite lo reenvía a http://localhost:3000 (ver vite.config.js).
// Se puede cambiar con VITE_API_URL en un archivo .env (por ejemplo, al publicar la página).
const URL_API = import.meta.env.VITE_API_URL || '/api'

const CLAVE_SESION = 'sesion'

// La sesión puede estar en localStorage ("Recordarme") o en sessionStorage (se borra al cerrar el navegador)
export function leerSesion() {
  try {
    const texto = localStorage.getItem(CLAVE_SESION) || sessionStorage.getItem(CLAVE_SESION)
    return texto ? JSON.parse(texto) : null
  } catch {
    return null
  }
}

export function guardarSesion(sesion, recordar) {
  try {
    borrarSesion()
    const almacen = recordar ? localStorage : sessionStorage
    almacen.setItem(CLAVE_SESION, JSON.stringify(sesion))
  } catch {
    // Si el navegador bloquea el almacenamiento, la sesión dura solo mientras la página esté abierta
  }
}

export function borrarSesion() {
  try {
    localStorage.removeItem(CLAVE_SESION)
    sessionStorage.removeItem(CLAVE_SESION)
  } catch {
    // nada que hacer
  }
}

// peticion('/piezas')                               -> GET público
// peticion('/piezas', { metodo: 'POST', cuerpo })   -> envía JSON y el token si hay sesión
export async function peticion(ruta, { metodo = 'GET', cuerpo } = {}) {
  const token = leerSesion()?.token
  const encabezados = {}
  if (cuerpo !== undefined) encabezados['Content-Type'] = 'application/json'
  if (token) encabezados.Authorization = `Bearer ${token}`

  let respuesta
  try {
    respuesta = await fetch(`${URL_API}${ruta}`, {
      method: metodo,
      headers: encabezados,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    })
  } catch {
    throw crearError('No se pudo conectar con el servidor. Revisa que la API esté encendida.', 0)
  }

  if (respuesta.status === 204) return null // DELETE exitoso, sin contenido

  const datos = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    // 401 con sesión guardada = el token venció o es inválido: avisar a toda la app
    if (respuesta.status === 401 && token) {
      window.dispatchEvent(new Event('sesion-expirada'))
    }
    throw crearError(datos?.error || 'Ocurrió un error inesperado.', respuesta.status, datos?.detalles)
  }

  return datos
}

function crearError(mensaje, status, detalles) {
  const error = new Error(mensaje)
  error.status = status
  error.detalles = detalles // [{ campo, mensaje }] cuando falla la validación
  return error
}

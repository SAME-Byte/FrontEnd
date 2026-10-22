// Llamadas a /api/piezas
import { peticion } from './api'

export const obtenerPiezas = () => peticion('/piezas')
export const obtenerPieza = (id) => peticion(`/piezas/${id}`)

// Solo admin (la API revisa el token)
export const crearPieza = (datos) => peticion('/piezas', { metodo: 'POST', cuerpo: datos })
export const actualizarPieza = (id, datos) => peticion(`/piezas/${id}`, { metodo: 'PUT', cuerpo: datos })
export const eliminarPieza = (id) => peticion(`/piezas/${id}`, { metodo: 'DELETE' })

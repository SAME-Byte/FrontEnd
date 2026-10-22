// Carga datos de la API y lleva la cuenta de los 3 estados: cargando, error y datos.
// Uso: const { datos, cargando, error, recargar } = useCarga(obtenerPiezas)
import { useEffect, useState } from 'react'

export function useCarga(cargar) {
  const [estado, setEstado] = useState({ datos: null, cargando: true, error: null })
  const [version, setVersion] = useState(0) // cambiarla vuelve a pedir los datos

  useEffect(() => {
    let vigente = true // evita guardar una respuesta que llegó después de salir de la página

    cargar()
      .then((datos) => vigente && setEstado({ datos, cargando: false, error: null }))
      .catch((error) => vigente && setEstado({ datos: null, cargando: false, error }))

    return () => {
      vigente = false
    }
    // "cargar" se define en cada render; solo se vuelve a pedir cuando cambia "version"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const recargar = () => {
    setEstado((e) => ({ ...e, cargando: true, error: null }))
    setVersion((v) => v + 1)
  }

  return { ...estado, recargar }
}

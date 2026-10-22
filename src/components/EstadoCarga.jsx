// Mensajes reutilizables para los 3 estados de una página que pide datos a la API
import '../Styles/EstadoCarga.css'

export function Cargando({ texto = 'Cargando…' }) {
  return (
    <div className="estado" role="status">
      <span className="estado__spinner" aria-hidden="true" />
      <p>{texto}</p>
    </div>
  )
}

export function MensajeError({ error, onReintentar }) {
  return (
    <div className="estado estado--error" role="alert">
      <p className="estado__titulo">No se pudo cargar la información</p>
      <p>{error?.message}</p>
      {onReintentar && (
        <button type="button" className="estado__boton" onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  )
}

export function MensajeVacio({ titulo, texto, children }) {
  return (
    <div className="estado">
      <p className="estado__titulo">{titulo}</p>
      {texto && <p>{texto}</p>}
      {children}
    </div>
  )
}

import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from './AuthIcons'
import '../Styles/FormAuth.css'

function CampoTexto({
  id, etiqueta, tipo = 'text', icono, placeholder, autoComplete,
  valor, onCambiar, error, ayuda, conVerContrasena = false,
}) {
  const [visible, setVisible] = useState(false)
  const tipoReal = conVerContrasena ? (visible ? 'text' : 'password') : tipo
  const idMensaje = error ? `${id}-error` : ayuda ? `${id}-ayuda` : undefined

  return (
    <div className="campo-auth">
      <label htmlFor={id} className="campo-auth__etiqueta">{etiqueta}</label>

      <div className={`campo-auth__control${error ? ' campo-auth__control--error' : ''}`}>
        {icono && <span className="campo-auth__icono">{icono}</span>}
        <input
          id={id}
          type={tipoReal}
          value={valor}
          onChange={(e) => onCambiar(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={idMensaje}
        />
        {conVerContrasena && (
          <button
            type="button"
            className="campo-auth__ojo"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="campo-auth__error">{error}</p>
      ) : (
        ayuda && <p id={`${id}-ayuda`} className="campo-auth__ayuda">{ayuda}</p>
      )}
    </div>
  )
}

export default CampoTexto
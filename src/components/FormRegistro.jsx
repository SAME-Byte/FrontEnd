import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CampoTexto from './CampoTexto'
import { MailIcon, LockIcon } from './AuthIcons'
import '../Styles/FormAuth.css'

const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FormLogin({ correoInicial = '', onIrARegistro }) {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState(correoInicial)
  const [contrasena, setContrasena] = useState('')
  const [recordarme, setRecordarme] = useState(false)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)

  // Al escribir en un campo, se borra su mensaje de error
  const conLimpieza = (campo, setter) => (valor) => {
    setter(valor)
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: undefined }))
  }

  const enviar = (e) => {
    e.preventDefault()

    const errs = {}
    if (!correo.trim()) errs.correo = 'Escribe tu correo electrónico.'
    else if (!FORMATO_CORREO.test(correo.trim())) errs.correo = 'Ese correo no parece válido.'
    if (!contrasena) errs.contrasena = 'Escribe tu contraseña.'

    setErrores(errs)
    if (Object.keys(errs).length > 0) return

    setEnviando(true)
    // TODO: aquí va la llamada al BackEnd, por ejemplo:
    //   POST /api/auth/login  { correo, contrasena, recordarme }
    // Por ahora solo se simula y se regresa a Inicio.
    console.log('Login (simulado):', { correo: correo.trim(), recordarme })
    setTimeout(() => navigate('/'), 800)
  }

  return (
    <form className="form-auth" onSubmit={enviar} noValidate>
      <CampoTexto
        id="login-correo"
        etiqueta="Correo electrónico"
        tipo="email"
        icono={<MailIcon />}
        placeholder="tucorreo@ejemplo.com"
        autoComplete="email"
        valor={correo}
        onCambiar={conLimpieza('correo', setCorreo)}
        error={errores.correo}
      />

      <CampoTexto
        id="login-contrasena"
        etiqueta="Contraseña"
        icono={<LockIcon />}
        placeholder="Tu contraseña"
        autoComplete="current-password"
        conVerContrasena
        valor={contrasena}
        onCambiar={conLimpieza('contrasena', setContrasena)}
        error={errores.contrasena}
      />

      <div className="form-auth__fila">
        <label className="form-auth__check">
          <input
            type="checkbox"
            checked={recordarme}
            onChange={(e) => setRecordarme(e.target.checked)}
          />
          Recordarme
        </label>

        {/* Solo texto subrayado, sin función */}
        <span className="form-auth__olvide">¿Olvidaste tu contraseña?</span>
      </div>

      <button type="submit" className="form-auth__enviar" disabled={enviando}>
        {enviando ? 'Entrando…' : 'Iniciar sesión'}
      </button>

      <p className="form-auth__cambio">
        ¿No tienes una cuenta?{' '}
        <button type="button" className="form-auth__enlace" onClick={onIrARegistro}>
          Regístrate aquí
        </button>
      </p>
    </form>
  )
}

export default FormLogin
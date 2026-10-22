import { useState } from 'react'
import CampoTexto from './CampoTexto'
import { MailIcon, LockIcon, PersonIcon } from './AuthIcons'
import { registrarse } from '../services/auth'
import '../Styles/FormAuth.css'

const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validar({ nombre, correo, contrasena, confirmar }) {
  const e = {}
  if (nombre.trim().length < 3) e.nombre = 'Escribe tu nombre completo.'
  if (!correo.trim()) e.correo = 'Escribe tu correo electrónico.'
  else if (!FORMATO_CORREO.test(correo.trim())) e.correo = 'Ese correo no parece válido.'
  if (contrasena.length < 8 || !/\d/.test(contrasena))
    e.contrasena = 'Usa al menos 8 caracteres e incluye un número.'
  if (!confirmar) e.confirmar = 'Confirma tu contraseña.'
  else if (confirmar !== contrasena) e.confirmar = 'Las contraseñas no coinciden.'
  return e
}

function FormRegistro({ onRegistrado, onIrALogin }) {
  const [form, setForm] = useState({ nombre: '', correo: '', contrasena: '', confirmar: '' })
  const [errores, setErrores] = useState({})
  const [errorApi, setErrorApi] = useState('')
  const [enviando, setEnviando] = useState(false)

  const cambiar = (campo) => (valor) => {
    setForm((f) => ({ ...f, [campo]: valor }))
    setErrorApi('')
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: undefined }))
  }

  const enviar = async (e) => {
    e.preventDefault()
    const errs = validar(form)
    setErrores(errs)
    if (Object.keys(errs).length > 0) return

    setEnviando(true)
    try {
      // POST /api/auth/registro -> crea un usuario con rol "user"
      await registrarse(form.nombre.trim(), form.correo.trim(), form.contrasena)
      onRegistrado(form.correo.trim())
    } catch (error) {
      setErrorApi(error.message) // p. ej. "Ya existe una cuenta con ese correo."
      setEnviando(false)
    }
  }

  return (
    <form className="form-auth" onSubmit={enviar} noValidate>
      {errorApi && <p className="form-auth__error" role="alert">{errorApi}</p>}

      <CampoTexto
        id="registro-nombre"
        etiqueta="Nombre completo"
        icono={<PersonIcon />}
        placeholder="Tu nombre"
        autoComplete="name"
        valor={form.nombre}
        onCambiar={cambiar('nombre')}
        error={errores.nombre}
      />

      <CampoTexto
        id="registro-correo"
        etiqueta="Correo electrónico"
        tipo="email"
        icono={<MailIcon />}
        placeholder="tucorreo@ejemplo.com"
        autoComplete="email"
        valor={form.correo}
        onCambiar={cambiar('correo')}
        error={errores.correo}
      />

      <CampoTexto
        id="registro-contrasena"
        etiqueta="Contraseña"
        icono={<LockIcon />}
        placeholder="Crea una contraseña"
        autoComplete="new-password"
        conVerContrasena
        ayuda="Mínimo 8 caracteres, con al menos un número."
        valor={form.contrasena}
        onCambiar={cambiar('contrasena')}
        error={errores.contrasena}
      />

      <CampoTexto
        id="registro-confirmar"
        etiqueta="Confirmar contraseña"
        icono={<LockIcon />}
        placeholder="Repite tu contraseña"
        autoComplete="new-password"
        conVerContrasena
        valor={form.confirmar}
        onCambiar={cambiar('confirmar')}
        error={errores.confirmar}
      />

      <button type="submit" className="form-auth__enviar" disabled={enviando}>
        {enviando ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>

      <p className="form-auth__cambio">
        ¿Ya tienes una cuenta?{' '}
        <button type="button" className="form-auth__enlace" onClick={onIrALogin}>
          Inicia sesión
        </button>
      </p>
    </form>
  )
}

export default FormRegistro

import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import FormLogin from '../components/FormLogin'
import FormRegistro from '../components/FormRegistro'
import ImagePlaceholder from '../components/ImagePlaceholder'
import '../Styles/Login.css'

function Login() {
  const [searchParams] = useSearchParams()
  // /login?modo=registro abre directamente la pestaña de registro
  const [modo, setModo] = useState(searchParams.get('modo') === 'registro' ? 'registro' : 'login')
  const [aviso, setAviso] = useState('')
  const [correoRegistrado, setCorreoRegistrado] = useState('')

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo)
    setAviso('')
  }

  // Después de registrarse: volver a "Iniciar sesión" con el correo ya escrito
  const alRegistrarse = (correo) => {
    setCorreoRegistrado(correo)
    setModo('login')
    setAviso('Tu cuenta se creó correctamente. Ya puedes iniciar sesión.')
  }

  return (
    <div className="login">
      <aside className="login__panel">
        <Link to="/" className="login__logo">LOGO</Link>

        <div className="login__bienvenida">
          <h1>Bienvenido</h1>
          <p>Accede a tu cuenta para gestionar tus compras y más.</p>
        </div>

        <div className="login__imagen">
          <ImagePlaceholder alt="" />
        </div>
      </aside>

      <main className="login__contenido">
        <div className="login__tarjeta">
          <div className="login__tabs" role="tablist" aria-label="Acceso a tu cuenta">
            <button
              type="button"
              role="tab"
              id="tab-login"
              aria-selected={modo === 'login'}
              aria-controls="panel-acceso"
              className={`login__tab${modo === 'login' ? ' login__tab--activa' : ''}`}
              onClick={() => cambiarModo('login')}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              role="tab"
              id="tab-registro"
              aria-selected={modo === 'registro'}
              aria-controls="panel-acceso"
              className={`login__tab${modo === 'registro' ? ' login__tab--activa' : ''}`}
              onClick={() => cambiarModo('registro')}
            >
              Registrarse
            </button>
          </div>

          {aviso && <p className="login__aviso" role="status">{aviso}</p>}

          <div
            id="panel-acceso"
            role="tabpanel"
            aria-labelledby={modo === 'login' ? 'tab-login' : 'tab-registro'}
          >
            {modo === 'login' ? (
              <FormLogin
                key={correoRegistrado}
                correoInicial={correoRegistrado}
                onIrARegistro={() => cambiarModo('registro')}
              />
            ) : (
              <FormRegistro
                onRegistrado={alRegistrarse}
                onIrALogin={() => cambiarModo('login')}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
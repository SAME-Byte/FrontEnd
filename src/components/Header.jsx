import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { SearchIcon, UserIcon, CartIcon } from './Icons'
import '../styles/Header.css'

const enlaces = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/catalogo', texto: 'Catálogo' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/marcas', texto: 'Marcas' },
]

function Header({ totalCarrito = 0 }) {
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  const buscar = (e) => {
    e.preventDefault()
    const texto = busqueda.trim()
    if (!texto) return
    navigate(`/catalogo?buscar=${encodeURIComponent(texto)}`)
  }

  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="header__logo">
          LOGO<br />EMPRESA
        </Link>

        <form className="header__search" role="search" onSubmit={buscar}>
          <input
            type="search"
            placeholder="Buscar piezas, marcas o modelos..."
            aria-label="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <SearchIcon />
          </button>
        </form>

        <div className="header__actions">
          <Link to="/login" className="header__login">
            <UserIcon />
            <span>Iniciar Sesión</span>
          </Link>
          <Link to="/carrito" className="header__cart" aria-label="Carrito de compras">
            <CartIcon />
            {totalCarrito > 0 && <span className="header__badge">{totalCarrito}</span>}
          </Link>
        </div>
      </div>

      <nav className="header__nav" aria-label="Principal">
        <ul>
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <NavLink
                to={enlace.ruta}
                end={enlace.ruta === '/'}
                className={({ isActive }) =>
                  isActive ? 'header__link header__link--activo' : 'header__link'
                }
              >
                {enlace.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
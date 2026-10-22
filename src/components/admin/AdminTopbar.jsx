import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconMenu, IconSearch, IconUserCircle, IconChevronDown } from './AdminIcons'
import { useAuth } from '../../hooks/useAuth'

function AdminTopbar({ onMenu }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const cerrarMenu = () => setMenuAbierto(false)
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const salir = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <header className="topbar">
      <button className="topbar__menu" onClick={onMenu} aria-label="Abrir menú">
        <IconMenu size={24} />
      </button>

      <form className="topbar__buscar" role="search" onSubmit={(e) => e.preventDefault()}>
        <IconSearch size={20} />
        <input type="search" placeholder="Buscar en el panel..." aria-label="Buscar en el panel" />
      </form>

      <div className="topbar__usuario">
        <button
          className="topbar__perfil"
          onClick={() => setMenuAbierto((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuAbierto}
        >
          <IconUserCircle size={30} strokeWidth={1.6} />
          <span>{usuario?.nombre}</span>
          <IconChevronDown size={16} />
        </button>

        {menuAbierto && (
          <ul className="topbar__dropdown" role="menu">
            <li className="topbar__correo">{usuario?.email}</li>
            <li><Link role="menuitem" to="/" onClick={cerrarMenu}>Ir a la tienda</Link></li>
            <li><button role="menuitem" onClick={salir}>Cerrar sesión</button></li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default AdminTopbar
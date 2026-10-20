import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconMenu, IconSearch, IconUserCircle, IconChevronDown } from './AdminIcons'

function AdminTopbar({ onMenu }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const cerrarMenu = () => setMenuAbierto(false)

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
          <span>Admin</span>
          <IconChevronDown size={16} />
        </button>

        {menuAbierto && (
          <ul className="topbar__dropdown" role="menu">
            <li><button role="menuitem" onClick={cerrarMenu}>Mi perfil</button></li>
            <li><Link role="menuitem" to="/" onClick={cerrarMenu}>Ir a la tienda</Link></li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default AdminTopbar
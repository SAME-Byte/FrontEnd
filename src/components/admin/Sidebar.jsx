import { NavLink, useNavigate } from 'react-router-dom'
import {
  IconHome, IconBox, IconTag, IconCart, IconUsers, IconChart, IconLogout,
} from './AdminIcons'

const grupos = [
  [
    { ruta: '/admin', texto: 'Dashboard', Icono: IconHome, end: true },
    { ruta: '/admin/piezas', texto: 'Piezas', Icono: IconBox },
    { ruta: '/admin/categorias', texto: 'Categorías', Icono: IconTag },
    { ruta: '/admin/marcas', texto: 'Marcas', Icono: IconTag },
  ],
  [
    { ruta: '/admin/pedidos', texto: 'Pedidos', Icono: IconCart },
    { ruta: '/admin/usuarios', texto: 'Usuarios', Icono: IconUsers },
    { ruta: '/admin/reportes', texto: 'Reportes', Icono: IconChart },
  ],
]

function Sidebar({ abierto, onCerrar }) {
  const navigate = useNavigate()

  return (
    <aside className={`sidebar${abierto ? ' sidebar--abierto' : ''}`}>
      <div className="sidebar__logo">LOGO</div>

      <nav className="sidebar__nav" aria-label="Panel de administración">
        {grupos.map((grupo, i) => (
          <ul key={i} className="sidebar__grupo">
            {grupo.map(({ ruta, texto, Icono, end }) => (
              <li key={ruta}>
                <NavLink
                  to={ruta}
                  end={end}
                  onClick={onCerrar}
                  className={({ isActive }) =>
                    `sidebar__link${isActive ? ' sidebar__link--activo' : ''}`
                  }
                >
                  <Icono size={22} />
                  <span>{texto}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </nav>

      <button className="sidebar__salir" onClick={() => navigate('/')}>
        <IconLogout size={22} />
        <span>Cerrar sesión</span>
      </button>
    </aside>
  )
}

export default Sidebar
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import AdminTopbar from '../components/admin/AdminTopbar'
import '../Styles/admin/AdminLayout.css'

function AdminLayout() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)

  return (
    <div className="admin">
      <Sidebar abierto={sidebarAbierto} onCerrar={() => setSidebarAbierto(false)} />
      {sidebarAbierto && (
        <div className="admin__velo" onClick={() => setSidebarAbierto(false)} />
      )}

      <div className="admin__principal">
        <AdminTopbar onMenu={() => setSidebarAbierto(true)} />
        <main className="admin__contenido">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import Inicio from './Pages/Inicio'
import AdminPiezas from './Pages/admin/AdminPiezas'

function App() {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (pieza) => {
    setCarrito((actual) => [...actual, pieza])
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Tienda (con Header) */}
        <Route element={<PublicLayout totalCarrito={carrito.length} />}>
          <Route path="/" element={<Inicio onAgregar={agregarAlCarrito} />} />
          {/* <Route path="/catalogo" element={<Catalogo />} /> ... */}
        </Route>

        {/* Panel de administración (con Sidebar) */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Mientras no exista el Dashboard, /admin manda a Piezas */}
          <Route index element={<Navigate to="piezas" replace />} />
          <Route path="piezas" element={<AdminPiezas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
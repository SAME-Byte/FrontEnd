import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import RutaProtegida from './components/RutaProtegida'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import Inicio from './Pages/Inicio'
import AdminPiezas from './Pages/admin/AdminPiezas'
import Catalogo from './Pages/Catalogo'
import DetallePieza from './Pages/DetallePieza'
import Login from './Pages/Login'

function App() {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (pieza, cantidad = 1) => {
    setCarrito((actual) => [...actual, { ...pieza, cantidad }])
  }

  // Total de piezas en el carrito (suma las cantidades de cada registro)
  const totalCarrito = carrito.reduce((total, item) => total + item.cantidad, 0)

  return (
    <BrowserRouter>
      {/* AuthProvider comparte la sesión (usuario y rol) con toda la app */}
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout totalCarrito={totalCarrito} />}>
            <Route path="/" element={<Inicio onAgregar={agregarAlCarrito} />} />
            <Route path="/catalogo" element={<Catalogo onAgregar={agregarAlCarrito} />} />
            <Route path="/catalogo/:id" element={<DetallePieza onAgregar={agregarAlCarrito} />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Solo usuarios con rol "admin" pasan de RutaProtegida */}
          <Route
            path="/admin"
            element={
              <RutaProtegida>
                <AdminLayout />
              </RutaProtegida>
            }
          >
            <Route index element={<Navigate to="piezas" replace />} />
            <Route path="piezas" element={<AdminPiezas />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

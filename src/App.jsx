import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Inicio from './pages/Inicio'

function App() {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (pieza) => {
    setCarrito((actual) => [...actual, pieza])
  }

  return (
    <BrowserRouter>
      <Header totalCarrito={carrito.length} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Inicio onAgregar={agregarAlCarrito} />} />
          {/* Aquí irán las otras páginas, por ejemplo:
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/login" element={<Login />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
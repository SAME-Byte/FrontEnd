import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PiezasTable from '../../components/admin/PiezasTable'
import Pagination from '../../components/admin/Pagination'
import PiezaDrawer from '../../components/admin/PiezaDrawer'
import {
  IconSearch, IconPlus, IconChevronRight, IconChevronDown,
} from '../../components/admin/AdminIcons'
import { piezasIniciales, categoriasAdmin, fabricantes } from '../../data/piezasAdmin'
import '../../Styles/admin/AdminPiezas.css'

const POR_PAGINA = 5

function AdminPiezas() {
  const [piezas, setPiezas] = useState(piezasIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')
  const [marca, setMarca] = useState('')
  const [pagina, setPagina] = useState(1)
  const [drawer, setDrawer] = useState({ abierto: false, pieza: null })

  // Filtros
  const filtradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    return piezas.filter(
      (p) =>
        (!categoria || p.categoria === categoria) &&
        (!marca || p.marca === marca) &&
        (!texto || [p.nombre, p.sku, p.marca].some((v) => v.toLowerCase().includes(texto)))
    )
  }, [piezas, busqueda, categoria, marca])

  // Paginación
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA))
  const paginaActual = Math.min(pagina, totalPaginas)
  const inicio = (paginaActual - 1) * POR_PAGINA
  const visibles = filtradas.slice(inicio, inicio + POR_PAGINA)

  const cambiarFiltro = (setter) => (e) => {
    setter(e.target.value)
    setPagina(1)
  }

  // Panel lateral
  const abrirNueva = () => setDrawer({ abierto: true, pieza: null })
  const abrirEditar = (pieza) => setDrawer({ abierto: true, pieza })
  const cerrarDrawer = () => setDrawer({ abierto: false, pieza: null })

  const guardar = (datos) => {
    if (datos.id) {
      setPiezas((lista) => lista.map((p) => (p.id === datos.id ? datos : p)))
    } else {
      setPiezas((lista) => [{ ...datos, id: Date.now() }, ...lista])
      setPagina(1)
    }
    cerrarDrawer()
  }

  const eliminar = (pieza) => {
    if (window.confirm(`¿Eliminar "${pieza.nombre}"? Esta acción no se puede deshacer.`)) {
      setPiezas((lista) => lista.filter((p) => p.id !== pieza.id))
    }
  }

  return (
    <>
      <nav className="migas" aria-label="Ruta de navegación">
        <Link to="/admin">Dashboard</Link>
        <IconChevronRight size={14} />
        <span aria-current="page">Piezas</span>
      </nav>

      <div className="pagina-encabezado">
        <div>
          <h1 className="pagina-titulo">Piezas</h1>
          <p className="pagina-descripcion">Administra el catálogo de piezas del sistema.</p>
        </div>
        <button className="btn btn--primario" onClick={abrirNueva}>
          <IconPlus size={18} /> Nueva pieza
        </button>
      </div>

      <div className="filtros">
        <label className="filtros__buscar">
          <IconSearch size={18} />
          <input
            type="search"
            placeholder="Buscar pieza por nombre, SKU o marca..."
            aria-label="Buscar pieza"
            value={busqueda}
            onChange={cambiarFiltro(setBusqueda)}
          />
        </label>

        <label className="campo-filtro">
          <span>Categoría</span>
          <div className="select">
            <select value={categoria} onChange={cambiarFiltro(setCategoria)}>
              <option value="">Todas</option>
              {categoriasAdmin.map((c) => <option key={c}>{c}</option>)}
            </select>
            <IconChevronDown size={16} />
          </div>
        </label>

        <label className="campo-filtro">
          <span>Marca</span>
          <div className="select">
            <select value={marca} onChange={cambiarFiltro(setMarca)}>
              <option value="">Todas</option>
              {fabricantes.map((m) => <option key={m}>{m}</option>)}
            </select>
            <IconChevronDown size={16} />
          </div>
        </label>
      </div>

      <PiezasTable piezas={visibles} onEditar={abrirEditar} onEliminar={eliminar} />

      <div className="tabla-pie">
        <p>
          Mostrando {filtradas.length === 0 ? 0 : inicio + 1} a {inicio + visibles.length} de{' '}
          {filtradas.length} resultados
        </p>
        <Pagination pagina={paginaActual} totalPaginas={totalPaginas} onCambiar={setPagina} />
      </div>

      {/* El panel solo existe cuando se abre */}
      {drawer.abierto && (
        <PiezaDrawer pieza={drawer.pieza} onCerrar={cerrarDrawer} onGuardar={guardar} />
      )}
    </>
  )
}

export default AdminPiezas
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PiezasTable from '../../components/admin/PiezasTable'
import Pagination from '../../components/admin/Pagination'
import PiezaDrawer from '../../components/admin/PiezaDrawer'
import { Cargando, MensajeError } from '../../components/EstadoCarga'
import {
  IconSearch, IconPlus, IconChevronRight, IconChevronDown,
} from '../../components/admin/AdminIcons'
import { useCarga } from '../../hooks/useCarga'
import { obtenerPiezas, crearPieza, actualizarPieza, eliminarPieza } from '../../services/piezas'
import { obtenerCategorias, obtenerMarcas } from '../../services/catalogos'
import '../../Styles/admin/AdminPiezas.css'

const POR_PAGINA = 5

// Pide en paralelo las piezas y las listas que necesita el formulario
const cargarTodo = async () => {
  const [piezas, categorias, marcas] = await Promise.all([
    obtenerPiezas(),
    obtenerCategorias(),
    obtenerMarcas(),
  ])
  return { piezas, categorias, marcas }
}

function AdminPiezas() {
  const { datos, cargando, error, recargar } = useCarga(cargarTodo)

  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fabricante, setFabricante] = useState('')
  const [pagina, setPagina] = useState(1)
  const [drawer, setDrawer] = useState({ abierto: false, pieza: null })
  const [aviso, setAviso] = useState('')

  const piezas = useMemo(() => datos?.piezas ?? [], [datos])
  const categorias = datos?.categorias ?? []
  const marcas = datos?.marcas ?? []

  // Fabricantes distintos que ya existen (para el filtro y para sugerir en el formulario)
  const fabricantes = useMemo(
    () => [...new Set(piezas.map((p) => p.fabricante))].sort((a, b) => a.localeCompare(b, 'es')),
    [piezas]
  )

  // Filtros
  const filtradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    return piezas.filter(
      (p) =>
        (!categoria || p.categoria.id === Number(categoria)) &&
        (!fabricante || p.fabricante === fabricante) &&
        (!texto || [p.nombre, p.sku, p.fabricante].some((v) => v.toLowerCase().includes(texto)))
    )
  }, [piezas, busqueda, categoria, fabricante])

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

  // Si la API responde con error, la excepción llega al panel y ahí se muestra el mensaje
  const guardar = async (datosPieza) => {
    if (drawer.pieza) {
      await actualizarPieza(drawer.pieza.id, datosPieza)
      setAviso(`Se actualizó "${datosPieza.nombre}".`)
    } else {
      await crearPieza(datosPieza)
      setAviso(`Se registró "${datosPieza.nombre}".`)
      setPagina(1)
    }
    cerrarDrawer()
    recargar()
  }

  const eliminar = async (pieza) => {
    if (!window.confirm(`¿Eliminar "${pieza.nombre}"? Esta acción no se puede deshacer.`)) return
    try {
      await eliminarPieza(pieza.id)
      setAviso(`Se eliminó "${pieza.nombre}".`)
      recargar()
    } catch (e) {
      setAviso(`No se pudo eliminar: ${e.message}`)
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
        <button className="btn btn--primario" onClick={abrirNueva} disabled={!datos}>
          <IconPlus size={18} /> Nueva pieza
        </button>
      </div>

      {aviso && (
        <p className="admin-aviso" role="status">
          {aviso}
          <button type="button" onClick={() => setAviso('')} aria-label="Cerrar aviso">×</button>
        </p>
      )}

      {cargando && !datos ? (
        <Cargando texto="Cargando piezas…" />
      ) : error ? (
        <MensajeError error={error} onReintentar={recargar} />
      ) : (
        <>
          <div className="filtros">
            <label className="filtros__buscar">
              <IconSearch size={18} />
              <input
                type="search"
                placeholder="Buscar pieza por nombre, SKU o fabricante..."
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
                  {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
                <IconChevronDown size={16} />
              </div>
            </label>

            <label className="campo-filtro">
              <span>Fabricante</span>
              <div className="select">
                <select value={fabricante} onChange={cambiarFiltro(setFabricante)}>
                  <option value="">Todos</option>
                  {fabricantes.map((f) => <option key={f}>{f}</option>)}
                </select>
                <IconChevronDown size={16} />
              </div>
            </label>
          </div>

          <PiezasTable
            piezas={visibles}
            hayPiezas={piezas.length > 0}
            onEditar={abrirEditar}
            onEliminar={eliminar}
          />

          <div className="tabla-pie">
            <p>
              Mostrando {filtradas.length === 0 ? 0 : inicio + 1} a {inicio + visibles.length} de{' '}
              {filtradas.length} resultados
            </p>
            <Pagination pagina={paginaActual} totalPaginas={totalPaginas} onCambiar={setPagina} />
          </div>
        </>
      )}

      {/* El panel solo existe cuando se abre */}
      {drawer.abierto && (
        <PiezaDrawer
          pieza={drawer.pieza}
          categorias={categorias}
          marcas={marcas}
          fabricantes={fabricantes}
          onCerrar={cerrarDrawer}
          onGuardar={guardar}
        />
      )}
    </>
  )
}

export default AdminPiezas

import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import FiltroCheckboxes from '../components/FiltroCheckboxes'
import FiltroPrecio from '../components/FiltroPrecio'
import { Cargando, MensajeError, MensajeVacio } from '../components/EstadoCarga'
import { ChevronDownIcon, FilterIcon, CloseIcon } from '../components/Icons'
import { useCarga } from '../hooks/useCarga'
import { obtenerPiezas } from '../services/piezas'
import '../Styles/Catalogo.css'

const POR_CARGA = 9

const ordenes = {
  recientes: { texto: 'Más recientes', fn: (a, b) => new Date(b.creadaEn) - new Date(a.creadaEn) },
  precioAsc: { texto: 'Precio: menor a mayor', fn: (a, b) => a.precio - b.precio },
  precioDesc: { texto: 'Precio: mayor a menor', fn: (a, b) => b.precio - a.precio },
  nombre: { texto: 'Nombre (A–Z)', fn: (a, b) => a.nombre.localeCompare(b.nombre, 'es') },
}

// Arma las opciones de un filtro SOLO con los valores que existen en las piezas, con su conteo
function opcionesDe(piezas, obtenerValor, obtenerTexto) {
  const mapa = new Map()
  for (const p of piezas) {
    const valor = obtenerValor(p)
    const actual = mapa.get(valor) ?? { valor, texto: obtenerTexto(p), cantidad: 0 }
    actual.cantidad += 1
    mapa.set(valor, actual)
  }
  // De la que tiene más piezas a la que tiene menos
  return [...mapa.values()].sort((a, b) => b.cantidad - a.cantidad || a.texto.localeCompare(b.texto, 'es'))
}

// 1) Pide las piezas a la API y muestra cargando / error / vacío
function Catalogo({ onAgregar }) {
  const { datos: piezas, cargando, error, recargar } = useCarga(obtenerPiezas)

  if (cargando) return <div className="catalogo__estado"><Cargando texto="Cargando catálogo…" /></div>
  if (error) return <div className="catalogo__estado"><MensajeError error={error} onReintentar={recargar} /></div>
  if (piezas.length === 0) {
    return (
      <div className="catalogo__estado">
        <MensajeVacio titulo="Aún no hay piezas en el catálogo" texto="Vuelve pronto: las piezas aparecen en cuanto se registran." />
      </div>
    )
  }

  return <CatalogoConPiezas piezas={piezas} onAgregar={onAgregar} />
}

// 2) Con las piezas ya cargadas: filtros, orden y "Cargar más"
function CatalogoConPiezas({ piezas, onAgregar }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const busqueda = (searchParams.get('buscar') || '').trim()

  // Opciones de los filtros, calculadas a partir de las piezas reales
  const opcionesCategorias = useMemo(() => opcionesDe(piezas, (p) => p.categoria.id, (p) => p.categoria.nombre), [piezas])
  const opcionesFabricantes = useMemo(() => opcionesDe(piezas, (p) => p.fabricante, (p) => p.fabricante), [piezas])
  const PRECIO_MAX = Math.max(1000, Math.ceil(Math.max(...piezas.map((p) => p.precio)) / 1000) * 1000)
  const PASO_PRECIO = PRECIO_MAX <= 10000 ? 100 : 500

  // /catalogo?categoria=2 (desde las tarjetas de Inicio) llega con esa categoría marcada
  const categoriaInicial = Number(searchParams.get('categoria'))
  const [categorias, setCategorias] = useState(categoriaInicial ? [categoriaInicial] : [])
  const [fabricantes, setFabricantes] = useState([])
  const [precio, setPrecio] = useState([0, PRECIO_MAX])
  const [orden, setOrden] = useState('recientes')
  const [visibles, setVisibles] = useState(POR_CARGA)
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)

  const resultados = useMemo(() => {
    const texto = busqueda.toLowerCase()
    return piezas
      .filter(
        (p) =>
          (categorias.length === 0 || categorias.includes(p.categoria.id)) &&
          (fabricantes.length === 0 || fabricantes.includes(p.fabricante)) &&
          p.precio >= precio[0] &&
          p.precio <= precio[1] &&
          (!texto || `${p.nombre} ${p.fabricante} ${p.sku}`.toLowerCase().includes(texto))
      )
      .sort(ordenes[orden].fn)
  }, [piezas, busqueda, categorias, fabricantes, precio, orden])

  // Al cambiar un filtro se vuelve a mostrar solo la primera tanda
  const conReinicio = (setter) => (valor) => {
    setter(valor)
    setVisibles(POR_CARGA)
  }

  const precioActivo = precio[0] > 0 || precio[1] < PRECIO_MAX
  const totalFiltros = categorias.length + fabricantes.length + (precioActivo ? 1 : 0)

  const limpiar = () => {
    setCategorias([])
    setFabricantes([])
    setPrecio([0, PRECIO_MAX])
    setVisibles(POR_CARGA)
  }

  return (
    <div className="catalogo">
      <aside
        id="filtros"
        className={`catalogo__filtros${filtrosAbiertos ? ' catalogo__filtros--abierto' : ''}`}
        aria-label="Filtros"
      >
        <div className="catalogo__filtros-encabezado">
          <h2>Filtros</h2>
          <button onClick={() => setFiltrosAbiertos(false)} aria-label="Cerrar filtros">
            <CloseIcon />
          </button>
        </div>

        <FiltroCheckboxes
          titulo="Categorías"
          opciones={opcionesCategorias}
          seleccion={categorias}
          onCambiar={conReinicio(setCategorias)}
        />
        <FiltroCheckboxes
          titulo="Fabricantes"
          opciones={opcionesFabricantes}
          seleccion={fabricantes}
          onCambiar={conReinicio(setFabricantes)}
          limite={7}
        />
        <FiltroPrecio
          key={precio.join('-')}
          min={0}
          max={PRECIO_MAX}
          paso={PASO_PRECIO}
          valor={precio}
          onAplicar={conReinicio(setPrecio)}
        />

        {totalFiltros > 0 && (
          <button className="catalogo__limpiar" onClick={limpiar}>
            Limpiar filtros ({totalFiltros})
          </button>
        )}
      </aside>

      {filtrosAbiertos && (
        <div className="catalogo__velo" onClick={() => setFiltrosAbiertos(false)} />
      )}

      <section className="catalogo__resultados" aria-label="Resultados">
        <div className="catalogo__barra">
          <button
            className="catalogo__btn-filtros"
            onClick={() => setFiltrosAbiertos(true)}
            aria-controls="filtros"
            aria-expanded={filtrosAbiertos}
          >
            <FilterIcon /> Filtros{totalFiltros > 0 && ` (${totalFiltros})`}
          </button>

          <p className="catalogo__total">
            Resultados: <strong>{resultados.length}</strong>{' '}
            {resultados.length === 1 ? 'pieza' : 'piezas'}
          </p>

          <label className="catalogo__orden">
            <span>Ordenar por:</span>
            <div className="catalogo__select">
              <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                {Object.entries(ordenes).map(([clave, o]) => (
                  <option key={clave} value={clave}>{o.texto}</option>
                ))}
              </select>
              <ChevronDownIcon />
            </div>
          </label>
        </div>

        {busqueda && (
          <div className="catalogo__busqueda">
            Buscando “{busqueda}”
            <button onClick={() => setSearchParams({}, { replace: true })} aria-label="Quitar búsqueda">
              <CloseIcon />
            </button>
          </div>
        )}

        {resultados.length === 0 ? (
          <div className="catalogo__vacio">
            <p>No encontramos piezas con esos filtros.</p>
            <button className="catalogo__btn-secundario" onClick={limpiar}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="catalogo__grid">
            {resultados.slice(0, visibles).map((pieza) => (
              <ProductCard
                key={pieza.id}
                pieza={pieza}
                onAgregar={onAgregar}
                enlace={`/catalogo/${pieza.id}`}
              />
            ))}
          </div>
        )}

        {visibles < resultados.length && (
          <div className="catalogo__mas">
            <button
              className="catalogo__btn-cargar"
              onClick={() => setVisibles((v) => v + POR_CARGA)}
            >
              Cargar más
            </button>
            <p>Mostrando {visibles} de {resultados.length}</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Catalogo

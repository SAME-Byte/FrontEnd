import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import FiltroCheckboxes from '../components/FiltroCheckboxes'
import FiltroPrecio from '../components/FiltroPrecio'
import { ChevronDownIcon, FilterIcon, CloseIcon } from '../components/Icons'
import { categoriasCatalogo, marcasCatalogo, productosCatalogo } from '../data/catalogo'
import '../Styles/Catalogo.css'

const POR_CARGA = 9
const PRECIO_MAX = Math.ceil(Math.max(...productosCatalogo.map((p) => p.precio)) / 1000) * 1000

const ordenes = {
  relevancia: { texto: 'Más relevantes', fn: (a, b) => b.relevancia - a.relevancia },
  precioAsc: { texto: 'Precio: menor a mayor', fn: (a, b) => a.precio - b.precio },
  precioDesc: { texto: 'Precio: mayor a menor', fn: (a, b) => b.precio - a.precio },
  nombre: { texto: 'Nombre (A–Z)', fn: (a, b) => a.nombre.localeCompare(b.nombre, 'es') },
}

// Cuántas piezas hay de cada categoría y de cada marca
const contar = (campo) =>
  productosCatalogo.reduce((acc, p) => ({ ...acc, [p[campo]]: (acc[p[campo]] || 0) + 1 }), {})
const conteoCategorias = contar('categoria')
const conteoMarcas = contar('marca')

const opcionesCategorias = categoriasCatalogo.map((c) => ({
  valor: c.slug, texto: c.nombre, cantidad: conteoCategorias[c.slug] || 0,
}))

// Marcas ordenadas de la que tiene más piezas a la que tiene menos
const opcionesMarcas = marcasCatalogo
  .map((m) => ({ valor: m, texto: m, cantidad: conteoMarcas[m] || 0 }))
  .sort((a, b) => b.cantidad - a.cantidad || a.texto.localeCompare(b.texto))

function Catalogo({ onAgregar }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const busqueda = (searchParams.get('buscar') || '').trim()

  const [categorias, setCategorias] = useState([])
  const [marcas, setMarcas] = useState([])
  const [precio, setPrecio] = useState([0, PRECIO_MAX])
  const [orden, setOrden] = useState('relevancia')
  const [visibles, setVisibles] = useState(POR_CARGA)
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)

  const resultados = useMemo(() => {
    const texto = busqueda.toLowerCase()
    return productosCatalogo
      .filter(
        (p) =>
          (categorias.length === 0 || categorias.includes(p.categoria)) &&
          (marcas.length === 0 || marcas.includes(p.marca)) &&
          p.precio >= precio[0] &&
          p.precio <= precio[1] &&
          (!texto || `${p.nombre} ${p.marca}`.toLowerCase().includes(texto))
      )
      .sort(ordenes[orden].fn)
  }, [busqueda, categorias, marcas, precio, orden])

  // Al cambiar un filtro se vuelve a mostrar solo la primera tanda
  const conReinicio = (setter) => (valor) => {
    setter(valor)
    setVisibles(POR_CARGA)
  }

  const precioActivo = precio[0] > 0 || precio[1] < PRECIO_MAX
  const totalFiltros = categorias.length + marcas.length + (precioActivo ? 1 : 0)

  const limpiar = () => {
    setCategorias([])
    setMarcas([])
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
          titulo="Marcas"
          opciones={opcionesMarcas}
          seleccion={marcas}
          onCambiar={conReinicio(setMarcas)}
          limite={7}
        />
        <FiltroPrecio
          key={precio.join('-')}
          min={0}
          max={PRECIO_MAX}
          paso={500}
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
            <button onClick={() => setSearchParams({})} aria-label="Quitar búsqueda">
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
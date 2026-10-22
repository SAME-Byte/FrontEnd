import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import { Cargando, MensajeError, MensajeVacio } from '../components/EstadoCarga'
import { useCarga } from '../hooks/useCarga'
import { obtenerPiezas } from '../services/piezas'
import { slides } from '../content/carrusel'
import '../Styles/Inicio.css'

const MAX_PIEZAS = 8

// Categorías que tienen al menos una pieza, con cuántas tiene cada una
function categoriasConPiezas(piezas) {
  const mapa = new Map()
  for (const { categoria } of piezas) {
    const actual = mapa.get(categoria.id) ?? { ...categoria, cantidad: 0 }
    actual.cantidad += 1
    mapa.set(categoria.id, actual)
  }
  return [...mapa.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

function Inicio({ onAgregar }) {
  const { datos: piezas, cargando, error, recargar } = useCarga(obtenerPiezas)

  let contenido
  if (cargando) {
    contenido = <Cargando texto="Cargando piezas…" />
  } else if (error) {
    contenido = <MensajeError error={error} onReintentar={recargar} />
  } else if (piezas.length === 0) {
    contenido = (
      <MensajeVacio
        titulo="Aún no hay piezas registradas"
        texto="Cuando un administrador registre piezas, aparecerán aquí."
      />
    )
  } else {
    // Se muestran las destacadas; si el admin no ha marcado ninguna, las más recientes
    const destacadas = piezas.filter((p) => p.destacada)
    const mostrar = (destacadas.length > 0 ? destacadas : piezas).slice(0, MAX_PIEZAS)
    const titulo = destacadas.length > 0 ? 'Piezas destacadas' : 'Piezas recientes'
    const categorias = categoriasConPiezas(piezas)

    contenido = (
      <>
        <section className="seccion" aria-labelledby="titulo-destacadas">
          <div className="seccion__encabezado">
            <h2 id="titulo-destacadas" className="seccion__titulo">{titulo}</h2>
            <Link to="/catalogo" className="seccion__ver-todo">
              Ver las {piezas.length} piezas →
            </Link>
          </div>
          <div className="grid-piezas">
            {mostrar.map((pieza) => (
              <ProductCard
                key={pieza.id}
                pieza={pieza}
                onAgregar={onAgregar}
                enlace={`/catalogo/${pieza.id}`}
              />
            ))}
          </div>
        </section>

        <section className="seccion seccion--categorias" aria-labelledby="titulo-categorias">
          <h2 id="titulo-categorias" className="seccion__titulo">Categorías</h2>
          <div className="grid-categorias">
            {categorias.map((categoria) => (
              <CategoryCard key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <HeroCarousel slides={slides} />
      <div className="inicio__contenido">{contenido}</div>
    </>
  )
}

export default Inicio

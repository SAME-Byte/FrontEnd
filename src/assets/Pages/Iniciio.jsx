import HeroCarousel from '../components/HeroCarousel'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import { slides, piezasDestacadas, categorias } from '../data/inicio'
import '../styles/Inicio.css'

function Inicio({ onAgregar }) {
  return (
    <>
      <HeroCarousel slides={slides} />

      <section className="seccion" aria-labelledby="titulo-destacadas">
        <h2 id="titulo-destacadas" className="seccion__titulo">
          Piezas destacadas
        </h2>
        <div className="grid-piezas">
          {piezasDestacadas.map((pieza) => (
            <ProductCard key={pieza.id} pieza={pieza} onAgregar={onAgregar} />
          ))}
        </div>
      </section>

      <section className="seccion seccion--categorias" aria-labelledby="titulo-categorias">
        <h2 id="titulo-categorias" className="seccion__titulo">
          Categorías
        </h2>
        <div className="grid-categorias">
          {categorias.map((categoria) => (
            <CategoryCard key={categoria.id} categoria={categoria} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Inicio
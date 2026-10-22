import { Link } from 'react-router-dom'
import ImagePlaceholder from './ImagePlaceholder'
import '../Styles/CategoryCard.css'

// categoria = { id, nombre, cantidad } — lleva al catálogo ya filtrado por esa categoría
function CategoryCard({ categoria }) {
  return (
    <Link to={`/catalogo?categoria=${categoria.id}`} className="card-categoria">
      <div className="card-categoria__imagen">
        <ImagePlaceholder alt="" />
      </div>
      <span className="card-categoria__nombre">{categoria.nombre}</span>
      <span className="card-categoria__cantidad">
        {categoria.cantidad} {categoria.cantidad === 1 ? 'pieza' : 'piezas'}
      </span>
    </Link>
  )
}

export default CategoryCard

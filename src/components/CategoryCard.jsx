import { Link } from 'react-router-dom'
import ImagePlaceholder from './ImagePlaceholder'
import '../Styles/CategoryCard.css'

function CategoryCard({ categoria }) {
  return (
    <Link to={`/categorias/${categoria.slug}`} className="card-categoria">
      <div className="card-categoria__imagen">
        <ImagePlaceholder src={categoria.imagen} alt={categoria.nombre} />
      </div>
      <span className="card-categoria__nombre">{categoria.nombre}</span>
    </Link>
  )
}

export default CategoryCard
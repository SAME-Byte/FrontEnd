import { Link } from 'react-router-dom'
import ImagePlaceholder from './ImagePlaceholder'
import { CartAddIcon } from './Icons'
import '../Styles/ProductCard.css'

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

function ProductCard({ pieza, onAgregar, enlace }) {
  const imagen = <ImagePlaceholder src={pieza.imagen} alt={pieza.nombre} />

  return (
    <article className="card-pieza">
      <div className="card-pieza__imagen">
        {enlace ? (
          <Link to={enlace} tabIndex={-1} aria-hidden="true">{imagen}</Link>
        ) : (
          imagen
        )}
      </div>
      <div className="card-pieza__cuerpo">
        <h3 className="card-pieza__nombre">
          {enlace ? <Link to={enlace}>{pieza.nombre}</Link> : pieza.nombre}
        </h3>
        <p className="card-pieza__marca">{pieza.marca}</p>
        <div className="card-pieza__pie">
          <span className="card-pieza__precio">{formatoPrecio.format(pieza.precio)}</span>
          <button
            className="card-pieza__boton"
            onClick={() => onAgregar?.(pieza)}
            aria-label={`Agregar ${pieza.nombre} al carrito`}
          >
            <CartAddIcon />
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
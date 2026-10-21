import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GaleriaPieza from '../components/GaleriaPieza'
import SelectorCantidad from '../components/SelectorCantidad'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { CartIcon, ChevronRightIcon } from '../components/Icons'
import { productosCatalogo, categoriasCatalogo } from '../data/catalogo'
import '../Styles/DetallePieza.css'

const formatoPrecio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

function DetallePieza({ onAgregar }) {
  const { id } = useParams()
  const pieza = productosCatalogo.find((p) => String(p.id) === id)

  if (!pieza) {
    return (
      <div className="detalle-vacio">
        <h1>No encontramos esta pieza</h1>
        <p>Puede que ya no esté disponible o que el enlace sea incorrecto.</p>
        <Link to="/catalogo" className="detalle__btn-volver">Volver al catálogo</Link>
      </div>
    )
  }

  // key: al pasar de una pieza a otra, la ficha se reinicia (cantidad en 1, primera imagen)
  return <FichaPieza key={pieza.id} pieza={pieza} onAgregar={onAgregar} />
}

function FichaPieza({ pieza, onAgregar }) {
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  // Al abrir la ficha, empezar desde arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categoria = categoriasCatalogo.find((c) => c.slug === pieza.categoria)
  const disponible = pieza.stock > 0

  const agregar = () => {
    onAgregar?.(pieza, cantidad)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2500)
  }

  const especificaciones = [
    ['Fabricante', pieza.marca],
    ['SKU', pieza.sku],
    ['Tipo', pieza.tipo],
  ]

  return (
    <article className="detalle">
      <nav className="migas-tienda" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link>
        <ChevronRightIcon />
        <Link to="/catalogo">Catálogo</Link>
        <ChevronRightIcon />
        <span>{categoria?.nombre}</span>
        <ChevronRightIcon />
        <span aria-current="page">{pieza.nombre}</span>
      </nav>

      <div className="detalle__principal">
        <GaleriaPieza imagenes={pieza.imagenes} nombre={pieza.nombre} />

        <div className="detalle__info">
          <h1 className="detalle__nombre">{pieza.nombre}</h1>
          <p className="detalle__meta">
            <span>{pieza.marca}</span>
            <span className="detalle__separador" aria-hidden="true">|</span>
            <span>SKU: {pieza.sku}</span>
          </p>

          <p className="detalle__precio">{formatoPrecio.format(pieza.precio)}</p>

          <p className={`detalle__stock${disponible ? '' : ' detalle__stock--agotado'}`}>
            <span className="detalle__punto" aria-hidden="true" />
            {disponible ? (
              <>
                En stock{' '}
                <span className="detalle__stock-cantidad">({pieza.stock} disponibles)</span>
              </>
            ) : (
              'Agotado'
            )}
          </p>

          <div className="detalle__compra">
            <SelectorCantidad
              valor={cantidad}
              min={1}
              max={Math.max(pieza.stock, 1)}
              onCambiar={setCantidad}
              deshabilitado={!disponible}
            />
            <button className="detalle__agregar" onClick={agregar} disabled={!disponible}>
              <CartIcon />
              {agregado ? 'Agregado' : 'Agregar al carrito'}
            </button>
          </div>

          <p className="detalle__aviso" role="status">
            {agregado &&
              `Se ${cantidad === 1 ? 'agregó 1 pieza' : `agregaron ${cantidad} piezas`} al carrito.`}
          </p>
        </div>
      </div>

      <section className="detalle__seccion">
        <h2>Descripción</h2>
        <p className="detalle__descripcion">{pieza.descripcion}</p>
      </section>

      <div className="detalle__inferior">
        <section className="detalle__specs">
          <h2>Especificaciones</h2>
          <table className="tabla-specs">
            <tbody>
              {especificaciones.map(([etiqueta, valor]) => (
                <tr key={etiqueta}>
                  <th scope="row">{etiqueta}</th>
                  <td>{valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="detalle__compatibles">
          <h2>Marcas compatibles</h2>
          <ul className="compatibles">
            {pieza.marcasCompatibles.map((marca) => (
              <li key={marca} className="compatibles__item">
                <div className="compatibles__logo">
                  <ImagePlaceholder alt={`Logo de ${marca}`} />
                </div>
                <span>{marca}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}

export default DetallePieza
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GaleriaPieza from '../components/GaleriaPieza'
import SelectorCantidad from '../components/SelectorCantidad'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { Cargando, MensajeError } from '../components/EstadoCarga'
import { CartIcon, ChevronRightIcon } from '../components/Icons'
import { useCarga } from '../hooks/useCarga'
import { obtenerPieza } from '../services/piezas'
import '../Styles/DetallePieza.css'

const formatoPrecio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

// La "key" hace que al cambiar de pieza (/catalogo/1 -> /catalogo/2) todo se reinicie y se vuelva a pedir
function DetallePieza({ onAgregar }) {
  const { id } = useParams()
  return <CargaPieza key={id} id={id} onAgregar={onAgregar} />
}

function CargaPieza({ id, onAgregar }) {
  const { datos: pieza, cargando, error, recargar } = useCarga(() => obtenerPieza(id))

  if (cargando) return <div className="detalle"><Cargando texto="Cargando pieza…" /></div>

  if (error?.status === 404) {
    return (
      <div className="detalle-vacio">
        <h1>No encontramos esta pieza</h1>
        <p>Puede que ya no esté disponible o que el enlace sea incorrecto.</p>
        <Link to="/catalogo" className="detalle__btn-volver">Volver al catálogo</Link>
      </div>
    )
  }

  if (error) return <div className="detalle"><MensajeError error={error} onReintentar={recargar} /></div>

  return <FichaPieza pieza={pieza} onAgregar={onAgregar} />
}

function FichaPieza({ pieza, onAgregar }) {
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  // Al abrir la ficha, empezar desde arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const disponible = pieza.stock > 0

  const agregar = () => {
    onAgregar?.(pieza, cantidad)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2500)
  }

  const especificaciones = [
    ['Fabricante', pieza.fabricante],
    ['SKU', pieza.sku],
    ['Categoría', pieza.categoria.nombre],
  ]

  return (
    <article className="detalle">
      <nav className="migas-tienda" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link>
        <ChevronRightIcon />
        <Link to="/catalogo">Catálogo</Link>
        <ChevronRightIcon />
        <Link to={`/catalogo?categoria=${pieza.categoria.id}`}>{pieza.categoria.nombre}</Link>
        <ChevronRightIcon />
        <span aria-current="page">{pieza.nombre}</span>
      </nav>

      <div className="detalle__principal">
        <GaleriaPieza imagenes={pieza.imagenUrl ? [pieza.imagenUrl] : []} nombre={pieza.nombre} />

        <div className="detalle__info">
          <h1 className="detalle__nombre">{pieza.nombre}</h1>
          <p className="detalle__meta">
            <span>{pieza.fabricante}</span>
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
          {pieza.marcasCompatibles.length === 0 ? (
            <p className="detalle__sin-datos">Sin marcas compatibles registradas.</p>
          ) : (
            <ul className="compatibles">
              {pieza.marcasCompatibles.map((marca) => (
                <li key={marca.id} className="compatibles__item">
                  <div className="compatibles__logo">
                    <ImagePlaceholder src={marca.logoUrl} alt={`Logo de ${marca.nombre}`} />
                  </div>
                  <span>{marca.nombre}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </article>
  )
}

export default DetallePieza
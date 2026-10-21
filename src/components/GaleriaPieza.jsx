import { useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'
import '../Styles/GaleriaPieza.css'

// Mientras no haya fotos reales se muestran 4 recuadros de ejemplo
const SIN_IMAGENES = [null, null, null, null]

function GaleriaPieza({ imagenes = [], nombre }) {
  const lista = imagenes.length > 0 ? imagenes : SIN_IMAGENES
  const [actual, setActual] = useState(0)

  return (
    <div className="galeria">
      <ul className="galeria__miniaturas">
        {lista.map((src, i) => (
          <li key={i}>
            <button
              type="button"
              className={`galeria__miniatura${i === actual ? ' galeria__miniatura--activa' : ''}`}
              onClick={() => setActual(i)}
              aria-label={`Ver imagen ${i + 1} de ${lista.length}`}
              aria-current={i === actual}
            >
              <ImagePlaceholder src={src} alt="" />
            </button>
          </li>
        ))}
      </ul>

      <div className="galeria__principal">
        <ImagePlaceholder src={lista[actual]} alt={`${nombre}, imagen ${actual + 1}`} />
      </div>
    </div>
  )
}

export default GaleriaPieza
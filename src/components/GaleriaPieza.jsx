import { useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'
import '../Styles/GaleriaPieza.css'

// Recibe una lista de URLs. Con una sola imagen (o ninguna) no se muestran miniaturas.
// Hoy la base guarda una imagen por pieza; si en el futuro hay varias, las miniaturas aparecen solas.
function GaleriaPieza({ imagenes = [], nombre }) {
  const [actual, setActual] = useState(0)
  const variasImagenes = imagenes.length > 1

  return (
    <div className={`galeria${variasImagenes ? '' : ' galeria--unica'}`}>
      {variasImagenes && (
        <ul className="galeria__miniaturas">
          {imagenes.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                className={`galeria__miniatura${i === actual ? ' galeria__miniatura--activa' : ''}`}
                onClick={() => setActual(i)}
                aria-label={`Ver imagen ${i + 1} de ${imagenes.length}`}
                aria-current={i === actual}
              >
                <ImagePlaceholder src={src} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="galeria__principal">
        <ImagePlaceholder src={imagenes[actual]} alt={nombre} />
      </div>
    </div>
  )
}

export default GaleriaPieza

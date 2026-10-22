import { useState } from 'react'
import { ImageIcon } from './Icons'
import '../Styles/ImagePlaceholder.css'

// Muestra la imagen si hay URL y carga bien; si no hay URL o la URL falla, el recuadro gris
function ImagePlaceholder({ src, alt = '' }) {
  const [urlFallida, setUrlFallida] = useState(null)

  if (src && src !== urlFallida) {
    return (
      <img
        className="img-real"
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setUrlFallida(src)}
      />
    )
  }

  return (
    <div className="img-ph" role="img" aria-label={alt}>
      <div className="img-ph__icono">
        <ImageIcon />
      </div>
    </div>
  )
}

export default ImagePlaceholder

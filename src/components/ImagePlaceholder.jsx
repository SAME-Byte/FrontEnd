import { ImageIcon } from './Icons'
import '../styles/ImagePlaceholder.css'

function ImagePlaceholder({ src, alt = '' }) {
  if (src) {
    return <img className="img-real" src={src} alt={alt} loading="lazy" />
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
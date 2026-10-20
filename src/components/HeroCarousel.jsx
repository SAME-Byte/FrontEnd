import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from './ImagePlaceholder'
import { ArrowLeftIcon, ArrowRightIcon } from './Icons'
import '../Styles/HeroCarousel.css'

function HeroCarousel({ slides, intervalo = 6000 }) {
  const [actual, setActual] = useState(0)
  const total = slides.length

  const anterior = () => setActual((i) => (i - 1 + total) % total)
  const siguiente = useCallback(() => setActual((i) => (i + 1) % total), [total])

  // Avance automático (se reinicia cada vez que cambia el slide)
  useEffect(() => {
    if (total < 2) return
    const id = setInterval(siguiente, intervalo)
    return () => clearInterval(id)
  }, [actual, siguiente, intervalo, total])

  const slide = slides[actual]

  return (
    <section className="hero" aria-roledescription="carrusel" aria-label="Promociones">
      <button className="hero__flecha hero__flecha--izq" onClick={anterior} aria-label="Anterior">
        <ArrowLeftIcon />
      </button>

      <div className="hero__slide" key={slide.id}>
        <div className="hero__texto">
          <h1 className="hero__titulo">{slide.titulo}</h1>
          <p className="hero__subtitulo">{slide.subtitulo}</p>
          <Link to={slide.enlace} className="hero__boton">
            {slide.boton} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="hero__media">
          <div className="hero__imagen">
            <ImagePlaceholder src={slide.imagen} alt={slide.titulo} />
          </div>
          <div className="hero__puntos">
            {slides.map((s, i) => (
              <button
                key={s.id}
                className={i === actual ? 'hero__punto hero__punto--activo' : 'hero__punto'}
                onClick={() => setActual(i)}
                aria-label={`Ir al slide ${i + 1}`}
                aria-current={i === actual}
              />
            ))}
          </div>
        </div>
      </div>

      <button className="hero__flecha hero__flecha--der" onClick={siguiente} aria-label="Siguiente">
        <ArrowRightIcon />
      </button>
    </section>
  )
}

export default HeroCarousel
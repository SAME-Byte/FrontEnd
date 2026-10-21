import { useState } from 'react'
import '../Styles/Filtros.css'

const formato = new Intl.NumberFormat('es-MX', {
  style: 'currency', currency: 'MXN', maximumFractionDigits: 0,
})

function FiltroPrecio({ min, max, paso = 500, valor, onAplicar }) {
  const [rango, setRango] = useState(valor)
  const [desde, hasta] = rango

  const cambiarDesde = (e) => setRango([Math.min(Number(e.target.value), hasta - paso), hasta])
  const cambiarHasta = (e) => setRango([desde, Math.max(Number(e.target.value), desde + paso)])

  const porcentaje = (v) => ((v - min) / (max - min)) * 100
  const sinCambios = desde === valor[0] && hasta === valor[1]

  return (
    <fieldset className="filtro">
      <legend className="filtro__titulo">Precio</legend>

      <div
        className="rango"
        style={{ '--desde': `${porcentaje(desde)}%`, '--hasta': `${porcentaje(hasta)}%` }}
      >
        <div className="rango__pista" />
        <input
          type="range" min={min} max={max} step={paso} value={desde}
          onChange={cambiarDesde} aria-label="Precio mínimo"
          className={desde > max - paso * 2 ? 'rango__input--arriba' : ''}
        />
        <input
          type="range" min={min} max={max} step={paso} value={hasta}
          onChange={cambiarHasta} aria-label="Precio máximo"
        />
      </div>

      <div className="rango__valores">
        <span>{formato.format(desde)}</span>
        <span>{formato.format(hasta)}</span>
      </div>

      <button
        type="button"
        className="filtro__aplicar"
        onClick={() => onAplicar([desde, hasta])}
        disabled={sinCambios}
      >
        Aplicar
      </button>
    </fieldset>
  )
}

export default FiltroPrecio
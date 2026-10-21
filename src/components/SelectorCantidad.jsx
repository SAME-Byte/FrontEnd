import { MinusIcon, PlusIcon } from './Icons'
import '../Styles/SelectorCantidad.css'

function SelectorCantidad({ valor, min = 1, max = 99, onCambiar, deshabilitado = false }) {
  const fijar = (n) => onCambiar(Math.min(max, Math.max(min, n)))

  return (
    <div className={`cantidad${deshabilitado ? ' cantidad--deshabilitado' : ''}`}>
      <button
        type="button"
        onClick={() => fijar(valor - 1)}
        disabled={deshabilitado || valor <= min}
        aria-label="Quitar uno"
      >
        <MinusIcon />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={valor}
        disabled={deshabilitado}
        aria-label="Cantidad"
        onChange={(e) => {
          const n = parseInt(e.target.value, 10)
          if (!Number.isNaN(n)) fijar(n)
        }}
      />
      <button
        type="button"
        onClick={() => fijar(valor + 1)}
        disabled={deshabilitado || valor >= max}
        aria-label="Agregar uno"
      >
        <PlusIcon />
      </button>
    </div>
  )
}

export default SelectorCantidad
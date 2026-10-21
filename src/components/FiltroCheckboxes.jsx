import { useState } from 'react'
import { ChevronDownIcon } from './Icons'
import '../Styles/Filtros.css'

function FiltroCheckboxes({ titulo, opciones, seleccion, onCambiar, limite }) {
  const [verTodos, setVerTodos] = useState(false)

  const hayMas = limite && opciones.length > limite
  const visibles = hayMas && !verTodos ? opciones.slice(0, limite) : opciones

  const alternar = (valor) => {
    onCambiar(
      seleccion.includes(valor)
        ? seleccion.filter((v) => v !== valor)
        : [...seleccion, valor]
    )
  }

  return (
    <fieldset className="filtro">
      <legend className="filtro__titulo">{titulo}</legend>

      <ul className="filtro__lista">
        {visibles.map((op) => (
          <li key={op.valor}>
            <label className="filtro__opcion">
              <input
                type="checkbox"
                checked={seleccion.includes(op.valor)}
                onChange={() => alternar(op.valor)}
              />
              <span>{op.texto}</span>
              <span className="filtro__cantidad">({op.cantidad})</span>
            </label>
          </li>
        ))}
      </ul>

      {hayMas && (
        <button
          type="button"
          className="filtro__ver-mas"
          onClick={() => setVerTodos((v) => !v)}
          aria-expanded={verTodos}
        >
          {verTodos ? 'Ver menos' : `Ver más (${opciones.length - limite})`}
          <ChevronDownIcon className={verTodos ? 'girado' : ''} />
        </button>
      )}
    </fieldset>
  )
}

export default FiltroCheckboxes
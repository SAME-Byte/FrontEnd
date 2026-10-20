import { useEffect, useRef, useState } from 'react'
import { IconChevronDown } from './AdminIcons'

function MultiSelect({ id, opciones, seleccion, onCambiar, placeholder, invalido }) {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef(null)

  // Cerrar al hacer clic fuera
  useEffect(() => {
    if (!abierto) return
    const alClicFuera = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setAbierto(false)
    }
    document.addEventListener('mousedown', alClicFuera)
    return () => document.removeEventListener('mousedown', alClicFuera)
  }, [abierto])

  const alternar = (opcion) => {
    onCambiar(
      seleccion.includes(opcion)
        ? seleccion.filter((s) => s !== opcion)
        : [...seleccion, opcion]
    )
  }

  const texto =
    seleccion.length === 0
      ? placeholder
      : seleccion.length <= 2
        ? seleccion.join(', ')
        : `${seleccion.length} marcas seleccionadas`

  return (
    <div className="multiselect" ref={ref}>
      <button
        type="button"
        id={id}
        className={`select-boton${seleccion.length === 0 ? ' select-boton--vacio' : ''}${invalido ? ' input--error' : ''}`}
        onClick={() => setAbierto((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={abierto}
      >
        <span>{texto}</span>
        <IconChevronDown size={16} />
      </button>

      {abierto && (
        <ul className="multiselect__lista" role="listbox" aria-multiselectable="true">
          {opciones.map((opcion) => (
            <li key={opcion}>
              <label className="multiselect__opcion">
                <input
                  type="checkbox"
                  checked={seleccion.includes(opcion)}
                  onChange={() => alternar(opcion)}
                />
                {opcion}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MultiSelect
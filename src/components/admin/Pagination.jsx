import { IconChevronLeft, IconChevronRight } from './AdminIcons'

function Pagination({ pagina, totalPaginas, onCambiar, maxBotones = 5 }) {
  let desde = Math.max(1, pagina - Math.floor(maxBotones / 2))
  const hasta = Math.min(totalPaginas, desde + maxBotones - 1)
  desde = Math.max(1, hasta - maxBotones + 1)

  const numeros = []
  for (let n = desde; n <= hasta; n++) numeros.push(n)

  return (
    <nav className="paginacion" aria-label="Paginación">
      <button onClick={() => onCambiar(pagina - 1)} disabled={pagina === 1} aria-label="Página anterior">
        <IconChevronLeft size={16} />
      </button>
      {numeros.map((n) => (
        <button
          key={n}
          className={n === pagina ? 'activo' : ''}
          aria-current={n === pagina ? 'page' : undefined}
          onClick={() => onCambiar(n)}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onCambiar(pagina + 1)}
        disabled={pagina === totalPaginas}
        aria-label="Página siguiente"
      >
        <IconChevronRight size={16} />
      </button>
    </nav>
  )
}

export default Pagination
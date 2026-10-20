import { IconImage, IconPencil, IconTrash } from './AdminIcons'

const formatoPrecio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

function PiezasTable({ piezas, onEditar, onEliminar }) {
  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th className="num">Precio</th>
            <th className="centro">Stock</th>
            <th className="centro">Destacada</th>
            <th className="centro">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {piezas.length === 0 ? (
            <tr>
              <td colSpan={9} className="tabla__vacia">
                No se encontraron piezas con esos filtros.
              </td>
            </tr>
          ) : (
            piezas.map((p) => (
              <tr key={p.id}>
                <td className="col-img">
                  <div className="miniatura">
                    <IconImage size={26} />
                    {p.imagen && (
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    )}
                  </div>
                </td>
                <td className="col-sku tabla__sku">{p.sku}</td>
                <td className="col-nombre">{p.nombre}</td>
                <td className="col-marca" data-label="Marca">{p.marca}</td>
                <td className="col-categoria" data-label="Categoría">{p.categoria}</td>
                <td className="col-precio num">{formatoPrecio.format(p.precio)}</td>
                <td className="col-stock centro" data-label="Stock">
                  <span className={p.stock < 10 ? 'stock--bajo' : ''}>{p.stock}</span>
                </td>
                <td className="col-destacada centro" data-label="Destacada">
                  <span className={`etiqueta${p.destacada ? ' etiqueta--si' : ''}`}>
                    {p.destacada ? 'Sí' : 'No'}
                  </span>
                </td>
                <td className="col-acciones centro">
                  <div className="acciones">
                    <button
                      className="btn-icono"
                      onClick={() => onEditar(p)}
                      aria-label={`Editar ${p.nombre}`}
                      title="Editar"
                    >
                      <IconPencil size={18} />
                    </button>
                    <button
                      className="btn-icono btn-icono--peligro"
                      onClick={() => onEliminar(p)}
                      aria-label={`Eliminar ${p.nombre}`}
                      title="Eliminar"
                    >
                      <IconTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PiezasTable
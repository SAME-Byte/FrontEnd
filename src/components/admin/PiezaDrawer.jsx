import { useEffect, useRef, useState } from 'react'
import MultiSelect from './MultiSelect'
import { IconClose, IconChevronDown, IconImage } from './AdminIcons'
import '../../Styles/admin/PiezaDrawer.css'

const formularioVacio = {
  sku: '', nombre: '', descripcion: '', fabricante: '', precio: '', stock: '',
  imagenUrl: '', destacada: false, categoriaId: '', marcasCompatibles: [],
}

// Convierte una pieza de la API a los valores del formulario (los inputs trabajan con texto)
const aFormulario = (p) => ({
  sku: p.sku,
  nombre: p.nombre,
  descripcion: p.descripcion,
  fabricante: p.fabricante,
  precio: String(p.precio),
  stock: String(p.stock),
  imagenUrl: p.imagenUrl ?? '',
  destacada: p.destacada,
  categoriaId: String(p.categoria.id),
  marcasCompatibles: p.marcasCompatibles.map((m) => m.id),
})

function validar(f) {
  const e = {}
  if (!f.sku.trim()) e.sku = 'El SKU es obligatorio.'
  if (!f.nombre.trim()) e.nombre = 'El nombre es obligatorio.'
  if (!f.descripcion.trim()) e.descripcion = 'Agrega una descripción.'
  if (!f.fabricante.trim()) e.fabricante = 'Escribe el fabricante.'
  if (f.precio === '' || Number(f.precio) <= 0) e.precio = 'Ingresa un precio mayor a 0.'
  if (f.stock === '' || !Number.isInteger(Number(f.stock)) || Number(f.stock) < 0)
    e.stock = 'Ingresa una cantidad entera válida.'
  // La imagen es opcional: si se deja vacía, la tienda muestra el recuadro gris
  if (f.imagenUrl.trim() && !/^https?:\/\/.+/i.test(f.imagenUrl.trim()))
    e.imagenUrl = 'La URL debe empezar con http:// o https://'
  if (!f.categoriaId) e.categoriaId = 'Selecciona una categoría.'
  if (f.marcasCompatibles.length === 0) e.marcasCompatibles = 'Selecciona al menos una marca.'
  return e
}

function Campo({ id, etiqueta, error, children, opcional = false }) {
  return (
    <div className="campo">
      <label htmlFor={id} className="campo__etiqueta">
        {etiqueta}{' '}
        {opcional ? <span className="campo__opcional">(opcional)</span> : <span aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p className="campo__error">{error}</p>}
    </div>
  )
}

function PiezaDrawer({ pieza, categorias, marcas, fabricantes, onCerrar, onGuardar }) {
  const editando = Boolean(pieza)
  const [form, setForm] = useState(() => (pieza ? aFormulario(pieza) : formularioVacio))
  const [errores, setErrores] = useState({})
  const [guardando, setGuardando] = useState(false)
  const [errorApi, setErrorApi] = useState('')
  const [imagenFallida, setImagenFallida] = useState('')
  const primerCampo = useRef(null)

  // Al abrir: enfocar el primer campo y bloquear el scroll del fondo
  useEffect(() => {
    primerCampo.current?.focus()
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previo }
  }, [])

  // Cerrar con la tecla Escape
  useEffect(() => {
    const alPresionar = (e) => { if (e.key === 'Escape') onCerrar() }
    document.addEventListener('keydown', alPresionar)
    return () => document.removeEventListener('keydown', alPresionar)
  }, [onCerrar])

  const cambiar = (campo, valor) => {
    setForm((f) => ({ ...f, [campo]: valor }))
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: undefined }))
  }

  const enviar = async (e) => {
    e.preventDefault()
    const errs = validar(form)
    setErrores(errs)
    if (Object.keys(errs).length > 0) return

    setGuardando(true)
    setErrorApi('')
    try {
      // Mismos nombres de campo que espera la API (POST/PUT /api/piezas)
      await onGuardar({
        sku: form.sku.trim().toUpperCase(),
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        fabricante: form.fabricante.trim(),
        precio: Number(form.precio),
        stock: Number(form.stock),
        imagenUrl: form.imagenUrl.trim() || null,
        destacada: form.destacada,
        categoriaId: Number(form.categoriaId),
        marcasCompatibles: form.marcasCompatibles,
      })
      // Si todo salió bien, el padre cierra el panel
    } catch (error) {
      setErrorApi(error.message)
      // Errores por campo que mandó la API (por ejemplo "sku")
      if (error.detalles) {
        setErrores(Object.fromEntries(error.detalles.map((d) => [d.campo, d.mensaje])))
      }
      setGuardando(false)
    }
  }

  const claseInput = (campo) => `input${errores[campo] ? ' input--error' : ''}`
  const mostrarImagen = form.imagenUrl.trim() && form.imagenUrl !== imagenFallida

  return (
    <div className="drawer-raiz">
      <div className="drawer-velo" onClick={onCerrar} />

      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-titulo">
        <header className="drawer__encabezado">
          <div>
            <h2 id="drawer-titulo">{editando ? 'Editar pieza' : 'Nueva pieza'}</h2>
            <p>Completa la información de la pieza.</p>
          </div>
          <button className="drawer__cerrar" onClick={onCerrar} aria-label="Cerrar">
            <IconClose size={22} />
          </button>
        </header>

        <form id="form-pieza" className="drawer__cuerpo" onSubmit={enviar} noValidate>
          {errorApi && <p className="drawer__error" role="alert">{errorApi}</p>}

          <Campo id="sku" etiqueta="SKU" error={errores.sku}>
            <input
              ref={primerCampo} id="sku" className={claseInput('sku')} placeholder="Ej. BRK-001"
              value={form.sku} onChange={(e) => cambiar('sku', e.target.value)}
            />
          </Campo>

          <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
            <input
              id="nombre" className={claseInput('nombre')} placeholder="Ej. Kit de suspensión deportiva"
              value={form.nombre} onChange={(e) => cambiar('nombre', e.target.value)}
            />
          </Campo>

          <Campo id="descripcion" etiqueta="Descripción" error={errores.descripcion}>
            <textarea
              id="descripcion" rows={4} className={claseInput('descripcion')}
              placeholder="Describe la pieza, sus características y beneficios..."
              value={form.descripcion} onChange={(e) => cambiar('descripcion', e.target.value)}
            />
          </Campo>

          <div className="drawer__fila">
            <Campo id="fabricante" etiqueta="Fabricante" error={errores.fabricante}>
              {/* Campo de texto que sugiere los fabricantes que ya existen */}
              <input
                id="fabricante" list="lista-fabricantes" className={claseInput('fabricante')}
                placeholder="Ej. Garrett" autoComplete="off"
                value={form.fabricante} onChange={(e) => cambiar('fabricante', e.target.value)}
              />
              <datalist id="lista-fabricantes">
                {fabricantes.map((f) => <option key={f} value={f} />)}
              </datalist>
            </Campo>

            <Campo id="precio" etiqueta="Precio" error={errores.precio}>
              <div className="input-grupo">
                <span className="input-grupo__prefijo">$</span>
                <input
                  id="precio" type="number" min="0" step="0.01" placeholder="0.00"
                  className={claseInput('precio')}
                  value={form.precio} onChange={(e) => cambiar('precio', e.target.value)}
                />
              </div>
            </Campo>
          </div>

          <Campo id="stock" etiqueta="Stock" error={errores.stock}>
            <input
              id="stock" type="number" min="0" step="1" placeholder="Cantidad disponible"
              className={claseInput('stock')}
              value={form.stock} onChange={(e) => cambiar('stock', e.target.value)}
            />
          </Campo>

          <Campo id="imagenUrl" etiqueta="URL de imagen" error={errores.imagenUrl} opcional>
            <input
              id="imagenUrl" type="url" placeholder="https://..." className={claseInput('imagenUrl')}
              value={form.imagenUrl} onChange={(e) => cambiar('imagenUrl', e.target.value)}
            />
            <div className="vista-previa">
              {mostrarImagen ? (
                <img
                  src={form.imagenUrl} alt="Vista previa de la pieza"
                  onError={() => setImagenFallida(form.imagenUrl)}
                />
              ) : (
                <IconImage size={72} strokeWidth={1.4} />
              )}
            </div>
          </Campo>

          <label className="interruptor">
            <input
              type="checkbox" role="switch" checked={form.destacada}
              onChange={(e) => cambiar('destacada', e.target.checked)}
            />
            <span className="interruptor__pista" aria-hidden="true" />
            <span className="interruptor__texto">
              <strong>Pieza destacada</strong>
              <small>Mostrar esta pieza en la página de inicio.</small>
            </span>
          </label>

          <div className="drawer__fila drawer__fila--mitades">
            <Campo id="categoriaId" etiqueta="Categoría" error={errores.categoriaId}>
              <div className={`select${form.categoriaId ? '' : ' select--vacio'}`}>
                <select
                  id="categoriaId" className={errores.categoriaId ? 'input--error' : ''}
                  value={form.categoriaId} onChange={(e) => cambiar('categoriaId', e.target.value)}
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
                <IconChevronDown size={16} />
              </div>
            </Campo>

            <Campo id="compatibles" etiqueta="Marcas compatibles" error={errores.marcasCompatibles}>
              <MultiSelect
                id="compatibles"
                opciones={marcas.map((m) => ({ valor: m.id, texto: m.nombre }))}
                seleccion={form.marcasCompatibles}
                onCambiar={(lista) => cambiar('marcasCompatibles', lista)}
                placeholder="Selecciona una o más marcas"
                invalido={Boolean(errores.marcasCompatibles)}
              />
            </Campo>
          </div>
        </form>

        <footer className="drawer__pie">
          <button type="button" className="btn btn--secundario" onClick={onCerrar}>
            Cancelar
          </button>
          <button type="submit" form="form-pieza" className="btn btn--primario" disabled={guardando}>
            {guardando ? 'Guardando…' : 'Guardar pieza'}
          </button>
        </footer>
      </aside>
    </div>
  )
}

export default PiezaDrawer
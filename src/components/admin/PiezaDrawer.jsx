import { useEffect, useRef, useState } from 'react'
import MultiSelect from './MultiSelect'
import { IconClose, IconChevronDown, IconImage } from './AdminIcons'
import { categoriasAdmin, fabricantes, marcasAutos } from '../../data/piezasAdmin'
import '../../Styles/admin/PiezaDrawer.css'

const formularioVacio = {
  sku: '', nombre: '', descripcion: '', marca: '', precio: '', stock: '',
  imagen: '', destacada: false, categoria: '', marcasCompatibles: [],
}

function validar(f) {
  const e = {}
  if (!f.sku.trim()) e.sku = 'El SKU es obligatorio.'
  if (!f.nombre.trim()) e.nombre = 'El nombre es obligatorio.'
  if (!f.descripcion.trim()) e.descripcion = 'Agrega una descripción.'
  if (!f.marca) e.marca = 'Selecciona un fabricante.'
  if (f.precio === '' || Number(f.precio) <= 0) e.precio = 'Ingresa un precio mayor a 0.'
  if (f.stock === '' || !Number.isInteger(Number(f.stock)) || Number(f.stock) < 0)
    e.stock = 'Ingresa una cantidad entera válida.'
  if (!/^https?:\/\/.+/i.test(f.imagen.trim())) e.imagen = 'Ingresa una URL que empiece con http:// o https://'
  if (!f.categoria) e.categoria = 'Selecciona una categoría.'
  if (f.marcasCompatibles.length === 0) e.marcasCompatibles = 'Selecciona al menos una marca.'
  return e
}

function Campo({ id, etiqueta, error, children }) {
  return (
    <div className="campo">
      <label htmlFor={id} className="campo__etiqueta">
        {etiqueta} <span aria-hidden="true">*</span>
      </label>
      {children}
      {error && <p className="campo__error">{error}</p>}
    </div>
  )
}

function PiezaDrawer({ pieza, onCerrar, onGuardar }) {
  const editando = Boolean(pieza)
  const [form, setForm] = useState(() =>
    pieza
      ? { ...formularioVacio, ...pieza, precio: String(pieza.precio), stock: String(pieza.stock) }
      : formularioVacio
  )
  const [errores, setErrores] = useState({})
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

  const enviar = (e) => {
    e.preventDefault()
    const errs = validar(form)
    setErrores(errs)
    if (Object.keys(errs).length > 0) return

    onGuardar({
      ...form,
      sku: form.sku.trim().toUpperCase(),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      imagen: form.imagen.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
    })
  }

  const claseInput = (campo) => `input${errores[campo] ? ' input--error' : ''}`
  const mostrarImagen = form.imagen.trim() && form.imagen !== imagenFallida

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
            <Campo id="marca" etiqueta="Fabricante / Marca" error={errores.marca}>
              <div className={`select${form.marca ? '' : ' select--vacio'}`}>
                <select
                  id="marca" className={errores.marca ? 'input--error' : ''}
                  value={form.marca} onChange={(e) => cambiar('marca', e.target.value)}
                >
                  <option value="" disabled>Selecciona un fabricante</option>
                  {fabricantes.map((f) => <option key={f}>{f}</option>)}
                </select>
                <IconChevronDown size={16} />
              </div>
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

          <Campo id="imagen" etiqueta="URL de imagen" error={errores.imagen}>
            <input
              id="imagen" type="url" placeholder="https://..." className={claseInput('imagen')}
              value={form.imagen} onChange={(e) => cambiar('imagen', e.target.value)}
            />
            <div className="vista-previa">
              {mostrarImagen ? (
                <img
                  src={form.imagen} alt="Vista previa de la pieza"
                  onError={() => setImagenFallida(form.imagen)}
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
            <Campo id="categoria" etiqueta="Categoría" error={errores.categoria}>
              <div className={`select${form.categoria ? '' : ' select--vacio'}`}>
                <select
                  id="categoria" className={errores.categoria ? 'input--error' : ''}
                  value={form.categoria} onChange={(e) => cambiar('categoria', e.target.value)}
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  {categoriasAdmin.map((c) => <option key={c}>{c}</option>)}
                </select>
                <IconChevronDown size={16} />
              </div>
            </Campo>

            <Campo id="compatibles" etiqueta="Marcas compatibles" error={errores.marcasCompatibles}>
              <MultiSelect
                id="compatibles"
                opciones={marcasAutos}
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
          <button type="submit" form="form-pieza" className="btn btn--primario">
            Guardar pieza
          </button>
        </footer>
      </aside>
    </div>
  )
}

export default PiezaDrawer
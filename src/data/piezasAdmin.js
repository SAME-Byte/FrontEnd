export const categoriasAdmin = ['Frenos', 'Motor', 'Suspensión', 'Eléctrico', 'Filtros', 'Accesorios']
export const fabricantes = ['ACDelco', 'Bosch', 'Brembo', 'Gonher', 'Monroe', 'Moog', 'NGK']
export const marcasAutos = ['Chevrolet', 'Ford', 'Honda', 'Kia', 'Mazda', 'Nissan', 'Toyota', 'Volkswagen']

const prefijos = {
  Frenos: 'BRK', Motor: 'MOT', Suspensión: 'SUS', Eléctrico: 'ELE', Filtros: 'FIL', Accesorios: 'ACC',
}

const base = [
  { nombre: 'Balatas delanteras cerámicas', categoria: 'Frenos', marca: 'Brembo', precio: 1250, stock: 15 },
  { nombre: 'Disco de freno ventilado', categoria: 'Frenos', marca: 'Bosch', precio: 1890, stock: 8 },
  { nombre: 'Amortiguador trasero', categoria: 'Suspensión', marca: 'Monroe', precio: 1450, stock: 25 },
  { nombre: 'Kit de suspensión deportiva', categoria: 'Suspensión', marca: 'Moog', precio: 12500, stock: 30 },
  { nombre: 'Juego de bujías iridium', categoria: 'Motor', marca: 'NGK', precio: 640, stock: 12 },
  { nombre: 'Bomba de agua', categoria: 'Motor', marca: 'ACDelco', precio: 2150, stock: 4 },
  { nombre: 'Filtro de aceite', categoria: 'Filtros', marca: 'Bosch', precio: 189.9, stock: 40 },
  { nombre: 'Filtro de aire', categoria: 'Filtros', marca: 'Gonher', precio: 249, stock: 22 },
  { nombre: 'Alternador 90A', categoria: 'Eléctrico', marca: 'Bosch', precio: 4890, stock: 6 },
  { nombre: 'Batería 12V 600A', categoria: 'Eléctrico', marca: 'ACDelco', precio: 2790, stock: 18 },
  { nombre: 'Tapetes de uso rudo', categoria: 'Accesorios', marca: 'Gonher', precio: 699, stock: 35 },
  { nombre: 'Limpiaparabrisas 22"', categoria: 'Accesorios', marca: 'Bosch', precio: 219, stock: 9 },
]

export const piezasIniciales = base.map((b, i) => ({
  id: i + 1,
  sku: `${prefijos[b.categoria]}-${String(i + 1).padStart(3, '0')}`,
  descripcion: `${b.nombre} de alta calidad, con garantía del fabricante.`,
  imagen: '',
  destacada: i % 3 !== 1,
  marcasCompatibles: [marcasAutos[i % marcasAutos.length], marcasAutos[(i + 3) % marcasAutos.length]],
  ...b,
}))
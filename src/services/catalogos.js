// Listas de apoyo: categorías, marcas de autos y fabricantes
import { peticion } from './api'

export const obtenerCategorias = () => peticion('/categorias')
export const obtenerMarcas = () => peticion('/marcas')
export const obtenerFabricantes = () => peticion('/fabricantes')

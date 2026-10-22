// Contenido FIJO del carrusel de Inicio (es publicidad de la tienda, no viene de la API).
// Fotos de Unsplash (uso libre): https://unsplash.com/license
const foto = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`

export const slides = [
  {
    id: 1,
    titulo: 'Potencia para tu Automóvil',
    subtitulo: 'Encuentra las mejores piezas originales y compatibles al mejor precio',
    boton: 'Ver Catálogo',
    enlace: '/catalogo',
    imagen: foto('photo-1585225207578-919849288a18'), // compartimento de motor (Stefano Zanin)
  },
  {
    id: 2,
    titulo: 'Frenos que te dan confianza',
    subtitulo: 'Balatas, discos y kits completos para todas las marcas',
    boton: 'Ver Catálogo',
    enlace: '/catalogo',
    imagen: foto('photo-1778087432647-b84c500cc302'), // rin con caliper rojo (Osmany M Leyva Aldana)
  },
  {
    id: 3,
    titulo: 'Las mejores marcas',
    subtitulo: 'Trabajamos con fabricantes reconocidos y garantía real',
    boton: 'Ver Catálogo',
    enlace: '/catalogo',
    // Collage: varias fotos se acomodan en una cuadrícula de 2 x 2
    collage: [
      foto('photo-1599305445671-ac291c95aaa9'), // Volkswagen
      foto('photo-1680844540129-48dacc7d5d88'), // BMW
      foto('photo-1625074692991-b57f8ff90df6'), // Mercedes-Benz
      foto('photo-1711998034162-380d2c7a5875'), // Porsche
    ],
  },
  {
    id: 4,
    titulo: 'Mantenimiento sin complicaciones',
    subtitulo: 'Filtros, aceites y bujías listos para tu próximo servicio',
    boton: 'Ver Catálogo',
    enlace: '/catalogo',
    imagen: foto('photo-1720244253125-f39d7aeccccf'), // bloque de motor desmontado
  },
]

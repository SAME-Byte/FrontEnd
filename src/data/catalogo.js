export const categoriasCatalogo = [
  { slug: 'turbos', nombre: 'Turbos y supercargadores' },
  { slug: 'escapes', nombre: 'Escapes deportivos' },
  { slug: 'admision', nombre: 'Admisión de aire' },
  { slug: 'suspension', nombre: 'Suspensión y coilovers' },
  { slug: 'frenos', nombre: 'Frenos de alto desempeño' },
  { slug: 'rines', nombre: 'Rines' },
  { slug: 'iluminacion', nombre: 'Iluminación LED' },
  { slug: 'aerodinamica', nombre: 'Aerodinámica y body kits' },
  { slug: 'interiores', nombre: 'Interiores y volantes' },
  { slug: 'electronica', nombre: 'Electrónica y reprogramación' },
]

export const marcasCatalogo = [
  'AEM', 'BBS', 'Bilstein', 'Borla', 'Brembo', 'Cobb', 'Eibach', 'Enkei', 'Garrett', 'HKS',
  'Injen', 'K&N', 'KW', 'MagnaFlow', 'Momo', 'Morimoto', 'Recaro', 'Seibon', 'Sparco', 'StopTech',
]

// id, nombre, categoría, marca, precio (MXN), relevancia (0–100)
const p = (id, nombre, categoria, marca, precio, relevancia) => ({
  id, nombre, categoria, marca, precio, relevancia, imagen: null,
})

export const productosCatalogo = [
  p(1, 'Turbo GT2860RS', 'turbos', 'Garrett', 32900, 95),
  p(2, 'Turbo GTX3076R Gen II', 'turbos', 'Garrett', 45800, 90),
  p(3, 'Kit turbo GT-SS', 'turbos', 'HKS', 48500, 70),
  p(4, 'Intercooler de alto flujo', 'turbos', 'HKS', 12900, 75),
  p(5, 'Válvula blow-off SSQV', 'turbos', 'HKS', 6450, 60),
  p(6, 'Escape cat-back ATAK', 'escapes', 'Borla', 28900, 92),
  p(7, 'Silenciador S-Type', 'escapes', 'Borla', 9850, 65),
  p(8, 'Escape cat-back Street', 'escapes', 'MagnaFlow', 21400, 80),
  p(9, 'Downpipe de acero inoxidable', 'escapes', 'MagnaFlow', 11200, 72),
  p(10, 'Admisión de aire frío 63 Series', 'admision', 'K&N', 8950, 88),
  p(11, 'Filtro de aire de alto flujo', 'admision', 'K&N', 1450, 85),
  p(12, 'Admisión corta SP', 'admision', 'Injen', 7600, 62),
  p(13, 'Coilovers Variant 3', 'suspension', 'KW', 46900, 93),
  p(14, 'Coilovers Street Comfort', 'suspension', 'KW', 31500, 68),
  p(15, 'Amortiguadores B8 Performance', 'suspension', 'Bilstein', 18900, 74),
  p(16, 'Resortes Pro-Kit', 'suspension', 'Eibach', 6850, 86),
  p(17, 'Barras estabilizadoras Anti-Roll', 'suspension', 'Eibach', 9400, 58),
  p(18, 'Kit de frenos GT de 6 pistones', 'frenos', 'Brembo', 49900, 91),
  p(19, 'Balatas cerámicas de alto desempeño', 'frenos', 'StopTech', 3250, 83),
  p(20, 'Discos ranurados y perforados', 'frenos', 'StopTech', 7980, 79),
  p(21, 'Rines CH-R 18"', 'rines', 'BBS', 42000, 87),
  p(22, 'Rines RPF1 17"', 'rines', 'Enkei', 26400, 89),
  p(23, 'Rines TS10 18"', 'rines', 'Enkei', 29800, 66),
  p(24, 'Faros LED con proyector', 'iluminacion', 'Morimoto', 15900, 77),
  p(25, 'Focos LED 2Stroke H11', 'iluminacion', 'Morimoto', 2890, 71),
  p(26, 'Alerón de fibra de carbono', 'aerodinamica', 'Seibon', 18500, 69),
  p(27, 'Splitter delantero', 'aerodinamica', 'Seibon', 9800, 57),
  p(28, 'Volante deportivo Mod. 78', 'interiores', 'Momo', 7450, 76),
  p(29, 'Asiento bucket Sportster CS', 'interiores', 'Recaro', 34900, 73),
  p(30, 'Arnés de 4 puntos', 'interiores', 'Sparco', 4950, 64),
  p(31, 'Accessport (reprogramador ECU)', 'electronica', 'Cobb', 16900, 94),
  p(32, 'Medidor de mezcla aire/combustible', 'electronica', 'AEM', 5290, 67),
  p(33, 'Controlador electrónico de boost', 'electronica', 'AEM', 6890, 61),
]
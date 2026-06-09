export const TONICAS = [
  { nombre: 'Do', ratio: 1, semitono: 0 },
  { nombre: 'Re', ratio: 1.122, semitono: 2 },
  { nombre: 'Mi', ratio: 1.26, semitono: 4 },
  { nombre: 'Fa', ratio: 1.335, semitono: 5 },
  { nombre: 'Sol', ratio: 1.498, semitono: 7 },
  { nombre: 'La', ratio: 1.682, semitono: 9 },
  { nombre: 'Si', ratio: 1.888, semitono: 11 }
];

export const MODOS = [
  { id: 'escuchar', label: '🎧 Escuchar', helper: 'Escucha guiada' },
  { id: 'loop', label: '🔁 Loop', helper: 'Repetición 4 veces' },
  { id: 'eco', label: '🗣️ Eco', helper: 'Escucha y responde' },
  { id: 'cantar', label: '🎤 Cantar', helper: 'Guía visual para cantar' }
];

export const RANGOS = [
  { id: 'grave', label: 'Grave', helper: 'Más bajo', octava: -1 },
  { id: 'comodo', label: 'Cómodo', helper: 'Centro vocal', octava: 0 },
  { id: 'brillante', label: 'Brillante', helper: 'Más alto', octava: 1 }
];

export const GRADO_COLORES = {
  1: 'var(--grad-1)',
  2: 'var(--grad-2)',
  3: 'var(--grad-3)',
  4: 'var(--grad-4)',
  5: 'var(--grad-5)',
  6: 'var(--grad-6)',
  7: 'var(--grad-7)',
  8: 'var(--grad-8)'
};

const NOTAS_CROMATICAS = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
const MAYOR_INTERVALOS = [0, 2, 4, 5, 7, 9, 11, 12];

export function obtenerTonica(nombre) {
  return TONICAS.find((tonica) => tonica.nombre === nombre) || TONICAS[0];
}

export function obtenerNombreNota(grado, tonicaNombre = 'Do') {
  const tonica = obtenerTonica(tonicaNombre);
  const intervalo = MAYOR_INTERVALOS[grado - 1] ?? 0;
  const indice = (tonica.semitono + intervalo) % 12;
  const nota = NOTAS_CROMATICAS[indice];
  return grado === 8 ? `${tonica.nombre}8` : nota;
}

export function obtenerColorGrado(grado) {
  return GRADO_COLORES[grado] || 'var(--color-primary)';
}

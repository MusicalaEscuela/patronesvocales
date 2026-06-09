import { PATRONES } from '../data/patrones.js';

export const appState = {
  patronActual: PATRONES[0],
  tonica: 'Do',
  bpm: 72,
  modo: 'escuchar',
  rango: 'comodo',
  repeticionesLoop: 4,
  reproduciendo: false,
  filtrosBiblioteca: {
    busqueda: '',
    nivel: 'todos',
    categoria: 'todas'
  },
  filtrosExhaustivo: {
    longitud: 'todas',
    modo: 'con-repeticion',
    pagina: 1,
    porPagina: 24,
    codigo: ''
  }
};

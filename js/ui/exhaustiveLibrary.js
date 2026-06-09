import { obtenerCategoria } from '../data/patrones.js';
import { createElement, removeChildren } from '../utils/dom.js';

export function renderExhaustiveLibrary({ container, result, activePatternId, onSelect }) {
  removeChildren(container);

  const grid = createElement('div', { className: 'exhaustive-grid' });

  result.patrones.forEach((patron) => {
    const categoria = obtenerCategoria(patron.categoria);
    const chip = createElement('button', {
      className: `pattern-chip pattern-chip--exhaustive${patron.id === activePatternId ? ' is-active' : ''}`,
      attrs: { type: 'button' }
    });

    const top = createElement('span', { className: 'pattern-chip__top' });
    const badge = createElement('span', { className: 'pattern-chip__badge', text: `${categoria.emoji} ${categoria.label}` });
    const length = createElement('span', { className: 'pattern-chip__length', text: `${patron.longitud} notas` });
    top.append(badge, length);

    const name = createElement('span', { className: 'pattern-chip__name', text: patron.nombre });
    const sequence = createElement('span', { className: 'pattern-chip__sequence', text: patron.secuencia.join(' · ') });
    const objective = createElement('span', { className: 'pattern-chip__objective', text: `Índice ${patron.indiceExhaustivo.toLocaleString('es-CO')} · código ${patron.codigo}` });

    chip.append(top, name, sequence, objective);
    chip.addEventListener('click', () => onSelect(patron));
    grid.appendChild(chip);
  });

  container.appendChild(grid);
}

import { obtenerCategoria, obtenerPatronesPorNivel, obtenerPatronesFiltrados } from '../data/patrones.js';
import { createElement, removeChildren } from '../utils/dom.js';

export function renderPatternLibrary({ container, activePatternId, filtros, onSelect, onStatsChange }) {
  removeChildren(container);

  const patronesFiltrados = obtenerPatronesFiltrados(filtros);
  const grouped = obtenerPatronesPorNivel(filtros);

  if (onStatsChange) {
    onStatsChange({ total: patronesFiltrados.length });
  }

  if (!patronesFiltrados.length) {
    const empty = createElement('article', { className: 'library-empty' });
    const icon = createElement('span', { className: 'library-empty__icon', text: '🫥' });
    const title = createElement('strong', { text: 'No encontré ejercicios con esos filtros.' });
    const text = createElement('p', { text: 'Prueba quitar la búsqueda o cambiar nivel/categoría. El filtro no lee mentes todavía, seguimos esperando esa actualización distópica.' });
    empty.append(icon, title, text);
    container.appendChild(empty);
    return;
  }

  Object.entries(grouped).forEach(([nivel, patrones], groupIndex) => {
    const levelCard = createElement('article', {
      className: 'level-card',
      style: { animationDelay: `${groupIndex * 0.04}s` }
    });

    const title = createElement('h3', { className: 'level-card__title' });
    const label = createElement('span', { text: `Nivel ${nivel}` });
    const count = createElement('span', { text: `${patrones.length} ejercicios` });
    title.append(label, count);

    const chipGrid = createElement('div', { className: 'pattern-chip-grid' });

    patrones.forEach((patron) => {
      const categoria = obtenerCategoria(patron.categoria);
      const chip = createElement('button', {
        className: `pattern-chip${patron.id === activePatternId ? ' is-active' : ''}`,
        attrs: { type: 'button' }
      });

      const top = createElement('span', { className: 'pattern-chip__top' });
      const badge = createElement('span', { className: 'pattern-chip__badge', text: `${categoria.emoji} ${categoria.label}` });
      const length = createElement('span', { className: 'pattern-chip__length', text: `${patron.longitud} notas` });
      top.append(badge, length);

      const name = createElement('span', { className: 'pattern-chip__name', text: patron.nombre });
      const sequence = createElement('span', { className: 'pattern-chip__sequence', text: patron.secuencia.join(' · ') });
      const objective = createElement('span', { className: 'pattern-chip__objective', text: patron.objetivo });

      chip.append(top, name, sequence, objective);
      chip.addEventListener('click', () => onSelect(patron));
      chipGrid.appendChild(chip);
    });

    levelCard.append(title, chipGrid);
    container.appendChild(levelCard);
  });
}

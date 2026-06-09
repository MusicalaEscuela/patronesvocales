import { createElement, removeChildren, qsa } from '../utils/dom.js';
import { obtenerColorGrado, obtenerNombreNota } from '../utils/music.js';

export function renderPatternStrip(container, patron, tonica) {
  removeChildren(container);

  patron.secuencia.forEach((grado, index) => {
    const card = createElement('div', {
      className: 'note-card',
      attrs: {
        'aria-label': `Grado ${grado}, ${obtenerNombreNota(grado, tonica)}`
      },
      dataset: {
        noteIndex: String(index),
        grado: String(grado)
      }
    });

    card.style.setProperty('--note-color', obtenerColorGrado(grado));

    const degree = createElement('span', { className: 'note-card__degree', text: String(grado) });
    const note = createElement('span', { className: 'note-card__note', text: obtenerNombreNota(grado, tonica) });
    const state = createElement('span', { className: 'note-card__state', text: 'Pendiente' });

    card.append(degree, note, state);
    container.appendChild(card);
  });
}

export function renderProgressDots(container, patron) {
  removeChildren(container);

  patron.secuencia.forEach((grado, index) => {
    const dot = createElement('span', {
      className: 'progress-dot',
      attrs: { 'aria-label': `Nota ${index + 1}` },
      dataset: { dotIndex: String(index) }
    });

    dot.style.setProperty('--dot-color', obtenerColorGrado(grado));
    container.appendChild(dot);
  });
}

export function setActiveNote(strip, index, activeLabel = 'Ahora') {
  const cards = qsa('.note-card', strip);

  cards.forEach((card, cardIndex) => {
    const state = card.querySelector('.note-card__state');
    card.classList.toggle('is-active', cardIndex === index);
    card.classList.toggle('is-played', cardIndex < index);
    if (state) state.textContent = cardIndex === index ? activeLabel : cardIndex < index ? 'Hecha' : 'Pendiente';
  });

  const currentCard = cards[index];
  if (currentCard) currentCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

export function resetActiveNotes(strip) {
  qsa('.note-card', strip).forEach((card) => {
    const state = card.querySelector('.note-card__state');
    card.classList.remove('is-active', 'is-played');
    if (state) state.textContent = 'Pendiente';
  });
}

export function setActiveDot(container, index) {
  qsa('.progress-dot', container).forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === index);
    dot.classList.toggle('is-filled', dotIndex < index);
  });
}

export function resetDots(container) {
  qsa('.progress-dot', container).forEach((dot) => {
    dot.classList.remove('is-active', 'is-filled');
  });
}

import { qs } from '../utils/dom.js';

export class Toast {
  // Gestiona mensajes breves en pantalla.
  constructor() {
    this.element = qs('[data-toast]');
    this.timeoutId = null;
  }

  // Muestra un mensaje temporal.
  show(message) {
    window.clearTimeout(this.timeoutId);
    this.element.textContent = message;
    this.element.classList.add('is-visible');
    this.timeoutId = window.setTimeout(() => this.hide(), 2800);
  }

  // Oculta el mensaje temporal.
  hide() {
    this.element.classList.remove('is-visible');
  }
}

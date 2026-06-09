import { obtenerTonica, RANGOS } from '../utils/music.js';

const FRECUENCIAS_DO_MAYOR = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

export class AudioEngine {
  // Inicializa AudioContext y prepara estado de reproducción.
  constructor() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.context = AudioContextClass ? new AudioContextClass() : null;
    this.tonica = 'Do';
    this.rango = 'comodo';
    this.frecuencias = this.calcularFrecuencias();
    this.oscillators = new Set();
  }

  // Activa el contexto de audio cuando el navegador lo permite.
  async activar() {
    if (!this.context) return false;
    if (this.context.state === 'suspended') await this.context.resume();
    return this.context.state === 'running';
  }

  // Cambia la tónica base y recalcula frecuencias.
  setTonica(nota) {
    this.tonica = nota;
    this.frecuencias = this.calcularFrecuencias();
  }

  // Cambia el rango vocal usando desplazamiento de octava.
  setRango(rangoId) {
    this.rango = rangoId;
    this.frecuencias = this.calcularFrecuencias();
  }

  // Calcula las 8 frecuencias según la tónica y el rango.
  calcularFrecuencias() {
    const tonica = obtenerTonica(this.tonica);
    const rango = RANGOS.find((item) => item.id === this.rango) || RANGOS[1];
    const octavaRatio = Math.pow(2, rango.octava);
    return FRECUENCIAS_DO_MAYOR.map((frecuencia) => frecuencia * tonica.ratio * octavaRatio);
  }

  // Toca una nota con OscillatorNode + GainNode y envelope ADSR simple.
  reproducirNota(grado, duracion = 0.65) {
    if (!this.context) return;

    const frecuencia = this.frecuencias[grado - 1];
    if (!frecuencia) return;

    const now = this.context.currentTime;
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const release = 0.15;
    const sustainLevel = 0.18;
    const totalDuration = Math.max(0.2, duracion);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frecuencia, now);

    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.22, now + 0.01);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, now + 0.11);
    gainNode.gain.setValueAtTime(sustainLevel, now + Math.max(0.12, totalDuration - release));
    gainNode.gain.linearRampToValueAtTime(0.0001, now + totalDuration);

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.start(now);
    oscillator.stop(now + totalDuration + 0.02);
    this.oscillators.add(oscillator);
    oscillator.addEventListener('ended', () => this.oscillators.delete(oscillator));
  }

  // Cancela reproducción en curso y libera osciladores activos.
  detener() {
    this.oscillators.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch (error) {
        // Algunos osciladores pueden haber terminado justo antes de detenerlos.
      }
    });
    this.oscillators.clear();
  }
}

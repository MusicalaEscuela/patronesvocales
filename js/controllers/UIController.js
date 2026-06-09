import {
  PATRONES,
  obtenerCategoria,
  obtenerCategoriasConConteo,
  obtenerNiveles,
  obtenerPatronAleatorio,
  obtenerSiguientePatron
} from '../data/patrones.js';
import {
  CONFIG_EXHAUSTIVA,
  obtenerLongitudesExhaustivas,
  obtenerPaginaExhaustiva,
  obtenerPatronAleatorioExhaustivo,
  obtenerPatronDesdeCodigo,
  obtenerSiguientePatronExhaustivo,
  obtenerTotalExhaustivo
} from '../data/generadorExhaustivo.js';
import { appState } from '../state/store.js';
import { qs, qsa } from '../utils/dom.js';
import { MODOS, RANGOS, TONICAS, obtenerNombreNota } from '../utils/music.js';
import { wait } from '../utils/timing.js';
import { renderRadioButtons } from '../ui/controls.js';
import { renderPatternLibrary } from '../ui/patternLibrary.js';
import { renderExhaustiveLibrary } from '../ui/exhaustiveLibrary.js';
import {
  renderPatternStrip,
  renderProgressDots,
  resetActiveNotes,
  resetDots,
  setActiveDot,
  setActiveNote
} from '../ui/visualizer.js';

export class UIController {
  // Conecta el motor de audio con la interfaz y sus eventos.
  constructor(audioEngine, toast) {
    this.audioEngine = audioEngine;
    this.toast = toast;
    this.state = appState;
    this.dom = this.mapDom();
    this.stopRequested = false;
  }

  // Busca y guarda referencias a los nodos principales.
  mapDom() {
    return {
      configPanel: qs('.config-panel'),
      configToggle: qs('[data-config-toggle]'),
      tonicButtons: qs('[data-tonic-buttons]'),
      tonicHelper: qs('[data-tonic-helper]'),
      bpmSlider: qs('[data-bpm-slider]'),
      bpmValue: qs('[data-bpm-value]'),
      modeButtons: qs('[data-mode-buttons]'),
      modeHelper: qs('[data-mode-helper]'),
      rangeButtons: qs('[data-range-buttons]'),
      rangeHelper: qs('[data-range-helper]'),
      audioStatus: qs('[data-audio-status]'),
      currentPatternCard: qs('[data-current-pattern-card]'),
      currentPatternMeta: qs('[data-current-pattern-meta]'),
      patternTitle: qs('[data-pattern-title]'),
      levelChip: qs('[data-level-chip]'),
      exerciseCategory: qs('[data-exercise-category]'),
      exerciseObjective: qs('[data-exercise-objective]'),
      exerciseRecommendation: qs('[data-exercise-recommendation]'),
      exerciseDescription: qs('[data-exercise-description]'),
      patternStrip: qs('[data-pattern-strip]'),
      progressDots: qs('[data-progress-dots]'),
      playButton: qs('[data-play-button]'),
      playLabel: qs('[data-play-label]'),
      loopIndicator: qs('[data-loop-indicator]'),
      noteDuration: qs('[data-note-duration]'),
      nextPatternButton: qs('[data-next-pattern]'),
      randomPatternButton: qs('[data-random-pattern]'),
      librarySearch: qs('[data-library-search]'),
      libraryLevelFilter: qs('[data-library-level-filter]'),
      libraryCategoryFilter: qs('[data-library-category-filter]'),
      libraryStats: qs('[data-library-stats]'),
      patternLibrary: qs('[data-pattern-library]'),
      exhaustiveTotal: qs('[data-exhaustive-total]'),
      exhaustiveLength: qs('[data-exhaustive-length]'),
      exhaustiveMode: qs('[data-exhaustive-mode]'),
      exhaustivePage: qs('[data-exhaustive-page]'),
      exhaustiveCode: qs('[data-exhaustive-code]'),
      exhaustivePrev: qs('[data-exhaustive-prev]'),
      exhaustiveGo: qs('[data-exhaustive-go]'),
      exhaustiveNext: qs('[data-exhaustive-next]'),
      exhaustiveRandom: qs('[data-exhaustive-random]'),
      exhaustiveLoadCode: qs('[data-exhaustive-load-code]'),
      exhaustiveRange: qs('[data-exhaustive-range]'),
      exhaustivePages: qs('[data-exhaustive-pages]'),
      exhaustiveModeHelper: qs('[data-exhaustive-mode-helper]'),
      exhaustiveLibrary: qs('[data-exhaustive-library]')
    };
  }

  // Inicializa renderizados y listeners de la app.
  init() {
    this.renderControls();
    this.renderLibraryFilters();
    this.renderExhaustiveFilters();
    this.bindEvents();
    this.cargarPatron(PATRONES[0]);
    this.renderExhaustiveLab();
    this.updateTempoMeta();
    this.installServiceWorker();
  }

  // Renderiza botones de tónica, modo y rango.
  renderControls() {
    renderRadioButtons({
      container: this.dom.tonicButtons,
      items: TONICAS,
      activeId: this.state.tonica,
      className: 'pill',
      valueKey: 'nombre',
      labelKey: 'nombre',
      onSelect: (tonica) => this.handleTonicaChange(tonica.nombre)
    });

    renderRadioButtons({
      container: this.dom.modeButtons,
      items: MODOS,
      activeId: this.state.modo,
      className: 'segment',
      onSelect: (modo) => this.handleModoChange(modo.id)
    });

    renderRadioButtons({
      container: this.dom.rangeButtons,
      items: RANGOS,
      activeId: this.state.rango,
      className: 'segment',
      onSelect: (rango) => this.handleRangoChange(rango.id)
    });
  }

  // Crea opciones de filtros para la biblioteca de ejercicios.
  renderLibraryFilters() {
    this.dom.libraryLevelFilter.innerHTML = '<option value="todos">Todos los niveles</option>';
    obtenerNiveles().forEach((nivel) => {
      const option = document.createElement('option');
      option.value = String(nivel);
      option.textContent = `Nivel ${nivel}`;
      this.dom.libraryLevelFilter.appendChild(option);
    });

    this.dom.libraryCategoryFilter.innerHTML = '<option value="todas">Todas las categorías</option>';
    obtenerCategoriasConConteo().forEach((categoria) => {
      const option = document.createElement('option');
      option.value = categoria.id;
      option.textContent = `${categoria.emoji} ${categoria.label} (${categoria.total})`;
      this.dom.libraryCategoryFilter.appendChild(option);
    });
  }



// Crea opciones para recorrer la biblioteca exhaustiva sin cargar millones de objetos.
renderExhaustiveFilters() {
  this.dom.exhaustiveLength.innerHTML = '<option value="todas">Todas: 1 a 8 números</option>';
  obtenerLongitudesExhaustivas().forEach((longitud) => {
    const option = document.createElement('option');
    option.value = String(longitud);
    option.textContent = `${longitud} número${longitud === 1 ? '' : 's'}`;
    this.dom.exhaustiveLength.appendChild(option);
  });

  this.dom.exhaustiveLength.value = this.state.filtrosExhaustivo.longitud;
  this.dom.exhaustiveMode.value = this.state.filtrosExhaustivo.modo;
  this.dom.exhaustivePage.value = String(this.state.filtrosExhaustivo.pagina);
}

  // Registra interacciones principales del usuario.
  bindEvents() {
    this.dom.configToggle.addEventListener('click', () => this.toggleConfigPanel());

    this.dom.bpmSlider.addEventListener('input', (event) => {
      this.state.bpm = Number(event.target.value);
      this.updateTempoMeta();
    });

    this.dom.playButton.addEventListener('click', async () => {
      if (this.state.reproduciendo) {
        this.detenerSecuencia();
        return;
      }

      await this.reproducirSecuencia();
    });

    this.dom.nextPatternButton.addEventListener('click', () => this.cargarSiguientePatron());
    this.dom.randomPatternButton.addEventListener('click', () => this.cargarPatronAleatorio());

    this.dom.librarySearch.addEventListener('input', (event) => {
      this.state.filtrosBiblioteca.busqueda = event.target.value;
      this.renderLibrary();
    });

    this.dom.libraryLevelFilter.addEventListener('change', (event) => {
      this.state.filtrosBiblioteca.nivel = event.target.value;
      this.renderLibrary();
    });

    this.dom.libraryCategoryFilter.addEventListener('change', (event) => {
      this.state.filtrosBiblioteca.categoria = event.target.value;
      this.renderLibrary();
    });

this.dom.exhaustiveLength.addEventListener('change', (event) => {
  this.state.filtrosExhaustivo.longitud = event.target.value;
  this.state.filtrosExhaustivo.pagina = 1;
  this.renderExhaustiveLab();
});

this.dom.exhaustiveMode.addEventListener('change', (event) => {
  this.state.filtrosExhaustivo.modo = event.target.value;
  this.state.filtrosExhaustivo.pagina = 1;
  this.renderExhaustiveLab();
});

this.dom.exhaustiveGo.addEventListener('click', () => {
  this.state.filtrosExhaustivo.pagina = Number(this.dom.exhaustivePage.value) || 1;
  this.renderExhaustiveLab();
});

this.dom.exhaustivePrev.addEventListener('click', () => {
  this.state.filtrosExhaustivo.pagina = Math.max(1, this.state.filtrosExhaustivo.pagina - 1);
  this.renderExhaustiveLab();
});

this.dom.exhaustiveNext.addEventListener('click', () => {
  this.state.filtrosExhaustivo.pagina += 1;
  this.renderExhaustiveLab();
});

this.dom.exhaustiveRandom.addEventListener('click', () => this.cargarPatronExhaustivoAleatorio());
this.dom.exhaustiveLoadCode.addEventListener('click', () => this.cargarPatronDesdeCodigoExhaustivo());

this.dom.exhaustiveCode.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') this.cargarPatronDesdeCodigoExhaustivo();
});

  }

  // Abre o cierra el panel de configuración en móvil.
  toggleConfigPanel() {
    const isOpen = this.dom.configPanel.classList.toggle('is-open');
    this.dom.configToggle.setAttribute('aria-expanded', String(isOpen));
  }

  // Actualiza la tónica y refresca los nombres de notas.
  handleTonicaChange(tonica) {
    this.state.tonica = tonica;
    this.audioEngine.setTonica(tonica);
    this.dom.tonicHelper.textContent = `${tonica} mayor`;
    this.renderControls();
    this.cargarPatron(this.state.patronActual);
  }

  // Cambia el modo de práctica.
  handleModoChange(modoId) {
    this.state.modo = modoId;
    const modo = MODOS.find((item) => item.id === modoId);
    this.dom.modeHelper.textContent = modo?.helper || 'Modo de práctica';
    this.renderControls();
    this.updateTransportMeta();
  }

  // Cambia el rango vocal del audio.
  handleRangoChange(rangoId) {
    this.state.rango = rangoId;
    const rango = RANGOS.find((item) => item.id === rangoId);
    this.audioEngine.setRango(rangoId);
    this.dom.rangeHelper.textContent = rango?.helper || 'Centro vocal';
    this.renderControls();
  }

  // Renderiza el patrón activo en el visualizador.
  cargarPatron(patron) {
    this.detenerSecuencia({ silent: true });
    this.state.patronActual = patron;

    const categoria = obtenerCategoria(patron.categoria);
    this.dom.patternTitle.textContent = patron.nombre;
    this.dom.currentPatternCard.textContent = patron.nombre;
    const metaExtra = patron.origen === 'exhaustivo' ? ` · índice ${patron.indiceExhaustivo.toLocaleString('es-CO')}` : '';
    this.dom.currentPatternMeta.textContent = `Nivel ${patron.nivel} · ${patron.longitud} notas · ${categoria.label}${metaExtra}`;
    this.dom.levelChip.textContent = patron.origen === 'exhaustivo' ? 'Exhaustivo' : `Nivel ${patron.nivel}`;
    this.dom.exerciseCategory.textContent = `${categoria.emoji} ${categoria.label}`;
    this.dom.exerciseObjective.textContent = patron.objetivo;
    this.dom.exerciseRecommendation.textContent = patron.recomendacion;
    const detalleExhaustivo = patron.origen === 'exhaustivo'
      ? ` · Índice: ${patron.indiceExhaustivo.toLocaleString('es-CO')} · Modo: ${patron.modoExhaustivo === 'sin-repetir' ? 'sin repetir' : 'con repetición'}`
      : '';
    this.dom.exerciseDescription.textContent = `Secuencia: ${patron.secuencia.join(' · ')} · Código: ${patron.codigo}${detalleExhaustivo}`;

    renderPatternStrip(this.dom.patternStrip, patron, this.state.tonica);
    renderProgressDots(this.dom.progressDots, patron);
    this.renderLibrary();
    this.renderExhaustiveLab();
    this.updateTransportMeta();
  }

  // Renderiza la biblioteca con filtros activos.
  renderLibrary() {
    renderPatternLibrary({
      container: this.dom.patternLibrary,
      activePatternId: this.state.patronActual.id,
      filtros: this.state.filtrosBiblioteca,
      onSelect: (selectedPattern) => this.cargarPatron(selectedPattern),
      onStatsChange: ({ total }) => {
        this.dom.libraryStats.textContent = `Mostrando ${total} de ${PATRONES.length} ejercicios`;
      }
    });
  }



// Renderiza una página del laboratorio exhaustivo.
renderExhaustiveLab() {
  const filtros = this.state.filtrosExhaustivo;
  const resultado = obtenerPaginaExhaustiva(filtros);
  this.state.filtrosExhaustivo.pagina = resultado.pagina;
  this.dom.exhaustivePage.value = String(resultado.pagina);
  this.dom.exhaustivePage.max = String(resultado.paginas);

  this.dom.exhaustiveTotal.textContent = `${resultado.total.toLocaleString('es-CO')} patrones`;
  this.dom.exhaustiveRange.textContent = `Mostrando ${resultado.desde.toLocaleString('es-CO')}-${resultado.hasta.toLocaleString('es-CO')} de ${resultado.total.toLocaleString('es-CO')}`;
  this.dom.exhaustivePages.textContent = `Página ${resultado.pagina.toLocaleString('es-CO')} de ${resultado.paginas.toLocaleString('es-CO')}`;

  const modo = CONFIG_EXHAUSTIVA.modos.find((item) => item.id === filtros.modo);
  const longitudLabel = filtros.longitud === 'todas' ? 'longitudes 1 a 8' : `${filtros.longitud} número${Number(filtros.longitud) === 1 ? '' : 's'}`;
  this.dom.exhaustiveModeHelper.textContent = `${modo?.label || 'Con repetición'} · ${longitudLabel}`;

  renderExhaustiveLibrary({
    container: this.dom.exhaustiveLibrary,
    result: resultado,
    activePatternId: this.state.patronActual.id,
    onSelect: (selectedPattern) => this.cargarPatron(selectedPattern)
  });
}

// Carga un patrón aleatorio del laboratorio exhaustivo.
cargarPatronExhaustivoAleatorio() {
  const patron = obtenerPatronAleatorioExhaustivo(this.state.filtrosExhaustivo);
  this.cargarPatron(patron);
  this.ubicarPaginaDePatronExhaustivo(patron);
  this.toast.show('Patrón exhaustivo al azar. Caos matemático, pero cantable si lo tratan con respeto. 🎲');
}

// Carga un patrón escribiendo directamente su código, por ejemplo 1358.
cargarPatronDesdeCodigoExhaustivo() {
  const patron = obtenerPatronDesdeCodigo(this.dom.exhaustiveCode.value, {
    modo: this.state.filtrosExhaustivo.modo
  });

  if (!patron) {
    this.toast.show('Ese código no sirve aquí. Usa solo números del 1 al 8, máximo 8 dígitos. La tiranía de las reglas, pero útil.');
    return;
  }

  this.cargarPatron(patron);
  this.ubicarPaginaDePatronExhaustivo(patron);
  this.toast.show(`Código ${patron.codigo} cargado en el visualizador.`);
}

// Ajusta la página visible para que el patrón elegido aparezca en el laboratorio.
ubicarPaginaDePatronExhaustivo(patron) {
  this.state.filtrosExhaustivo.longitud = patron.filtroLongitud || 'todas';
  this.state.filtrosExhaustivo.modo = patron.modoExhaustivo || this.state.filtrosExhaustivo.modo;
  this.state.filtrosExhaustivo.pagina = Math.floor(patron.indiceExhaustivo / this.state.filtrosExhaustivo.porPagina) + 1;
  this.dom.exhaustiveLength.value = this.state.filtrosExhaustivo.longitud;
  this.dom.exhaustiveMode.value = this.state.filtrosExhaustivo.modo;
  this.renderExhaustiveLab();
}

  // Carga el siguiente patrón respetando filtros activos.
  cargarSiguientePatron() {
    if (this.state.patronActual?.origen === 'exhaustivo') {
      const siguienteExhaustivo = obtenerSiguientePatronExhaustivo(this.state.patronActual, this.state.filtrosExhaustivo);
      this.cargarPatron(siguienteExhaustivo);
      this.ubicarPaginaDePatronExhaustivo(siguienteExhaustivo);
      return;
    }

    const siguiente = obtenerSiguientePatron(this.state.patronActual.id, this.state.filtrosBiblioteca);
    this.cargarPatron(siguiente);
  }

  // Carga un patrón aleatorio respetando filtros activos.
  cargarPatronAleatorio() {
    const patron = obtenerPatronAleatorio(this.state.filtrosBiblioteca);
    this.cargarPatron(patron);
    this.toast.show('Elegí un ejercicio al azar. El caos, pero pedagógico. 🎲');
  }

  // Activa visualmente la nota en posición index.
  resaltarNota(index, etiqueta = 'Ahora') {
    setActiveNote(this.dom.patternStrip, index, etiqueta);
    const grado = this.state.patronActual.secuencia[index];
    const nota = obtenerNombreNota(grado, this.state.tonica);
    this.dom.patternTitle.textContent = `${nota} · grado ${grado}`;
  }

  // Mueve los dots de progreso.
  actualizarProgreso(index) {
    setActiveDot(this.dom.progressDots, index);
  }

  // Reproduce la secuencia sincronizando UI y audio.
  async reproducirSecuencia() {
    const audioReady = await this.audioEngine.activar();
    if (!audioReady) {
      this.toast.show('Tu navegador no dejó activar el audio. Toca de nuevo el botón principal. Qué delicado, como si estuviéramos invocando un espíritu.');
      return;
    }

    this.dom.audioStatus.textContent = 'Audio activo. Ya podemos hacer música sin negociar con el navegador.';
    this.stopRequested = false;
    this.state.reproduciendo = true;
    this.updatePlayButton();

    const repeticiones = this.state.modo === 'loop' ? this.state.repeticionesLoop : 1;

    for (let repeticion = 1; repeticion <= repeticiones; repeticion += 1) {
      if (this.stopRequested) break;
      this.dom.loopIndicator.textContent = this.obtenerTextoReproduccion(repeticion, repeticiones);

      const completed = await this.playOnce();
      if (!completed) break;

      if (this.state.modo === 'loop' && repeticion < repeticiones) {
        await wait(260, () => this.stopRequested);
      }
    }

    this.detenerSecuencia({ silent: true });
  }

  // Reproduce una vuelta completa del patrón actual según el modo elegido.
  async playOnce() {
    const duracionMs = this.calcularDuracionNota();
    const duracionAudio = Math.max(0.18, duracionMs / 1000 * 0.78);

    if (this.state.modo === 'eco') {
      return this.playEchoMode(duracionMs, duracionAudio);
    }

    return this.playGuidedPass({
      duracionMs,
      duracionAudio,
      reproducirAudio: this.state.modo !== 'cantar',
      activeLabel: this.state.modo === 'cantar' ? 'Canta' : 'Ahora'
    });
  }

  // Modo eco: la app canta primero y luego deja turno visual para repetir.
  async playEchoMode(duracionMs, duracionAudio) {
    this.dom.loopIndicator.textContent = 'Primero escucha';
    const escuchado = await this.playGuidedPass({
      duracionMs,
      duracionAudio,
      reproducirAudio: true,
      activeLabel: 'Escucha'
    });

    if (!escuchado) return false;
    await wait(360, () => this.stopRequested);
    if (this.stopRequested) return false;

    this.dom.loopIndicator.textContent = 'Tu turno: canta el patrón';
    this.dom.patternTitle.textContent = 'Tu turno 🎤';

    return this.playGuidedPass({
      duracionMs,
      duracionAudio,
      reproducirAudio: false,
      activeLabel: 'Canta'
    });
  }

  // Recorre visualmente el patrón una vez y opcionalmente reproduce audio.
  async playGuidedPass({ duracionMs, duracionAudio, reproducirAudio, activeLabel }) {
    resetActiveNotes(this.dom.patternStrip);
    resetDots(this.dom.progressDots);

    for (let index = 0; index < this.state.patronActual.secuencia.length; index += 1) {
      if (this.stopRequested) return false;
      const grado = this.state.patronActual.secuencia[index];
      this.resaltarNota(index, activeLabel);
      this.actualizarProgreso(index);

      if (reproducirAudio) {
        this.audioEngine.reproducirNota(grado, duracionAudio);
      }

      const shouldContinue = await wait(duracionMs, () => this.stopRequested);
      if (!shouldContinue) return false;
    }

    qsa('.progress-dot', this.dom.progressDots).forEach((dot) => dot.classList.add('is-filled'));
    return true;
  }

  // Detiene la secuencia y limpia estados visuales.
  detenerSecuencia(options = {}) {
    this.stopRequested = true;
    this.state.reproduciendo = false;
    this.audioEngine.detener();
    resetActiveNotes(this.dom.patternStrip);
    resetDots(this.dom.progressDots);

    if (this.state.patronActual) {
      this.dom.patternTitle.textContent = this.state.patronActual.nombre;
    }

    this.updatePlayButton();
    this.updateTransportMeta();

    if (!options.silent) this.toast.show('Secuencia detenida. El silencio, por una vez, colaborando.');
  }

  // Calcula 60000ms / BPM para cada nota.
  calcularDuracionNota() {
    return Math.round(60000 / this.state.bpm);
  }

  // Actualiza la información visual del tempo.
  updateTempoMeta() {
    this.dom.bpmValue.textContent = String(this.state.bpm);
    this.dom.noteDuration.textContent = `Duración: ${this.calcularDuracionNota()} ms`;
  }

  // Actualiza textos de reproducción y loop.
  updateTransportMeta() {
    if (this.state.modo === 'loop') {
      this.dom.loopIndicator.textContent = `Repetición 0/${this.state.repeticionesLoop}`;
    } else if (this.state.modo === 'eco') {
      this.dom.loopIndicator.textContent = 'Escucha + tu turno';
    } else if (this.state.modo === 'cantar') {
      this.dom.loopIndicator.textContent = 'Guía visual sin audio';
    } else {
      this.dom.loopIndicator.textContent = 'Reproducción única';
    }

    this.updateTempoMeta();
  }

  // Texto dinámico durante la reproducción.
  obtenerTextoReproduccion(repeticion, repeticiones) {
    if (this.state.modo === 'loop') return `Repetición ${repeticion}/${repeticiones}`;
    if (this.state.modo === 'eco') return 'Modo eco';
    if (this.state.modo === 'cantar') return 'Tu turno: canta';
    return 'Reproducción única';
  }

  // Cambia el estado visual del botón principal.
  updatePlayButton() {
    this.dom.playButton.classList.toggle('is-playing', this.state.reproduciendo);
    this.dom.playLabel.textContent = this.state.reproduciendo ? 'Detener' : 'Reproducir';
    const icon = this.dom.playButton.querySelector('.play-button__icon');
    if (icon) icon.textContent = this.state.reproduciendo ? '⏹' : '▶';
  }

  // Registra el service worker para uso offline básico.
  installServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {
        this.dom.audioStatus.textContent = 'App lista. Offline no disponible en esta vista local.';
      });
    });
  }
}

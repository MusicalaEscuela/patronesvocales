const GRADOS = [1, 2, 3, 4, 5, 6, 7, 8];

export const CONFIG_EXHAUSTIVA = {
  maxLongitud: 8,
  grados: GRADOS,
  porPaginaDefault: 24,
  modos: [
    { id: 'con-repeticion', label: 'Con repetición', descripcion: 'Incluye códigos como 111, 1221 o 88888888.' },
    { id: 'sin-repetir', label: 'Sin repetir', descripcion: 'Solo usa cada grado una vez por patrón.' }
  ]
};

export function obtenerLongitudesExhaustivas() {
  return Array.from({ length: CONFIG_EXHAUSTIVA.maxLongitud }, (_, index) => index + 1);
}

export function obtenerTotalExhaustivo({ longitud = 'todas', modo = 'con-repeticion' } = {}) {
  const longitudes = obtenerLongitudesSeleccionadas(longitud);
  return longitudes.reduce((total, item) => total + contarPorLongitud(item, modo), 0);
}

export function obtenerPaginaExhaustiva({ longitud = 'todas', modo = 'con-repeticion', pagina = 1, porPagina = CONFIG_EXHAUSTIVA.porPaginaDefault } = {}) {
  const total = obtenerTotalExhaustivo({ longitud, modo });
  const paginas = Math.max(1, Math.ceil(total / porPagina));
  const paginaActual = limitarEntero(pagina, 1, paginas);
  const desdeIndice = (paginaActual - 1) * porPagina;
  const cantidad = Math.max(0, Math.min(porPagina, total - desdeIndice));
  const patrones = Array.from({ length: cantidad }, (_, offset) => obtenerPatronPorIndice({
    indice: desdeIndice + offset,
    longitud,
    modo
  }));

  return {
    total,
    paginas,
    pagina: paginaActual,
    porPagina,
    desde: total ? desdeIndice + 1 : 0,
    hasta: total ? desdeIndice + cantidad : 0,
    patrones
  };
}

export function obtenerPatronAleatorioExhaustivo({ longitud = 'todas', modo = 'con-repeticion' } = {}) {
  const total = obtenerTotalExhaustivo({ longitud, modo });
  const indice = Math.floor(Math.random() * total);
  return obtenerPatronPorIndice({ indice, longitud, modo });
}

export function obtenerSiguientePatronExhaustivo(patronActual, filtros = {}) {
  const longitud = filtros.longitud || patronActual?.filtroLongitud || 'todas';
  const modo = filtros.modo || patronActual?.modoExhaustivo || 'con-repeticion';
  const total = obtenerTotalExhaustivo({ longitud, modo });
  const indiceActual = Number.isFinite(patronActual?.indiceExhaustivo) ? patronActual.indiceExhaustivo : -1;
  const siguienteIndice = total ? (indiceActual + 1) % total : 0;
  return obtenerPatronPorIndice({ indice: siguienteIndice, longitud, modo });
}

export function obtenerPatronDesdeCodigo(codigo, { modo = 'con-repeticion' } = {}) {
  const secuencia = normalizarCodigoExhaustivo(codigo);
  if (!secuencia.length) return null;

  const longitud = secuencia.length;
  const indiceLocal = modo === 'sin-repetir'
    ? indiceLocalSinRepetir(secuencia)
    : indiceLocalConRepeticion(secuencia);

  if (indiceLocal < 0) return null;

  const indiceGlobal = obtenerLongitudesExhaustivas()
    .filter((item) => item < longitud)
    .reduce((total, item) => total + contarPorLongitud(item, modo), 0) + indiceLocal;

  return crearPatronExhaustivo({
    secuencia,
    indice: indiceGlobal,
    indiceLocal,
    longitudReal: longitud,
    filtroLongitud: 'todas',
    modo
  });
}

export function normalizarCodigoExhaustivo(codigo) {
  return String(codigo || '')
    .replace(/[^1-8]/g, '')
    .slice(0, CONFIG_EXHAUSTIVA.maxLongitud)
    .split('')
    .map(Number);
}

function obtenerPatronPorIndice({ indice = 0, longitud = 'todas', modo = 'con-repeticion' } = {}) {
  const total = obtenerTotalExhaustivo({ longitud, modo });
  const indiceSeguro = limitarEntero(indice, 0, Math.max(0, total - 1));
  const { secuencia, indiceLocal, longitudReal } = obtenerSecuenciaPorIndice({ indice: indiceSeguro, longitud, modo });

  return crearPatronExhaustivo({
    secuencia,
    indice: indiceSeguro,
    indiceLocal,
    longitudReal,
    filtroLongitud: longitud,
    modo
  });
}

function obtenerSecuenciaPorIndice({ indice, longitud, modo }) {
  if (longitud !== 'todas') {
    const longitudReal = Number(longitud);
    return {
      secuencia: obtenerSecuenciaLocal(indice, longitudReal, modo),
      indiceLocal: indice,
      longitudReal
    };
  }

  let restante = indice;
  for (const longitudReal of obtenerLongitudesExhaustivas()) {
    const totalLongitud = contarPorLongitud(longitudReal, modo);
    if (restante < totalLongitud) {
      return {
        secuencia: obtenerSecuenciaLocal(restante, longitudReal, modo),
        indiceLocal: restante,
        longitudReal
      };
    }
    restante -= totalLongitud;
  }

  return {
    secuencia: obtenerSecuenciaLocal(0, CONFIG_EXHAUSTIVA.maxLongitud, modo),
    indiceLocal: 0,
    longitudReal: CONFIG_EXHAUSTIVA.maxLongitud
  };
}

function obtenerSecuenciaLocal(indiceLocal, longitud, modo) {
  return modo === 'sin-repetir'
    ? secuenciaSinRepetir(indiceLocal, longitud)
    : secuenciaConRepeticion(indiceLocal, longitud);
}

function secuenciaConRepeticion(indiceLocal, longitud) {
  const secuencia = Array.from({ length: longitud }, () => 1);
  let valor = indiceLocal;

  for (let posicion = longitud - 1; posicion >= 0; posicion -= 1) {
    secuencia[posicion] = (valor % GRADOS.length) + 1;
    valor = Math.floor(valor / GRADOS.length);
  }

  return secuencia;
}

function secuenciaSinRepetir(indiceLocal, longitud) {
  const disponibles = [...GRADOS];
  const secuencia = [];
  let valor = indiceLocal;

  for (let posicion = 0; posicion < longitud; posicion += 1) {
    const restantes = disponibles.length - 1;
    const posicionesFaltantes = longitud - posicion - 1;
    const bloque = permutaciones(restantes, posicionesFaltantes);
    const elegido = Math.floor(valor / bloque);
    secuencia.push(disponibles[elegido]);
    disponibles.splice(elegido, 1);
    valor %= bloque;
  }

  return secuencia;
}

function indiceLocalConRepeticion(secuencia) {
  return secuencia.reduce((total, grado) => (total * GRADOS.length) + (grado - 1), 0);
}

function indiceLocalSinRepetir(secuencia) {
  const vistos = new Set();
  if (secuencia.some((grado) => vistos.size === vistos.add(grado).size)) return -1;

  const disponibles = [...GRADOS];
  let indice = 0;

  secuencia.forEach((grado, posicion) => {
    const elegido = disponibles.indexOf(grado);
    if (elegido < 0) return;
    const restantes = disponibles.length - 1;
    const posicionesFaltantes = secuencia.length - posicion - 1;
    indice += elegido * permutaciones(restantes, posicionesFaltantes);
    disponibles.splice(elegido, 1);
  });

  return indice;
}

function crearPatronExhaustivo({ secuencia, indice, indiceLocal, longitudReal, filtroLongitud, modo }) {
  const codigo = secuencia.join('');
  const categoria = clasificarCategoria(secuencia);
  const modoNombre = modo === 'sin-repetir' ? 'sin repetir grados' : 'con repetición libre';

  return {
    id: `exh-${modo}-${longitudReal}-${indice}`,
    origen: 'exhaustivo',
    nivel: Math.min(8, longitudReal),
    categoria,
    nombre: `Exhaustivo ${codigo}`,
    secuencia,
    codigo,
    longitud: longitudReal,
    dificultad: `Nivel ${Math.min(8, longitudReal)}`,
    objetivo: `Practicar el código ${codigo} dentro del laboratorio exhaustivo (${modoNombre}).`,
    recomendacion: obtenerRecomendacion(secuencia, modo),
    indiceExhaustivo: indice,
    indiceLocalExhaustivo: indiceLocal,
    filtroLongitud,
    modoExhaustivo: modo
  };
}

function clasificarCategoria(secuencia) {
  const saltos = secuencia.slice(1).map((grado, index) => Math.abs(grado - secuencia[index]));
  const saltoMaximo = saltos.length ? Math.max(...saltos) : 0;
  const todosArpegio = secuencia.every((grado) => [1, 3, 5, 8].includes(grado));
  const lineal = saltos.every((salto) => salto <= 1);

  if (secuencia.length <= 2) return 'calentamiento';
  if (todosArpegio && secuencia.length >= 3) return 'arpegios';
  if (lineal && secuencia.length >= 5) return 'escala';
  if (saltoMaximo === 2) return 'terceras';
  if (saltoMaximo >= 5) return 'reto';
  if (saltoMaximo >= 3) return 'saltos';
  if (secuencia.length >= 6) return 'memoria';
  return 'pasos';
}

function obtenerRecomendacion(secuencia, modo) {
  const saltos = secuencia.slice(1).map((grado, index) => Math.abs(grado - secuencia[index]));
  const saltoMaximo = saltos.length ? Math.max(...saltos) : 0;
  const tieneRepeticion = new Set(secuencia).size < secuencia.length;

  if (secuencia.length <= 3) return 'Úsalo como eco rápido: escuchar, repetir y cambiar de sílaba.';
  if (saltoMaximo >= 5) return 'Hazlo lento primero y confirma mentalmente cada destino antes de cantar. La valentía no afina sola.';
  if (tieneRepeticion && modo === 'con-repeticion') return 'Aprovecha las notas repetidas para estabilizar afinación y pulso.';
  if (secuencia.length >= 7) return 'Divídelo en dos fragmentos antes de pedirlo completo. Menos heroísmo, más pedagogía.';
  return 'Cántalo con una sílaba cómoda y luego repítelo nombrando grados.';
}

function obtenerLongitudesSeleccionadas(longitud) {
  if (longitud === 'todas') return obtenerLongitudesExhaustivas();
  const valor = Number(longitud);
  if (!Number.isFinite(valor)) return obtenerLongitudesExhaustivas();
  return [limitarEntero(valor, 1, CONFIG_EXHAUSTIVA.maxLongitud)];
}

function contarPorLongitud(longitud, modo) {
  return modo === 'sin-repetir'
    ? permutaciones(GRADOS.length, longitud)
    : Math.pow(GRADOS.length, longitud);
}

function permutaciones(total, tomar) {
  if (tomar < 0 || tomar > total) return 0;
  let resultado = 1;
  for (let i = 0; i < tomar; i += 1) {
    resultado *= total - i;
  }
  return resultado;
}

function limitarEntero(valor, minimo, maximo) {
  const numero = Number.parseInt(valor, 10);
  if (!Number.isFinite(numero)) return minimo;
  return Math.min(maximo, Math.max(minimo, numero));
}

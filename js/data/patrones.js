export const CATEGORIAS = [
  { id: 'calentamiento', label: 'Calentamiento', emoji: '🌱', descripcion: 'Entrada suave para activar oído y voz.' },
  { id: 'pasos', label: 'Pasos conjuntos', emoji: '👣', descripcion: 'Movimiento por grados cercanos.' },
  { id: 'terceras', label: 'Terceras', emoji: '🔺', descripcion: 'Saltos pequeños para afinar con intención.' },
  { id: 'saltos', label: 'Saltos', emoji: '🦘', descripcion: 'Intervalos más amplios sin perder centro tonal.' },
  { id: 'arpegios', label: 'Arpegios', emoji: '🎹', descripcion: 'Notas estructurales del acorde y la tonalidad.' },
  { id: 'escala', label: 'Escalas', emoji: '🪜', descripcion: 'Subidas, bajadas y recorridos de la escala mayor.' },
  { id: 'memoria', label: 'Memoria melódica', emoji: '🧠', descripcion: 'Patrones más largos para retener y repetir.' },
  { id: 'reto', label: 'Retos', emoji: '⚡', descripcion: 'Combinaciones exigentes para estudiantes más seguros.' }
];

const PATRONES_BASE = [
  // Nivel 1 · Reconocimiento inicial
  { nivel: 1, categoria: 'calentamiento', nombre: 'Paso a paso', secuencia: [1, 2], objetivo: 'Reconocer el movimiento ascendente más pequeño.', recomendacion: 'Cantar “la-la” y luego decir los grados.' },
  { nivel: 1, categoria: 'calentamiento', nombre: 'Ida y vuelta', secuencia: [2, 1], objetivo: 'Sentir regreso a la tónica.', recomendacion: 'Pensar el 1 como casita musical.' },
  { nivel: 1, categoria: 'pasos', nombre: 'Sube y descansa', secuencia: [1, 2, 1], objetivo: 'Coordinar subida y resolución.', recomendacion: 'No correr el regreso, que tampoco es TransMilenio en hora pico.' },
  { nivel: 1, categoria: 'pasos', nombre: 'Vecinos', secuencia: [2, 1, 2], objetivo: 'Mantener afinación entre grados vecinos.', recomendacion: 'Hacerlo primero lento y con palmas suaves.' },
  { nivel: 1, categoria: 'terceras', nombre: 'Primer saltico', secuencia: [1, 3], objetivo: 'Presentar la tercera mayor desde la tónica.', recomendacion: 'Imaginar que la voz salta sin apretarse.' },
  { nivel: 1, categoria: 'terceras', nombre: 'Tercera que vuelve', secuencia: [1, 3, 1], objetivo: 'Saltar y volver con estabilidad.', recomendacion: 'Cuidar que el 1 final no caiga desafinado.' },
  { nivel: 1, categoria: 'calentamiento', nombre: 'Eco mínimo', secuencia: [1, 1, 2, 1], objetivo: 'Repetir tónica antes de moverse.', recomendacion: 'Ideal para niños pequeños o inicio de clase.' },
  { nivel: 1, categoria: 'pasos', nombre: 'Dos escalones', secuencia: [1, 2, 2, 1], objetivo: 'Sostener el grado 2 antes de resolver.', recomendacion: 'Alargar el 2 mentalmente antes de bajar.' },
  { nivel: 1, categoria: 'calentamiento', nombre: 'Pregunta cortica', secuencia: [1, 2, 3], objetivo: 'Escuchar una frase ascendente simple.', recomendacion: 'Usar gesto de mano subiendo.' },
  { nivel: 1, categoria: 'pasos', nombre: 'Respuesta cortica', secuencia: [3, 2, 1], objetivo: 'Escuchar una frase descendente simple.', recomendacion: 'Usar gesto de mano bajando.' },

  // Nivel 2 · Tres primeros grados
  { nivel: 2, categoria: 'pasos', nombre: 'Arco 123', secuencia: [1, 2, 3, 2, 1], objetivo: 'Construir arco melódico con tres grados.', recomendacion: 'Mantener la voz liviana en el 3.' },
  { nivel: 2, categoria: 'pasos', nombre: 'Subida partida', secuencia: [1, 2, 1, 2, 3], objetivo: 'Reforzar 1-2 antes de llegar al 3.', recomendacion: 'Muy útil para estudiantes que se comen el grado 2.' },
  { nivel: 2, categoria: 'pasos', nombre: 'Bajada partida', secuencia: [3, 2, 3, 2, 1], objetivo: 'Reforzar dirección descendente sin caer de golpe.', recomendacion: 'Pensar cada nota como escalón, no como rodadero.' },
  { nivel: 2, categoria: 'terceras', nombre: 'Tercera escondida', secuencia: [1, 2, 3, 1], objetivo: 'Combinar paso conjunto y salto de regreso.', recomendacion: 'El último salto debe llegar limpio a la tónica.' },
  { nivel: 2, categoria: 'terceras', nombre: 'Tercera espejo', secuencia: [3, 1, 2, 1], objetivo: 'Practicar salto descendente de tercera.', recomendacion: 'Escuchar internamente antes de cantar.' },
  { nivel: 2, categoria: 'memoria', nombre: 'Trencito 123', secuencia: [1, 1, 2, 2, 3, 3], objetivo: 'Memorizar grados repetidos.', recomendacion: 'Funciona bien con palmas en parejas.' },
  { nivel: 2, categoria: 'memoria', nombre: 'Trencito regreso', secuencia: [3, 3, 2, 2, 1, 1], objetivo: 'Memorizar descenso con repetición.', recomendacion: 'Pedir que canten suave, no gritado, milagro pedagógico.' },
  { nivel: 2, categoria: 'pasos', nombre: 'Ola pequeña', secuencia: [1, 2, 3, 2, 3, 2, 1], objetivo: 'Entrenar estabilidad alrededor del grado 2.', recomendacion: 'Marcar el pulso con dedos.' },
  { nivel: 2, categoria: 'terceras', nombre: 'Uno tres dos', secuencia: [1, 3, 2, 1], objetivo: 'Afinar tercera y bajar por grados.', recomendacion: 'Evitar que el 3 quede demasiado alto.' },
  { nivel: 2, categoria: 'calentamiento', nombre: 'Saludo melódico', secuencia: [1, 2, 3, 3, 2, 1], objetivo: 'Crear una frase simétrica fácil.', recomendacion: 'Bueno para abrir clase en grupo.' },

  // Nivel 3 · Llegada al cuarto y control de dirección
  { nivel: 3, categoria: 'escala', nombre: 'Cuatro arriba', secuencia: [1, 2, 3, 4], objetivo: 'Llegar al cuarto grado sin perder centro.', recomendacion: 'El 4 tiende a sentirse suspendido, no lo empujen.' },
  { nivel: 3, categoria: 'escala', nombre: 'Cuatro abajo', secuencia: [4, 3, 2, 1], objetivo: 'Resolver desde el cuarto grado.', recomendacion: 'Excelente para cierre de frase.' },
  { nivel: 3, categoria: 'escala', nombre: 'Arco 1234', secuencia: [1, 2, 3, 4, 3, 2, 1], objetivo: 'Consolidar cuatro grados en arco.', recomendacion: 'Respirar antes, no en mitad del caos.' },
  { nivel: 3, categoria: 'terceras', nombre: 'Terceras encadenadas', secuencia: [1, 3, 2, 4], objetivo: 'Alternar salto de tercera con paso.', recomendacion: 'Cantar lento para no convertirlo en lotería.' },
  { nivel: 3, categoria: 'terceras', nombre: 'Terceras de regreso', secuencia: [4, 2, 3, 1], objetivo: 'Bajar por terceras alternadas.', recomendacion: 'Escuchar cada destino antes de cantar.' },
  { nivel: 3, categoria: 'saltos', nombre: 'Cuarta inicial', secuencia: [1, 4, 3, 2, 1], objetivo: 'Introducir salto de cuarta y resolución.', recomendacion: 'Pensar el 4 como punto de llegada, no como grito.' },
  { nivel: 3, categoria: 'memoria', nombre: 'Escalera rota', secuencia: [1, 2, 1, 3, 2, 4], objetivo: 'Entrenar memoria con patrón alternado.', recomendacion: 'Separar en grupos: 121 / 324.' },
  { nivel: 3, categoria: 'memoria', nombre: 'Regreso roto', secuencia: [4, 3, 4, 2, 3, 1], objetivo: 'Entrenar descenso no lineal.', recomendacion: 'Pedir que identifiquen el grado más difícil.' },
  { nivel: 3, categoria: 'pasos', nombre: 'Vaivén cuatro', secuencia: [2, 3, 4, 3, 2, 1], objetivo: 'Moverse alrededor de 3 y 4.', recomendacion: 'Cuidar que el 2 no se vuelva tónica falsa.' },
  { nivel: 3, categoria: 'calentamiento', nombre: 'Puente al cuatro', secuencia: [1, 2, 3, 4, 4, 3, 2, 1], objetivo: 'Sostener el grado 4 y resolver.', recomendacion: 'Hacerlo con vocal “u” para relajar.' },

  // Nivel 4 · Pentacordio y saltos al quinto
  { nivel: 4, categoria: 'escala', nombre: 'Cinco arriba', secuencia: [1, 2, 3, 4, 5], objetivo: 'Construir pentacordio mayor.', recomendacion: 'El 5 debe sonar estable, como segunda casita.' },
  { nivel: 4, categoria: 'escala', nombre: 'Cinco abajo', secuencia: [5, 4, 3, 2, 1], objetivo: 'Descender desde dominante a tónica.', recomendacion: 'No dejar caer el 3, que ahí se delata todo.' },
  { nivel: 4, categoria: 'arpegios', nombre: 'Acorde básico', secuencia: [1, 3, 5], objetivo: 'Reconocer triada mayor.', recomendacion: 'Cantarlo como campanas: claro y separado.' },
  { nivel: 4, categoria: 'arpegios', nombre: 'Acorde que vuelve', secuencia: [1, 3, 5, 3, 1], objetivo: 'Subir y bajar por triada.', recomendacion: 'Muy útil para afinación armónica.' },
  { nivel: 4, categoria: 'saltos', nombre: 'Quinta directa', secuencia: [1, 5, 1], objetivo: 'Practicar salto de quinta y regreso.', recomendacion: 'Imaginar el 5 antes de emitir sonido.' },
  { nivel: 4, categoria: 'saltos', nombre: 'Quinta con puente', secuencia: [1, 5, 4, 3, 2, 1], objetivo: 'Saltar al 5 y resolver por escala.', recomendacion: 'Buen ejercicio para seguridad tonal.' },
  { nivel: 4, categoria: 'terceras', nombre: 'Pentacordio en terceras', secuencia: [1, 3, 2, 4, 3, 5], objetivo: 'Recorrer 1 a 5 con terceras enlazadas.', recomendacion: 'Marcar pares visuales.' },
  { nivel: 4, categoria: 'memoria', nombre: 'Ola pentatónica', secuencia: [1, 2, 3, 4, 5, 4, 5, 4, 3, 2, 1], objetivo: 'Retener frase larga con foco en 5.', recomendacion: 'Dividir en subida, ola y bajada.' },
  { nivel: 4, categoria: 'pasos', nombre: 'Centro en tres', secuencia: [3, 4, 5, 4, 3, 2, 3, 1], objetivo: 'Practicar frase alrededor del tercer grado.', recomendacion: 'Cuidar color mayor del grado 3.' },
  { nivel: 4, categoria: 'reto', nombre: 'Pentacordio salpicado', secuencia: [1, 4, 2, 5, 3, 1], objetivo: 'Combinar saltos internos del pentacordio.', recomendacion: 'Lento primero, porque la valentía no afina.' },

  // Nivel 5 · Sexto grado y escala completa inicial
  { nivel: 5, categoria: 'escala', nombre: 'Seis arriba', secuencia: [1, 2, 3, 4, 5, 6], objetivo: 'Introducir sexto grado con estabilidad.', recomendacion: 'No subir el cuello con el 6, el cuello no canta.' },
  { nivel: 5, categoria: 'escala', nombre: 'Seis abajo', secuencia: [6, 5, 4, 3, 2, 1], objetivo: 'Resolver desde sexto grado.', recomendacion: 'Mantener pulso constante.' },
  { nivel: 5, categoria: 'arpegios', nombre: 'Triada extendida', secuencia: [1, 3, 5, 6, 5, 3, 1], objetivo: 'Agregar sexto como color melódico.', recomendacion: 'Cantar con legato suave.' },
  { nivel: 5, categoria: 'saltos', nombre: 'Sexta preparada', secuencia: [1, 3, 5, 6, 1], objetivo: 'Preparar salto amplio hacia el 6 y regresar.', recomendacion: 'Escuchar la triada como camino.' },
  { nivel: 5, categoria: 'terceras', nombre: 'Terceras hasta seis', secuencia: [1, 3, 5, 6, 4, 2, 1], objetivo: 'Combinar terceras ascendentes y descenso mixto.', recomendacion: 'Cuidar el salto 6 a 4.' },
  { nivel: 5, categoria: 'memoria', nombre: 'Frase viajera', secuencia: [1, 2, 3, 5, 4, 3, 6, 5, 3, 1], objetivo: 'Memorizar una frase con saltos moderados.', recomendacion: 'Cantar una vez con números y otra con vocal.' },
  { nivel: 5, categoria: 'memoria', nombre: 'Pregunta y respuesta', secuencia: [1, 2, 3, 4, 5, 3, 2, 1, 6, 5, 3, 1], objetivo: 'Distinguir dos semifrases.', recomendacion: 'Separar mentalmente en pregunta y respuesta.' },
  { nivel: 5, categoria: 'pasos', nombre: 'Vecindario del cinco', secuencia: [4, 5, 6, 5, 4, 3, 2, 1], objetivo: 'Afinar grados 4-6 alrededor del 5.', recomendacion: 'El 6 no debe sonar como grito de auxilio.' },
  { nivel: 5, categoria: 'arpegios', nombre: 'Campana 1356', secuencia: [1, 3, 5, 6, 5, 3, 1, 3, 5], objetivo: 'Reforzar estructura armónica ampliada.', recomendacion: 'Ideal para cantar por grupos.' },
  { nivel: 5, categoria: 'reto', nombre: 'Cruce medio', secuencia: [1, 5, 2, 6, 3, 5, 1], objetivo: 'Resolver saltos dentro de 1 a 6.', recomendacion: 'Usar modo escuchar antes de cantar.' },

  // Nivel 6 · Séptimo, octava y cadencias
  { nivel: 6, categoria: 'escala', nombre: 'Escala completa', secuencia: [1, 2, 3, 4, 5, 6, 7, 8], objetivo: 'Cantar la escala mayor completa.', recomendacion: 'Crecer sin apretar. Difícil concepto para humanos, al parecer.' },
  { nivel: 6, categoria: 'escala', nombre: 'Escala inversa', secuencia: [8, 7, 6, 5, 4, 3, 2, 1], objetivo: 'Descender una octava con control.', recomendacion: 'No dejar que el 7 se caiga de afinación.' },
  { nivel: 6, categoria: 'arpegios', nombre: 'Triada a la octava', secuencia: [1, 3, 5, 8], objetivo: 'Construir arpegio mayor hasta octava.', recomendacion: 'Pensar el 8 como el mismo 1 más brillante.' },
  { nivel: 6, categoria: 'arpegios', nombre: 'Octava que vuelve', secuencia: [1, 3, 5, 8, 5, 3, 1], objetivo: 'Subir y bajar arpegio completo.', recomendacion: 'No atacar el 8 con fuerza innecesaria.' },
  { nivel: 6, categoria: 'saltos', nombre: 'Octava directa', secuencia: [1, 8, 1], objetivo: 'Reconocer salto de octava.', recomendacion: 'Hacerlo suave, casi hablado-cantado al inicio.' },
  { nivel: 6, categoria: 'saltos', nombre: 'Séptimo sensible', secuencia: [5, 6, 7, 8, 7, 8], objetivo: 'Sentir tensión del 7 hacia el 8.', recomendacion: 'El 7 quiere subir, no lo abandonen en la mitad.' },
  { nivel: 6, categoria: 'memoria', nombre: 'Escala con eco', secuencia: [1, 2, 3, 4, 5, 4, 5, 6, 7, 8], objetivo: 'Retener escala con repetición interna.', recomendacion: 'Dividir 12345 / 45678.' },
  { nivel: 6, categoria: 'memoria', nombre: 'Regreso con eco', secuencia: [8, 7, 6, 5, 4, 5, 4, 3, 2, 1], objetivo: 'Retener descenso con giro intermedio.', recomendacion: 'Cantar lento y con respiración tranquila.' },
  { nivel: 6, categoria: 'reto', nombre: 'Cadencia melódica', secuencia: [3, 4, 5, 2, 7, 1], objetivo: 'Reconocer tensión y resolución.', recomendacion: 'Muy bueno para estudiantes con más oído tonal.' },
  { nivel: 6, categoria: 'reto', nombre: 'Dominante inquieta', secuencia: [5, 7, 8, 6, 5, 3, 1], objetivo: 'Afinar saltos hacia 7 y 8.', recomendacion: 'Si se pierde, volver al arpegio 1-3-5-8.' },

  // Nivel 7 · Memoria larga y combinaciones mixtas
  { nivel: 7, categoria: 'memoria', nombre: 'Camino largo', secuencia: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1], objetivo: 'Sostener frase extensa con centro tonal.', recomendacion: 'Respirar antes y cantar sin acelerar.' },
  { nivel: 7, categoria: 'memoria', nombre: 'Camino largo inverso', secuencia: [8, 7, 6, 5, 4, 3, 4, 5, 4, 3, 2, 1], objetivo: 'Controlar descenso y recuperación.', recomendacion: 'Marcar el punto donde vuelve a subir.' },
  { nivel: 7, categoria: 'terceras', nombre: 'Terceras completas', secuencia: [1, 3, 5, 7, 8, 6, 4, 2, 1], objetivo: 'Recorrer escala por terceras.', recomendacion: 'Es exigente, no hace falta fingir que no.' },
  { nivel: 7, categoria: 'terceras', nombre: 'Terceras quebradas', secuencia: [1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8], objetivo: 'Alternar terceras ascendentes con pasos.', recomendacion: 'Leerlo por parejas.' },
  { nivel: 7, categoria: 'arpegios', nombre: 'Arpegio amplio', secuencia: [1, 3, 5, 8, 7, 5, 3, 1], objetivo: 'Combinar arpegio y nota sensible.', recomendacion: 'El 7 debe resolver mentalmente aunque baje.' },
  { nivel: 7, categoria: 'arpegios', nombre: 'Arpegio en espejo', secuencia: [1, 5, 3, 8, 5, 1, 3, 5, 8], objetivo: 'Ordenar saltos de triada no lineales.', recomendacion: 'Perfecto para modo loop.' },
  { nivel: 7, categoria: 'saltos', nombre: 'Saltos cruzados', secuencia: [1, 6, 2, 7, 3, 8, 5, 1], objetivo: 'Afinar destinos lejanos.', recomendacion: 'Usar manos para visualizar altura.' },
  { nivel: 7, categoria: 'saltos', nombre: 'Escalera imposible pero no tanto', secuencia: [1, 4, 2, 5, 3, 6, 4, 7, 5, 8], objetivo: 'Secuenciar saltos ascendentes por patrón.', recomendacion: 'Que el nombre no los humille, solo los ubique.' },
  { nivel: 7, categoria: 'reto', nombre: 'Mapa tonal', secuencia: [1, 5, 6, 4, 2, 7, 8, 5, 3, 1], objetivo: 'Conectar regiones de la tonalidad.', recomendacion: 'Primero escuchar, luego cantar por fragmentos.' },
  { nivel: 7, categoria: 'reto', nombre: 'Laberinto amable', secuencia: [3, 1, 4, 2, 5, 3, 6, 4, 7, 5, 8], objetivo: 'Resolver patrón mixto con lógica ascendente.', recomendacion: 'Subrayar mentalmente la línea 1-2-3-4-5.' },

  // Nivel 8 · Retos avanzados y frases largas
  { nivel: 8, categoria: 'reto', nombre: 'Montaña rusa', secuencia: [1, 8, 7, 2, 6, 3, 5, 4, 1], objetivo: 'Entrenar cambios extremos de registro.', recomendacion: 'Hacerlo lento. La montaña rusa no necesita demanda legal.' },
  { nivel: 8, categoria: 'reto', nombre: 'Mapa inverso', secuencia: [8, 1, 2, 7, 3, 6, 4, 5, 1], objetivo: 'Cruzar octava con alternancia grave/agudo.', recomendacion: 'Pensar en dos zonas: baja y alta.' },
  { nivel: 8, categoria: 'memoria', nombre: 'Frase de concierto', secuencia: [1, 3, 5, 6, 5, 4, 2, 7, 8, 6, 5, 3, 1], objetivo: 'Memorizar frase musical larga.', recomendacion: 'Dividir en tres bloques respirables.' },
  { nivel: 8, categoria: 'memoria', nombre: 'Frase espejo larga', secuencia: [1, 2, 4, 3, 5, 4, 6, 5, 7, 8, 7, 5, 3, 1], objetivo: 'Cantar una frase de expansión y regreso.', recomendacion: 'Ideal para estudiantes que ya leen grados bien.' },
  { nivel: 8, categoria: 'arpegios', nombre: 'Arpegio con tensión', secuencia: [1, 3, 5, 7, 8, 7, 5, 3, 2, 1], objetivo: 'Integrar sensible dentro del arpegio.', recomendacion: 'El 7 necesita intención, no volumen.' },
  { nivel: 8, categoria: 'saltos', nombre: 'Saltos de detective', secuencia: [1, 5, 2, 6, 3, 7, 4, 8, 5, 1], objetivo: 'Investigar afinación por destinos separados.', recomendacion: 'Caso difícil, sin sangre, solo ego herido.' },
  { nivel: 8, categoria: 'terceras', nombre: 'Terceras serpiente', secuencia: [1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 5, 3, 1], objetivo: 'Extender terceras quebradas con resolución.', recomendacion: 'Usar loop y fragmentar cada cuatro notas.' },
  { nivel: 8, categoria: 'escala', nombre: 'Escala ornamentada', secuencia: [1, 2, 3, 2, 3, 4, 5, 4, 5, 6, 7, 6, 7, 8], objetivo: 'Subir la escala con apoyaturas simples.', recomendacion: 'No acelerar en los adornos.' },
  { nivel: 8, categoria: 'escala', nombre: 'Descenso ornamentado', secuencia: [8, 7, 6, 7, 6, 5, 4, 5, 4, 3, 2, 3, 2, 1], objetivo: 'Descender con giros melódicos.', recomendacion: 'Mantener la dirección general hacia el 1.' },
  { nivel: 8, categoria: 'reto', nombre: 'Examen final amable', secuencia: [1, 4, 7, 8, 5, 2, 6, 3, 5, 8, 7, 4, 2, 1], objetivo: 'Combinar saltos, tensión y resolución.', recomendacion: 'Si sale afinado, celebrarlo. Si no, también, pero practicar.' },

  // Bloque extra · ejercicios cortos útiles para clase rápida
  { nivel: 2, categoria: 'calentamiento', nombre: 'Sirena pequeña', secuencia: [1, 2, 3, 2, 1, 2, 3], objetivo: 'Activar voz en rango corto.', recomendacion: 'Usar vocal “u” o “muu”.' },
  { nivel: 3, categoria: 'calentamiento', nombre: 'Sirena mediana', secuencia: [1, 2, 3, 4, 3, 2, 1, 2, 3, 4], objetivo: 'Activar hasta cuarto grado.', recomendacion: 'Mantener sonido redondo.' },
  { nivel: 4, categoria: 'calentamiento', nombre: 'Sirena pentacordio', secuencia: [1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 5], objetivo: 'Calentar hasta el quinto grado.', recomendacion: 'No forzar volumen.' },
  { nivel: 5, categoria: 'calentamiento', nombre: 'Despertar vocal', secuencia: [1, 3, 2, 4, 3, 5, 4, 6, 5], objetivo: 'Calentar con movimiento mixto.', recomendacion: 'Excelente para comenzar ensamble.' },
  { nivel: 6, categoria: 'calentamiento', nombre: 'Despertar completo', secuencia: [1, 2, 3, 4, 5, 6, 7, 8, 5, 3, 1], objetivo: 'Activar escala completa y triada.', recomendacion: 'Respirar antes de la octava.' },
  { nivel: 7, categoria: 'pasos', nombre: 'Camino ondulado', secuencia: [1, 2, 3, 2, 3, 4, 5, 4, 5, 6, 7, 6, 7, 8], objetivo: 'Subir con pequeñas olas.', recomendacion: 'Pensar en grupos de tres.' },
  { nivel: 7, categoria: 'pasos', nombre: 'Regreso ondulado', secuencia: [8, 7, 6, 7, 6, 5, 4, 5, 4, 3, 2, 3, 2, 1], objetivo: 'Bajar con pequeñas olas.', recomendacion: 'Evitar que el pulso se desarme.' },
  { nivel: 8, categoria: 'memoria', nombre: 'Memoria circular', secuencia: [1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 5, 3, 1, 2, 1], objetivo: 'Retener una frase circular muy larga.', recomendacion: 'Trabajar por fragmentos, porque tampoco somos robots. Bueno, yo sí.' }
];

export const PATRONES = PATRONES_BASE.map((patron, index) => ({
  id: index + 1,
  codigo: patron.secuencia.join(''),
  longitud: patron.secuencia.length,
  dificultad: `Nivel ${patron.nivel}`,
  ...patron
}));

export function obtenerCategoria(categoriaId) {
  return CATEGORIAS.find((categoria) => categoria.id === categoriaId) || CATEGORIAS[0];
}

export function obtenerNiveles() {
  return [...new Set(PATRONES.map((patron) => patron.nivel))].sort((a, b) => a - b);
}

export function obtenerCategoriasConConteo() {
  return CATEGORIAS.map((categoria) => ({
    ...categoria,
    total: PATRONES.filter((patron) => patron.categoria === categoria.id).length
  }));
}

export function obtenerPatronesFiltrados(filtros = {}) {
  const busqueda = normalizarTexto(filtros.busqueda || '');
  const nivel = filtros.nivel || 'todos';
  const categoria = filtros.categoria || 'todas';

  return PATRONES.filter((patron) => {
    const coincideNivel = nivel === 'todos' || String(patron.nivel) === String(nivel);
    const coincideCategoria = categoria === 'todas' || patron.categoria === categoria;
    const texto = normalizarTexto([
      patron.nombre,
      patron.codigo,
      patron.objetivo,
      patron.recomendacion,
      obtenerCategoria(patron.categoria).label,
      `nivel ${patron.nivel}`
    ].join(' '));
    const coincideBusqueda = !busqueda || texto.includes(busqueda);
    return coincideNivel && coincideCategoria && coincideBusqueda;
  });
}

export function obtenerPatronesPorNivel(filtros = {}) {
  return obtenerPatronesFiltrados(filtros).reduce((grupos, patron) => {
    const nivel = String(patron.nivel);
    grupos[nivel] = grupos[nivel] || [];
    grupos[nivel].push(patron);
    return grupos;
  }, {});
}

export function obtenerSiguientePatron(patronActualId, filtros = {}) {
  const patrones = obtenerPatronesFiltrados(filtros);
  if (!patrones.length) return PATRONES[0];
  const indexActual = patrones.findIndex((patron) => patron.id === patronActualId);
  const siguienteIndex = indexActual === -1 ? 0 : (indexActual + 1) % patrones.length;
  return patrones[siguienteIndex];
}

export function obtenerPatronAleatorio(filtros = {}) {
  const patrones = obtenerPatronesFiltrados(filtros);
  const fuente = patrones.length ? patrones : PATRONES;
  return fuente[Math.floor(Math.random() * fuente.length)];
}

function normalizarTexto(texto) {
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

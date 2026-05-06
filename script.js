let contadorValor = 0;

function sumar() {
  contadorValor++;
  document.getElementById('contador-valor').textContent = contadorValor;
}
function restar() {
  contadorValor--;
  document.getElementById('contador-valor').textContent = contadorValor;
}
function resetContador() {
  contadorValor = 0;
  document.getElementById('contador-valor').textContent = contadorValor;
}

let numeroSecreto = generarNumeroAleatorio(1, 100);
let intentosRestantes = 5;
function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function adivinar() {
  const input = document.getElementById('adivina-input');
  const mensaje = document.getElementById('adivina-mensaje');
  const spanIntentos = document.getElementById('intentos-restantes');
  const numero = parseInt(input.value);

  if (isNaN(numero) || numero < 1 || numero > 100) {
    mensaje.textContent = 'Ingresa un número válido entre 1 y 100.';
    mensaje.className = 'fw-bold text-warning';
    return;
  }

  intentosRestantes--;
  spanIntentos.textContent = intentosRestantes;

  if (numero === numeroSecreto) {
    mensaje.textContent = `Correcto el numero era ${numeroSecreto}.`;
    mensaje.className = 'fw-bold text-success';
    bloquearAdivina();
  } else if (intentosRestantes === 0) {
    mensaje.textContent = `Sin intentos El número era ${numeroSecreto}.`;
    mensaje.className = 'fw-bold text-danger';
    bloquearAdivina();
  } else if (numero < numeroSecreto) {
    mensaje.textContent = `Muy bajo Te quedan ${intentosRestantes} intentos.`;
    mensaje.className = 'fw-bold text-info';
  } else {
    mensaje.textContent = `muy alto Te quedan ${intentosRestantes} intentos.`;
    mensaje.className = 'fw-bold text-info';
  }
  input.value = '';
  input.focus();
}
function bloquearAdivina() {
  document.getElementById('adivina-input').disabled = true;
}
function reiniciarAdivina() {
  numeroSecreto = generarNumeroAleatorio(1, 100);
  intentosRestantes = 5;
  document.getElementById('adivina-input').disabled = false;
  document.getElementById('adivina-input').value = '';
  document.getElementById('adivina-mensaje').textContent = '';
  document.getElementById('intentos-restantes').textContent = 5;
}
const opcionesPPT = ['piedra', 'papel', 'tijera'];

function jugarPPT(eleccionUsuario) {
  const eleccionPC = opcionesPPT[Math.floor(Math.random() * 3)];
  const resultado = document.getElementById('ppt-resultado');
  const detalle = document.getElementById('ppt-detalle');

  detalle.textContent = `Tú: ${eleccionUsuario} — PC: ${eleccionPC}`;

  if (eleccionUsuario === eleccionPC) {
    resultado.textContent = '¡Empate!';
    resultado.className = 'fw-bold fs-5 text-warning';
  } else if (
    (eleccionUsuario === 'piedra' && eleccionPC === 'tijera') ||
    (eleccionUsuario === 'papel'  && eleccionPC === 'piedra') ||
    (eleccionUsuario === 'tijera' && eleccionPC === 'papel')
  ) {
    resultado.textContent = 'ganaste';
    resultado.className = 'fw-bold fs-5 text-success';
  } else {
    resultado.textContent = 'perdiste';
    resultado.className = 'fw-bold fs-5 text-danger';
  }
}
let reaccionEstado = 'idle'; // 
let reaccionTimeout = null;
let reaccionInicio = null;

function iniciarReaccion() {
  const box = document.getElementById('reaccion-box');
  const texto = document.getElementById('reaccion-texto');
  const resultado = document.getElementById('reaccion-resultado');
  clearTimeout(reaccionTimeout);
  reaccionEstado = 'esperando';
  resultado.textContent = '';
  box.className = 'reaccion-box bg-danger mx-auto mb-3';
  texto.textContent = 'Espera...';
  const delay = generarNumeroAleatorio(1500, 4000);
  reaccionTimeout = setTimeout(() => {
    reaccionEstado = 'listo';
    box.className = 'reaccion-box bg-success mx-auto mb-3';
    texto.textContent = '¡AHORA!';
    reaccionInicio = Date.now();
  }, delay);
}

function clickReaccion() {
  const box = document.getElementById('reaccion-box');
  const texto = document.getElementById('reaccion-texto');
  const resultado = document.getElementById('reaccion-resultado');

  if (reaccionEstado === 'idle') {
    iniciarReaccion();
  } else if (reaccionEstado === 'esperando') {
    clearTimeout(reaccionTimeout);
    reaccionEstado = 'idle';
    box.className = 'reaccion-box bg-secondary mx-auto mb-3';
    texto.textContent = 'Haz click para empezar';
    resultado.textContent = 'Demasiado pronto. Inténtalo de nuevo.';
    resultado.className = 'fw-bold fs-5 text-warning';
  } else if (reaccionEstado === 'listo') {
    const tiempo = Date.now() - reaccionInicio;
    reaccionEstado = 'idle';
    box.className = 'reaccion-box bg-secondary mx-auto mb-3';
    texto.textContent = 'Haz click para empezar';
    resultado.textContent = `Tu tiempo de reacción: ${tiempo} ms`;
    resultado.className = 'fw-bold fs-5 text-primary';
  }
}

const preguntasTrivia = [
  {
    pregunta: '¿Cuántos cromosomas tiene el ser humano?',
    opciones: ['23', '46', '64', '92'],
    correcta: 1
  },
  {
    pregunta: '¿Qué molécula lleva la información genética?',
    opciones: ['ARN', 'Proteina', 'ADN', 'lipido'],
    correcta: 2
  },
  {
    pregunta: '¿Como me llamo?',
    opciones: ['joaquin', 'jaime', 'javier', 'jose'],
    correcta: 0
  },
  {
    pregunta: '¿En qué año estamos?',
    opciones: ['1965', '2026', '2021', '2024'],
    correcta: 1
  },
  {
    pregunta: '¿Cuál es el idioma que hablamos en chile?',
    opciones: ['Inglés', 'Español', 'Chino mandarín', 'Hindi'],
    correcta: 1
  },
  {
    pregunta: '¿Qué organo produce la insulina?',
    opciones: ['Hígado', 'Riñón', 'Páncreas', 'Estómago'],
    correcta: 2
  },
  {
    pregunta: '¿Cuntos cromosomas tiene el ser humano?',
    opciones: ['5', '21', '46', '23'],
    correcta: 3
  }
];
let triviaIndice = 0;
let triviaPuntaje = 0;
let triviaRespondida = false;
function cargarPreguntaTrivia() {
  const preguntaObj = preguntasTrivia[triviaIndice];
  document.getElementById('trivia-pregunta').textContent =
    `${triviaIndice + 1}. ${preguntaObj.pregunta}`;
  document.getElementById('trivia-feedback').textContent = '';
  document.getElementById('trivia-siguiente').classList.add('d-none');
  document.getElementById('trivia-puntaje').textContent =
    `Puntaje: ${triviaPuntaje} / ${preguntasTrivia.length}`;
  triviaRespondida = false;
  const opcionesDiv = document.getElementById('trivia-opciones');
  opcionesDiv.innerHTML = '';
  preguntaObj.opciones.forEach((opcion, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-secondary text-start';
    btn.textContent = opcion;
    btn.onclick = () => responderTrivia(i, btn);
    opcionesDiv.appendChild(btn);
  });
}
function responderTrivia(indiceOpcion, btn) {
  if (triviaRespondida) return;
  triviaRespondida = true;

  const preguntaObj = preguntasTrivia[triviaIndice];
  const feedback = document.getElementById('trivia-feedback');
  const botones = document.querySelectorAll('#trivia-opciones button');

  botones.forEach((b, i) => {
    b.disabled = true;
    if (i === preguntaObj.correcta) b.className = 'btn btn-success text-start';
  });

  if (indiceOpcion === preguntaObj.correcta) {
    triviaPuntaje++;
    feedback.textContent = 'correcto!';
    feedback.className = 'fw-bold text-success';
  } else {
    feedback.textContent = `incorrecto. La respuesta era: ${preguntaObj.opciones[preguntaObj.correcta]}`;
    feedback.className = 'fw-bold text-danger';
    btn.className = 'btn btn-danger text-start';
  }

  document.getElementById('trivia-puntaje').textContent =
    `Puntaje: ${triviaPuntaje} / ${preguntasTrivia.length}`;
  document.getElementById('trivia-siguiente').classList.remove('d-none');
}

function siguientePregunta() {
  triviaIndice++;
  if (triviaIndice < preguntasTrivia.length) {
    cargarPreguntaTrivia();
  } else {
    document.getElementById('trivia-contenedor').innerHTML =
      `<p class="fw-bold fs-4">¡Juego terminado! Puntaje final: ${triviaPuntaje} / ${preguntasTrivia.length}</p>`;
    document.getElementById('trivia-siguiente').classList.add('d-none');
    document.getElementById('trivia-reiniciar').classList.remove('d-none');
  }
}

function reiniciarTrivia() {
  triviaIndice = 0;
  triviaPuntaje = 0;
  document.getElementById('trivia-reiniciar').classList.add('d-none');
  document.getElementById('trivia-contenedor').innerHTML = `
    <p id="trivia-pregunta" class="fw-bold fs-5"></p>
    <div id="trivia-opciones" class="d-grid gap-2 mb-3"></div>
    <p id="trivia-feedback" class="fw-bold"></p>
  `;
  cargarPreguntaTrivia();
}

cargarPreguntaTrivia();

let reflejosPuntaje = 0;
let reflejosTiempo = 30;
let reflejosTimer = null;
let reflejosCirculo = null;
let reflejosCirculoTimer = null;
let reflejosActivo = false;

function iniciarReflejos() {
  if (reflejosActivo) return;
  reflejosActivo = true;
  reflejosPuntaje = 0;
  reflejosTiempo = 30;
  document.getElementById('reflejos-puntaje').textContent = 0;
  document.getElementById('reflejos-tiempo').textContent = 30;
  document.getElementById('reflejos-resultado').textContent = '';
  document.getElementById('reflejos-btn').disabled = true;

  reflejosTimer = setInterval(() => {
    reflejosTiempo--;
    document.getElementById('reflejos-tiempo').textContent = reflejosTiempo;
    if (reflejosTiempo <= 0) terminarReflejos();
  }, 1000);

  mostrarCirculo();
}

function mostrarCirculo() {
  if (!reflejosActivo) return;
  const area = document.getElementById('reflejos-area');
  area.innerHTML = '';

  const circulo = document.createElement('div');
  circulo.className = 'reflejos-circulo';

  const maxX = area.offsetWidth - 55;
  const maxY = area.offsetHeight - 55;
  circulo.style.left = generarNumeroAleatorio(5, maxX) + 'px';
  circulo.style.top  = generarNumeroAleatorio(5, maxY) + 'px';

  circulo.onclick = () => {
    reflejosPuntaje++;
    document.getElementById('reflejos-puntaje').textContent = reflejosPuntaje;
    clearTimeout(reflejosCirculoTimer);
    mostrarCirculo();
  };

  area.appendChild(circulo);
  reflejosCirculoTimer = setTimeout(mostrarCirculo, 1200);
}

function terminarReflejos() {
  clearInterval(reflejosTimer);
  clearTimeout(reflejosCirculoTimer);
  reflejosActivo = false;
  document.getElementById('reflejos-area').innerHTML = '';
  document.getElementById('reflejos-btn').disabled = false;
  document.getElementById('reflejos-resultado').textContent =
    `¡Tiempo! Puntaje final: ${reflejosPuntaje}`;
}
const preguntasRapidas = [
  { pregunta: '¿cuanto es 7 × 8?',              respuesta: '56' },
  { pregunta: '¿Capital de chile',            respuesta: 'Santiago' },
  { pregunta: '¿Cuánto es 15 + 27?',             respuesta: '42' },
  { pregunta: '¿En qué continente está chile?', respuesta: 'america' },
  { pregunta: '¿Cuánto es la raíz de 1?',      respuesta: '1' },
  { pregunta: '¿Como se llama el ramo?',              respuesta: 'Taller' },
  { pregunta: '¿Cuántos días tiene un año ?', respuesta: '366' }
];

let rapidasIndice = 0;
let rapidasPuntaje = 0;
let rapidasTimer = null;
let rapidasTiempoRestante = 10;

function cargarPreguntaRapida() {
  if (rapidasIndice >= preguntasRapidas.length) {
    terminarRapidas();
    return;
  }

  const obj = preguntasRapidas[rapidasIndice];
  document.getElementById('rapidas-num').textContent =
    `Pregunta ${rapidasIndice + 1} / ${preguntasRapidas.length}`;
  document.getElementById('rapidas-pregunta').textContent = obj.pregunta;
  document.getElementById('rapidas-input').value = '';
  document.getElementById('rapidas-input').disabled = false;
  document.getElementById('rapidas-feedback').textContent = '';
  rapidasTiempoRestante = 10;
  actualizarBarraRapidas();

  clearInterval(rapidasTimer);
  rapidasTimer = setInterval(() => {
    rapidasTiempoRestante--;
    actualizarBarraRapidas();
    if (rapidasTiempoRestante <= 0) {
      clearInterval(rapidasTimer);
      document.getElementById('rapidas-feedback').textContent =
        `tiempo. La respuesta era: ${obj.respuesta}`;
      document.getElementById('rapidas-feedback').className = 'fw-bold text-warning';
      document.getElementById('rapidas-input').disabled = true;
      setTimeout(() => {
        rapidasIndice++;
        cargarPreguntaRapida();
      }, 1500);
    }
  }, 1000);
}

function actualizarBarraRapidas() {
  document.getElementById('rapidas-tiempo').textContent = rapidasTiempoRestante;
  const pct = (rapidasTiempoRestante / 10) * 100;
  document.getElementById('rapidas-barra').style.width = pct + '%';
}

function responderRapida() {
  const input = document.getElementById('rapidas-input');
  const respuestaUsuario = input.value.trim().toLowerCase();
  const obj = preguntasRapidas[rapidasIndice];
  const feedback = document.getElementById('rapidas-feedback');

  clearInterval(rapidasTimer);
  input.disabled = true;

  if (respuestaUsuario === obj.respuesta.toLowerCase()) {
    rapidasPuntaje++;
    feedback.textContent = 'correcto!';
    feedback.className = 'fw-bold text-success';
  } else {
    feedback.textContent = `incorrecto. Era: ${obj.respuesta}`;
    feedback.className = 'fw-bold text-danger';
  }

  setTimeout(() => {
    rapidasIndice++;
    cargarPreguntaRapida();
  }, 1500);
}

function terminarRapidas() {
  document.getElementById('rapidas-contenedor').classList.add('d-none');
  const final = document.getElementById('rapidas-final');
  final.classList.remove('d-none');
  final.textContent = `Fin Puntaje: ${rapidasPuntaje} / ${preguntasRapidas.length}`;
  document.getElementById('rapidas-reiniciar').classList.remove('d-none');
}

function reiniciarRapidas() {
  rapidasIndice = 0;
  rapidasPuntaje = 0;
  document.getElementById('rapidas-final').classList.add('d-none');
  document.getElementById('rapidas-reiniciar').classList.add('d-none');
  document.getElementById('rapidas-contenedor').classList.remove('d-none');
  cargarPreguntaRapida();
}
cargarPreguntaRapida();
let tttTablero = Array(9).fill('');
let tttTurno = 'X';
let tttActivo = true;

const tttCombinaciones = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function crearTableroTTT() {
  const tablero = document.getElementById('ttt-tablero');
  tablero.innerHTML = '';
  tttTablero.forEach((val, i) => {
    const celda = document.createElement('div');
    celda.className = `ttt-celda ${val.toLowerCase()}`;
    celda.textContent = val;
    celda.onclick = () => clickTTT(i);
    tablero.appendChild(celda);
  });
}

function clickTTT(i) {
  if (!tttActivo || tttTablero[i] !== '') return;
  tttTablero[i] = tttTurno;
  crearTableroTTT();

  const ganador = verificarGanadorTTT();
  if (ganador) {
    document.getElementById('ttt-resultado').textContent = `gano ${ganador}`;
    document.getElementById('ttt-turno').textContent = '';
    tttActivo = false;
    return;
  }

  if (tttTablero.every(c => c !== '')) {
    document.getElementById('ttt-resultado').textContent = '¡Empate!';
    document.getElementById('ttt-turno').textContent = '';
    tttActivo = false;
    return;
  }

  tttTurno = tttTurno === 'X' ? 'O' : 'X';
  document.getElementById('ttt-turno').textContent = `Turno de ${tttTurno}`;
}

function verificarGanadorTTT() {
  for (const [a, b, c] of tttCombinaciones) {
    if (tttTablero[a] && tttTablero[a] === tttTablero[b] && tttTablero[a] === tttTablero[c]) {
      return tttTablero[a];
    }
  }
  return null;
}

function reiniciarTTT() {
  tttTablero = Array(9).fill('');
  tttTurno = 'X';
  tttActivo = true;
  document.getElementById('ttt-turno').textContent = 'Turno de X';
  document.getElementById('ttt-resultado').textContent = '';
  crearTableroTTT();
}

crearTableroTTT();
const TILE = 20;
let snakeLoop = null;
let snakeCuerpo = [];
let snakeDireccion = { x: 1, y: 0 };
let snakeDireccionSiguiente = { x: 1, y: 0 };
let snakeComida = {};
let snakePuntaje = 0;
let snakeEnJuego = false;
function iniciarSnake() {
  if (snakeLoop) clearInterval(snakeLoop);
  snakeCuerpo = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  snakeDireccion = { x: 1, y: 0 };
  snakeDireccionSiguiente = { x: 1, y: 0 };
  snakePuntaje = 0;
  snakeEnJuego = true;
  document.getElementById('snake-puntaje').textContent = 0;
  document.getElementById('snake-resultado').textContent = '';
  document.getElementById('snake-btn').textContent = 'Reiniciar';
  colocarComidaSnake();
  snakeLoop = setInterval(actualizarSnake, 150);
}

function colocarComidaSnake() {
  const cols = 400 / TILE;
  const rows = 400 / TILE;
  snakeComida = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
}

function actualizarSnake() {
  snakeDireccion = { ...snakeDireccionSiguiente };
  const cabeza = {
    x: snakeCuerpo[0].x + snakeDireccion.x,
    y: snakeCuerpo[0].y + snakeDireccion.y
  };

  const cols = 400 / TILE;
  const rows = 400 / TILE;

  // Colisión con paredes
  if (cabeza.x < 0 || cabeza.x >= cols || cabeza.y < 0 || cabeza.y >= rows) {
    terminarSnake();
    return;
  }
  if (snakeCuerpo.some(seg => seg.x === cabeza.x && seg.y === cabeza.y)) {
    terminarSnake();
    return;
  }
  snakeCuerpo.unshift(cabeza);
  if (cabeza.x === snakeComida.x && cabeza.y === snakeComida.y) {
    snakePuntaje++;
    document.getElementById('snake-puntaje').textContent = snakePuntaje;
    colocarComidaSnake();
  } else {
    snakeCuerpo.pop();
  }

  dibujarSnake();
}

function dibujarSnake() {
  const canvas = document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Comida
  ctx.fillStyle = '#dc3545';
  ctx.fillRect(snakeComida.x * TILE, snakeComida.y * TILE, TILE - 2, TILE - 2);

  // Serpiente
  snakeCuerpo.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? '#0d6efd' : '#198754';
    ctx.fillRect(seg.x * TILE, seg.y * TILE, TILE - 2, TILE - 2);
  });
}
function terminarSnake() {
  clearInterval(snakeLoop);
  snakeEnJuego = false;
  document.getElementById('snake-resultado').textContent =
    `¡Game Over! Puntaje: ${snakePuntaje}`;
}

document.addEventListener('keydown', (e) => {
  if (!snakeEnJuego) return;
  const teclas = {
    ArrowUp:    { x: 0,  y: -1 },
    ArrowDown:  { x: 0,  y:  1 },
    ArrowLeft:  { x: -1, y:  0 },
    ArrowRight: { x: 1,  y:  0 }
  };
  const nueva = teclas[e.key];
  if (!nueva) return;
  if (nueva.x === -snakeDireccion.x && nueva.y === -snakeDireccion.y) return;
  snakeDireccionSiguiente = nueva;
  e.preventDefault();
});
let wamPuntaje = 0;
let wamTiempo = 30;
let wamTimer = null;
let wamMoleTimer = null;
let wamActivo = false;
const WAM_CELDAS = 9;

function crearGridWAM() {
  const grid = document.getElementById('wam-grid');
  grid.innerHTML = '';
  for (let i = 0; i < WAM_CELDAS; i++) {
    const hoyo = document.createElement('div');
    hoyo.className = 'wam-hoyo';
    hoyo.dataset.index = i;
    hoyo.textContent = '.';
    hoyo.onclick = () => golpearMole(hoyo);
    grid.appendChild(hoyo);
  }
}
function iniciarWAM() {
  if (wamActivo) return;
  wamActivo = true;
  wamPuntaje = 0;
  wamTiempo = 30;
  document.getElementById('wam-puntaje').textContent = 0;
  document.getElementById('wam-tiempo').textContent = 30;
  document.getElementById('wam-resultado').textContent = '';
  document.getElementById('wam-btn').disabled = true;
  crearGridWAM();

  wamTimer = setInterval(() => {
    wamTiempo--;
    document.getElementById('wam-tiempo').textContent = wamTiempo;
    if (wamTiempo <= 0) terminarWAM();
  }, 1000);

  mostrarMole();
}

function mostrarMole() {
  if (!wamActivo) return;
  const hoyos = document.querySelectorAll('.wam-hoyo');
  hoyos.forEach(h => {
    h.classList.remove('activo');
    h.textContent = '.';
  });
  const idx = Math.floor(Math.random() * WAM_CELDAS);
  hoyos[idx].classList.add('activo');
  hoyos[idx].textContent = 'x';

  wamMoleTimer = setTimeout(mostrarMole, 900);
}

function golpearMole(hoyo) {
  if (!wamActivo || !hoyo.classList.contains('activo')) return;
  hoyo.classList.remove('activo');
  hoyo.textContent = '*';
  wamPuntaje++;
  document.getElementById('wam-puntaje').textContent = wamPuntaje;
  clearTimeout(wamMoleTimer);
  setTimeout(mostrarMole, 300);
}
function terminarWAM() {
  clearInterval(wamTimer);
  clearTimeout(wamMoleTimer);
  wamActivo = false;
  const hoyos = document.querySelectorAll('.wam-hoyo');
  hoyos.forEach(h => {
    h.classList.remove('activo');
    h.textContent = '.';
  });
  document.getElementById('wam-btn').disabled = false;
  document.getElementById('wam-resultado').textContent =
    `¡Tiempo! Puntaje final: ${wamPuntaje}`;
}
document.addEventListener('DOMContentLoaded', () => {
  cargarPreguntaTrivia();
  cargarPreguntaRapida();
  reiniciarTTT();
  crearGridWAM();
});

crearGridWAM();

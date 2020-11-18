/**
 * Dibuja el tablero con rectángulos.
 */
export function dibujarTablero() {
  let canvas = document.getElementById("tablero");
  let tableroAnchura = canvas.width;
  let tableroAltura = canvas.height;
  let repeticion = tableroAnchura / 30;

  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "black";
  for (let i = 0; i < tableroAnchura; i += repeticion) {
    for (let j = 0; j < tableroAltura; j += repeticion) {
      ctx.strokeRect(i, j, i + repeticion, j + repeticion);
    }
  }
  ctx.closePath();
}

/**
 * Borra el tablero.
 */
export function borrarTablero() {
  let canvas = document.getElementById("tablero");
  let tableroAnchura = canvas.width;
  let tableroAltura = canvas.height;

  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, tableroAnchura, tableroAltura);
}

/**
 * Toma las coordenadas donde clico.
 */
export function tomarCoordenadas() {
  var x = event.offsetX;
  var y = event.offsetY;
  //TODO: en base al pixel tengo q deducir q casilla es (con una division vale)
  console.log(`(${x}, ${y})`);
}

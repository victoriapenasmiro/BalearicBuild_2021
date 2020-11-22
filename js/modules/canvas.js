/**
 * Dibuja el tablero con rectángulos; por ahora está en 30 x 15.
 */
export function dibujarTablero() {
  let canvasDiv = document.getElementById("juegoTablero");
  let canvas = document.getElementById("tablero");
  // así lo hago dependiente del tamaño de la ventana ORIGINAL: primero calculo y luego transfiero
  var viewportAnchura = window.innerWidth;
  console.log("vw: " + viewportAnchura);
  let tableroAnchura = Number((viewportAnchura * 70) / 100);
  console.log("ancho: " + tableroAnchura);
  let repeticion = tableroAnchura / 30;
  let tableroAltura = Number(repeticion * 15);
  console.log("alto: " + tableroAltura);
  canvasDiv.style.width = tableroAnchura + "px";
  canvasDiv.style.height = tableroAltura + "px";
  canvas.style.width ='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  // Muchos problemas con temas de altura y porcentajes. Links para incluir en documentación:
  // https://stackoverflow.com/questions/10214873/make-canvas-as-wide-and-as-high-as-parent
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
  // https://stackoverflow.com/questions/7545863/canvas-distorts-drawing-how-do-i-get-the-scale-factor-between-the-set-size-and
  // https://stackoverflow.com/questions/59939839/difference-between-coordinates-in-pixels-and-coordinates-in-canvas-html

  // así dibujo los recuadros; funciona pero queda borrosa.
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

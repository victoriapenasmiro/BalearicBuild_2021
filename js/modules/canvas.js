import { filasJuego, columnasJuego } from "./configuracion.js";

//por ahora la hago variable global; ya lo cambiaré TODO
var repeticion;

/**
 * Dibuja el tablero con rectángulos; por ahora está en 30 x 15: ver configuración .js
 */
export function dibujarTablero() {
  let canvasDiv = document.getElementById("juegoTablero");
  let canvas = document.getElementById("tablero");
  // así lo hago dependiente del tamaño de la ventana ORIGINAL: primero calculo y luego transfiero
  var viewportAnchura = window.innerWidth;
  console.log("vw: " + viewportAnchura);
  let tableroAnchura = Number((viewportAnchura * 70) / 100);
  console.log("ancho: " + tableroAnchura);
  repeticion = tableroAnchura / columnasJuego;
  let tableroAltura = Number(repeticion * filasJuego);
  console.log("alto: " + tableroAltura);
  canvasDiv.style.width = tableroAnchura + "px";
  canvasDiv.style.height = tableroAltura + "px";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
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
 * Convierte el tablero en un array
 */

export function generarArrayTablero() {
  let arrayTablero = [];
  for (let i = 1; i <= filasJuego; i++) {
    for (let j = 1; j <= columnasJuego; j++) {
      let nuevaCasilla = [i, j, null, null, null];    //lectura: posición fila, posición columna, tipo, origen del tipo, terreno
      arrayTablero.push(nuevaCasilla);
    }
  }
  return arrayTablero;
}

/**
 * Toma las coordenadas donde clico y las convierte en la casilla que toca:
 */
export function tomarPosicionClick() {
  // para la columna:
  let x = event.offsetX;
  let xFila = Math.floor(x / repeticion);
  // console.log(`(${x}, ${y})`);
  // para la fila:
  let y = event.offsetY;
  let yColumna = Math.floor(y / repeticion);
  return [xFila, yColumna];
}

/**
 * Pinta una construcción donde se indica.
 * 
 * @param {String} tipo 
 * @param {int} fila 
 * @param {int} columna 
 */
export function pintarConstruccion(tipo, fila, columna) {
  let canvas = document.getElementById("tablero");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  switch (tipo) {
    case "xibiu":
      img.addEventListener('load', function() {
      }, false);
      img.src = 'images/edif_xibiu.png';
      ctx.drawImage(img, (fila * repeticion), (columna * repeticion), (repeticion * 2), (repeticion * 2));
      break;
    case "casa":
      img.src = 'images/edif_casa.png';
      ctx.drawImage(img, (fila * repeticion), (columna * repeticion), (repeticion * 2), (repeticion * 2));
      break;
    case "xalet":
      img.src = 'images/edif_xalet.png';
      ctx.drawImage(img, (fila * repeticion), (columna * repeticion), (repeticion * 3), (repeticion * 2));
      break;
    case "hotel":
      img.src = 'images/edif_hotel.png';
      ctx.drawImage(img, (fila * repeticion), (columna * repeticion), (repeticion * 4), (repeticion * 4));
      break;
  }
}
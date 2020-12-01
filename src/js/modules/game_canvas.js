import { filasJuego, columnasJuego } from "./game_configuracion.js";

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
  let tableroAnchura = Number((viewportAnchura * 70) / 100);    //TODO FINAL ver si 70% va bien en toda resolucion
  repeticion = tableroAnchura / columnasJuego;
  let tableroAltura = Number(repeticion * filasJuego);
  canvasDiv.style.width = tableroAnchura + "px";
  canvasDiv.style.height = tableroAltura + "px";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // así dibujo los recuadros; funciona pero queda algo borrosa TODO
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "black";
  for (let i = 0; i < tableroAnchura; i += repeticion) {
    for (let j = 0; j < tableroAltura; j += repeticion) {
      ctx.strokeRect(i, j, repeticion, repeticion);
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
  ctx.closePath();
}

/**
 * Convierte el tablero en un array
 */
export function generarArrayTablero() {
  //Lo ideal aquí sería generar un array bidimensional, pero no son nativos de javascript
  let arrayTablero = [];
  for (let i = 0; i < columnasJuego; i++) {
    arrayTablero[i] = [];
    for (let j = 0; j < filasJuego; j++) {
      let casilla = new Object();
      casilla.idEdificio = "";
      casilla.tipo = null;
      casilla.origenTipo = null;
      casilla.terreno = null;
      arrayTablero[i][j] = casilla;
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
  ctx.closePath();
}
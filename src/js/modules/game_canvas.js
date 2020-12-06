import { filasJuego, columnasJuego } from "./game_configuracion.js";
import { arenal, puigpunyent, estrenc } from "./game_mapas.js";

// Variable global para poder emplear en todo el proceso:
var repeticion;

/**
 * Dibuja el tablero con rectángulos; por ahora está en 30 x 15: ver configuración .js
 */
export function dibujarTablero(mapa) {
  let canvasDiv = document.getElementById("juegoTablero");
  let canvas = document.getElementById("tablero");
  let viewportAnchura = window.innerWidth;
  let tableroAnchura = Number((viewportAnchura * 60) / 100);
  repeticion = tableroAnchura / columnasJuego; //obtengo el tamaño de la casilla
  let tableroAltura = Number(repeticion * filasJuego);
  // así lo hago dependiente del tamaño de la ventana ORIGINAL: primero calculo y luego transfiero
  canvasDiv.style.width = tableroAnchura + "px";
  canvasDiv.style.height = tableroAltura + "px";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  let ctx = canvas.getContext("2d");

  //así adapto el canvas al mapa; si es Palma no hago nada porque todo es urbanizable.

  /* MAPA S'ARENAL */
  if (mapa == "arenal") {
    
    ctx.beginPath();
    for (let i = 0; i < arenal.mar.length; i++) {
      let listaFila = arenal.mar[i][0];
      let listaColumna = arenal.mar[i][1];
      if (listaColumna[0] == "total") {
        for (let j = 0; j < 30; j++) {
          ctx.rect(j * repeticion, listaFila * repeticion, repeticion, repeticion);
        }
      } else {
        for (let j = 0; j < listaColumna.length; j++) {
          ctx.rect(listaColumna[j] * repeticion, listaFila * repeticion, repeticion, repeticion);
        }
      }
    }
    ctx.fillStyle = "rgb(68, 128, 128)";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    for (let i = 0; i < arenal.platja.length; i++) {
      let listaFila = arenal.platja[i][0];
      let listaColumna = arenal.platja[i][1];
      if (listaColumna[0] == "total") {
        for (let j = 0; j < 30; j++) {
          ctx.rect(j * repeticion, listaFila * repeticion, repeticion, repeticion);
        }
      } else {
        for (let j = 0; j < listaColumna.length; j++) {
          ctx.rect(listaColumna[j] * repeticion, listaFila * repeticion, repeticion, repeticion);
        }
      }
    }
    ctx.fillStyle = "rgb(191, 179, 145)";
    ctx.fill();
    ctx.closePath();
  }

  /* MAPA PUIGPUNYENT */
  if (mapa == "puigpunyent") {
    ctx.beginPath();
    for (let i = 0; i < puigpunyent.zonaverda.length; i++) {
      let listaFila = puigpunyent.zonaverda[i][0];
      let listaColumna = puigpunyent.zonaverda[i][1];
      if (listaColumna[0] == "total") {
        for (let j = 0; j < 30; j++) {
          ctx.rect(j * repeticion, listaFila * repeticion, repeticion, repeticion);
        }
      } else {
        for (let j = 0; j < listaColumna.length; j++) {
          ctx.rect(listaColumna[j] * repeticion, listaFila * repeticion, repeticion, repeticion);
        }
      }
    }
    ctx.fillStyle = "rgb(59, 94, 47)";
    ctx.fill();
    ctx.closePath();
  }

    /* MAPA ES TRENC */
    if (mapa == "estrenc") {
    
      ctx.beginPath();
      for (let i = 0; i < estrenc.mar.length; i++) {
        let listaFila = estrenc.mar[i][0];
        let listaColumna = estrenc.mar[i][1];
        if (listaColumna[0] == "total") {
          for (let j = 0; j < 30; j++) {
            ctx.rect(j * repeticion, listaFila * repeticion, repeticion, repeticion);
          }
        } else {
          for (let j = 0; j < listaColumna.length; j++) {
            ctx.rect(listaColumna[j] * repeticion, listaFila * repeticion, repeticion, repeticion);
          }
        }
      }
      ctx.fillStyle = "rgb(68, 128, 128)";
      ctx.fill();
      ctx.closePath();
  
      ctx.beginPath();
      for (let i = 0; i < estrenc.platja.length; i++) {
        let listaFila = estrenc.platja[i][0];
        let listaColumna = estrenc.platja[i][1];
        if (listaColumna[0] == "total") {
          for (let j = 0; j < 30; j++) {
            ctx.rect(j * repeticion, listaFila * repeticion, repeticion, repeticion);
          }
        } else {
          for (let j = 0; j < listaColumna.length; j++) {
            ctx.rect(listaColumna[j] * repeticion, listaFila * repeticion, repeticion, repeticion);
          }
        }
      }
      ctx.fillStyle = "rgb(191, 179, 145)";
      ctx.fill();
      ctx.closePath();
 
      ctx.beginPath();
      for (let i = 0; i < estrenc.zonaverda.length; i++) {
        let listaFila = estrenc.zonaverda[i][0];
        let listaColumna = estrenc.zonaverda[i][1];
        if (listaColumna[0] == "total") {
          for (let j = 0; j < 30; j++) {
            ctx.rect(j * repeticion, listaFila * repeticion, repeticion, repeticion);
          }
        } else {
          for (let j = 0; j < listaColumna.length; j++) {
            ctx.rect(listaColumna[j] * repeticion, listaFila * repeticion, repeticion, repeticion);
          }
        }
      }
      ctx.fillStyle = "rgb(59, 94, 47)";
      ctx.fill();
      ctx.closePath();
    }

  // así dibujo los recuadros:
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
export function generarArrayTablero(mapa) {
  //Lo ideal aquí sería generar un array bidimensional, pero no son nativos de javascript
  let arrayTablero = [];
  for (let i = 0; i < filasJuego; i++) {
    arrayTablero[i] = [];
    for (let j = 0; j < columnasJuego; j++) {
      let casilla = new Object();
      casilla.idEdificio = 0;
      casilla.tipo = null;
      casilla.origenTipo = false; //En true es la casilla donde empieza la construccion
      casilla.terreno = null;
      arrayTablero[i][j] = casilla;
    }
  }

  // Ahora adapto el array tablero al mapa; si es Palma no tengo que hacer nada.

  /* MAPA S'ARENAL */
  if (mapa == "arenal") {
    for (let i = 0; i < arenal.mar.length; i++) {
      let listaFila = arenal.mar[i][0];
      let listaColumna = arenal.mar[i][1];
      if (listaColumna[0] == "total") {
        for (let j = 0; j < 30; j++) {
          arrayTablero[listaFila][j].terreno = "mar";
        }
      } else {
        for (let j = 0; j < listaColumna.length; j++) {
          arrayTablero[listaFila][listaColumna[j]].terreno = "mar";
        }
      }
    }
    for (let i = 0; i < arenal.platja.length; i++) {
      let listaFila = arenal.platja[i][0];
      let listaColumna = arenal.platja[i][1];
      if (listaColumna[0] == "total") {
        for (let j = 0; j < 30; j++) {
          arrayTablero[listaFila][j].terreno = "platja";
        }
      } else {
        for (let j = 0; j < listaColumna.length; j++) {
          arrayTablero[listaFila][listaColumna[j]].terreno = "platja";
        }
      }
    }
  }

  /* PUIGPUNYENT */
  if (mapa == "puigpunyent") {
    for (let i = 0; i < puigpunyent.zonaverda.length; i++) {
      let listaFila = puigpunyent.zonaverda[i][0];
      let listaColumna = puigpunyent.zonaverda[i][1];
      if (listaColumna[0] == "total") {
        for (let j = 0; j < 30; j++) {
          arrayTablero[listaFila][j].terreno = "zonaverda";
        }
      } else {
        for (let j = 0; j < listaColumna.length; j++) {
          arrayTablero[listaFila][listaColumna[j]].terreno = "zonaverda";
        }
      }
    }
  }

  /* MAPA ES TRENC */
  if (mapa == "estrenc") {
    for (let i = 0; i < estrenc.mar.length; i++) {
      let listaFila = estrenc.mar[i][0];
      let listaColumna = estrenc.mar[i][1];
      if (listaColumna[0] == "total") {
        for (let j = 0; j < 30; j++) {
          arrayTablero[listaFila][j].terreno = "mar";
        }
      } else {
        for (let j = 0; j < listaColumna.length; j++) {
          arrayTablero[listaFila][listaColumna[j]].terreno = "mar";
        }
      }
    }
    for (let i = 0; i < estrenc.platja.length; i++) {
      let listaFila = estrenc.platja[i][0];
      let listaColumna = estrenc.platja[i][1];
      if (listaColumna[0] == "total") {
        for (let j = 0; j < 30; j++) {
          arrayTablero[listaFila][j].terreno = "platja";
        }
      } else {
        for (let j = 0; j < listaColumna.length; j++) {
          arrayTablero[listaFila][listaColumna[j]].terreno = "platja";
        }
      }
    }
    for (let i = 0; i < estrenc.zonaverda.length; i++) {
      let listaFila = estrenc.zonaverda[i][0];
      let listaColumna = estrenc.zonaverda[i][1];
      if (listaColumna[0] == "total") {
        for (let j = 0; j < 30; j++) {
          arrayTablero[listaFila][j].terreno = "zonaverda";
        }
      } else {
        for (let j = 0; j < listaColumna.length; j++) {
          arrayTablero[listaFila][listaColumna[j]].terreno = "zonaverda";
        }
      }
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
      img.addEventListener("load", function () {}, false);
      img.src = "images/edif_xibiu.png"; //fila * repeticion, para convertir a pixeles
      ctx.drawImage(
        img,
        columna * repeticion,
        fila * repeticion,
        repeticion * 2,
        repeticion * 2
      );
      break;
    case "casa":
      img.src = "images/edif_casa.png";
      ctx.drawImage(
        img,
        columna * repeticion,
        fila * repeticion,
        repeticion * 2,
        repeticion * 2
      );
      break;
    case "xalet":
      img.src = "images/edif_xalet.png";
      ctx.drawImage(
        img,
        columna * repeticion,
        fila * repeticion,
        repeticion * 3,
        repeticion * 2
      );
      break;
    case "hotel":
      img.src = "images/edif_hotel.png";
      ctx.drawImage(
        img,
        columna * repeticion,
        fila * repeticion,
        repeticion * 4,
        repeticion * 4
      );
      break;
  }
  ctx.closePath();
}

/**
 * Dibuja la información de GameOver sobre el tablero vacío
 * @param {String} mensaje
 */
export function pintarGameOver(mensaje) {
  let canvas = document.getElementById("tablero");
  var ctx = canvas.getContext("2d");

  //Genero las letras:
  ctx.font = "160px Corleone";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = "black";
  ctx.font = "30px Open Sans";
  ctx.fillText(mensaje, canvas.width / 2, (canvas.height * 3) / 4);
}

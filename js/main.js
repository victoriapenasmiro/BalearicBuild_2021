import { Juego } from "./modules/juego.js";
import { dibujarTablero } from "./modules/canvas.js";

/**
 * Toma un edificio y lo construye, es decir, lo añade al tablero y a la matriz de juego.
 * @param {String} tipo edificio que se va a construir.
 */
function construir(tipo) {
  //TODO: controles de lo q no se puede construir, sea por falta de dinero o por instrucciones
  juego.construcciones.push(tipo);
  juego.cobrarConstruccion(tipo);
  juego.comprobarBadges();
}

/**
 * Inicio del juego.
 */
window.onload = function () {
  var juego = new Juego("Pep", 500);
  //TODO: coger lo que recibo para parámetros y meterlo por constructor
  dibujarTablero();
  juego.iniciar();

  document
    .getElementById("tablero")
    .addEventListener("click", function (event) {
      tomarCoordenadas();
    });

  document.getElementById("soborno").addEventListener("click", function () {
    juego.sobornar();
  });

  document.getElementById("traslado").addEventListener("click", function () {
    //TODO
  });

  document.getElementById("demolicion").addEventListener("click", function () {
    //TODO
  });

  document.getElementById("xibiu").addEventListener("click", function () {
    construir("xibiu");
  });

  document.getElementById("casa").addEventListener("click", function () {
    construir("casa");
  });

  document.getElementById("xalet").addEventListener("click", function () {
    construir("xalet");
  });

  document.getElementById("hotel").addEventListener("click", function () {
    construir("hotel");
  });
};

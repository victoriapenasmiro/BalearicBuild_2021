import { juego } from "./modules/game_juego.js";
import { dibujarTablero } from "./modules/game_canvas.js";

/**
 * Inicio del juego.
 */
window.onload = function () {
  //TODO: coger lo que recibo para parámetros y meterlo por constructor
  dibujarTablero();
  juego.iniciar();

  document.getElementById("tablero").addEventListener("click", function () {
    juego.seleccionarEvento();
  });

  document.getElementById("soborno").addEventListener("click", function () {
    juego.sobornar();
  });

  document.getElementById("traslado").addEventListener("click", function () {
    juego.seleccionarTraslado();    //funcion creada pero no desarrollada, TODO
  });

  document.getElementById("demolicion").addEventListener("click", function () {
    juego.seleccionarDemolicion();
  });

  document.getElementById("xibiu").addEventListener("click", function () {
    juego.elegirConstruccion("xibiu");
  });

  document.getElementById("casa").addEventListener("click", function () {
    juego.elegirConstruccion("casa");
  });

  document.getElementById("xalet").addEventListener("click", function () {
    juego.elegirConstruccion("xalet");
  });

  document.getElementById("hotel").addEventListener("click", function () {
    juego.elegirConstruccion("hotel");
  });
};
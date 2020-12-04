import { juego } from "./modules/game_juego.js";
import { dibujarTablero } from "./modules/game_canvas.js";

/*TODO revisar BUG: había contruidos dos xibius hace unos minutos, me he olvidado de la pantalla,
y ahora entro y veo que han desaparecido, pero se siguen sumando rentas*/

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
    juego.seleccionarTraslado();
  });

  document.getElementById("demolicion").addEventListener("click", function () {
    juego.seleccionarDemolicion();
  });

  document.getElementById("cancelar").addEventListener("click", function () {
    juego.cancelarEvento();                       //esto me permite cancelar cualquier evento que haya seleccionado antes: construir, demoler...
  });

  document.getElementById("salir").addEventListener("click", function () {
    juego.salir();
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

import {juego} from './modules/juego.js';
import {dibujarTablero, borrarTablero} from './modules/canvas.js';
import {tiempoRefresco} from './modules/configuracion.js';

//Función de inicio de juego
function iniciar() {
  console.log('me entra');
  //TODO: coger lo que recibo para parámetros
  var canvas = document.getElementById("tablero");
  dibujarTablero(canvas);
  canvas.addEventListener("click", function (event) {
    tomarCoordenadas();
  });
}

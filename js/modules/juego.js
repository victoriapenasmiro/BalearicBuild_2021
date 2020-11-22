import { dibujarTablero, borrarTablero, tomarCoordenadas } from "./canvas.js";
import {
  tiempoRenta,
  costeXibiu,
  rentaXibiu,
  costeCasa,
  rentaCasa,
  costeXalet,
  rentaXalet,
  costeHotel,
  rentaHotel,
  costeSoborno
} from "./configuracion.js";

export var juego = new Object();

juego.nickname = "En Pep";
juego.badge = "es Padrí";
juego.dinero = 500;
juego.construcciones = [];

juego.iniciar = function () {
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoNickname").innerHTML = juego.nickname;
  document.getElementById("juegoBadge").innerHTML = juego.badge;
  setInterval(() => {
    actualizar();
  }, tiempoRenta);
};

juego.sobornar = function () {
  //TODO: q sólo se pueda clicar cuando tienes el dinero suficiente
  //TODO: q avise con una animación cuando tienes el dinero suficiente
  //TODO: q una vez clicado se vuelva rojo y no se pueda volver a sobornar
  juego.dinero -= costeSoborno; //TODO revisar q esta es la cantidad del soborno
  juego.badge = "Benefactor Social";
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoBadge").innerHTML = juego.badge;
  mostrarEventosDinero("soborno -" + costeSoborno);
  manejarInactivos();
};

juego.cobrarConstruccion = function (tipo) {
  switch (tipo) {
    case "xibiu":
      juego.dinero -= costeXibiu;
      mostrarEventosDinero("compra xibiu -" + costeXibiu);
      break;
    case "casa":
      juego.dinero -= costeCasa;
      mostrarEventosDinero("compra casa -" + costeCasa);
      break;
    case "xalet":
      juego.dinero -= costeXalet;
      mostrarEventosDinero("compra xalet -" + costeXalet);
      break;
    case "hotel":
      juego.dinero -= costeHotel;
      mostrarEventosDinero("compra hotel -" + costeHotel);
      break;
  }
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  manejarInactivos();
};

juego.comprobarBadges = function () {
  //TODO las comprobaciones del número de tipo
};

function actualizar() {
  juego.dinero += contabilizarGanancias();
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoNickname").innerHTML = juego.nickname;
  document.getElementById("juegoBadge").innerHTML = juego.badge;
  borrarTablero();
  dibujarTablero();
  manejarInactivos();
}

function contabilizarGanancias() {
  let ganancias = 0;
  let infoGanancias = "";
  juego.construcciones.forEach((element) => {
    switch (element) {
      case "xibiu":
        ganancias += rentaXibiu;
        infoGanancias += ("renta xibiu +" + rentaXibiu + "<br>");
        break;
      case "casa":
        ganancias += rentaCasa;
        infoGanancias += ("renta casa +" + rentaCasa + "<br>");
        break;
      case "xalet":
        ganancias += rentaXalet;
        infoGanancias += ("renta xalet +" + rentaXalet + "<br>");
        break;
      case "hotel":
        ganancias += rentaHotel;
        infoGanancias += ("renta hotel +" + rentaHotel + "<br>");
        break;
    }
  });
  mostrarEventosDinero(infoGanancias);
  return ganancias;
}

/**
 * Muestra info de los cambios de $$ por pantalla
 */
function mostrarEventosDinero(texto) {
  let infoDinero = document.getElementById("eventoDinero");
  infoDinero.innerHTML = texto;
  infoDinero.style.display = "block";
  ocultarEventosDinero();
}

/**
 * Me hace ocultar automático de los cambios de $$
 */
function ocultarEventosDinero() {
  setTimeout(() => document.getElementById("eventoDinero").style.display = "none", 5000);
}

/**
 * Activa o desactiva automáticamente los diferentes botones segun si hay dinero para hacerlos.
 */
//TODO esto funcionaba con botones, ahora no tiene sentido; pensar cómo manejar inactivos
function manejarInactivos() {
    if (juego.dinero < costeXibiu) {
        document.getElementById("xibiu").disabled = true;
    } else {
        document.getElementById("xibiu").disabled = false;
    }
    if (juego.dinero < costeCasa) {
        document.getElementById("casa").disabled = true;
    } else {
        document.getElementById("casa").disabled = false;
    }
    if (juego.dinero < costeXalet) {
        document.getElementById("xalet").disabled = true;
    } else {
        document.getElementById("xalet").disabled = false;
    }
    if (juego.dinero < costeHotel) {
        document.getElementById("hotel").disabled = true;
    } else {
        document.getElementById("hotel").disabled = false;
    }
    //no manejo soborno/traslado/construccion; funcionaran diferente
}

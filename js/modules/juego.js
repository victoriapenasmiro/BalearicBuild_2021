import {
  dibujarTablero,
  generarArrayTablero,
  pintarConstruccion,
  borrarTablero,
  tomarPosicionClick,
} from "./canvas.js";
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
  costeSoborno,
} from "./configuracion.js";

export var juego = new Object();

juego.nickname = "En Pep";
juego.badge = "es Padrí";
juego.dinero = 500;
juego.construcciones = [];
juego.tablero = generarArrayTablero();
juego.tipoSeleccionado = null;

juego.iniciar = function () {
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoNickname").innerHTML = juego.nickname;
  document.getElementById("juegoBadge").innerHTML = juego.badge;
  setInterval(() => {
    actualizar();
  }, tiempoRenta);
  manejarInactivos();
};

juego.sobornar = function () {
  if (document.getElementById("juegoDinero") > costeSoborno) {
    //TODO: q sólo se pueda clicar cuando tienes el dinero suficiente
    //TODO: q avise con una animación cuando tienes el dinero suficiente
    //TODO: q una vez clicado se vuelva rojo y no se pueda volver a sobornar
    juego.dinero -= costeSoborno; //TODO revisar q esta es la cantidad del soborno
    juego.badge = "Benefactor Social";
    document.getElementById("juegoDinero").innerHTML = juego.dinero;
    document.getElementById("juegoBadge").innerHTML = juego.badge;
    mostrarEventosDinero("soborno -" + costeSoborno);
    manejarInactivos();
  } else {
    mostrarEventosDinero("falta $$$ de soborno!");
  }
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
  // borrarTablero();
  // dibujarTablero();
  manejarInactivos();
}

function contabilizarGanancias() {
  let ganancias = 0;
  let infoGanancias = "";
  juego.construcciones.forEach((element) => {
    switch (element) {
      case "xibiu":
        ganancias += rentaXibiu;
        infoGanancias += "renta xibiu +" + rentaXibiu + "<br>";
        break;
      case "casa":
        ganancias += rentaCasa;
        infoGanancias += "renta casa +" + rentaCasa + "<br>";
        break;
      case "xalet":
        ganancias += rentaXalet;
        infoGanancias += "renta xalet +" + rentaXalet + "<br>";
        break;
      case "hotel":
        ganancias += rentaHotel;
        infoGanancias += "renta hotel +" + rentaHotel + "<br>";
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
  setTimeout(
    () => (document.getElementById("eventoDinero").style.display = "none"),
    6000
  );
}

/**
 * Toma un edificio y lo construye, es decir, lo añade al tablero y a la matriz de juego.
 * @param {String} tipo edificio que se va a construir.
 */
juego.elegirConstruccion = function (tipo) {
  //TODO: controles de lo q no se puede construir, sea por falta de espacio o casa previa o por instrucciones
  let coste = 0;
  switch (tipo) {
    case "xibiu":
      coste = costeXibiu;
      break;
    case "casa":
      coste = costeCasa;
      break;
    case "xalet":
      coste = costeXalet;
      break;
    case "hotel":
      coste = costeHotel;
      break;
  }
  let costeMaximo = document.getElementById("juegoDinero").innerHTML;
  if (coste <= costeMaximo) {     //con esto controlo q no haga nada si no hay pasta
    this.construcciones.push(tipo);
    this.tipoSeleccionado = tipo;
    document.getElementById("tablero").style.cursor = "grabbing";
  }
};

/**
 * Construye el edificio seleccionado al clicar sobre el juego.
 */
juego.construir = function () {
  if (this.tipoSeleccionado != null) {
    let posicion = tomarPosicionClick();
    //TODO : q si clico fuera me avise
    //TODO: q me compruebe si puedo construir donde clico
    pintarConstruccion(this.tipoSeleccionado, posicion[0], posicion[1]);
    this.actualizarTablero(this.tipoSeleccionado, posicion[0], posicion[1]); //TODO
    this.cobrarConstruccion(this.tipoSeleccionado);
    this.comprobarBadges();
    //devuelvo el cursor a su version original
    document.getElementById("tablero").style.cursor = "pointer";
    //TODO q al reimprimir me reimprima también las construcciones
    this.tipoSeleccionado = null;
  }
};

/**
 * Añade la construcción recién creada al array para poder repintarla.
 * @param {String} tipo
 * @param {int} fila
 * @param {int} columna
 */
juego.actualizarTablero = function (tipo, fila, columna) {
  //TODO, necesario para operaciones

  switch (tipo) {
    case "xibiu":
      //TODO
      break;
    case "casa":
      break;
    case "xalet":
      break;
    case "hotel":
      break;
  }
};

/**
 * Activa o desactiva automáticamente los diferentes botones segun si hay dinero para hacerlos.
 */
//TODO esto funcionaba con botones, ahora no tiene sentido; pensar cómo manejar inactivos
function manejarInactivos() {
  if (juego.dinero < costeXibiu) {
    document.getElementById("xibiu").style.backgroundColor = "black";
    document.getElementById("xibiu").style.color = "white";
    document.getElementById("xibiu").style.cursor = "none";
  } else {
    document.getElementById("xibiu").style.backgroundColor = "rgb(142, 35, 27)"; //ver https://stackoverflow.com/questions/13712697/set-background-color-in-hex
    document.getElementById("xibiu").style.color = "black";
    document.getElementById("xibiu").style.cursor = "grab";
  }
  if (juego.dinero < costeCasa) {
    document.getElementById("casa").style.backgroundColor = "black";
    document.getElementById("casa").style.color = "white";
    document.getElementById("casa").style.cursor = "none";
    //TODO: quitarle el listener?
  } else {
    document.getElementById("casa").style.backgroundColor = "rgb(142, 35, 27)";
    document.getElementById("casa").style.color = "black";
    document.getElementById("casa").style.cursor = "grab";
  }
  if (juego.dinero < costeXalet) {
    document.getElementById("xalet").style.backgroundColor = "black";
    document.getElementById("xalet").style.color = "white";
    document.getElementById("xalet").style.cursor = "none";
  } else {
    document.getElementById("xalet").style.backgroundColor = "rgb(142, 35, 27)";
    document.getElementById("xalet").style.color = "black";
    document.getElementById("xalet").style.cursor = "grab";
  }
  if (juego.dinero < costeHotel) {
    document.getElementById("hotel").style.backgroundColor = "black";
    document.getElementById("hotel").style.color = "white";
    document.getElementById("hotel").style.cursor = "none";
  } else {
    document.getElementById("hotel").style.backgroundColor = "rgb(142, 35, 27)";
    document.getElementById("hotel").style.color = "black";
    document.getElementById("hotel").style.cursor = "grab";
  }
  //no manejo soborno/traslado/construccion; funcionaran diferente?? TODO pensar
}

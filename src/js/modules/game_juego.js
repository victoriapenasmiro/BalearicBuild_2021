import {
  borrarTablero,
  dibujarTablero,
  generarArrayTablero,
  pintarConstruccion,
  tomarPosicionClick,
} from "./game_canvas.js";
import {
  tiempoRenta,
  tiempoSorpresa,
  cantidadSorpresa,
  costeXibiu,
  rentaXibiu,
  costeCasa,
  rentaCasa,
  costeXalet,
  rentaXalet,
  costeHotel,
  rentaHotel,
  costeSoborno,
  filasJuego,
  columnasJuego,
  dineroFacil,
  dineroDificil,
} from "./game_configuracion.js";

export var juego = parametrosJuego();

/**
 * Función para recuperar los parámetros de juego enviados por GET
 */
export function parametrosJuego() {
  //Recupera los parametros de la URL
  let queryString = window.location.search;
  let parametrosJuego = queryString.split("&");
  let nick, mapa, dificultad, personaje;

  parametrosJuego.forEach((element) => {
    let valores = element.split("=");
    if (valores[0].includes("nickname")) {
      nick = valores[1];
    } else if (valores[0].includes("mapa")) {
      mapa = valores[1];
    } else if (valores[0].includes("dificultad")) {
      dificultad = valores[1];
    } else if (valores[0].includes("personaje")) {
      personaje = decodeURIComponent(valores[1]); //descodifico la URL de la imagen
    }
  });

  juego = new Juego(nick, mapa, dificultad, personaje); //creo el juego

  return juego;
}

/* CONSTRUCTOR */
function Juego(nickname, mapa, dificultad, personaje) {
  this.nickname = nickname;
  this.mapa = mapa;
  if (dificultad == "dificultadFacil") {
    this.dinero = dineroFacil;
  } else {
    this.dinero = dineroDificil;
  }
  this.personaje = personaje;
  this.badge = "";
  this.tablero = generarArrayTablero();
  this.soborno = false;
  this.xalet = false;
  this.hotel = false;
  this.contadorEdificio = 0; //manera simple de saber qué se construye; funciona como un id para cada construcción
  this.tipoSeleccionado = null; //hace ref a la propiedad indicada
  this.tipoSeleccionadoDemoler = false;
  this.tipoSeleccionadoTrasladar = false;
}

/**
 * Efectúa las operaciones iniciales del juego: sitúa propiedades en pantalla y define el canvas.
 */
juego.iniciar = function () {
  this.comprobarBadges();
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoNickname").innerHTML = juego.nickname;
  document.getElementById("juegoBadge").innerHTML = juego.badge;
  let contenedor = document
    .getElementsByTagName("nav")[0]
    .getElementsByTagName("div")[1];
  let avatar = document.createElement("img");
  avatar.src = juego.personaje;
  contenedor.appendChild(avatar);
  // Intervalo de configuración de la renta:
  setInterval(() => {
    this.actualizar();
  }, tiempoRenta);
  // Intervalo de configuración de los eventos aleatorios:
  setInterval(() => {
    this.manejarSorpresa();
  }, tiempoSorpresa);

  this.manejarInactivos();
};

/**
 * Realiza las operaciones para sobornar y poder construir chalets si se tiene el dinero suficiente;
 * de lo contrario lo avisa por el div de eventos de dinero.
 */
juego.sobornar = function () {
  if (document.getElementById("juegoDinero").innerHTML >= costeSoborno) {
    //TODO: q avise con una animación cuando tienes el dinero suficiente
    //TODO: q una vez clicado se vuelva rojo y no se pueda volver a sobornar
    juego.dinero -= costeSoborno;
    juego.xalet = true;
    document.getElementById("juegoDinero").innerHTML = juego.dinero;
    mostrarEventosDinero("soborno -" + costeSoborno);
    this.soborno = true;
    this.comprobarBadges();
    this.manejarInactivos();
  } else {
    mostrarEventosDinero("No tens $$ per surbornar!");
  }
};

/**
 * Realiza los cálculos para cobrar la renta de cada construcción
 * @param {String} tipo de edificio
 */
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
  this.manejarInactivos();
};

/**
 * Comprueba los requisitos del jugador para los diferentes títulos.
 * Estructura if/else de título más importante (= el que se muestra) a menos.
 */
juego.comprobarBadges = function () {
  if (this.contarEdificios("hotel") >= 2) {
    this.badge = "Empresari Ecològic";
  } else if (
    this.contarEdificios("casa") >= 2 &&
    this.contarEdificios("xalet") >= 2
  ) {
    this.badge = "Gran Empresari";
    // Una vez puede construir un hotel, aunque luego caiga por crisis podrá seguir construyéndolo.
    this.hotel = true;
  } else if (this.soborno == true) {
    this.badge = "Benefactor Social";
  } else {
    this.badge = "es Padrí";
  }
  document.getElementById("juegoBadge").innerHTML = this.badge;
};

/**
 * Cuenta cuántos edificios de un tipo hay en el array.
 * @param {String} tipo
 */
juego.contarEdificios = function (tipo) {
  let total = this.obtenerListaEdificios().reduce(function (n, val) {
    return n + (val === tipo);
  }, 0);
  return total;
};

/**
 * Actualiza el dinero y los títulos según avanza el tiempo.
 * No hace falta actualizar aquí el tablero porque no hay cambios en él.
 */
juego.actualizar = function () {
  this.dinero += this.contabilizarGanancias();
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoBadge").innerHTML = juego.badge;
  this.manejarInactivos();
};

/**
 * Calcula la suma de rentas.
 */
juego.contabilizarGanancias = function () {
  let ganancias = 0;
  let infoGanancias = "";
  this.obtenerListaEdificios().forEach((element) => {
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
  //aquí meto el sonido
  if (ganancias != 0) {
    let sonidoDinero = new sound("../resources/sound/cash.mp3");
    sonidoDinero.play();
  }
  mostrarEventosDinero(infoGanancias);
  return ganancias;
};

/**
 * Muestra info de los cambios de $$ por pantalla
 */
function mostrarEventosDinero(texto) {
  let infoDinero = document.getElementById("eventoDinero");
  infoDinero.innerHTML = texto;
  infoDinero.style.display = "block";
  ocultarEventosDinero(5000);
}

/**
 * Hace ocultar automático de los cambios de $$
 */
function ocultarEventosDinero(tiempo) {
  setTimeout(
    () => (document.getElementById("eventoDinero").style.display = "none"),
    tiempo
  );
}

/**
 * Maneja el evento de click sobre el tablero en función del botón que se haya pulsado antes.
 */
juego.seleccionarEvento = function () {
  let posicion = tomarPosicionClick();
  if (this.tipoSeleccionado != null) {
    this.construir(posicion);
  } else if (this.tipoSeleccionadoTrasladar) {
    this.trasladar(posicion);
  } else if (this.tipoSeleccionadoDemoler) {
    this.demoler(posicion);
  }
};

/**
 * Toma un edificio y lo construye, es decir, lo añade al tablero y a la matriz de juego.
 * @param {String} tipo edificio que se va a construir.
 */
juego.elegirConstruccion = function (tipo) {
  let coste = 0;
  let construible = true;
  switch (tipo) {
    case "xibiu":
      coste = costeXibiu;
      break;
    case "casa":
      coste = costeCasa;
      break;
    case "xalet":
      coste = costeXalet;
      if (!this.xalet) {
        construible = false;
      }
      break;
    case "hotel":
      coste = costeHotel;
      if (!this.hotel) {
        construible = false;
      }
      break;
  }
  if (coste > document.getElementById("juegoDinero")) {
    construible = false;
  }
  if (construible) {
    this.tipoSeleccionado = tipo;
    document.getElementById("tablero").style.cursor = "grabbing";
  }
};

/**
 * Construye el edificio seleccionado al clicar sobre el juego.
 */
juego.construir = function (posicion) {
  if (this.comprobarSiConstruible(posicion)) {
    this.contadorEdificio++; // aumento el contador de edificios para hacer única cada construcción
    this.actualizarTablero(this.tipoSeleccionado, posicion[1], posicion[0]);
    pintarConstruccion(this.tipoSeleccionado, posicion[1], posicion[0]);
    this.cobrarConstruccion(this.tipoSeleccionado);
    // Sonido:
    let sonidoConstruccion = new sound("../resources/sound/build.wav");
    sonidoConstruccion.play();
    document.getElementById("tablero").style.cursor = "pointer"; // devuelvo el cursor a su version original
    this.tipoSeleccionado = null;
    this.comprobarBadges();
  } else {
    let sonidoProhibido = new sound("../resources/sound/forbidden.wav");
    sonidoProhibido.play();
  }
};

/**
 * Comprueba si donde pulso con el ratón se puede construir.
 * Confirma que la casilla exista y que no haya nada previamente construido
 */
juego.comprobarSiConstruible = function (posicion) {
  let ancho = 0;
  let alto = 0;
  switch (this.tipoSeleccionado) {
    case "xibiu":
    case "casa":
      ancho = 2;
      alto = 2;
      break;
    case "xalet":
      ancho = 3;
      alto = 2;
      break;
    case "hotel":
      ancho = 4;
      alto = 4;
      break;
  }
  for (let i = posicion[1]; i < posicion[1] + alto; i++) {
    if (i >= filasJuego) {
      // Si se sale del tablero no puedo construir
      return false;
    } else {
      for (let j = posicion[0]; j < posicion[0] + ancho; j++) {
        if (j >= columnasJuego) {
          return false;
        } else if (this.tablero[i][j].tipo != null) {
          return false;
        }
      }
    }
  }
  return true;
};

/**
 * Comprueba si donde he pulsado con el ratón existe un edificio.
 * @param {array} posicion
 */
juego.comprobarSiEdificio = function (posicion) {
  if (this.tablero[posicion[1]][posicion[0]].tipo != null) {
    return true;
  }
  return false;
};

/**
 * Añade el origen de la construcción recién creada al array para poder repintarla.
 * @param {String} tipo
 * @param {int} fila
 * @param {int} columna
 */
juego.actualizarTablero = function (tipo, fila, columna) {
  let ancho = 0;
  let alto = 0;
  switch (tipo) {
    case "xibiu":
    case "casa":
      ancho = 2;
      alto = 2;
      break;
    case "xalet":
      ancho = 3;
      alto = 2;
      break;
    case "hotel":
      ancho = 4;
      alto = 4;
      break;
  }
  for (let i = fila; i < fila + alto; i++) {
    for (let j = columna; j < columna + ancho; j++) {
      this.tablero[i][j].tipo = tipo;
      this.tablero[i][j].idEdificio = this.contadorEdificio;
    }
  }
  this.tablero[fila][columna].origenTipo = true;
};

/**
 * Toma las construcciones del array de apoyo y las dibuja en un canvas vacío.
 */
juego.dibujarConstrucciones = function () {
  for (let i = 0; i < filasJuego; i++) {
    for (let j = 0; j < columnasJuego; j++) {
      //si es el origen de una casa (es decir, origentipo == true)
      if (this.tablero[i][j].origenTipo) {
        pintarConstruccion(this.tablero[i][j].tipo, i, j);
      }
    }
  }
};

/**
 * Determina si se va a producir un evento sorpresa o no.
 * La posibilidad de que se produzca es del 50%.
 */
juego.manejarSorpresa = function () {
  let randomBoolean = Math.random() < 0.5;
  if (randomBoolean) {
    this.eventoSorpresa();
  }
};

/**
 * Controla los eventos aleatorios: si se llama,
 * elige una de las cuatro opciones y la desarrolla.
 */
juego.eventoSorpresa = function () {
  let eventos = ["crisi", "promoció", "infracció", "premi"];
  let evento = eventos[Math.floor(Math.random() * eventos.length)];
  console.log(evento);
  let listaEdificios = this.obtenerListaEdificios();
  switch (evento) {
    case "crisi":
      if (listaEdificios.includes("casa")) {
        this.eventoCrisis();
        //this.mostrarImgEvento("/images/event_crisi.png");
      }
      break;
    case "promoció":
      if (listaEdificios.includes("xibiu")) {
        this.eventoPromocion();
        //this.mostrarImgEvento("/images/event_promocio.png");
      }
      break;
    case "infracció":
      if (listaEdificios.includes("xibiu")) {
        this.dinero -= cantidadSorpresa;
        //this.mostrarImgEvento("/images/event_infraccio.png");
      }
      break;
    case "premi":
      if (
        listaEdificios.length != 0 &&
        !listaEdificios.includes("xibiu")
      ) {
        //si no está vacío y no tiene chabolas
        this.dinero += cantidadSorpresa;
        //this.mostrarImgEvento("/images/event_premi.png");
      }
      break;
  }
  this.comprobarBadges();
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoBadge").innerHTML = juego.badges;
  this.manejarInactivos();
};

/**
 * Pierde todos los edificios de tipo casa.
 */
juego.eventoCrisis = function () {
  // Convierto las casas en la matriz bidimensional
  for (let i = 0; i < filasJuego; i++) {
    for (let j = 0; j < columnasJuego; j++) {
      if (this.tablero[i][j].tipo == "casa") {
        this.tablero[i][j].tipo = null;
        this.tablero[i][j].origenTipo = false;
        this.tablero[i][j].idEdificio = 0;
      }
    }
  }

  // Repinto el tablero
  borrarTablero();
  dibujarTablero();
  this.dibujarConstrucciones();

  // Manejo badges e inactivos
  this.comprobarBadges();
  this.manejarInactivos();
};

/**
 * Todas las chabolas se convierten en casas.
 */
juego.eventoPromocion = function () {
  // Convierto las chabolas en casas en la matriz bidimensional: igual tamaño
  for (let i = 0; i < filasJuego; i++) {
    for (let j = 0; j < columnasJuego; j++) {
      if (this.tablero[i][j].tipo == "xibiu") {
        this.tablero[i][j].tipo = "casa";
      }
    }
  }

  // Repinto el tablero
  borrarTablero();
  dibujarTablero();
  this.dibujarConstrucciones();

  // Manejo badges e inactivos
  this.comprobarBadges();
  this.manejarInactivos();
};

/**
 * TODO COMPLETAR VICKY
 */
juego.seleccionarTraslado = function () {
  //TODO ¿podría unificarse con seleccionarDemolicion(), no???
  this.seleccionarDemolicion();
};

/**
 * Toma una construcción y la cambia de sitio.
 * TODO VICKY
 */
juego.trasladar = function (posicion) {
  /* 1- comprobar que se selecciona una construccion
  2- comprobar que donde se quiere mover la construccion se puede construir
  3- mover construccion --> modificar la array de apoyo (this.tablero)
  4- repinto el mapa
  */
};

/**
 * Al elegir demoler, realiza las operaciones básicas.
 */
juego.seleccionarDemolicion = function () {
  if (this.tablero.length > 0) {
    //sólo puedo demoler si hay algún edificio en lista
    document.getElementById("tablero").style.cursor = "grab";
    this.tipoSeleccionadoDemoler = true;
  }
};

/**
 * Toma una construcción seleccionada y la elimina.
 */
juego.demoler = function (posicion) {
  if (this.comprobarSiEdificio(posicion)) {
    this.borrarEdificio(posicion);
    let sonidoDemoler = new sound("../resources/sound/demolish.wav");
    sonidoDemoler.play();

    // Repinto mapa:
    borrarTablero();
    dibujarTablero();
    this.dibujarConstrucciones();
    document.getElementById("tablero").style.cursor = "pointer";

    // Manejo eventos
    this.comprobarBadges();
    this.manejarInactivos();
  } else {
    console.log("No hay edificio para demoler."); //este mensaje es para pruebas
  }
  this.tipoSeleccionadoDemoler = false;
};

/**
 * Borra un edicio del tablero y del array de construcciones partiendo de su posición.
 * @param {*} posicion
 */
juego.borrarEdificio = function (posicion) {
  let tipoBorrado = this.tablero[posicion[1]][posicion[0]].tipo;
  let idBorrado = this.tablero[posicion[1]][posicion[0]].idEdificio;
  for (let i = 0; i < filasJuego; i++) {
    for (let j = 0; j < columnasJuego; j++) {
      if (this.tablero[i][j].idEdificio == idBorrado) {
        this.tablero[i][j].idEdificio = 0;
        this.tablero[i][j].tipo = "null";
        this.tablero[i][j].origenTipo = false;
      }
    }
  }
};

/**
 * Permite cancelar cualquier evento seleccionado previamente.
 */
juego.cancelarEvento = function () {
  this.tipoSeleccionado = null;
  this.tipoSeleccionadoDemoler = false;
  this.tipoSeleccionadoTrasladar = false;
  document.getElementById("tablero").style.cursor = "pointer";
};

/**
 * Recorre el tablero y devuelve una lista de tipos de edificio
 */
juego.obtenerListaEdificios = function () {
  let listaEdificios = [];
  for (let i = 0; i < filasJuego; i++) {
    for (let j = 0; j < columnasJuego; j++) {
      if (this.tablero[i][j].origenTipo) {
        let tipo = this.tablero[i][j].tipo;
        listaEdificios.push(tipo);
      }
    }
  }
  return listaEdificios;
};

/**
 * Activa o desactiva automáticamente los diferentes botones segun si hay dinero para hacerlos.
 */
juego.manejarInactivos = function () {
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
  } else {
    document.getElementById("casa").style.backgroundColor = "rgb(142, 35, 27)";
    document.getElementById("casa").style.color = "black";
    document.getElementById("casa").style.cursor = "grab";
  }
  if (juego.dinero < costeXalet || !juego.xalet) {
    document.getElementById("xalet").style.backgroundColor = "black";
    document.getElementById("xalet").style.color = "white";
    document.getElementById("xalet").style.cursor = "none";
  } else {
    document.getElementById("xalet").style.backgroundColor = "rgb(142, 35, 27)";
    document.getElementById("xalet").style.color = "black";
    document.getElementById("xalet").style.cursor = "grab";
  }
  if (juego.dinero < costeHotel || !juego.hotel) {
    document.getElementById("hotel").style.backgroundColor = "black";
    document.getElementById("hotel").style.color = "white";
    document.getElementById("hotel").style.cursor = "none";
  } else {
    document.getElementById("hotel").style.backgroundColor = "rgb(142, 35, 27)";
    document.getElementById("hotel").style.color = "black";
    document.getElementById("hotel").style.cursor = "grab";
  }
};

/**
 * Controla sonidos; ver w3s.
 * @param {*} src
 */
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

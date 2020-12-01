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
} from "./game_configuracion.js";

export var juego = new Object();

juego.nickname = "En Pep";
juego.badge = "";
juego.dinero = 500;
juego.construcciones = [];
juego.tablero = generarArrayTablero();
juego.soborno = false;
juego.xalet = false;
juego.hotel = false;
juego.contadorEdificio = 0; //manera simple de saber qué se construye; funciona como un id para cada construcción
juego.tipoSeleccionado = null;

/* CONSTRUCTOR */
function Juego(nickname, personaje) {
  //TODO mapa y dificultad
  this.nickname = nickname;
  this.personaje = personaje;
  this.badge = "";
  this.dinero = 500;
  this.construcciones = [];
  this.tablero = generarArrayTablero();
  this.soborno = false;
  this.xalet = false;
  this.hotel = false;
  this.contadorEdificio = 0; //manera simple de saber qué se construye; funciona como un id para cada construcción
  this.tipoSeleccionado = null; //hace ref a la propiedad indicada
  this.tipoSeleccionadoDemoler = false;
  this.tipoSeleccionadoTrasladar = false; //TODO ¿Se necesita realmente? no podría utilizarse el de demoler? al fin y al cabo, un traslado es una demolicion + contrucción
}

juego.iniciar = function () {
  this.comprobarBadges();
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoNickname").innerHTML = juego.nickname;
  document.getElementById("juegoBadge").innerHTML = juego.badge;
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

juego.sobornar = function () {
  if (document.getElementById("juegoDinero").innerHTML >= costeSoborno) {
    //TODO: q sólo se pueda clicar cuando tienes el dinero suficiente
    //TODO: q avise con una animación cuando tienes el dinero suficiente
    //TODO: q una vez clicado se vuelva rojo y no se pueda volver a sobornar
    juego.dinero -= costeSoborno;
    juego.xalet = true;
    document.getElementById("juegoDinero").innerHTML = juego.dinero;
    document.getElementById("juegoBadge").innerHTML = juego.badge;
    mostrarEventosDinero("soborno -" + costeSoborno);
    this.soborno = true;
    this.comprobarBadges();
    this.manejarInactivos();
  } else {
    mostrarEventosDinero("No tens $$ per surbornar!");
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
  this.manejarInactivos();
};

/**
 * Comprueba los requisitos del jugador para los diferentes títulos.
 * Estructura if/else de título más importante (= el que se muestra) a menos.
 */
juego.comprobarBadges = function () {
  if (this.contarEdificios("hotel") > 2) {
    this.badge = "Empresari Ecològic";
  } else if (
    this.contarEdificios("casa") > 2 &&
    this.contarEdificios("xalet") > 2
  ) {
    this.badge = "Gran Empresari";
    // Una vez puede construir un hotel, aunque luego caiga por crisis podrá seguir construyéndolo.
    this.hotel = true;
  } else if (this.soborno == true) {
    this.badge = "Benefactor Social";
  } else {
    this.badge = "es Padrí";
  }
};

/**
 * Cuenta cuántos edificios de un tipo hay en el array. TODO, usarla en la suna de alquileres?
 * Para reduce, ver: https://www.w3schools.com/jsref/jsref_reduce.asp
 * @param {String} tipo
 */
juego.contarEdificios = function (tipo) {
  var total = this.construcciones.reduce(function (n, val) {
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
  this.construcciones.forEach((element) => {
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

juego.seleccionarEvento = function () {
  let posicion = tomarPosicionClick(); //TODO mirar event
  if (this.tipoSeleccionado != null) {
    this.construir(posicion);
  } else if (this.tipoSeleccionadoTrasladar == true) {
    this.trasladar(posicion);
  } else if (this.tipoSeleccionadoDemoler == true) {
    this.demoler(posicion);
  }
};

/**
 * Toma un edificio y lo construye, es decir, lo añade al tablero y a la matriz de juego.
 * @param {String} tipo edificio que se va a construir.
 */
juego.elegirConstruccion = function (tipo) {
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
  this.tipoSeleccionado = tipo;
  document.getElementById("tablero").style.cursor = "grabbing";
  /* } */
};

/**
 * Construye el edificio seleccionado al clicar sobre el juego.
 */
juego.construir = function (posicion) {
  if (this.comprobarSiConstruible(posicion)) {
    this.construcciones.push(this.tipoSeleccionado);
    this.contadorEdificio++; // aumento el contador de edificios para hacer única cada construcción
    pintarConstruccion(this.tipoSeleccionado, posicion[0], posicion[1]);
    this.actualizarTablero(this.tipoSeleccionado, posicion[0], posicion[1]);
    this.cobrarConstruccion(this.tipoSeleccionado);
    this.comprobarBadges();
    // Sonido:
    let sonidoConstruccion = new sound("../resources/sound/build.wav");
    sonidoConstruccion.play();
    document.getElementById("tablero").style.cursor = "pointer"; // devuelvo el cursor a su version original
    this.tipoSeleccionado = null;
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
  let x = 0;
  let y = 0;
  switch (this.tipoSeleccionado) {
    case "xibiu":
    case "casa":
      x = 2;
      y = 2;
      break;
    case "xalet":
      x = 3;
      y = 2;
      break;
    case "hotel":
      x = 4;
      y = 4;
      break;
  }
  for (let i = posicion[0]; i < posicion[0] + x; i++) {
    if (i >= columnasJuego) {
      // Si se sale del tablero no puedo construir
      return false;
    } else {
      for (let j = posicion[1]; j < posicion[1] + y; j++) {
        if (j >= filasJuego) {
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
  if (this.tablero[posicion[0]][posicion[1]].tipo != null) {
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
  // Busco la casilla a la que afecta el origen del tipo:
  for (let i = 0; i < filasJuego; i++) {
    if (i == fila) {
      for (let j = 0; j < columnasJuego; j++) {
        if (j == columna) {
          this.actualizarTableroEntorno(tipo, i, j);
        }
      }
    }
  }
};

/**
 * Actualiza el array en sí.
 * @param {*} tipo
 * @param {*} fila
 * @param {*} columna
 */
juego.actualizarTableroEntorno = function (tipo, fila, columna) {
  let x = 0;
  let y = 0;
  switch (tipo) {
    case "xibiu":
    case "casa":
      x = 2;
      y = 2;
      break;
    case "xalet":
      x = 3;
      y = 2;
      break;
    case "hotel":
      x = 4;
      y = 4;
      break;
  }
  for (let i = fila; i < fila + x; i++) {
    for (let j = columna; j < columna + y; j++) {
      this.tablero[i][j].tipo = tipo;
      this.tablero[i][j].idEdificio = this.contadorEdificio;
      if (i == fila && j == columna) {
        this.tablero[i][j].origenTipo = true;
      } else {
        this.tablero[i][j].origenTipo = false;
      }
    }
  }
};

/**
 * Toma las construcciones del array de apoyo y las dibuja en un canvas vacío.
 */
juego.dibujarConstrucciones = function () {
  for (let i = 0; i < columnasJuego; i++) {
    for (let j = 0; i < filasJuego; i++) {
      //si es el origen de una casa (es decir, origentipo == true)
      if (this.tablero[i][j].origenTipo) {
        pintarConstruccion(this.tablero[i][j].tipo, i, j); //TODO comprobar la formulacion
      }
    }
  }
};

/**
 * Determina si se va a producir un evento sorpresa o no. La posibilidad de que se produzca es del 50%.
 */
juego.manejarSorpresa = function () {
  let randomBoolean = Math.random() < 0.5;
  if (randomBoolean) {
    this.eventoSorpresa();
  }
};

/**
 * Controla los eventos aleatorios: si se llama, elige una de las cuatro opciones y la desarrolla.
 */
juego.eventoSorpresa = function () {
  let eventos = ["crisi", "promoció", "infracció", "premi"];
  //TODO meterle la imagen, q no aparezca por consola solo
  let evento = eventos[Math.floor(Math.random() * eventos.length)];
  console.log(evento);
  switch (evento) {
    case "crisi":
      if (this.construcciones.includes("casa")) {
        this.eventoCrisis();
      }
      break;
    case "promoció":
      if (this.construcciones.includes("xibiu")) {
        this.eventoPromocion();
      }
      break;
    case "infracció":
      if (this.construcciones.includes("xibiu")) {
        this.dinero -= cantidadSorpresa;
      }
      break;
    case "premi":
      if (
        this.construcciones.length != 0 &&
        !this.construcciones.includes("xibiu")
      ) {
        //si no está vacío y no tiene chabolas
        this.dinero += cantidadSorpresa;
      }
      break;
  }
  this.comprobarBadges();
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoBadge").innerHTML = juego.badges;
  mostrarEventosDinero(evento.toUpperCase() + "!!!");
  this.manejarInactivos();
};

/**
 * Pierde todos los edificios de tipo casa.
 */
juego.eventoCrisis = function () {
  // 1. Quito las chabolas en .construcciones
  this.construcciones.filter((edificio) => {
    //TODO comprobar que esto está bien formulado
    return edificio != "xibiu";
  });

  // 2. Convierto las chabolas en la matriz bidimensional
  for (let i = 0; i < this.tablero.length; i++) {
    for (let j = 0; j < this.tablero[i].length; j++) {
      if (this.tablero[i][j].tipo == "xibiu") {
        this.tablero[i][j].tipo = null;
        this.tablero[i][j].origenTipo = null;
      }
    }
  }

  // 3. Limpio el tablero
  borrarTablero();

  // 4. Repinto el tablero
  dibujarTablero();
  this.dibujarConstrucciones();

  // 5. Manejo badges e inactivos
  this.comprobarBadges();
  this.manejarInactivos();
};

/**
 * Todas las chabolas se convierten en casa.
 */
juego.eventoPromocion = function () {
  // 1. Convierto las chabolas en casas en .construcciones
  this.construcciones.map((edificio) => {
    //TODO comprobar que esto está bien formulado
    if (edificio == "xibiu") {
      return "casa";
    }
  });

  // 2. Convierto las chabolas en casas en la matriz bidimensional: igual tamaño
  for (let i = 0; i < this.tablero.length; i++) {
    for (let j = 0; j < this.tablero[i].length; j++) {
      if (this.tablero[i][j].tipo == "xibiu") {
        this.tablero[i][j].tipo = "casa";
      }
    }
  }

  // 3. Limpio el tablero
  borrarTablero();

  // 4. Repinto el tablero
  dibujarTablero();
  this.dibujarConstrucciones();

  // 5. Manejo badges e inactivos
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
  //TODO copiado de demoler
  if (this.comprobarSiEdificio(posicion)) {
    for (let i = 0; i < columnasJuego; i++) {
      for (let j = 0; j < filasJuego; j++) {
        if (
          this.tablero[i][j].idEdificio ==
          this.tablero[posicion[0]][posicion[1]].idEdificio
        ) {
          this.tablero[i][j].idEdificio = "";
          this.tablero[i][j].tipo = "null";
          this.tablero[i][j].origenTipo = "null";
        }
      }
    }
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
    console.log("No hay edificio para demoler."); //TODO este mensaje es para pruebas
  }
  this.tipoSeleccionadoDemoler = false;
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
    for (let i = 0; i < columnasJuego; i++) {
      for (let j = 0; j < filasJuego; j++) {
        if (
          this.tablero[i][j].idEdificio ==
          this.tablero[posicion[0]][posicion[1]].idEdificio
        ) {
          this.tablero[i][j].idEdificio = "";
          this.tablero[i][j].tipo = "null";
          this.tablero[i][j].origenTipo = "null";
        }
      }
    }
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
    console.log("No hay edificio para demoler."); //TODO este mensaje es para pruebas
  }
  this.tipoSeleccionadoDemoler = false;
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
  } else if (juego.xalet == true) {
    document.getElementById("xalet").style.backgroundColor = "rgb(142, 35, 27)";
    document.getElementById("xalet").style.color = "black";
    document.getElementById("xalet").style.cursor = "grab";
  }
  if (juego.dinero < costeHotel) {
    document.getElementById("hotel").style.backgroundColor = "black";
    document.getElementById("hotel").style.color = "white";
    document.getElementById("hotel").style.cursor = "none";
  } else if (juego.hotel == true) {
    document.getElementById("hotel").style.backgroundColor = "rgb(142, 35, 27)";
    document.getElementById("hotel").style.color = "black";
    document.getElementById("hotel").style.cursor = "grab";
  }
  //no manejo soborno/traslado/construccion; funcionaran diferente?? TODO pensar
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

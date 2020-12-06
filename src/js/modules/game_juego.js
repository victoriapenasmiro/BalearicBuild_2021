import {
  borrarTablero,
  dibujarTablero,
  generarArrayTablero,
  pintarConstruccion,
  tomarPosicionClick,
  pintarGameOver
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
  this.tablero = generarArrayTablero(this.mapa);
  this.soborno = false;
  this.xalet = false;
  this.hotel = false;
  this.contadorEdificio = 0; //manera simple de saber qué se construye; funciona como un id para cada construcción
  this.tipoSeleccionado = null; //hacen ref a la propiedad indicada
  this.tipoSeleccionadoDemoler = false;
  this.tipoSeleccionadoTrasladar = false;
  this.posOrigenTraslado = null; //Necesaria para guardar la posición de origen en los traslados
  this.cambioEvento = seleccionarCasa; // auxiliar para ir modificando el evento en el traslado
}


/**
 * Efectúa las operaciones iniciales del juego: sitúa propiedades en pantalla y define el canvas.
 */
juego.iniciar = function () {
  dibujarTablero(this.mapa);
  this.comprobarBadges();

  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  document.getElementById("juegoNickname").innerHTML = juego.nickname;
  document.getElementById("juegoBadge").innerHTML = juego.badge;
  let contenedor = document.getElementById("imgPj");
  let avatar = document.createElement("img");
  avatar.src = juego.personaje;
  contenedor.appendChild(avatar);

  // Intervalo de configuración de la renta:
  this.intervaloBase = setInterval(() => {
    this.actualizar();
  }, tiempoRenta);
  // Intervalo de configuración de los eventos aleatorios:
  this.intervaloSorpresa = setInterval(() => {
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
    juego.dinero -= costeSoborno;
    juego.xalet = true;
    document.getElementById("juegoDinero").innerHTML = juego.dinero;
    mostrarEventosDinero("soborno -" + costeSoborno);
    this.soborno = true;
    // Ya clicado, se vuelve rojo y no se puede volver a sobornar:
    document.getElementById("soborno").style.color = "rgb(142, 35, 27)";
    this.comprobarBadges();
    this.manejarInactivos();
    this.animarSoborno();
  } else {
    mostrarEventosDinero("suborn sense $$!");
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
  this.comprobarGameOver();
  this.animarSoborno();   //TODO NO ME FUNCIONA
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
    if (this.posOrigenTraslado == null) {
      this.posOrigenTraslado = tomarPosicionClick();
    }
    this.accionTraslado();
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
        } else if (this.tablero[i][j].terreno == "mar") {
          return false;
        } else if (this.tablero[i][j].terreno == "platja") {
          return false;
        } else if (this.tablero[i][j].terreno == "zonaverda") {
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
 * Esta función se encarga de activar correlativamente los dos eventos
 * que necesita el traslado, primer click coge posición de origen
 * segundo click coge posición de destino y traslada
 */
juego.accionTraslado = function () {
  this.cambioEvento();
}

/**
 * Función que obtiene la posición de destino de una casa a trasladar
 * y resetea el valor del evento del tablero al inicial
 */
juego.moverADestino = function () {
  this.cambioEvento = seleccionarCasa; //cambio evento, espera la posicion de origen
  let nuevaPosicion = tomarPosicionClick();
  this.trasladar(this.posOrigenTraslado, nuevaPosicion);
}

/**
 * Función que cambia el evento en el tablero, esperando un
 * segundo click para obtener la posicion de destino
 */
function seleccionarCasa() {
  let origen = tomarPosicionClick();
  if (juego.comprobarSiEdificio(origen)) {
    //controlo que en el primer click haya una casa
    juego.cambioEvento = juego.moverADestino;
  } else {
    let sonidoProhibido = new sound("../resources/sound/forbidden.wav");
    sonidoProhibido.play();
    document.getElementById("tablero").style.cursor = "pointer";
  }
}

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
 * Si el usuario elige salir, le lanza a la función gameOver con el mensaje correspondiente
 */
juego.salir = function () {
  let mensaje = "por decisión propia";
  this.mostrarGameOver(mensaje);
};

/**
 * Comprueba si se cumplen las condiciones de perder el juego y llama a la función de información.
 */
juego.comprobarGameOver = function () {
  let dinero = document.getElementById("juegoDinero").innerHTML;
  let mensaje = "";
  if (dinero < 0) {
    mensaje = "por bancarrota";
    this.mostrarGameOver(mensaje);
  } else if (dinero < costeXibiu && this.obtenerListaEdificios().length == 0) {
    mensaje = "por falta de recursos";
    this.mostrarGameOver(mensaje);
  }
};

/**
 * Informa al usuario por pantalla cuando hay un game over;
 * detiene los timers para que acabe el juego.
 * @param {String} mensaje 
 */
juego.mostrarGameOver = function (mensaje) {
  console.log("Game Over");
  borrarTablero();
  clearInterval(this.intervaloBase);
  clearInterval(this.intervaloSorpresa);
  pintarGameOver(mensaje);
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
  let sonidoEventoNegativo = new sound("../resources/sound/silbato.wav");
  let sonidoEventoPositivo = new sound("../resources/sound/aplauso.wav");
  switch (evento) {
    case "crisi":
      if (listaEdificios.includes("casa")) {
        this.mostrarImgEvento("images/event_crisi.png");
        sonidoEventoNegativo.play();
        this.eventoCrisis();
      }
      break;
    case "promoció":
      if (listaEdificios.includes("xibiu")) {
        this.mostrarImgEvento("images/event_promocio.png");
        sonidoEventoPositivo.play();
        this.eventoPromocion();
      }
      break;
    case "infracció":
      if (listaEdificios.includes("xibiu")) {
        this.mostrarImgEvento("images/event_infraccio.png");
        sonidoEventoNegativo.play();
        this.dinero -= cantidadSorpresa;
      }
      break;
    case "premi":
      if (listaEdificios.length != 0 && !listaEdificios.includes("xibiu")) {
        //si no está vacío y no tiene chabolas
        this.mostrarImgEvento("images/event_premi.png");
        sonidoEventoPositivo.play();
        this.dinero += cantidadSorpresa;
      }
      break;
  }
  document.getElementById("juegoDinero").innerHTML = juego.dinero;
  this.comprobarBadges();
  this.manejarInactivos();
  this.comprobarGameOver();
  this.animarSoborno();
};

/**
 * Función para mostrar la imagen del evento sorpresa en el centro del tablero
 * @param {String} imagen ruta de la imagen
 */
juego.mostrarImgEvento = function (imagen) {
  let main = document.getElementsByTagName("main")[0];
  let img = document.createElement("img");
  img.id = "sorpresa";
  img.src = imagen;
  img.alt = "evento sorpresa";
  main.insertBefore(img, main.firstChild);
  setTimeout(() => img.remove(), 3500);
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
  dibujarTablero(this.mapa);
  this.dibujarConstrucciones();
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
  dibujarTablero(this.mapa);
  this.dibujarConstrucciones();
};

/**
 * Al elegir traslado, realiza las operaciones básicas.
 */
juego.seleccionarTraslado = function () {
  if (this.tablero.length > 0) {
    //sólo puedo trasladar si hay algún edificio en lista
    document.getElementById("tablero").style.cursor = "grab";
    this.tipoSeleccionadoTrasladar = true;
  }
};

/**
 * Toma una construcción seleccionada y la traslada.
 */
juego.trasladar = function (posicion, nuevaPosicion) {
  if (this.comprobarSiEdificio(posicion)) {
    this.tipoSeleccionado = this.tablero[posicion[1]][posicion[0]].tipo;
    if (this.comprobarSiConstruible(nuevaPosicion)) {
      this.borrarEdificio(posicion);
      let sonidoDemoler = new sound("../resources/sound/demolish.wav");
      sonidoDemoler.play();

      this.actualizarTablero(
        this.tipoSeleccionado,
        nuevaPosicion[1],
        nuevaPosicion[0]
      );

      // Repinto mapa:
      borrarTablero();
      dibujarTablero(this.mapa);
      this.dibujarConstrucciones();

      let sonidoConstruccion = new sound("../resources/sound/build.wav");
      sonidoConstruccion.play();
    } else {
      let sonidoProhibido = new sound("../resources/sound/forbidden.wav");
      sonidoProhibido.play();
    }
  } else {
    console.log("No hay edificio para trasladar.");
  }

  document.getElementById("tablero").style.cursor = "pointer";

  this.tipoSeleccionadoTrasladar = false;
  this.posOrigenTraslado = null;
  this.tipoSeleccionado = null;
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
    dibujarTablero(this.mapa);
    this.dibujarConstrucciones();
    document.getElementById("tablero").style.cursor = "pointer";

    // Manejo eventos
    this.comprobarBadges();
    this.manejarInactivos();
    this.comprobarGameOver();
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
  let idBorrado = this.tablero[posicion[1]][posicion[0]].idEdificio;
  for (let i = 0; i < filasJuego; i++) {
    for (let j = 0; j < columnasJuego; j++) {
      if (this.tablero[i][j].idEdificio == idBorrado) {
        this.tablero[i][j].idEdificio = 0;
        this.tablero[i][j].tipo = null;
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
    document.getElementById("xibiu").style.backgroundColor = "rgb(142, 35, 27)";
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
 * Controla el botón de sobornar: si es posible sobornar le asigna una clase con brillo concreto.
 */
juego.animarSoborno = function () {
  let botonSoborno = document.getElementById("soborno");
  if (!this.soborno) {
    botonSoborno.classList.add("iluminado");
  } else {
    botonSoborno.classList.remove("iluminado");
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

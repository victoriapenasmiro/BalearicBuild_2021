import { getTodos } from "./modules/website_personajes.js";

$(document).ready(() => {
  /* $("head").load("head.html"); */ //TODO APARENTEMENTE QUE MACHACA OTROS ELEMENTOS DEL HEAD, NO FUNCIONA EN PANTALLA PERSONAJES, quizás es por el bug general
  $("footer").load("footer.html");
  $("header").load("header.html", start);
});

function start() {
  //resaltamos active del elemento seleccionado del menu
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[0]
    .addEventListener("click", addActiveClass);
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[1]
    .addEventListener("click", addActiveClass);
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[2]
    .addEventListener("click", addActiveClass);
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[3]
    .addEventListener("click", addActiveClass);
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[4]
    .addEventListener("click", addActiveClass);

  /**** scroll to top ****/
  var botonTop = document.getElementById("botonTop");

  //Función para que al hacer click vuelva al principio:
  botonTop.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  window.onscroll = function () {
    controlarBotonTop();
  };
  /**** end scroll to top ****/

  /**** aviso de cookies ****/
  var modal = document.getElementById("myModal");

  // Botón aceptación cookies
  var btn = document
    .getElementsByClassName("modal_content")[0]
    .getElementsByTagName("button")[0];

  // TODO podemos añadir la propiedad onclick o si o si debe ser addEventListenet?
  btn.onclick = function () {
    modal.style.display = "none";
    setCookie("avisoCookies", "balearicBuild", 1); //intalo una cookie en el navegador que caduca en 1 dia
  };

  //opción cookies rechazadas
  document
    .getElementsByClassName("modal_content")[0]
    .getElementsByTagName("a")[0]
    .addEventListener("click", function () {
      alert("¡RECUERDA! Para jugar tienes que aceptar nuestras 🍪 🍪 🍪");
      modal.style.display = "none";
    });

  if (!getCookie("avisoCookies")) {
    //si no se ha aceptado el aviso de cookies, lo muestro
    activarTransicion();
  } else {
    modal.style.display = "none";
  }

  // Cuando el usuario hace click fuera del modal, este se cierra
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  /**** end aviso de cookies ****/

  // Scripts propios de las diferentes páginas:
  if (window.location.href.indexOf("personajes") > -1) {
    getTodos();
  } else if (window.location.href.indexOf("inicio") == -1) {
    // Mostrar/ocultar ranking seleccionado sidebar
    document.getElementsByClassName("fa-minus-square")[0].style.display =
      "none";

    document.getElementsByClassName("fa-minus-square")[1].style.display =
      "none";

    document
      .getElementsByClassName("fa-minus-square")[0]
      .addEventListener("click", function () {
        this.style.display = "none";
        document.getElementsByClassName("fa-plus-square")[0].style.display =
          "inline-block";
        document.getElementsByTagName("ul")[0].style.display = "none";
      });

    document
      .getElementsByClassName("fa-minus-square")[1]
      .addEventListener("click", function () {
        this.style.display = "none";

        document.getElementsByClassName("fa-plus-square")[1].style.display =
          "inline-block";

        document.getElementsByTagName("ul")[1].style.display = "none";
      });

    document
      .getElementsByClassName("fa-plus-square")[0]
      .addEventListener("click", function () {
        this.style.display = "none";

        document.getElementsByClassName("fa-minus-square")[0].style.display =
          "inline-block";

        document.getElementsByTagName("ul")[0].style.display = "block";
      });

    document
      .getElementsByClassName("fa-plus-square")[1]
      .addEventListener("click", function () {
        this.style.display = "none";

        document.getElementsByClassName("fa-minus-square")[1].style.display =
          "inline-block";

        document.getElementsByTagName("ul")[1].style.display = "block";
      });
  }

  document
    .getElementsByClassName("fa-bars")[0]
    .addEventListener("click", menuMobile);
  document
    .getElementsByClassName("fa-times")[0]
    .addEventListener("click", menuMobile);
}

/**
 * Función que ejecuta el menu en móviles
 */
function menuMobile() {
  let link = document.getElementById("optionsMenu");
  let menu = document.getElementsByTagName("header")[0];
  let iconTanca = document.getElementsByClassName("fas fa-times")[0];
  let iconPrincipal = document.getElementsByClassName("fa fa-bars")[0];
  if (link.style.display === "inline-block") {
    link.style.display = "none";
    menu.style.backgroundColor = "var(--main-color)";
    iconTanca.style.display = "none";
    iconPrincipal.style.display = "inline-block";
  } else {
    link.style.display = "inline-block";
    menu.style.backgroundColor = "var(--secondary)";
    iconPrincipal.style.display = "none";
    iconTanca.style.display = "inline-block";
  }
}

/**
 * Funcion para agregar la clase active a
 * un elemento del menu
 *
 */
function addActiveClass() {
  let options = document
    .getElementById("optionsMenu")
    .getElementsByTagName("a");

  /* Cuando obtenemos los items desde getElementsByTagName
    es necesario convertirlos a Array para poder tratarlos con 
    un forEach */

  let optionsList = Array.prototype.slice.call(options);

  optionsList.forEach(removeActiveClass);

  this.classList.add("active");
}

/**
 * Función para eliminar la clase active al elemento que la contenga
 * @param {a} element opción de menu
 */
function removeActiveClass(element) {
  //No utilizo classList.toggle porque si pincho en el link de una pag. donde estoy me quitara el estilo y no es lo que quiero
  if (element.classList.contains("active")) {
    element.classList.remove("active");
  }
}

/**
 * Función para mostrar/ocultar el botón scroll to top:
 */
function controlarBotonTop() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // o porque depende del navegador: .body para safari, resto para demás
    botonTop.style.display = "block";

    if (screen.width < 800) {
      botonTop.firstChild.data = ""; //oculto el texto del button en móvil
    }
  } else {
    botonTop.style.display = "none";
  }
}

/**
 * Función para ejecutar la transición del aviso de cookies
 */
function activarTransicion() {
  var modal = document.querySelector(".modal_content");
  if (modal.classList.contains("modal_start")) {
    modal.classList.remove("modal_start");
    modal.classList.add("modal_end");
  }
}

/**** control aceptación aviso de cookies ****/
//FORMATO cookies
/* document.cookie =
        "username=avisoCookies; expires=Thu, 29 Nov 2020 12:00:00 UTC; path=/;"; */

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000); //seteo la fecha en milisengundos, desde el 1 Enero de 1970
  var expires = "expires=" + d.toUTCString(); //seteo la fecha en formato Sat, 28 Nov 2020 08:13:24 GMT
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie); //recupero todas las cookies instalas, separadas por ;
  var listadoCookies = decodedCookie.split(";"); //creo una array con las cookies instaladas
  for (var i = 0; i < listadoCookies.length; i++) {
    //busco la cookie
    var c = listadoCookies[i];
    while (c.charAt(0) == " ") {
      //las cookies están separadas por ; + espacio, me quedo con el nombre y valor de la cookie
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return true;
    }
  }
  return false;
}
/**** END control aceptación aviso de cookies ****/

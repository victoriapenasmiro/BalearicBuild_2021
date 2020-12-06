//API personajes
const BASE_URL =
  "https://my-json-server.typicode.com/classicoman2/fakeRESTserver";
//variable para el Carrusel
var slideIndex = 0;
//variable para cargar la array de personajes
var personajes;

/**
 * Función para obtener el JSON
 */
export const GET_TODOS = async () => {
  try {
    const RES = await axios.get(`${BASE_URL}/personatges`); //en la pantalla de inicio, al ejecutar esta linea salta excepcion
    personajes = RES.data;
    if (window.location.href.indexOf("personajes") > -1) {
      pintarPersonajesOpt();
    } else if (window.location.href.indexOf("inicio") > -1) {
      mostrarPersonajesInicio();
    }
    return personajes;
  } catch (e) {
    console.error(e);
  }
};

function pintarPersonajesOpt() {
  var carrusel = document.getElementById("slideshow-container");
  let slid0 = document.createElement("div");
  slid0.classList.add("mySlides", "fade");
  let slid1 = document.createElement("div");
  slid1.classList.add("mySlides", "fade");
  let slid2 = document.createElement("div");
  slid2.classList.add("mySlides", "fade");
  let slid3 = document.createElement("div");
  slid3.classList.add("mySlides", "fade");
  carrusel.appendChild(slid0);
  carrusel.appendChild(slid1);

  let listaPersonajes = document.getElementById("personajesLista");

  for (let i = 0; i < personajes.length; i++) {
    //pinta el grid de seleccion de personaje
    let personaje = pintarPersonajeGrid(i, listaPersonajes);
    document
      .getElementById(`${personaje.id}`)
      .addEventListener("click", seleccionarPersonaje);

    //pinta los personajes en el carrusel
    let slidhijo = document.createElement("div");
    let slidImg = document.createElement("img");
    slidImg.src = personaje.img;
    slidImg.alt = personaje.name;
    slidhijo.appendChild(slidImg);
    let slidName = document.createElement("p");
    slidName.innerHTML = personaje.name;
    slidhijo.appendChild(slidName);

    if ((screen.width > 800 && i <= 3) || (screen.width < 800 && i <= 1)) {
      slid0.appendChild(slidhijo);
    } else if (
      (screen.width > 800 && i > 3) ||
      (screen.width < 800 && i <= 3 && screen.width < 800 && i > 1)
    ) {
      slid1.appendChild(slidhijo);
    } else if (screen.width < 800 && i <= 5 && screen.width < 800 && i > 3) {
      slid2.appendChild(slidhijo);
      carrusel.appendChild(slid2);
    } else if (screen.width < 800 && i <= 7 && screen.width < 800 && i > 5) {
      slid3.appendChild(slidhijo);
      carrusel.appendChild(slid3);
    }
  }

  if (screen.width < 800) {
    //Dos dots más en caso de móvil:
    document.getElementById("dots").innerHTML +=
      '<span class="dot"></span><span class="dot"></span>';
  }
  mostrarSlides();
}

/**
 * Función que pinta el grid de personajes en formato thumbnail
 * en la pantalla de INICIO
 */
function mostrarPersonajesInicio() {
  let gridPersonajes = document.getElementById("gridPersonajes");

  for (let avatar = 0; avatar < personajes.length; avatar++) {
    let personaje = pintarPersonajeGrid(avatar, gridPersonajes);
    document
      .getElementById(`${personaje.id}`)
      .addEventListener("click", function(){
        manejarBordes(personaje.id);
        document.getElementById("personaje").value = personaje.img;//se envía la URL encriptada
      });
  }
}

/**
 * Función que crea los div de personajes
 * @param {Object} gridPersonajes nodo donde se añade un nuevo elemento
 * @param {int} avatar posición del personaje dentro del json
 */
function pintarPersonajeGrid(avatar, gridPersonajes) {
  let personaje = new Object();
  personaje.id = personajes[avatar].id;
  personaje.name = personajes[avatar].name;
  personaje.motto = personajes[avatar].motto;
  personaje.img = personajes[avatar].img;

  let grid = document.createElement("div");
  grid.id = personaje.id;
  let gridImg = document.createElement("img");
  gridImg.id = personaje.id;
  gridImg.alt = personaje.name;
  gridImg.src = personaje.img;
  gridImg.classList.add("thumbnail");
  grid.appendChild(gridImg);
  let divOverlay = document.createElement("div");
  divOverlay.classList.add("overlay");
  grid.appendChild(divOverlay);
  gridPersonajes.appendChild(grid);

  return personaje;
}

/**
 * Función para activar la animación del carrusel de imágenes
 */
function mostrarSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active-dot";
  setTimeout(mostrarSlides, 3000); // Change image every 2 seconds
}

/**
 * Muestra la información del personaje seleccionado.
 */
function seleccionarPersonaje() {
  let img, nombre, motto;
  let id = this.id;
  manejarBordes(id);

  personajes.forEach((personaje) => {
    if (personaje.id == id) {
      img = personaje.img;
      nombre = personaje.name;
      motto = personaje.motto;
    }
  });

  document
    .getElementById("personajeSeleccion")
    .getElementsByTagName("div")[0].innerHTML = `<h3>${nombre}</h3>`;
  document
    .getElementById("personajeSeleccion")
    .getElementsByTagName(
      "div"
    )[1].innerHTML = `<img src="${img}" alt="${nombre}" />`;
  document
    .getElementById("personajeSeleccion")
    .getElementsByTagName("div")[2].innerHTML = `<p>${motto}</p>`;
}

/**
 *
 */
function manejarBordes(id) {
  for (let i = 1; i <= personajes.length; i++) {
    document.getElementById(i).style.border = "none";
  }
  document.getElementById(id).style.border = "4px solid rgb(142, 35, 27)";
  document.getElementById(id).style.height = "92%";
  document.getElementById(id).style.width = "100px";
}

/***************************** DEPRECATED *****************************/

/**
 * Función para crear el carrusel y el grid de personajes
 * @deprecated sustituida por pintarPersonajesOpt()
 */
function pintarPersonajes() {
  let slider = "<div class='mySlides fade'>";
  let gridImg = "";

  for (let i = 0; i < personajes.length; i++) {
    let personaje = new Object();
    personaje.id = personajes[i].id;
    personaje.name = personajes[i].name;
    personaje.motto = personajes[i].motto;
    personaje.img = personajes[i].img;

    slider += `<div><img src="${personaje.img}" alt="${personaje.name}"/><p>${personaje.name}</p></div>`;

    if (screen.width > 800) {
      //para desktop pinto 4 fotos
      if (i == 3 || i == 8) {
        slider += "</div>";
        if (i == 3) {
          //si no es el ultimo div abro otro slider
          slider += "<div class='mySlides fade'>";
        }
      }
    } else if (screen.width < 800) {
      if (i == 1 || i == 3 || i == 5 || i == 7) {
        //para movil pinto dos por slider
        slider += "</div>";
        if (i != 7) {
          //si no es el ultimo div abro otro slider
          slider += "<div class='mySlides fade'>";
        }
      }
      //añado dos dots más en caso de móvil
      document.getElementById("dots").innerHTML +=
        '<span class="dot"></span><span class="dot"></span>';
    }

    gridImg = `<div id="${personaje.id}"><img src="${personaje.img}" alt="${personaje.name}" width="100" height="80"><div class="overlay"></div></div>`;
    document.getElementById("personajesLista").innerHTML += gridImg;
    //creamos los addEventListener automáticamente
    document
      .getElementById(`${personaje.id}`)
      .addEventListener("click", seleccionarPersonaje);
  }

  document.getElementById("slideshow-container").innerHTML += slider;

  mostrarSlides();
}

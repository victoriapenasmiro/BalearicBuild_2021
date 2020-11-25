//API personajes
export const BASE_URL =
  "https://my-json-server.typicode.com/classicoman2/fakeRESTserver";
//variable para el Carrusel
export var slideIndex = 0;
//variable para cargar la array de personajes
export var personajes;

/**
 * Función para obtener el JSON
 */
export const getTodos = async () => { // TODO debería estar en mayúsculas, no ??? codigo copiado de Toni
  try {
    const RES = await axios.get(`${BASE_URL}/personatges`);
    personajes = RES.data;
    pintarPersonajesOpt();
    return personajes;
  } catch (e) {
    console.error(e);
  }
};

export function pintarPersonajesOpt() {
  var carrusel = document.getElementById("slideshow-container");
  let slid0 = document.createElement("div");
  slid0.classList.add("mySlides", "fade");
  let slid1 = document.createElement("div");
  slid1.classList.add("mySlides", "fade");
  let slid2 = document.createElement("div");
  slid2.classList.add("mySlides", "fade");
  let slid3 = document.createElement("div");
  slid3.classList.add("mySlides", "fade");
  carrusel.appendChild(slid0); //en movil y desktop la necesito
  carrusel.appendChild(slid1); //en movil y desktop la necesito

  for (let i = 0; i < personajes.length; i++) {
    let personaje = new Object();
    personaje.id = personajes[i].id;
    personaje.name = personajes[i].name;
    personaje.motto = personajes[i].motto;
    personaje.img = personajes[i].img;

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

    let listaPersonajes = document.getElementById("personajesLista");
    let grid = document.createElement("div");
    grid.id = personaje.id;
    let gridImg = document.createElement("img");
    gridImg.alt = personaje.img;
    gridImg.src = personaje.img;
    grid.appendChild(gridImg);
    let divOverlay = document.createElement("div");
    divOverlay.classList.add("overlay");
    grid.appendChild(divOverlay);
    listaPersonajes.appendChild(grid);
    document
      .getElementById(`${personaje.id}`)
      .addEventListener("click", seleccionarPersonaje);
  }

  if (screen.width < 800) {
    //añado dos dots más en caso de móvil
    document.getElementById("dots").innerHTML +=
      '<span class="dot"></span><span class="dot"></span>';
  }

  showSlides();
}

/**
 * Función para activar la animación del carrusel de imágenes
 */
export function showSlides() {
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
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

/**
 * Función para mostrar la información del personaje seleccionado
 */
export function seleccionarPersonaje() {
  let img, nombre, motto;
  let id = this.id;

  personajes.forEach((personaje) => {
    if (personaje.id == id) {
      img = personaje.img;
      nombre = personaje.name;
      motto = personaje.motto;
    }
  });

  document
    .getElementById("personajeSeleccion")
    .getElementsByTagName("div")[0].innerHTML = `<p>${nombre}</p>`;
  document
    .getElementById("personajeSeleccion")
    .getElementsByTagName(
      "div"
    )[1].innerHTML = `<img src="${img}" alt="${nombre}" />`;
  document
    .getElementById("personajeSeleccion")
    .getElementsByTagName("div")[2].innerHTML = `<p>${motto}</p>`;
}

/***************************** DEPREDCATED *****************************/

/**
 * Función para crear el carrusel y el grid de personajes
 * @deprecated sustituida por pintarPersonajesOpt()
 */
function pintarPersonajes() {
  let slider = "<div class='mySlides fade'>"; //TODO optimizar con createElement + appendChild
  let gridImg = "";

  for (let i = 0; i < personajes.length; i++) {
    let personaje = new Object(); //TODO crear un método que contruya el objeto y lo devuelva
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

  showSlides();
}

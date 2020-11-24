//variable para el Carrusel
var slideIndex = 0;
//Array de personajes
var personajes;

/**
 * En carga de pantalla:
 */
window.onload = function () {
  loadJSON(function (response) {
    // Parse JSON string into object
    personajes = response; //JSON.parse(response);
    /* FORMATO:
    [{
      "id": 1,
      "name": "Tomeu Scracker",
      "motto": "Right now, I'm letting you live. And I'll continue to keep you alive... until you've grown enough to become worth killing.",
      "img": "https://static.wikia.nocookie.net/mafiagame/images/d/d6/Johnny_%28Mafia%29.jpg"
    }]
    */
    let slider = "<div class='mySlides fade'>";
    let nombrePersonaje = "";

    for (let i = 0; i < personajes.length; i++) {
      let personaje = new Object(); //TODO crear un método que contruya el objeto y lo devuelva
      personaje.id = personajes[i].id;
      personaje.name = personajes[i].name;
      personaje.motto = personajes[i].motto;
      personaje.img = personajes[i].img;

      slider += //TODO crear un método para pintar la imagen
        '<div><img src="' +
        personaje.img +
        '" alt="' +
        personaje.name +
        '" /><p>' +
        personaje.name +
        "</p></div>";
      nombrePersonaje += "<span>" + +"</span>";
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
        //TODO OPTIMIZAR VERSION MOVIL
        if (i == 1 || i == 3 || i == 5 || i == 7) {
          //para movil pinto dos por slider
          slider += "</div>";
          if (i != 7) {
            //si no es el ultimo div abro otro slider
            slider += "<div class='mySlides fade'>";
          }
        }
      }

      //TODO crear un método para pintar las fotos thumbnail
      let gridImg =
        '<div onclick="seleccionarPersonaje(' +
        personaje.id +
        ')"><img src="' +
        personaje.img +
        '"alt="' +
        personaje.name +
        '" width="100" height="80"><div class="overlay"></div></div>'; //TODO ver si optimizamos la imagen en local o si debemos escalar la que obtenemos del JSON
      document.getElementById("personajesLista").innerHTML += gridImg;
    }

    document.getElementById("slideshow-container").innerHTML += slider;
    //TODO, añado dos dots más en caso de móvil, creo que es más limpio que solo se construyan en caso de que sea móvil y no poner u display none en css
    if (screen.width < 800) {
      document.getElementById("dots").innerHTML +=
        '<span class="dot"></span><span class="dot"></span>';
    }
    showSlides();
  });

  //TODO he metido un onclick en la contrucción de los div, ¿seria valido?
  /*   if(document.readyState === "complete"){//TODO en teoria con el codigo anterior ya se ha generado los elementos de HTML, pero no los reconce
    // Fully loaded!
    //window.addEventListener("load", function(event) { tampoco funciona
    document
      .getElementById("personaje1") //este elemento me lo crea en el código anterior
      .addEventListener("click", seleccionarPersonaje);
    document
      .getElementById("personaje2")
      .addEventListener("click", seleccionarPersonaje);
    document
      .getElementById("personaje3")
      .addEventListener("click", seleccionarPersonaje);
    document
      .getElementById("personaje4")
      .addEventListener("click", seleccionarPersonaje);
    document
      .getElementById("personaje5")
      .addEventListener("click", seleccionarPersonaje);
    document
      .getElementById("personaje6")
      .addEventListener("click", seleccionarPersonaje);
    document
      .getElementById("personaje7")
      .addEventListener("click", seleccionarPersonaje);
    document
      .getElementById("personaje8")
      .addEventListener("click", seleccionarPersonaje);
} */
};

/**
 * Función para cargar el JSON
 * @param {*} callback
 */
function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.responseType = "json";
  xobj.open(
    "GET",
    "https://my-json-server.typicode.com/classicoman2/fakeRESTserver/personatges",
    true
  );

  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.response);
    }
  };
  xobj.send(null);
}

/**
 * Función para acticar el carrusel de imágenes
 */
function showSlides() {
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
 * Función para mostrar el personaje seleccionado
 */
function seleccionarPersonaje(id) {
  let img,nombre,motto;

  personajes.forEach(personaje => {
    if (personaje.id == id){
      img = personaje.img;
      nombre = personaje.name;
      motto = personaje.motto;
    }
  });

  document.getElementById("personajeSeleccion").getElementsByTagName("div")[0].innerHTML = "<p>" + nombre + "</p>";
  document.getElementById("personajeSeleccion").getElementsByTagName("div")[1].innerHTML = "<img src=\"" + img + "\" alt=\"" + nombre + "\" />";
  document.getElementById("personajeSeleccion").getElementsByTagName("div")[2].innerHTML = "<p>" + motto + "</p>";

}

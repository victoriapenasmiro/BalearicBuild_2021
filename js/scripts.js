//TODO

window.onload = function () {
    //TODO si se te ocurre una opción mejor de hacerlo de forma automatizada ...
    // Si hay que hacerlo con eventlistener, según revisado en la practica anterior con Toni, es así

    document
    .getElementById("menu")
    .getElementsByTagName("a")[0]
    .addEventListener("click", addActiveClass);
    document
    .getElementById("menu")
    .getElementsByTagName("a")[1]
    .addEventListener("click", addActiveClass);
    document
    .getElementById("menu")
    .getElementsByTagName("a")[2]
    .addEventListener("click", addActiveClass);
    document
    .getElementById("menu")
    .getElementsByTagName("a")[3]
    .addEventListener("click", addActiveClass);
    document
    .getElementById("menu")
    .getElementsByTagName("a")[4]
    .addEventListener("click", addActiveClass);
}


/**
 * Funcion para agregar la clase active a
 * un elemento del menu
 *
 */
function addActiveClass() {
    let options = document
      .getElementById("menu")
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
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  }
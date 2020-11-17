function mifuncion() {
  var botonTop = document.getElementById("botonTop");

  //Función para que al hacer click vuelva al principio:
  botonTop.addEventListener("click", function() {
    volverArriba();
  });

  function volverArriba() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  window.onscroll = function() {
    controlarBotonTop();
  };

  //Función para mostrar/ocultar el botón:
  function controlarBotonTop() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      //or porque depende del navegador: .body para safari, resto para demás
      botonTop.style.display = "block";
    } else {
      botonTop.style.display = "none";
    }
  }
}

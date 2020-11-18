//dibujo de tablero - ver https://xon5.medium.com/flexible-canvas-grid-without-blurred-lines-907fcadf5bfc si hay q hacerlo flexible
export function dibujarTablero(canvas) {
    var tableroAnchura = canvas.width;
    var tableroAltura = canvas.height;
    var repeticion = tableroAnchura / 30;
    /*
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    for (let i = 0; i < tableroAnchura; i += repeticion) {
      console.log("entra en primer bucle");
      for (let j = 0; j < tableroAltura; j += repeticion) {
        console.log("entra en segundo bucle");
        ctx.strokeRect(i, j, i + repeticion, j + repeticion);
        console.log("pinta rectang");
      }
    }
    ctx.closePath();
  
     esto funciona pero voy a probar con dibujar rectángulos, por si luego tengo que pintar:
    //por ahora le voy a dar 500 de alto y 10000 de ancho; ver css.
    let tableroAltura = 400;
    let tableroAnchura = 1200;
  
    //defino cómo voy a dibujar las cosas.
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
  
    //planteo las líneas verticales.
    for (let i = 0; i <= tableroAltura; i += 40) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, tableroAltura);
    }
  
    //planteo las líneas horizontales.
    for (let j = 0; j <= tableroAnchura; j += 40) {
      ctx.moveTo(0, j);
      ctx.lineTo(tableroAnchura, j);
    }
  
    //dibujo.
    ctx.stroke();
    */
  
    /* esta version tb funciona pero aparentemente hay q hacerlo por rectángulos así q nada
    var lineas = {
      separacion: 10,
      color: "black",
    };
  
    let ctx = canvas.getContext("2d");
  
    ctx.translate(0.5, 0.5);
    dibujarLineasTablero(canvas, lineas);
  
    return;
  }
  
  function dibujarLineasTablero(canvas, lineas) {
    var iWidth = canvas.width;
    var iHeight = canvas.height;
  
    let ctx = canvas.getContext("2d");
  
    ctx.strokeStyle = lineas.color;
    ctx.lineWidth = 1;
  
    ctx.beginPath();
  
    var iCount = null;
    var i = null;
    var x = null;
    var y = null;
  
    iCount = Math.floor(iWidth / lineas.separacion);
  
    for (i = 1; i <= iCount; i++) {
      x = i * lineas.separacion;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, iHeight);
      ctx.stroke();
    }
  
    iCount = Math.floor(iHeight / lineas.separacion);
  
    for (i = 1; i <= iCount; i++) {
      y = i * lineas.separacion;
      ctx.moveTo(0, y);
      ctx.lineTo(iWidth, y);
      ctx.stroke();
    }
  
    ctx.closePath();
  
    return;
    */
  }
  
  export function borrarTablero() {
    var tableroAnchura = canvas.width;
    var tableroAltura = canvas.height;
  
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, tableroAnchura, tableroAltura);
  }
  
  //Función para ver dónde clico:
  function tomarCoordenadas() {
    var x = event.offsetX;
    var y = event.offsetY;
    //TODO: en base al pixel tengo q deducir q casilla es (con una division vale)
    console.log(`(${x}, ${y})`);
  }
# BalearicBuild_2021
Repositorio proyecto P2 + Pc2.

## Autores 👯‍♀️ :
* Maria Victoria Peñas
* María Rabanales

## Lenguajes 🖥️ :
* HTML
* CSS
* JavaScript
* Canvas
* Markdown
* JQuery (marginal)

## Objetivos 📌 :
El objetivo central de este proyecto es desarrollar un sistema de páginas web en torno a un juego de estrategia online llamado BalearicBuilding.

Como subobjetivos podemos destacar:

* La ampliación y mejora de nuestros conocimientos de programación en los diferentes lenguajes, haciendo énfasis en el proceso de optimización y eficiencia en las funciones.
* El desarrollo de habilidades de trabajo en equipo, con intención de hacer varias sesiones de *pair programming* a través de herramientas online.
* La mejora de nuestra agilidad al 'picar' código.
* El desarrollo de nuestra familiariedad con el proceso de búsqueda de resolución de problemas y conflictos al programar, aprendiendo tanto a buscar como a analizar los resultados obtenidos con rapidez y en profundidad.
* El fomento de nuestra creatividad e inspiración a la hora no sólo de diseñar el aspecto físico del proyecto, sino también del código.

## Información previa para la buena visualización del proyecto ❗ :
Vemos necesario señalar las siguientes consideraciones previas para poder analizar bien el proyecto:

1. La fuente principal del proyecto no es nativa de Google Fonts y debe instalarse previamente; consultar el apartado de 'fuentes'.

2. Es necesario recargar las pantallas al cambiar de resolución *desktop* a *mobile*, es decir, al jugar con el navegador: los scripts se deben de cargar de nuevo porque, lógicamente, el slider y el grid son diferentes en móvil.

## Flujo de trabajo - GIT 👩‍💻 :
Desde el primer momento se ha visto importante establecer un proceso de trabajo común para facilitar el trabajo en equipo y evitar 'machacar' código. Así, se ha establecido el siguiente proceso de trabajo con GIT:

> Se va a trabajar mediante ramas. Se creará una rama por funcionalidad. El proceso será el siguiente:
> Crear una rama, desarrollar funcionalidad, al finalizar merge a main. El flujo será:
> 1. De main, crear una rama.
> ~~~
>     git branch nombrerama
>     git checkout nombrerama
> ~~~
> 2. Desarrollar y commitear sobre esa rama.
> ~~~
>     git add .
>     git commit -m ”comentarios” 3. Subir esa rama al repositorio.
>     git push --all
> ~~~
> 4. Hacer merge de esa rama a main y resolver conflictos
> ~~~
>     git checkout main
>     git merge nombrerama
> ~~~
> 5. Hacer pull de main en local (para tener los últimos cambios descargados).
> ~~~
>     git checkout main 
>     git pull
>     git push
> ~~~
> 6. Volver al paso 1 para desarrollar otra cosa.

## Diseño 🎨 :
El proceso de diseño de esta web ha partido de 'sketches', tanto para desktop como para móvil, ideados en común durante las horas de clase. Obtenido el visto bueno desarrollamos los diferentes wireframes con la herramienta MOCKPLUS, muy completa y adecuada para desarrollar proyectos en equipo.

Se ha buscado un diseño limpio, con una paleta de colores muy definida y contrastada, fondos blancos y claros y ángulos rectos. Todas las páginas tienen un formato común con cabecera-cuerpo-pie; para facilitar el trabajo tanto la cabecera como el pie se importan desde archivos separados.

La cabecera incluye el menú o barra de navegación, que en resolución móvil se oculta bajo el tradicional icono de 'desplegar menú' con un diseño de tres líneas. El menú incluye los siguientes elementos: home, jugar, personajes, eSports, forum y contacto. Sólo las tres primeras opciones tienen, en principio, correspondencia en las páginas creadas; las demás se basan en los usos habituales en el sector.

Para las resoluciones grandes se ha trabajado (en la medida de lo posible) con una distribución del cuerpo en 'main' y 'aside'; 'main' se coloca a la izquierda, para facilitar la lectura a simple vista, y el 'aside' a la derecha. Este último se muestra en contraste, con letras claras sobre fondo oscuro, para separarlo visualmente del resto del contenido.

Dado que en el cuerpo de algunas páginas (por ejemplo, en 'homepage') hay mucho contenido, y no se quiere apabullar a los usuarios en móvil con tanta información, desde el primer momento se tuvo en cuenta que parte de este contenido debía ocultarse en resoluciones pequeñas. A título de ejemplo, la gran cantidad de capturas de pantalla del juego que se muestran en el 'homepage' en resoluciones grandes se reducen a unas pocas en resolución móvi.

### Paleta de colores:
La paleta de colores se puede encontrar en la carpeta src/docs ([aquí](https://github.com/victoriapenasmiro/BalearicBuild_2021/blob/main/src/docs/paletadecolor.png)), siguiendo las instrucciones de la práctica.

El tema subyacente del juego es la corrupción urbanística prevalente en las Islas Baleares. Inicialmente planteamos tres ideas para la paleta de colores:
* Basada en las fotos habituales del paisaje 'salvaje' de las islas: verdes, marrones, con algún toque azul de mar de fondo.
* Basada en la imagen de 'construcciones de verano' de la zona de playa: paleta de base marinera, con azul, rojo y blanco.
* Basada en la corrupción en cierta manera 'mafiosa': paleta tradicional de películas y series sobre la Mafia como 'El Padrino' o 'El Precio del Poder (Scarface)', en negros, grises, rojos y blancos.

Finalmente nos hemos decidido por la tercera opción: el contraste entre los tonos es fuerte y la 'imagen' que transmite esta combinación de colores está muy arraigada en el imaginario colectivo para temas de mafia y corrupción, con lo que enlaza apropiadamente con la temática del juego. Al combinar blanco y negro con un color cálido como el rojo, la página web da impresión de actividad y dinamismo, muy cercana al estilo del juego y alejada de la tranquilidad y pasividad de los tonos fríos.

La principal dificultad con esta paleta ha sido decidir un tono de error: como el color principal es de base roja, el tono de contraste y error no podía ser también rojo, ya que no destacaría sobre el resto de la página. Con la ayuda de herramientas de teoría del color como Paletton optamos por elegir un color de base ocre/dorada para remarcar los contrastes: es un tono cálido que destaca suficientemente, y resulta visualmente atractivo.

### Accesibilidad:
* Pantalla Inicio - Home: los textos tienen un adecuado contraste con su color de fondo, al ser en negro sobre gris claro o en blanco sobre negro, dependiendo del elemento.
* Pantalla Personajes: sigue el diseño de la pantalla de inicio.
* Pantalla Login: sigue el diseño de la pantalla de inicio.
* Pantalla de Juego: el fondo de la pantalla de juego es oscuro, siguiendo el ejemplo de numerosos juegos de estrategia, por lo que se ha buscado el contraste con letras blancas y colores vibrantes de nuestra paleta habitual.

### Fuentes:
* Hemos descargado la [tipografía Corleone](https://www.dafont.com/es/corleone.font) para utilizar en los titulos H1 y H2 y en el logo, así como en algunos elementos puntuales del juego. El motivo principal por el cual hemos seleccionado esta tipografía es que hemos querido basarnos en el estilo de [EL PADRINO](https://www.filmaffinity.com/es/film809297.html), ya que el juego trata de mafia y corrupción. No hemos optado utilizar la misma tipografía para todos los encabezados, porqué sino queda muy agresivo a la vista.

Esta tipografía se ha cargado en el css general, y no en la cabecera de cada página con el objetivo de utilizarlo en todas las pantallas:

~~~
> @font-face {
>   font-family: "Corleone";
>   src: url("/resources/fonts/Corleone.TTF");
> }
~~~

* La fuente de los textos que no son encabezados, hemos seleccionado una tipografía de [Google Fonts, Open Sans](https://fonts.google.com/specimen/Open+Sans). El motivo es porqué queríamos una tipografía bastante limpia, clara y de fácil lectura.

Desde la consola de Chrome, se obtiene el siguiente error con la fuente:

~~~
Refused to apply style from 'http://127.0.0.1:5500/url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
~~~

Hemos estado investigando y aparentemente se trata de un error propio de Chrome, ya que en otros navegadores no lo recuperamos.

Fuente: [https://discourse.roots.io/t/mime-type-text-html-not-a-supported-stylesheet-mime-type/11636/8](https://discourse.roots.io/t/mime-type-text-html-not-a-supported-stylesheet-mime-type/11636/8)

### Responsive 📱 :
Hemos establecido los siguientes criterios para el diseño responsive:
* Versión Móvil: max-width: 799px
* Versión Desktop: min-width: 800px

Actualmente los dispositivos móviles abarcan desde los 320px hasta los 799px aproximadamente. Uno de los dispositivos con pantalla más pequeña utilizada actualmente es el iphone 5(width 320px). A partir de 800px, suelen ser tablets en formato landscape, y normalmente suelen visualizarse como en la versión desktop.

Por otro lado, como ya se ha señalado en el apartado de diseño, debido a la longitud de nuestro menú para resoluciones inferiores a 800px ha sido necesario generar un menú de navegación colpasado, ya que no cabe todo en la misma linea.

Cabe destacar que hemos realizado algunas ampliaciones en el desarrollo responsive de la página:

1. Hemos adaptado el video (tomado de youtube) de la Homepage en resoluciones intermedias para ipads, de forma que el video no se corta en ningún momento.

2. Hemos adaptador el grid de personajes en diferentes resoluciones para que en ningún momento quede descuadrado.

Las pantallas de *Inicio al juego* y la del *Juego* no están optimizadas a responsive, ya que no era una requerimiento de la práctica. La del *Inicio al juego* no está optimizada para resoluciones inferiores a 1300.

3. Se ha creado un menú con un diseño especifico para dispositivos móviles.

### Transiciones ⚙️:
#### Aviso de cookies:
Se ha implementado una transición sobre el modal de aviso de cookies dónde empieza oculto y con un width de un 20% y hace un scroll from top al centro de la pantalla y aumenta hasta tener un with del 50%.

Esto se ha logrado con el siguiente fragmento de código:

~~~
CSS:
.modal_content {
  ...
  -webkit-transition-property: width top;
  -webkit-transition-duration: 3s;
  -webkit-transition-delay: 0.5s;
  -webkit-transition-timing-function: linear;
  transition-property: width top;
  transition-duration: 3s;
  transition-delay: 0.5s;
  transition-timing-function: linear;
}

  .modal_start {
    width: 20%;
    top: -50%;
  }

  .modal_end {
    width: 50%;
    top: 30%;
  }

JS:
function activarTransicion() {
  var modal = document.querySelector(".modal_content");
  if (modal.classList.contains("modal_start")) {
    modal.classList.remove("modal_start");
    modal.classList.add("modal_end");
  }
}
~~~

La transición solo se ha configurado para la versión *desktop* con el objetivo de no mejorar el rendimiento y tiempo de carga en móvil y así favorcer al *Mobile First* y *UX*.

#### Fotos giratorias:
La segunda transición se encuentra en el elemento 'aside' de la homepage y afecta a las fotografías de las colaboradoras de este proyecto. Cuando se pasa el ratón por encima de cada fotografía, esta gira y tarda en hacer una rotación completa un tiempo de 2.5 segundos. Como las fotografías se han redondeado, el efecto resultante resulta muy agradable. Cuando se aparta el ratón, la foto hace el giro en sentido contrario hasta volver a su posición inicial.

Esto se ha logrado con el siguiente fragmento de código:

~~~
>aside img {
>  ...
>  border-radius: 50%;
>  transition: transform 2.5s ease-in-out;
>}
>
>aside img:hover {
>  transform: rotate(360deg);
>}
~~~

#### Transición de thumbnails:
Se ha implementado una transición en el hover de las imagenes en formato thumbnail de la pantalla de personajes y en la pantalla de inicio de juego. Esta transición transcurre durante 0.5 segundos y únicamente al hacer 'hover' sobre fotos de thumbnail.

~~~
>.overlay {
>  transition: .5s ease;
>}
>
>#personajesLista > div:hover .overlay {
>  opacity: 0.5;
>}
~~~

#### Transición iconos juego:
Se ha implementado una transición en la botonera central bajo el canvas del juego. En el hover, las imagenes se hacen más grandes y cambiar su color de formar linear en 0.3 segundos. El código dónde se ha implementado es:

~~~
>.fas,
>.far {
> ...
>  transition: 0.3s linear;
>}

>.fas:hover,
>.far:hover {
>  color: var(--main-dark)!important;
>  font-size: 30px;
>}
~~~

#### Imágenes 🎞️ :
Para crear esta página hemos empleado un amplio abanico de imágenes, entre las que cabe incluir:
* *Lineart* de los diferentes tipos de edificios y generación del logo personalizado, con vectores básicos de https://publicdomainvectors.org/
* Fotografías reales.
* Capturas de pantalla del propio juego.

## Modificaciones de sketch a wireframe y a prototipo 📝 :
1. Al plantear el sketch no tuvimos en cuenta la necesidad de incluir un botón de 'volver arriba', cuyo estilo tuvimos que idear directamente en el wireframe.

2. El diseño original del contenido del cuerpo implicaba que el texto y las imágenes estaban directamente sobre el fondo blanco de la página en general. Si bien esta idea, a priori, nos parecía muy limpia y elegante, en la práctica no tardamos en ver que daba sensación de desorden y falta de control. Para solucionarlo optamos por incluir el contenido central en contenedores 'div' extras, con bordes remarcados y un fondo gris que destacara sobre el blanco original, hiciera buen contraste con la letra, y facilitara la ordenación visual de los diferentes tipos de contenido.

3. Hemos cambiado la posición de los títulos *h1* de *homepage* y *personajes* para acercarlos más a la línea superior de la página. En nuestro diseño original estos títulos estaban en los apartados inferiores, y aunque estéticamente resultaban agradables no cumplían su función de título, por lo que hemos visto lógico modificarlos.

4. También hemos modificado algún título concreto, como el de la pantalla de personajes: de 'Elige a tu Balearic Builder' pasamos a 'Balearic Builders', ya que el verbo elegir daba la impresión de estar en una pantalla de selección en vez de en una pantalla de información.

5. Hemos eliminado los *pipes* separadores entre la opciones de menú, porqué estéticamente nos ha gustado más destacar el active con un *underline*.

### Links de webs de juegos similares 🔖 :
Para desarrollar estas páginas hemos consultado diversos juegos de estrategia online, entre los que destacan los siguientes:
* https://www.wesnoth.org/
* http://www.freeciv.org/
* https://play0ad.com/

### Problemas encontrados en el diseño de las páginas iniciales 😣 :
1. Una de las dificultades que nos hemos encontrado ha sido trabajar con las pseudoclases *:first-child, :nth-child(), :last-child*, no conseguíamos seleccionar los elementos que esperábamos y finalmente, enocntramos que la mejor opción es utilizar las siguientes para evitar estos problema *:first-of-type,:nth-of-type(), :last-of-type*.

    * Fuentes:
        * [Stackoverrun](https://stackoverrun.com/es/q/1070889)
        * [esthersola.com](https://www.esthersola.com/nth-child-css-ejemplos-practicos/)

2. Un problema que ha consumido una buena parte del tiempo disponible ha surgido en las pantallas en que se carga más de un archivo .js, como pueden ser la *homepage* o la página de personajes: la carga de archivos no era la correcta. Al hacer dos veces window.onload() en diferentes archivos, las funciones se machacaban y mezclaban entre sí, dando lugar a resultados indeseados.

Para solucionarlo hemos probado numerosas posibilidades. Una de ellas ha sido utilizar el atributo *defer* en el js secundario, para retrasar su carga hasta la completa construcción del DOM, pero no funcionaba correctamente. Otra opción ha sido unificar todos los archivos en uno, pero si bien esto hubiera funcionado correctamente no era ni lo que se pedía en el enunciado ni lo que queríamos conseguir.

Finalmente hemos optado por incluir el contenido del onload() original en una función diferente a la que no hemos invocado hasta estar ya cargado el onload() del archivo de header, con lo que hemos evitado que se sobrecarguen ambas funciones y hemos podido continuar trabajando con módulos.

Por otro lado, hemos tenido problemas en la carga de imágenes del archivo .json facilitado en el enunciado, no tanto por las imágenes en sí o por el desarrollo del código, sino más bien enlazando con la dificultad de los párrafos anteriores: el archivo de origen no se cargaba adecuadamente, especialmente cuando teníamos que cargar varios elementos que se contruían con el js y necesitaban que el json estuviera cargado con antelación ya que tienen addEventListeners asignados a algunos elementos que se creaban con la carga del json, y al intentar asignar el evento antes de que existiera en el DOM daba error, surgían temas de asincronía. 

Finalmente, la solución de ambos problemas vino de la mano. Mediante la siguiente función, controlamos que las funciones que debían ejecutarse al cargar el DOM, no se lanzasen hasta que estuviera completamente cargado el archivo header.html, que era el principal que nos daba problemas:

~~~
>$(document).ready(() => {
>  ...
>  $("header").load("header.html", start);
>});
~~~

3. Hemos tenido problemas para añadir propiedades de css con llevas un guión intermedio mediante js, el siguiente código daba error:

~~~
document
.getElementsByTagName("aside")[0].style.flex-direction = "column";
document
.getElementsByTagName("aside")[0].style.align-items = "flex-end";
~~~

Finalmente, hemos encontrado una solución en: [stackoverflow](https://stackoverflow.com/questions/58699722/using-javascript-to-change-css-style-in-flexbox)

Ha quedado de la siguiente forma:

~~~
document
.getElementsByTagName("aside")[0].style.flexDirection = "column";
document
.getElementsByTagName("aside")[0].style.alignItems = "flex-end";
~~~


## Desarrollo de código 🎮 :

### Detalles de las pantallas 'básicas':

### Pantalla Home:
La pantalla principal, la home, se ha desarrollado con Grid y Flexbox principalmente. Se ha modificado ligeramente el diseño original planteado en los wireframes, lo hemos justificado en el siguiente punto  del README: __*Modificaciones de sketch a wireframe y a prototipo*__.

Los enlaces a las diferentes secciones de la web, de los tres elementos *button* de la segunda section de la Home (ver en YouTube, Consultar Personajes, Jugar YA), se han cargado como un evento onclick directamente en el HTML, no tienen ningún evento más asociado, son como elementos *a*.

#### Header / footer:
Para 'importar' tanto el header como el footer hemos partido de las explicaciones enlazadas en el classroom de la asignatura, partiendo de la comprensión del código explicativo original en github.

#### Head:
Quisimos crear un archivo para agrupar los elementos del head comunes en todas las pantallas, pero daba conflictos ya que había elementos propios de cada pantalla y se machacaban. Finalmente esta opción no se ha implementado y se ha dejado comentada en js/scripts.js

~~~
>$(document).ready(() => {
>/* $("head").load("head.html"); */ //No utilizar, no carga bien
>...
>});
~~~

#### Aviso de cookies + ampliación: instalación cookie en el navegador:
Se ha configurado el modal del aviso de cookies basándonos en el siguiente tutorial de w3schools: [https://www.w3schools.com/howto/howto_css_modals.asp](https://www.w3schools.com/howto/howto_css_modals.asp).

Además, para que el popup de cookies no salga en todas las páginas de la web por las que se está navegando, se ha realizado una ampliación, dónde al aceptar el aviso, se instala la cookie balearicBuild con una duración de 1 día.

Para realizar esta ampliación, nos hemos basado en el siguiente tutorial de w3schools: [https://www.w3schools.com/js/js_cookies.asp](https://www.w3schools.com/js/js_cookies.asp).

En el caso de que se rechazen, aparece un alert que informa que para jugar es necesario aceptar el popup de cookies, y se cierra momentaneamente el modal permitiendo la navegación, pero al cambiar de pantalla o recargarla volverá a aparecer hasta que quede aceptado.

Se ha intentado crear el popup de forma dinámica con elementos del DOM, pero no funcionaba bien la transición, por ese motivo, hemos decidio incluirlo manualmente en todas las pantallas excepto en la del juego.

### Pantalla Personajes:
La pantalla de personajes, se ha desarrollado con Grid y Flexbox principalmente. Los diferentes elementos se obtienen del [JSON que proporciona la API](https://my-json-server.typicode.com/classicoman2/fakeRESTserver/personatges), y tanto el carrusel como el el grid se crean mediante funciones de creación del DOM.

#### Slider / Carrusel pantalla de personajes:
Para programar el carrusel de la página de personajes con animación, nos hemos basado en [este tutorial de w3schools](https://www.w3schools.com/howto/howto_js_slideshow.asp).

### Pantalla inicio del juego:
En la pantalla de inicio de juego, se ha desarrollado con flexbox principalmente y el grid de personajes, se generando con funciones de creación del DOM, obteniendo los datos del [JSON que proporciona la API](https://my-json-server.typicode.com/classicoman2/fakeRESTserver/personatges).

En esta pantalla, es dónde se cargan los datos de configuración, se indica el personaje y el nickname se recogen los parámetros mediante un form y se envían al juego por GET, en vez de utilizar LocalStorage.

### Pantalla de juego:

El código de desarrollo del juego es, posiblemente, el programa más largo que hemos escrito hasta el momento. Su base es el archivo main.js, que importa (a su vez o desde sus archivos importados) una serie de módulos entre los que cabe señalar un objeto 'juego' con sus métodos, una serie de funciones de pintado y 'transcripción' de canvas, y un archivo .js con variables de configuración.

El juego comienza al cargarse la página de juego. En el archivo main.js El Juego se crea con un constructor con parámetros, realizando un split de la URL se setean los atributos del objeto "juego". Esto se realiza mediante la función _**parametrosJuego()**_

Como detalle de interés, hemos jugado con el cambio de colores de diferentes elementos en función de los eventos correspondientes. Para utilizar los colores específicos que queríamos incluir nos hemos ayudado de explicaciones como la que hay en https://stackoverflow.com/questions/13712697/set-background-color-in-hex

#### Canvas:
Hemos visto adecuado separar el desarrollo del canvas y sus funciones relacionadas principales en un módulo independiente (en el archivo game_canvas.js).

La generación del grid sobre el canvas nos ha resultado muy problemática por el tratamiento que hace el tag *canvas* de los estilos *width* y *height*; finalmente nos ha obligado a generar el canvas en sí dentro de un div específico para el tablero de juego, a fin de poder trabajar como procede con las coordenadas.

Entre las páginas consultadas para resolver este problema, las más útiles han sido las de la siguiente lista:
* https://stackoverflow.com/questions/10214873/make-canvas-as-wide-and-as-high-as-parent
* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
* https://stackoverflow.com/questions/7545863/canvas-distorts-drawing-how-do-i-get-the-scale-factor-between-the-set-size-and
* https://stackoverflow.com/questions/59939839/difference-between-coordinates-in-pixels-and-coordinates-in-canvas-html

La función dibujarTablero(), de creación de canvas, se complementa con la función generarArrayTablero(). El objetivo de esta última es representar el canvas en una matriz bidimensional en que cada posición es un objeto que recoge todas las propiedades que necesitaremos para repitar esa casilla concreta cuando proceda. Estos atributos son:
* idEdificio: refleja el concepto 'serial' para cada uno de los edificios que se irán construyendo; esto permite tener un identificador único para cada uno, lo que nos facilitará traslados y demoliciones.
* tipo: originalmente *null*, muestra, cuando se construye un edificio, de qué tipo es. Facilita saber si la casilla está ocupada por algo.
* origenTipo: true muestra la casilla superior izquierda de una construcción (es decir, su origen); false todos los demás casos.
* terreno: recoge el tipo de terreno del mapa, a fin de poder hacer las comprobaciones necesarias (por ejemplo, si es mar no se puede construir). El valor básico, *null*, se emplea para el terreno básico, en que se puede construir sin ningún problema.

Aparte hemos visto necesario desarrollar una función llamada borrarTablero() que limpia completamente lo que hay pintado sobre el canvas y lo convierte en un contenedor vacío. Esto nos permite re-dibujar el tablero y todas las construcciones del mismo de manera limpia cada vez que lo necesitemos.

#### Mapas:
Hemos decicido generar cuatro mapas:
* Palma
* S'Arenal
* Puigpunyent
* Es Trenc

Cada mapa se guarda en un array de 'tipos' de suelo; los hemos separado en el módulo *game_mapas.js* para facilitar el trabajo.

Una alternativa a cargar mapas 'pre-hechos' en el juego hubiera sido que cada mapa se generara aleatoriamente al comenzar la partida. Cuando comenzamos a pensar en el desarrollo del proyecto decidimos descartar esta idea por los problemas que podían surgir de generar mapa aleatorios, y que en consecuencia habría que controlar: por ejemplo, que el mapa se generase sin ningún espacio de construcción lo suficientemente amplio.

En cualquier caso, la generación de estos mapas nos permitió llevar un flujo de desarrollo muy cómodo. Comenzamos trabajando con el mapa de Palma, usando de fondo de canvas el color ocre de nuestra paleta original (ya que el gris del enunciado no resultaba apropiado para el aspecto del juego, y el ocre daba imagen de 'tierra construible').

Una vez el flujo de juego era el correcto en el mapa de Palma, desarrollamos el de S'Arenal. Primero incluimos las partes de mar y las programamos; hecho esto, todo lo que hizo falta fue simplemente duplicar el sistema para incluir las partes de playa.

Después pasamos a Puigpunyent, que combina zona urbanizable con zona verde. El desarrollo del aspecto visual del mapa fue análogo al del mapa anterior, pero hizo falta programar la reconversión de terrenos como Empresario Ecológico, cosa que hicimos al cambiar el badge con el fragmento de código:

> if (this.contarEdificios("hotel") >= 2) {
>    this.badge = "Empresari Ecològic";
>    for (let i = 0; i < filasJuego; i++) {
>      for (let j = 0; j < columnasJuego; j++) {
>        if (this.tablero[i][j].terreno == "zonaverda") {
>          this.tablero[i][j].terreno = "urbanitzable";
>        }
>      }
>    }
> }

Con todo lo anterior solucionado, pudimos permitirnos crear el mapa de Es Trenc, que combina perfectamente todos los aspectos del juego.

#### Construcción de edificios.
La construcción, el traslado y la demolición de edificios comparten buena parte de su operativa. Las tres siguen el mismo procedimiento genérico: se pulsa el botón para seleccionar qué se va a hacer (por ejemplo, construir una chabola), se activa una variable del objeto *juego* asociada a este concepto, se pulsa sobre el canvas en el punto en que se desea operar, se selecciona la función correcta en base a la variable modificada anteriormente y se le pasan las coordenadas, se realizan las operaciones sobre el tablero, y se manejan los cambios.

En el desarrollo de la funcionalidad para trasladar un edificio hemos encontrado complicaciones, por que necesitábamos que se pudieran realizar dos eventos distintos al clicar sobre el tablero, un primer evento que capturase el edificio y la posición inicial, y otro evento que capturase la posición final y ejecutase el traslado.

Se intentó declarando nuevamente el addEventListener sobre el tablero, cada vez que se hacía un nuevo click, pero no se machacan correctamente y el juego se quedaba "bloqueado", tampoco mostraban errores en consola. Se probó aplicando removeEventListener al lanzar el primer click, y volviendolo a resetear en el segundo, pero tampoco funcionaba. Para descartar problemas, se intentó realizar lo mismo pero con la propiedad *onclick* sin éxito.

Finalmente, en *stackoverflow* encontramos una posible solución: [https://stackoverflow.com/questions/30754195/javascript-replace-event-listener](https://stackoverflow.com/questions/30754195/javascript-replace-event-listener).

El desarrollo de la construcción y de la demolición, por contraste, fueron bastante directos.

#### Eventos de tiempo:
Existen dos tipos de eventos de tiempo: los de actualización de datos y pantalla y los de eventos sorpresa. Ambos tipos tienen sus tiempos guardados en el archivo *game_configuracion.js*, y ambos se llaman desde la función de inicio del juego de la siguiente manera:

> setInterval(() => { this.actualizar(); }, tiempoRenta);
> setInterval(() => { this.manejarSorpresa(); }, tiempoSorpresa);

Los eventos de actualización de datos implican tanto la actualización de dinero y títulos como el control de los botones inactivos. Esto implica que cada vez que transcurre el tiempo definido en *tiempoRenta* llamaremos a las funciones *contabilizarGanancias()*, que sumará todas las rentas obtenidas durante el periodo por los edificios que ha construido el jugador, y *manejarInactivos()*, que analizará si se cumplen las condiciones para que se puedan construir los distintos tipos de edificios y, en función de esto, activará o desactivará los botones pertinentes.

Los eventos sorpresa se manejan a partir de la función *manejarSorpresa()*. La lógica de esta función es la siguiente: 

* Cada vez que pasa el periodo *tiempoSorpresa* se genera un booleano de forma aleatoria con una probabilidad de cada opción del 50%. El cógido para generarlo es [let randomBoolean = Math.random() < 0.5;](https://stackoverflow.com/questions/36756331/js-generate-random-boolean).

* Si el booleano es *true* se producirá el evento, así que se llama a la función *eventoSorpresa()*. Si es false no se producirá.

* La función *eventoSorpresa()* tiene un array con las diferentes posibilidades establecidas en el enunciado.

* Aleatoriamente se selecciona una de estas posibilidades mediante la línea: let evento = eventos[Math.floor(Math.random() * eventos.length)];

* A través de un switch, según el evento, se realizan las operaciones que toquen.

* Para terminar, se manejan las variables de dinero, *badges* y botones inactivos en pantalla.

#### Información de eventos de dinero:
Cuando se produce algún cambio en el dinero del jugador, sea porque gana (por ejemplo, por rentas) o porque pierde (al pagar sobornos o al construir o trasladar sus edificios) es importante que tanto la nueva cantidad como los 'motivos' para llegar a ella aparezcan claramente en la pantalla. Para desarrollar esta funcionalidad nos hemos basado en el diseño del 'loot' de numerosos juegos, que informan al usuario de lo que entra/sale de sus bolsas durante unos segundos antes de desaparecer de la pantalla.

Esto se ha desarrollado fundamentalmente mediante la siguiente función:

>function mostrarEventosDinero(texto) {
>  let infoDinero = document.getElementById("eventoDinero");
>  infoDinero.innerHTML = texto;
>  infoDinero.style.display = "block";
>  ocultarEventosDinero(6000);
>}

Esta función recibe el texto que queremos que se muestre por pantalla (por ejemplo, '+renta casa: 250'), lo mete en el elemento correspondiente del DOM, y fuerza que el style.display de este elemento se muestre. Por último llama a una función que establece un timer (en este ejemplo de 6 segundos), al final del cual el elemento deja de mostrarse en la página con display = 'none'.

>function ocultarEventosDinero(tiempo) {
>  setTimeout(
>    () => (document.getElementById("eventoDinero").style.display = "none"),
>    tiempo
>  );
>}

Para facilitar su cancelación cuando se da el caso de GameOver, estas funciones se han incluido dentro de atributos del objeto Juego; esto nos permite hacer, si procede, un *clear*.

Aparte, queremos destacar el tratamiento dado al icono de *soborno*, que aparece iluminado con un fondo dorado cuando todavía no se ha hecho un soborno y hay fondos para hacerlo. Esto se ha conseguido jugando con el elemento concreto del icono y la clase *iluminado*. El código que controla esta funcionalidad es el siguiente:

>juego.animarSoborno = function () {
>  let botonSoborno = document.getElementById("soborno");
>  if (!this.soborno) {
>    botonSoborno.classList.add("iluminado");
>  } else {
>    botonSoborno.classList.remove("iluminado");
>  }
>};

#### Sonidos:
Para incluir sonidos al realizar determinadas acciones en el juego (por ejemplo, que suene una caja registradora al cobrar alquileres o que un martillo golpee varias veces una superficie al construir un edificio) hemos investigado varias opciones, hasta finalmente decidirnos por la solución encontrada en [el apartado de sonidos de juegos de w3s](https://www.w3schools.com/graphics/game_sound.asp). Se basa en desarrollar una función (en nuestro caso llamada sound(src)) para llevar a cabo las diferentes acciones de un posible sonido: que comience, que se pare...

Cuando se desea llamar a un sonido en una función concreta, primero se instancia el nuevo sonido, pasándole por parámetro dónde se encuentra el archivo de sonido correspondiente, y luego se llama a la función apropiada. A título de ejemplo puede ver el siguiente fragmento de código:

>if (ganancias != 0) {
>    let sonidoDinero = new sound("src/sound/cash.mp3");
>    sonidoDinero.play();
>}

Respecto a los sonidos, todos los que hemos empleado en este juego se encuentran en el dominio público o son gratuitos. Los hemos obtenido de https://freesound.org/ y se pueden encontrar en la carpeta *src/sound/* del proyecto.

Se han cargado sonidos en varios momentos específicos del juego, entre otros:
* Sonido de una caja registradora cerrándose cuando se contabilizan las rentas.
* Aplausos cuando se produce un evento positivo, como una promoción o un premio.
* Silbato de árbitro cuando se produce un evento negativo, como una infracción o una crisis.
* Sonido de 'error' típico de máquina cuando se intenta construir un edificio donde no se puede.

###### ERROR en consola:
Al cargar los sonidos, algunos navegadores como Chrome intentan cargar un fichero llamado favicon.ico que no encuentra, y por lo tanto muestra el siguiente error:

~~~
GET http://127.0.0.1:5500/favicon.ico 404 (Not Found)
~~~

Aparentemente es un BUG del navegador, hemos encontrado las referencias en las siguientes páginas:

* [StackOverflow](https://stackoverflow.com/questions/61545121/chrome-browser-get-favicon-ico-each-time-an-audio-object-is-played)
* [Bugs Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=1069731&q=favicon&can=2)

Hemos decidido poner un parche para evitar todos los errores en consola, no es la solución pero es la mejor forma que hemos encontrado para corregirlo. Este parche, lo hemos descubierto en [StackOverflow](https://stackoverflow.com/questions/31075893/im-getting-favicon-ico-error). Lo que hemos realizado es:

* Hemos creado un fichero en *src* llamado *favicon.ico*.
* Lo cargamos como recurso en el *head* de juego.html.


#### Juego 'perdido':
Haciendo pruebas de desarrollo vimos que podía darse (en determinadas condiciones) un caso peculiar: que el jugador se quedase sin dinero. Tras hablarlo con el profesor en hora de clase, consideramos que esto hacía que fuera posible 'perder' el juego. Entendemos así que hay dos condiciones para perder el juego:

1. Que el jugador quede en números rojos (es decir, su dinero baje de 0).
2. Que el jugador pierda todas sus construcciones y tenga menos dinero que el necesario para construir una chabola (es decir, que no pueda hacer nada).

Además, el juego termina si el usuario así lo desea y aprieta el botón de salir.

En todos estos casos, el tablero de juego se borra y aparece el mensaje de *Game over* con el motivo correspondiente.

#### Tratamiento del cursor:
Durante los diferentes puntos del desarrollo del juego hemos buscado jugar con el aspecto del cursor, para fomentar que las distinas opciones sean más instintivas para el usuario. Así, hemos tenido en cuenta los siguientes puntos:

* El cursor sobre el canvas siempre adopta el aspecto de una mano, aunque este aspecto cambia dependiendo del punto del juego. Por norma general, el cursor fuera del canvas es de tipo flecha estándar, mientras que al hacer hover en el canvas es de tipo *pointer*.

* Cuando se hace hover sobre una construcción posible, el cursor pasa a ser de estilo *grab*: es una mano cerrada para agarrar la construcción que se quiere.

* Cuando se ha elegido una construcción y se quiere seleccionar dónde colocarla, el cursor en hover sobre el canvas pasa a tener estilo *grabbing* para mejor señalar la casilla elegida.

* Cuando se selecciona traslado, pero se clica en una celda vacía, el cursor para de *grabbing* a *pointer*, ya que no es posible realizar esa acción.

* Cuando el usuario no puede pulsar un pseudo-botón (por ejemplo, porque no tiene dinero para construir un tipo de edificio) el cursor desaparece al hacer hover sobre ese botón.

Más allá de la configuración inicial por css, todos estos cambios en el cursor se gestionan a través del código javascript.

## Refactorización CSS 🖌️ :
Se han utilizado las siguientes herramientas para validar y refactorizar el CSS:

* [Stylelint](https://stylelint.io/)
* [CSS LINT](http://csslint.net/)

Stylelint mostraba errores por la ordenación de los elementos del CSS; sugería que situásemos unos elementos antes de otros, etc. En estos casosno se ha tomado acción en este punto, porque consideramos que es más fácil e intuitivo mantener la ordenación tal cual estaba.

Por otro lado, en algunas ocasiones hemos añadido comentarios para destacar dónde empieza y dónde termina _(/* END/FIN ...*/)_ la definición de estilos en un bloque de código determinado.

CSS Lint muestra muchas recomendaciones que no se pueden llevar a cabo ya que indica que se deben unificar estilos, o que se repiten declaraciones en los mismos elementos, pero se trata de diferentes estilos según el responsive.

Consideramos que esta herramienta es útil para una análisis superficial, pero muestra advertencias en cosas que no debería. Por ejemplo, da por error el uso de variables de colores en root.

## Video presentación del proyecto 📹 :
Hemos realizado un único video con la presentanción tanto de la página web como del juego, lo hemos realizado totalmente en inglés. Se puede visualizar desde la Home de la página web o accedienciendo directamente a YouTube desde este [link](https://youtu.be/BrWE2bEPe8c).

El vídeo se ha elaborado enteramente en inglés.

Por diferencias en el software de grabación empleado, el volumen del vídeo es en ocasiones desigual; esto se solventa cambiando el volumen del reproductor en cada momento.

## Tareas pendientes en la entrega final ✋ :
Estamos muy satisfechas con el trabajo entregado, dado que hemos sido capaces de completar, en el poco tiempo disponible, todas nuestras metas; hemos desarrollado todas las funcionalidades que queríamos desarrollar.

Si cabe señalar algo, es que en el último momento nos ha faltado un día o dos para refactorizar adecuadamente el tratamiento de los mapas en el archivo *game_canvas.js*. Si bien el código es adecuado y no sobra una sola línea, nos hubiera gustado haber podido mejorarlo todavía más.

## Consideraciones finales 💫 :
Ha sido genial trabajar en equipo; consideramos que nos hemos complementado muy bien. La comunicación y la agilidad de trabajo ha ido incrementando y mejorando cada dia. Además, cada una nos hemos enfocado principalmente a la parte que más nos atrae de este área, lo que nos ha ayudado a disfrutar más de la práctica, aunque sin dejar de lado los aspectos que menos controlamos.

En definitiva, hemos trabajado en equipo intentando utilizar el mismo estilo y formato en el código, para que pasase desapercibido quién ha desarrollado cada función; además, hemos colaborado en la revisión del código de la otra persona, y nos hemos enfrentado en equipo a los problemas que iban surgiendo. De esta forma, el código es único en estilo, como si lo hubiera hecho la misma persona. 

## Releases 📅 :
* [Versión 1.0](https://github.com/victoriapenasmiro/BalearicBuild_2021/releases/tag/v1.0): 16 de noviembre de 2021
* [Versión 2.0](https://github.com/victoriapenasmiro/BalearicBuild_2021/releases/tag/v2.0): 28 de noviembre de 2021
* [Versión 3.0]((https://github.com/victoriapenasmiro/BalearicBuild_2021/releases/tag/v3.0): 10 de diciembre de 2021
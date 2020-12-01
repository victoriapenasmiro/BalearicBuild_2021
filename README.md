# BalearicBuild_2021
Repositorio proyecto P2 + Pc2.

## Autores:
* Maria Victoria Peñas
* María Rabanales

## Lenguajes:
* HTML
* CSS
* JavaScript
* Canvas
* Markdown
* JQuery (marginal)

## Objetivos:
El objetivo central de este proyecto es desarrollar un sistema de páginas web en torno a un juego de estrategia online llamado BalearicBuilding.

Como sub-objetivos podemos destacar:

* La ampliación y mejora de nuestros conocimientos de programación en los diferentes lenguajes, haciendo énfasis en el proceso de optimización y eficiencia en las funciones.
* El desarrollo de habilidades de trabajo en equipo, con intención de hacer varias sesiones de *pair programming* a través de herramientas online.
* La mejora de nuestra agilidad al 'picar' código.
* El desarrollo de nuestra familiariedad con el proceso de búsqueda de resolución de problemas y conflictos al programar, aprendiendo tanto a buscar como a analizar los resultados obtenidos con rapidez y en profundidad.
* El fomento de nuestra creatividad e inspiración a la hora no sólo de diseñar el aspecto físico del proyecto, sino también del código.

## Información previa para la buena visualización del proyecto:
Vemos necesario señalar las siguientes consideraciones previas para poder analizar bien el proyecto:

1. La fuente principal del proyecto no es nativa de Google Fonts y debe instalarse previamente; consultar el apartado de 'fuentes'.

2. Es necesario recargar las pantallas al cambiar de resolución *desktop* a *mobile*, es decir, al jugar con el navegador: los scripts se deben de cargar de nuevo porque, lógicamente, el slider y el grid son diferentes en móvil.

## Flujo de trabajo - GIT:
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

## Diseño:
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
* Pantalla de Juego: //TODO completar

### Fuentes:
* Hemos descargado la [tipografía Corleone](https://www.dafont.com/es/corleone.font) para utilizar en los titulos H1 y H2 y en el logo, así como en algunos elementos puntuales del juego. El motivo principal por el cual hemos seleccionado esta tipografía es que hemos querido basarnos en el estilo de [EL PADRINO](https://www.filmaffinity.com/es/film809297.html), ya que el juego trata de mafia y corrupción. No hemos optado utilizar la misma tipografía para todos los encabezados, porqué sino queda muy agresivo a la vista.

Esta tipografía se ha cargado en el css general, y no en la cabecera de cada página con el objetivo de utilizarlo en todas las pantallas:

~~~
@font-face {
  font-family: "Corleone";
  src: url("src/fonts/Corleone.TTF");
}
~~~

Debido a esto, la consola devuelve un error styles.css:1 GET http://127.0.0.1:5500/css/src/fonts/Corleone.TTF net::ERR_ABORTED 404 (Not Found), ya que espera obtener el código desde el head de cada página.

* La fuente de los textos que no son encabezados, hemos seleccionado una tipografía de [Google Fonts, Open Sans](https://fonts.google.com/specimen/Open+Sans). El motivo es porqué queríamos una tipografía bastante limpia, clara y de fácil lectura.

Desde la consola de Chrome, se obtiene el siguiente error con la fuente:

~~~
Refused to apply style from 'http://127.0.0.1:5500/url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
~~~

Hemos estado investigando y aparentemente se trata de un error propio de Chrome, ya que en otros navegadores no lo recuperamos.

Fuente: [https://discourse.roots.io/t/mime-type-text-html-not-a-supported-stylesheet-mime-type/11636/8](https://discourse.roots.io/t/mime-type-text-html-not-a-supported-stylesheet-mime-type/11636/8)

### Responsive:
Hemos establecido los siguientes criterios para el diseño responsive:
* Versión Móvil: max-width: 799px
* Versión Desktop: min-width: 800px

Actualmente los dispositivos móviles abarcan desde los 320px hasta los 799px aproximadamente. Uno de los dispositivos con pantalla más pequeña utilizada actualmente es el iphone 5(width 320px). A partir de 800px, suelen ser tablets en formato landscape, y normalmente suelen visualizarse como en la versión desktop.

Por otro lado, como ya se ha señalado en el apartado de diseño, debido a la longitud de nuestro menú para resoluciones inferiores a 800px ha sido necesario generar un menú de navegación colpasado, ya que no cabe todo en la misma linea.

Cabe destacar que hemos realizado algunas ampliaciones en el desarrollo responsive de la página:

1. Hemos adaptado el video (tomado de youtube) de la Homepage en resoluciones intermedias para ipads, de forma que el video no se corta en ningún momento.

2. Hemos adaptador el grid de personajes en diferentes resoluciones para que en ningún momento quede descuadrado.

### Transiciones:
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

>aside img {
>  ...
>  border-radius: 50%;
>  transition: transform 2.5s ease-in-out;
>}
>
>aside img:hover {
>  transform: rotate(360deg);
>}

#### Transición de thumbnails:
Se ha implementado una transición en el hover de las imagenes en formato thumbnail de la pantalla de personajes. Esta transición transcurre durante 0.5 segundos y únicamente al hacer 'hover' sobre fotos de thumbnail.

>.overlay {
>  transition: .5s ease;
>}
>
>#personajesLista > div:hover .overlay {
>  opacity: 0.5;
>}

## Modificaciones de sketch a wireframe y a prototipo:
1. Al plantear el sketch no tuvimos en cuenta la necesidad de incluir un botón de 'volver arriba', cuyo estilo tuvimos que idear directamente en el wireframe.

2. El diseño original del contenido del cuerpo implicaba que el texto y las imágenes estaban directamente sobre el fondo blanco de la página en general. Si bien esta idea, a priori, nos parecía muy limpia y elegante, en la práctica no tardamos en ver que daba sensación de desorden y falta de control. Para solucionarlo optamos por incluir el contenido central en contenedores 'div' extras, con bordes remarcados y un fondo gris que destacara sobre el blanco original, hiciera buen contraste con la letra, y facilitara la ordenación visual de los diferentes tipos de contenido.

3. Hemos cambiado la posición de los títulos *h1* de *homepage* y *personajes* para acercarlos más a la línea superior de la página. En nuestro diseño original estos títulos estaban en los apartados inferiores, y aunque estéticamente resultaban agradables no cumplían su función de título, por lo que hemos visto lógico modificarlos.

4. También hemos modificado algún título concreto, como el de la pantalla de personajes: de 'Elige a tu Balearic Builder' pasamos a 'Balearic Builders', ya que el verbo elegir daba la impresión de estar en una pantalla de selección en vez de en una pantalla de información.

5. Hemos eliminado los *pipes* separadores entre la opciones de menú, porqué estéticamente nos ha gustado más destacar el active con un *underline*.

### Links de webs de juegos similares:
Para desarrollar estas páginas hemos consultado diversos juegos de estrategia online, entre los que destacan los siguientes:
* https://www.wesnoth.org/
* http://www.freeciv.org/
* https://play0ad.com/

### Problemas encontrados en el diseño de las páginas iniciales:
1. Una de las dificultades que nos hemos encontrado ha sido trabajar con las pseudoclases *:first-child, :nth-child(), :last-child*, no conseguíamos seleccionar los elementos que esperábamos y finalmente, enocntramos que la mejor opción es utilizar las siguientes para evitar estos problema *:first-of-type,:nth-of-type(), :last-of-type*.

    * Fuentes:
        * [Stackoverrun](https://stackoverrun.com/es/q/1070889)
        * [esthersola.com](https://www.esthersola.com/nth-child-css-ejemplos-practicos/)

2. Un problema que ha consumido una buena parte del tiempo disponible ha surgido en las pantallas en que se carga más de un archivo .js, como pueden ser la *homepage* o la página de personajes: la carga de archivos no era la correcta. Al hacer dos veces window.onload() en diferentes archivos, las funciones se machacaban y mezclaban entre sí, dando lugar a resultados indeseados.

Para solucionarlo hemos probado numerosas posibilidades. Una de ellas ha sido utilizar el atributo *defer* en el js secundario, para retrasar su carga hasta la completa construcción del DOM, pero no funcionaba correctamente. Otra opción ha sido unificar todos los archivos en uno, pero si bien esto hubiera funcionado correctamente no era ni lo que se pedía en el enunciado ni lo que queríamos conseguir.

Finalmente hemos optado por incluir el contenido del onload() original en una función diferente a la que no hemos invocado hasta estar ya cargado el onload() del archivo de header, con lo que hemos evitado que se sobrecarguen ambas funciones y hemos podido continuar trabajando con módulos.

Por otro lado, hemos tenido problemas en la carga de imágenes del archivo .json facilitado en el enunciado, no tanto por las imágenes en sí o por el desarrollo del código, sino más bien enlazando con la dificultad de los párrafos anteriores: el archivo de origen no se cargaba adecuadamente, especialmente cuando teníamos que cargar varios elementos que se contruían con el js y necesitaban que el json estuviera cargado con antelación ya que tienen addEventListeners asignados a algunos elementos que se creaban con la carga del json, y al intentar asignar el evento antes de que existiera en el DOM daba error, surgían temas de asincronía. 

Finalmente, la solución de ambos problemas vino de la mano. Mediante la siguiente función, controlamos que las funciones que debían ejecutarse al cargar el DOM, no se lanzasen hasta que estuviera completamente cargado el archivo header.html, que era el principal que nos daba problemas:

>$(document).ready(() => {
>  ...
>  $("header").load("header.html", start);
>});

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


## Desarrollo de código:

### Detalles de las pantallas 'básicas':

#### Slider / Carrusel pantalla de personajes:
Para programar el carrusel de la página de personajes con animación, nos hemos basado en [este tutorial de w3schools](https://www.w3schools.com/howto/howto_js_slideshow.asp).

#### Header / footer:
Para 'importar' tanto el header como el footer hemos partido de las explicaciones enlazadas en el classroom de la asignatura, partiendo de la comprensión del código explicativo original en github.

#### Head:
Quisimos crear un archivo para agrupar los elementos del head comunes en todas las pantallas, pero daba conflictos ya que había elementos propios de cada pantalla y se machacaban. Finalmente esta opción no se ha implementado y se ha dejado comentada en js/scripts.js

>$(document).ready(() => {
>/* $("head").load("head.html"); */ //No utilizar, no carga bien
>...
>});

#### Aviso de cookies + ampliación: instalación cookie en el navegador:
Se ha configurado el modal del aviso de cookies basándonos en el siguiente tutorial de w3schools: [https://www.w3schools.com/howto/howto_css_modals.asp](https://www.w3schools.com/howto/howto_css_modals.asp).

Además, para que el popup de cookies no salga en todas las páginas de la web por las que se está navegando, se ha realizado una ampliación, dónde al aceptar el aviso, se instala la cookie balearicBuild con una duración de 1 día.

Para realizar esta ampliación, nos hemos basado en el siguiente tutorial de w3schools: [https://www.w3schools.com/js/js_cookies.asp](https://www.w3schools.com/js/js_cookies.asp).

En el caso de que se rechazen, aparece un alert que informa que para juagr es necesario aceptar el popup de cookies, y se cierra momentaneamente el modal permitiendo la navegación, pero al cambiar de pantalla o recargarla volverá a aparecer hasta que quede aceptado.

### Pantalla del juego:
El código de desarrollo del juego es, posiblemente, el programa más largo que hemos escrito hasta el momento. Su base es el archivo main.js, que importa (a su vez o desde sus archivos importados) una serie de módulos entre los que cabe señalar un objeto 'juego' con sus métodos, una serie de funciones de pintado y 'transcripción' de canvas, y un archivo .js con variables de configuración.

#### Inicio del juego:
El juego comienza al cargarse la página de juego. En el archivo main.js  //TODO completar

#### Canvas:
Hemos visto adecuado separar el desarrollo del canvas y sus funciones relacionadas principales en un módulo independiente.

La generación del grid sobre el canvas nos ha resultado muy problemática por el tratamiento que hace el tag *canvas* de los estilos *width* y *height*; finalmente nos ha obligado a generar el canvas en sí dentro de un div específico para el tablero de juego, a fin de poder trabajar como procede con las coordenadas.

Entre las páginas consultadas para resolver este problema, las más útiles han sido las de la siguiente lista:
* https://stackoverflow.com/questions/10214873/make-canvas-as-wide-and-as-high-as-parent
* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
* https://stackoverflow.com/questions/7545863/canvas-distorts-drawing-how-do-i-get-the-scale-factor-between-the-set-size-and
* https://stackoverflow.com/questions/59939839/difference-between-coordinates-in-pixels-and-coordinates-in-canvas-html

//TODO completar

#### Construcción de edificios.
La construcción, el traslado y la demolición de edificios comparten buena parte de su operativa. Las tres siguen el mismo procedimiento genérico: se pulsa el botón para seleccionar qué se va a hacer (por ejemplo, construir una chabola), se activa una variable del objeto *juego* asociada a este concepto, se pulsa sobre el canvas en el punto en que se desea operar, se selecciona la función correcta en base a la variable modificada anteriormente y se le pasan las coordenadas, se realizan las operaciones sobre el tablero, y se manejan los cambios.

//TODO completar

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

function mostrarEventosDinero(texto) {
  let infoDinero = document.getElementById("eventoDinero");
  infoDinero.innerHTML = texto;
  infoDinero.style.display = "block";
  ocultarEventosDinero(6000);
}

Esta función recibe el texto que queremos que se muestre por pantalla (por ejemplo, '+renta casa: 250'), lo mete en el elemento correspondiente del DOM, y fuerza que el style.display de este elemento se muestre. Por último llama a una función que establece un timer (en este ejemplo de 6 segundos), al final del cual el elemento deja de mostrarse en la página con display = 'none'.

function ocultarEventosDinero(tiempo) {
  setTimeout(
    () => (document.getElementById("eventoDinero").style.display = "none"),
    tiempo
  );
}

#### Sonidos:
Para incluir sonidos al realizar determinadas acciones en el juego (por ejemplo, que suene una caja registradora al cobrar alquileres o que un martillo golpee varias veces una superficie al construir un edificio) hemos investigado varias opciones, hasta finalmente decidirnos por la solución encontrada en [el apartado de sonidos de juegos de w3s](https://www.w3schools.com/graphics/game_sound.asp). Se basa en desarrollar una función (en nuestro caso llamada sound(src)) para llevar a cabo las diferentes acciones de un posible sonido: que comience, que se pare...

Cuando se desea llamar a un sonido en una función concreta, primero se instancia el nuevo sonido, pasándole por parámetro dónde se encuentra el archivo de sonido correspondiente, y luego se llama a la función apropiada. A título de ejemplo puede ver el siguiente fragmento de código:

if (ganancias != 0) {
    let sonidoDinero = new sound("src/sound/cash.mp3");
    sonidoDinero.play();
}

Respecto a los sonidos, todos los que hemos empleado en este juego se encuentran en el dominio público o son gratuitos. Los hemos obtenido de https://freesound.org/ y se pueden encontrar en la carpeta *src/sound/* del proyecto.

#### Juego 'perdido':
Haciendo pruebas de desarrollo vimos que podía darse (en determinadas condiciones) un caso peculiar: que el jugador se quedase sin dinero. Tras hablarlo con el profesor en hora de clase, consideramos que esto hacía que fuera posible 'perder' el juego. Entendemos así que hay dos condiciones para perder el juego:

1. Que el jugador quede en números rojos (es decir, su dinero baje de 0).
2. Que el jugador pierda todas sus construcciones y tenga menos dinero que el necesario para construir una chabola (es decir, que no pueda hacer nada).

//TODO programar

#### Tratamiento del cursor:
Durante los diferentes puntos del desarrollo del juego hemos buscado jugar con el aspecto del cursor, para fomentar que las distinas opciones sean más instintivas para el usuario. Así, hemos tenido en cuenta los siguientes puntos:

* El cursor sobre el canvas siempre adopta el aspecto de una mano, aunque este aspecto cambia dependiendo del punto del juego. Por norma general, el cursor fuera del canvas es de tipo flecha estándar, mientras que al hacer hover en el canvas es de tipo *pointer*.

* Cuando se hace hover sobre una construcción posible, el cursor pasa a ser de estilo *grab*: es una mano cerrada para agarrar la construcción que se quiere.

* Cuando se ha elegido una construcción y se quiere seleccionar dónde colocarla, el cursor en hover sobre el canvas pasa a tener estilo *grabbing* para mejor señalar la casilla elegida.

* Cuando el usuario no puede pulsar un pseudo-botón (por ejemplo, porque no tiene dinero para construir un tipo de edificio) el cursor desaparece al hacer hover sobre ese botón.

Más allá de la configuración inicial por css, todos estos cambios en el cursor se gestionan a través del código javascript.

## Consideraciones finales:
//TODO completar

## Releases:
* [Versión 1.0](https://github.com/victoriapenasmiro/BalearicBuild_2021/releases/tag/v1.0): 16 de noviembre de 2021
* [Versión 2.0](https://github.com/victoriapenasmiro/BalearicBuild_2021/releases/tag/v2.0): 28 de noviembre de 2021
* [Versión 3.0](link): TBA
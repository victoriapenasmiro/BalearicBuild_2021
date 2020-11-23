# BalearicBuild_2021
Repositorio proyecto P2 + Pc2.

## Autores:
* Maria Victoria Peñas
* María Rabanales

## Flujo de trabajo - GIT:
Se establece el siguiente proceso de trabajo con GIT:

Se va a trabajar mediante ramas. Se creará una rama por funcionalidad. El proceso será el siguiente:

Crear una rama, desarrollar funcionalidad, al finalizar merge a main. El flujo será:
1. De main, crear una rama.
~~~
    git branch nombrerama
    git checkout nombrerama
~~~
2. Desarrollar y commitear sobre esa rama.
~~~
    git add .
    git commit -m ”comentarios” 3. Subir esa rama al repositorio.
    git push --all
~~~
4. Hacer merge de esa rama a main y resolver conflictos
~~~
    git checkout main
    git merge nombrerama
~~~
5. Hacer pull de main en local (para tener los últimos cambios descargados).
~~~
    git checkout main 
    git pull
    git push
~~~
6. Volver al paso 1 para desarrollar otra cosa.

## Lenguajes:
* HTML
* CSS
* JavaScript
* Canvas
* Markdown
* JQuery (marginal)

## Objetivos:
//TODO completar

## Diseño:
El proceso de diseño de esta web ha partido de 'sketches', tanto para desktop como para móvil, ideados en común durante las horas de clase. Obtenido el visto bueno desarrollamos los diferentes wireframes con la herramienta MOCKPLUS, muy completa y adecuada para desarrollar proyectos en equipo.
//TODO completar

### Paleta de colores:
La paleta de colores se puede encontrar en la carpeta docs //TODO añadir link

El tema subyacente del juego es la corrupción urbanística prevalente en las Islas Baleares. Inicialmente planteamos tres ideas para la paleta de colores:
* Basada en las fotos habituales del paisaje 'salvaje' de las islas: verdes, marrones, con algún toque azul de mar de fondo.
* Basada en la imagen de 'construcciones de verano' de la zona de playa: paleta de base marinera, con azul, rojo y blanco.
* Basada en la corrupción en cierta manera 'mafiosa': paleta tradicional de películas y series sobre la Mafia como 'El Padrino' o 'El Precio del Poder (Scarface)', en negros, grises, rojos y blancos.
//TODO completar

### Accesibility:

* Pantalla Inicio - Home: Los textos tienen un adecuado contraste con su background.
* Pantalla Personajes:
* Pantalla Login:


### Fuentes:
* Hemos descargado la [tipografía Corleone](https://www.dafont.com/es/corleone.font) para utilizar en los titulos H1 y H2 y en el logo, así como en algunos elementos puntuales del juego. El motivo principal por el cual hemos seleccionado esta tipografía es porqué hemos querido basarnos en el estilo de [EL PADRINO](https://www.filmaffinity.com/es/film809297.html), ya que el juego trata de mafia y corrupción. No hemos optado utilizar la misma tipografía para todos los encabezados, porqué sino queda muy agresivo a la vista.

Esta tipografía se ha cargado en el css general, y no en el head de cada página con el objetivo de utilizarlo en todas las pantallas.

* La fuente de los textos que no son encabezados, hemos seleccionado una tipografía de [Google Fonts, Open Sans](https://fonts.google.com/specimen/Open+Sans). El motivo es porqué queríamos una tipografía bastante limpia, clara y de fácil lectura.

### Responsive:
Hemos establecido los siguientes criterios para el diseño responsive:
* Versión Móvil: max-width: 799px
* Versión Desktop: min-width: 800px

Actualmente los dispositivos móviles abarcan desde los 320px hasta los 799px aproximadamente. Uno de los dispositivos con pantalla más pequeña utilizada actualmente es el iphone 5(width 320px). A partir de 800px, suelen ser tablets en formato landscape, y normalmente suelen visualizarse como en la versión desktop.

Por otro lado, debido a la longitud de nuestro menú para resoluciones inferiores a 800px, necesitamos un menú de navegación colpasado, ya que no cabe todo en la misma linea.

#### Ampliaciones responsive: //TODO lo dejamos aquí?
* Hemos adaptado el video de la Home en resoluciones intermedias para ipads, de forma que el video no se corta.


La selección de fuentes se puede encontrar en la carpeta docs //TODO añadir link
//TODO completar

### Transiciones:
#### Aviso de cookies:
//TODO hacer y completar

#### Fotos giratorias:
La segunda transición se encuentra en el elemento 'aside' de la homepage y afecta a las fotografías de las colaboradoras de este proyecto. Cuando se pasa el ratón por encima de cada fotografía, esta gira y tarda en hacer una rotación completa un tiempo de 2.5 segundos. Como las fotografías se han redondeado, el efecto resultante resulta muy agradable. Cuando se aparta el ratón, la foto hace el giro en sentido contrario hasta volver a su posición inicial.

Esto se ha logrado con el siguiente fragmento de código:

~~~
aside img {
  ...
  border-radius: 50%;
  transition: transform 2.5s ease-in-out;
}

aside img:hover {
  transform: rotate(360deg);
}
~~~

#### transición de .5s sobre hover fotos thumbnail
Se ha implementado una transición en el hover de las imagenes en formato thumbnail de la pantalla de personajes:

~~~
.overlay {
  transition: .5s ease;
}

#personajesLista > div:hover .overlay {
  opacity: 0.5;
}
~~~


## Modificaciones de sketch a wireframe y a prototipo:
1. Al plantear el sketch no tuvimos en cuenta la necesidad de incluir un botón de 'volver arriba', cuyo estilo tuvimos que idear directamente en el wireframe.

2. También modificamos algún título concreto, como el de la pantalla de personajes: de 'Elige a tu Balearic Builder' pasamos a 'Balearic Builders', ya que el verbo elegir daba la impresión de estar en una pantalla de selección en vez de en una pantalla de información.

3. Hemos eliminado los *pipes* separadores entre la opciones de menú, porqué estéticamente nos ha gustado más destacar el active con un underline.

//TODO completar

### Links de webs de juegos similares:
* https://www.wesnoth.org/
* http://www.freeciv.org/
* https://play0ad.com/

### Problemas encontrados:

* Uno de las dificultades que nos hemos encontrado ha sido trabajar con las pseudoclases *:first-child, :nth-child(), :last-child*, no conseguíamos seleccionar los elementos que esperábamos y finalmente, enocntramos que la mejor opción es utilizar las siguientes para evitar estos problema *:first-of-type,:nth-of-type(), :last-of-type*.

    * fuentes:
        * [Stackoverrun](https://stackoverrun.com/es/q/1070889)
        * [esthersola.com](https://www.esthersola.com/nth-child-css-ejemplos-practicos/)

<!-- * En las pantallas dónde cargamos más de un js, hemos tenido que utilizar el atributo *defer* en el js secundario, para retrasar su carga hasta la completa construcción del DOM, ya que sino no se cargan completamente los scripts -->

## Desarrollo de código:

#### Slider / Carrusel pantalla de personajes:
Para programar el carrusel de la página de personajes con animación, nos hemos basa en [este tutorial de w3schools](https://www.w3schools.com/howto/howto_js_slideshow.asp)

## Releases:
* [Versión 1.0](https://github.com/victoriapenasmiro/BalearicBuild_2021/releases/tag/v1.0): 16 de noviembre de 2021
//TODO completar
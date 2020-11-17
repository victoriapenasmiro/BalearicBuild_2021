# BalearicBuild_2021
Repositorio proyecto P2 + Pc2.

## Autores:
* Maria Victoria Peñas
* María Rabanales

## Flujo de trabajo:
//TODO completar

## Lenguajes:
* HTML
* CSS
* JavaScript
* Markdown

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

La selección de fuentes se puede encontrar en la carpeta docs //TODO añadir link
//TODO completar

## Modificaciones de sketch a wireframe y a prototipo:
1. Al plantear el sketch no tuvimos en cuenta la necesidad de incluir un botón de 'volver arriba', cuyo estilo tuvimos que idear directamente en el wireframe.

2. También modificamos algún título concreto, como el de la pantalla de personajes: de 'Elige a tu Balearic Builder' pasamos a 'Balearic Builders', ya que el verbo elegir daba la impresión de estar en una pantalla de selección en vez de en una pantalla de información.

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

## Desarrollo de código:
//TODO completar

## Releases:
* [Versión 1.0](https://github.com/victoriapenasmiro/BalearicBuild_2021/releases/tag/v1.0): 16 de noviembre de 2021
//TODO completar
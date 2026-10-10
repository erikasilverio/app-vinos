# Guía de Vinos

Una guía de vinos pensada para el celular. Muestra cada vino con su descripción, las marcas más conocidas, la uva, la temperatura de servicio, con qué comida combina y para qué nivel de bebedor es (iniciante, intermedio o experto).

No necesita instalación ni servidor: son archivos estáticos.

## Qué tiene

- 40 vinos de Europa, América, Sudáfrica y Oceanía, con varios de Uruguay.
- Filtros por nivel y por tipo, y buscador por vino, uva, país, marca o plato.
- Pestaña "Qué como hoy": elegís un plato y te sugiere vinos.
- Favoritos, guardados en el propio teléfono.
- Modo claro y oscuro según el sistema.
- Se puede agregar a la pantalla de inicio como si fuera una app.

## Cómo verla

Abrí `index.html` en el navegador. Para que el manifest y la instalación en el celular funcionen hace falta servirla por http, por ejemplo con `npx serve` o con GitHub Pages (abajo).

## Cómo agregar un vino

Todo está en `js/datos.js`:

1. Sumá una fila a `VINOS` con el formato indicado arriba de la lista.
2. Sumá sus marcas en `MARCAS`, en la misma posición.
3. Si usa una uva nueva, agregala a `COLOR_UVA` para que el racimo tenga su color.

## Publicarla gratis con GitHub Pages

1. Subí estos archivos a un repositorio público.
2. En el repositorio: Settings, Pages.
3. En "Build and deployment" elegí "Deploy from a branch", rama `main`, carpeta `/ (root)`.
4. En un par de minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Estructura

```
index.html            pantalla principal
css/estilos.css       estilos y colores (claro y oscuro)
js/datos.js           vinos, marcas, colores y platos
js/app.js             lógica y dibujo de botellas y racimos
manifest.webmanifest  datos para agregarla a la pantalla de inicio
icono.svg             ícono
```

## Notas

- Las marcas son ejemplos conocidos de cada estilo. La disponibilidad cambia según el país y la tienda; conviene verificarla, sobre todo en las uruguayas.
- Las botellas y los racimos son dibujos hechos en SVG. No se usan logos ni fotos de terceros.
- Tipografías: Bodoni Moda e Instrument Sans, cargadas desde Google Fonts.
- Licencia: pendiente de elegir por quien publique el repositorio.

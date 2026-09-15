# Fotos de la portada: origen y licencia

Fotos de la portada "Prepara tu Verano" (ajustes del 14-sep-2026). Cada archivo está recortado y
optimizado para la web; `next/image` lo sirve en AVIF o WebP.

## Stock de Unsplash

Todas bajo la **Licencia de Unsplash** (https://unsplash.com/license): uso gratuito, también comercial,
sin pedir permiso. No son fotos Unsplash+ (se verificó `premium: false` y `plus: false` en cada una el
14-sep-2026). La atribución no es obligatoria, pero queda anotada acá.

`cocina-tablet.jpg` (15-sep-2026) reemplaza a `cocina-pensando.jpg` (Simon Abel), que mostraba a una mujer
de más de 50. Se verificó que es de descarga libre: su enlace de descarga
(`https://unsplash.com/photos/hWkdYpZuWYE/download`) redirige a la imagen, cosa que las fotos Unsplash+
no hacen (responden 403). Recorte cuadrado de 1400 px desde el original.

| Archivo | Dónde va | Autor | URL |
|---|---|---|---|
| `cocina-tablet.jpg` | Ya no va: la reemplaza `cocina-mirando-celular.jpg` (15-sep) | Rashmi Kalburgie | https://unsplash.com/photos/hWkdYpZuWYE |
| `telefono-cocina.jpg` | Ya no va: la reemplaza `sillon-celular.jpg` (15-sep) | Vitaly Gariev (@silverkblack) | https://unsplash.com/photos/a96i1vtuwsk |
| `cocinando-casa.jpg` | Paso 02, cada quincena | Vitor Monthay (@vitormonthay) | https://unsplash.com/photos/Mdw9A3FQ3gs |
| `mesa-riendo.jpg` | Ya no va: la reemplaza `constanza-oferta.jpg` (15-sep) | Bruno Dias (@onurbdias) | https://unsplash.com/photos/7Hb-ZbR04Hc |
| `sandia-tabla.jpg` | Cierre | Cody Chan (@cceee) | https://unsplash.com/photos/802n4MChUYk |

## Stock de Pexels (15-sep-2026)

En la reunión de revisión del 15-sep Constanza pidió fotos con "más realismo". Estas dos reemplazan a las
que se veían más de catálogo (maquillaje de sesión, cocinas de revista, pose de modelo): luz natural, ropa
de todos los días, gestos que no miran a la cámara. La foto de la oferta no es de stock: es Constanza (ver
más abajo).

Todas bajo la **Licencia de Pexels** (https://www.pexels.com/license/): uso gratuito, también comercial, se
pueden recortar y la atribución no es obligatoria. Lo que la licencia **no** permite y hay que cuidar en la
landing: que las personas aparezcan en mala luz, o **dar a entender que respaldan el producto**. Por eso
van solo en "¿Te suena familiar?" y en el paso 01, lejos de testimonios, reseñas y cifras de pacientes, y
**no se pueden mover** a la sección de Constanza, a Testimonios ni a la zona de precio (`#precio`), donde
están la calificación de Google, las citas de reseñas y "+2.500 pacientes".

| Archivo | Dónde va | Autor | URL | Recorte |
|---|---|---|---|---|
| `cocina-mirando-celular.jpg` | ¿Te suena familiar? | RDNE Stock project (https://www.pexels.com/@rdne/) | https://www.pexels.com/photo/10432356/ | Cuadrado de 1400 px centrado en ella, desde el original de 6058 × 4039 |
| `sillon-celular.jpg` | Paso 01, al comenzar | Sandro Tavares (https://www.pexels.com/@sandro-tavares-260503371/) | https://www.pexels.com/photo/17489833/ | Cuadro completo 3:2, a 1400 × 933 |

Las de "Un comienzo. Un camino. Un grupo." son horizontales porque ese recuadro es horizontal desde el
15-sep (16:11 en escritorio, 16:9 en celular); una vertical de 960 × 1200 pierde casi la mitad del alto en ese recuadro.

Criterio de selección (vale para las dos fuentes): comida casera, cocina y mujeres en situaciones
cotidianas, sin básculas, cintas de medir, cuerpos ni "antes y después" (brief del 14-sep). Las personas de
las fotos se ven de 30 a 45 años, porque el público del programa tiene entre 28 y 50 (corrección del 14-sep,
que sacó tres fotos con mujeres de 60 o más). Desde el 15-sep, además: aspecto latinoamericano y casas
comunes, sin texto ni marcas legibles.

## Constanza

Material propio de Constanza Jiménez Paschold. Solo ella, sin pacientes ni terceros.

| Archivo | Dónde va | Fuente |
|---|---|---|
| `constanza-sesion.jpg` | Paso 03, durante el programa | Cuadro en 1,4 s de `IMG_2967.MOV` |
| `constanza-sonrisa.jpg` | Cierre | Cuadro en 9,5 s de `IMG_2979.MOV` |
| `constanza-oferta.jpg` | Oferta (desde el 15-sep) | Cuadro cerca de 4,7 s de `IMG_3028.MOV`, look D: polar crema con cierre dorado y coleta. Recorte 3:4 de 972 × 1296 (desde x = 108, y = 0) llevado a 960 × 1280 |

Los `.MOV` son los originales de cámara que entregó por Drive el 5-ago-2026
(`60-clientes/activos/constanza-nutricion/outputs/contenido/assets-cliente/reels-crudos/originales-drive-2026-08-05/`,
look A: polerón burdeo y chaleco crema; la de la oferta es del look D, para no repetir ropa con las otras dos).
Vienen en HDR (HLG): los cuadros se sacaron después de pasarlos a SDR con `avconvert` (preset H.264 1080p,
que convierte a BT.709) y `ffmpeg`.

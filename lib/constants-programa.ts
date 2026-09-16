// ============================================================
// COPY DEL PROGRAMA "PREPARA TU VERANO"
//
// Todo lo de acá sale de la propuesta que Constanza aprobó el 31-ago-2026
// (`outputs/propuestas/propuesta-constanza-programa-3-meses.pdf`, §02 La oferta).
// Nada se inventó: si algo no está en la propuesta, no está en la página.
//
// Las FECHAS y el PRECIO NO viven acá a propósito. Vienen del endpoint
// `cohorte-actual`, que los lee de la fila de la cohorte. Copiarlos a este
// archivo los desalinearía en cuanto alguien edite la tabla.
// ============================================================

import { SITE_CONFIG } from "@/lib/constants"
import {
  diaSemanaYFecha,
  diaYMes,
  formatCLP,
  sesionesLegibles,
  ultimoDiaDeVenta,
  ultimoDiaDelPrograma,
  type EstadoVenta,
} from "@/lib/programa"

export const PROGRAMA = {
  nombre: "Prepara tu Verano",
  eyebrow: "Programa de 3 meses · Por Constanza Jiménez Paschold",

  hero: {
    h1: ["Llega al verano", "sin hinchazón."],
    subtitle:
      "Un programa de tres meses con tu pauta antiinflamatoria hecha por Constanza y una pauta nueva cada quince días. Un grupo que empieza y termina junto, con fecha.",
    ctaAbierta: "Quiero entrar al programa",
    ctaProxima: "Avísame cuando abran las inscripciones",
    microcopy: "Un solo pago · sin mensualidad · boleta exenta para tu isapre",
  },

  // §02 de la propuesta, textual.
  incluye: [
    {
      titulo: "Tu pauta personalizada",
      detalle: "Constanza la arma con las 11 variables de tu cuestionario, antes de que parta el grupo.",
    },
    {
      titulo: "Recetario chileno filtrado para tu pauta",
      detalle: "Con lista de compras de las recetas que eliges, para que no tengas que pensar qué cocinar.",
    },
    {
      titulo: "Una pauta nueva cada 15 días",
      detalle:
        "Haces tu control y Constanza te arma la pauta siguiente. Son 6 pautas diferentes, y el tercer mes es para mantener lo que lograste.",
    },
    {
      titulo: "Grupo de WhatsApp exclusivo",
      detalle: "Solo para quienes entran a este grupo. Constanza te agrega con el WhatsApp que dejas al inscribirte.",
    },
    {
      titulo: "Tres sesiones grupales en vivo con Constanza",
      detalle: "Una por mes, en vivo, para preguntarle directo a ella.",
    },
    {
      titulo: "Boleta exenta de IVA",
      detalle: "Para pedir el reembolso a tu isapre, según tu plan.",
    },
  ],

  noIncluye: {
    titulo: "Consulta individual",
    detalle:
      "El programa es tu pauta, la app y el acompañamiento en grupo. Lo decimos claro desde el principio para que nadie llegue esperando otra cosa.",
  },

  // La escasez de este programa es la FECHA, no un contador de cupos. Los "50
  // cupos fundadoras" llevaban tres meses sin llenarse: un cupo que nadie ve
  // agotarse no apura a nadie. Ver §05 de la propuesta.
  porQueFecha: {
    h2: "Es un grupo, no una suscripción.",
    body: "Todas avanzan juntas y hacen la misma quincena al mismo tiempo, así que no se puede entrar en la semana seis. Por eso las inscripciones tienen fecha de cierre.",
  },

  sesiones: {
    eyebrow: "Tres veces, en vivo",
    h2: "Una sesión al mes con Constanza.",
    sinFechas:
      "Las fechas y horas de las tres sesiones se confirman antes de que arranque el programa, y quedan en el grupo de WhatsApp.",
  },

  precio: {
    eyebrow: "Un solo pago",
    labelPrecio: "Pago único, exento de IVA",
    permanencia: "Sin mensualidad que cancelar después",
    cta: "Pagar e inscribirme",
    ctaCargando: "Preparando tu pago...",
    consentimiento:
      "Acepto los términos, la política de privacidad y el aviso de datos sensibles de salud.",
  },

  // Este bloque aparece en dos momentos distintos: antes de que abra la primera
  // ventana y después de que cierre cualquiera. "Las inscripciones están
  // cerradas" es falso en el primer caso, porque todavía no abrieron. El copy
  // tiene que ser verdadero en los dos.
  listaEspera: {
    eyebrow: "Las inscripciones todavía no abren",
    h2: "Te avisamos apenas abran.",
    body: "Déjanos tu correo y te escribimos el día que se abran las inscripciones, antes de que salga la publicidad.",
    cta: "Avísenme cuando abra",
    ctaCargando: "Anotando...",
    exito: "Listo. Te escribimos apenas abran las inscripciones del próximo grupo.",
  },

  // La propuesta pide FAQ que se haga cargo de las dudas de pago mientras el
  // tema del antifraude de Mercado Pago se resuelve. La primera pregunta es
  // esa, y es honesta: el dato del saldo de MP sale de los 49 intentos con 0%
  // de rechazo medidos en la cuenta entre diciembre y marzo.
  faq: [
    {
      q: "¿Y si me rechazan la tarjeta?",
      a: "Puede pasar, y no es que no tengas fondos: es el sistema antifraude de Mercado Pago, que a veces es duro con los montos altos. Si te rechaza, lo más rápido es pagar con saldo de Mercado Pago en vez de tarjeta. Y si igual no resulta, puedes pagar por transferencia.",
    },
    {
      q: "¿Puedo entrar cuando el programa ya empezó?",
      a: "No, y es a propósito. Todas avanzan juntas y hacen la misma quincena al mismo tiempo, así que entrar en la semana seis no funcionaría. Si te lo perdiste, se abre un grupo nuevo cada mes y te podemos avisar.",
    },
    {
      q: "¿Después me van a cobrar todos los meses?",
      a: "No. Es un solo pago por los tres meses completos. No hay mensualidad que cancelar ni permanencia.",
    },
    {
      q: "¿Me sirve para el reembolso de la isapre?",
      a: "Sí. Recibes boleta exenta de IVA a tu nombre, que es la que te piden para pedir el reembolso.",
    },
    {
      q: "¿Incluye una consulta con Constanza?",
      a: "No. El programa es tu pauta personalizada que arma Constanza, una pauta nueva cada quince días, el grupo de WhatsApp y las tres sesiones en vivo. La consulta individual es un servicio aparte.",
    },
    {
      q: "¿Cuánto tiempo me va a tomar?",
      a: "El cuestionario del principio toma unos diez minutos. Después, un control cada quince días y cocinar con las recetas y la lista de compras de tu pauta. No hay clases que seguir ni horarios, salvo las tres sesiones en vivo.",
    },
  ],

  ctaFinal: {
    h2: "Tu cuerpo va a llegar al verano igual.",
    h2b: "La pregunta es cómo.",
    body: "Tres meses alcanzan de sobra si empiezas ahora. Después del cierre, el próximo grupo es el mes que viene.",
  },
} as const

/**
 * Pago por transferencia (decisión de Oscar, 15-sep): solo como salida cuando
 * Mercado Pago rechaza, nunca al lado del botón de pagar. Cada transferencia es
 * un alta manual y Meta no la ve como compra por el píxel.
 */
export const TRANSFERENCIA = {
  titular: "Constanza Jiménez",
  banco: "Banco Santander",
  tipoCuenta: "Cuenta corriente",
  numero: "68991978",
  rut: "17.701.236-K",
  correo: "contacto@constanzanutricion.cl",
  instruccion:
    "Manda el comprobante con tu nombre, tu correo y tu WhatsApp a contacto@constanzanutricion.cl y te activamos el acceso dentro de un día hábil.",
} as const

/** "Constanza Jiménez · Banco Santander · Cuenta corriente 68991978 · RUT 17.701.236-K" */
export function datosTransferenciaEnLinea(): string {
  const t = TRANSFERENCIA
  return `${t.titular} · ${t.banco} · ${t.tipoCuenta} ${t.numero} · RUT ${t.rut}`
}

// ============================================================
// PORTADA v2 · "Este verano, empieza por ti"
//
// Copy de la iteración local que Oscar eligió el 14-sep-2026
// (`outputs/nutrico-landing-v2-local/index.html`), revisado contra el brief del
// lanzamiento (`outputs/lanzamiento-verano/BRIEF-lanzamiento-2026-09-14.md`).
//
// Lo que cambió respecto de la v2, y por qué:
// - Las fechas ("21 sep – 21 dic", "hasta el 20/09", "el 21 empezamos") y el
//   precio salen de la cohorte y no de este archivo. Por eso los textos que las
//   llevan son funciones.
// - "Reserva un espacio para cuidarte" pasó a "Haz un espacio": "reservar" en
//   una página de venta se lee como cupo, y este programa no tiene cupos.
// - La lista de lo que incluye usa las seis líneas de `PROGRAMA.incluye`, que
//   son las de la propuesta que aceptó Constanza, y no la versión resumida de la v2.
// - La duda del pago rechazado usa el dato del saldo de Mercado Pago (0
//   rechazos en 49 intentos). La v2 decía "contacta al equipo antes de volver a
//   intentarlo", que frena justo a quien ya decidió pagar.
// - Sin guiones largos: el brief los prohíbe como puntuación.
//
// Cambios del 14-sep (`BRIEF-ajustes-landing-v2-2026-09-14.md`): menos texto y
// más imagen en toda la página. Si un párrafo pasaba de dos líneas se cortó o
// se reemplazó por una foto. Las fotos son de Constanza (su foto de consulta y
// cuadros de sus reels) o de stock con licencia libre; autor y licencia de
// cada una en `public/v2/fotos/CREDITOS.md`.
// ============================================================

/** Una foto de la portada, con sus medidas reales para `next/image`. */
export interface FotoPortada {
  src: string
  alt: string
  width: number
  height: number
  /**
   * `object-position` para cuando el recuadro es más ancho que la foto
   * (recuadro horizontal, foto vertical) y el recorte por defecto (centro)
   * corta la cara. Ej. `"center 18%"`.
   */
  posicion?: string
}

export const PORTADA = {
  hero: {
    eyebrow: "PREPARA TU VERANO · PROGRAMA DE 3 MESES",
    descripcion:
      "Un programa de 3 meses para dejar de improvisar qué comer: tu pauta hecha para ti y una nutricionista que te acompaña.",
    persona: "Con Constanza Jiménez Paschold",
    rol: "Nutricionista clínica · creadora de Nutrico",
    notaArriba: { titulo: "Tu pauta, hecha para ti", detalle: "La arma Constanza" },
    notaAbajoTitulo: "Vamos juntas",
    notaAbajoSinFechas: "Tres meses, en grupo",
    leyendaTelefono: "Nutrico, la app del programa",
  },

  cta: {
    abierta: "Quiero entrar al programa",
    abiertaCorto: "Quiero empezar",
    proxima: "Avísame cuando abran",
    proximaCorto: "Avísame",
    neutral: "Quiero que me avisen",
    neutralCorto: "Avísame",
    cierre: "Este verano, empiezo por mí",
  },

  franja: [
    { numero: "03", texto: "meses de programa, en grupo" },
    { numero: "06", texto: "pautas hechas para ti" },
    { numero: "01", texto: "decisión: empezar por ti" },
  ],

  problema: {
    eyebrow: "¿TE SUENA FAMILIAR?",
    grande: "Guardas recetas. Empiezas el lunes. El jueves vuelves a improvisar.",
    cuerpo: "En Prepara tu Verano sabes qué comer, qué comprar y cómo seguir, durante tres meses.",
    enlace: "Así funciona el programa por dentro",
    nota: "¿Y hoy qué comemos?",
    // 15-sep (reunión con Constanza): fotos "más reales". Mujer de 30 a 45 en su
    // cocina, sin pose de catálogo (crédito en public/v2/fotos/CREDITOS.md).
    foto: {
      src: "/v2/fotos/cocina-mirando-celular.jpg",
      alt: "Una mujer mira su celular con cara de duda frente a la cocina de su casa",
      width: 1400,
      height: 1400,
    } satisfies FotoPortada,
  },

  app: {
    eyebrow: "EL PROGRAMA, EN TU BOLSILLO",
    cuerpo:
      "Durante los tres meses, tu pauta, tus recetas, tu lista de compras y tus controles van contigo en Nutrico, la app del programa.",
    etiquetaDemo: "ASÍ SE VE EL PROGRAMA EN NUTRICO",
    etiquetaCaptura: "Pantallas de la app con una paciente de ejemplo",
    // Las seis pantallas salen de los componentes reales de la app con datos de
    // ejemplo (tarea B3 del 15-sep, `landing-aprobacion/mockups-2026-09-15/`).
    // Cada texto describe solo lo que esa pantalla hace hoy: la app no tiene
    // gráfico de síntomas (los síntomas se registran en el control) y el
    // gráfico de energía muestra las dos últimas semanas.
    // El recetario es la captura anterior con fotos reales de las recetas, con
    // la cabecera de la paciente de ejemplo: la nueva mostraba las recetas sin
    // foto porque las fotos viven en la base.
    pantallas: [
      {
        id: "inicio",
        titulo: "Tu día, de un vistazo",
        detalle: "Tu racha, cómo va tu energía y un mensaje de Constanza. Cuando te toca el control, te avisa.",
        imagen: {
          src: "/mockups/app-inicio.webp",
          alt: "Inicio de Nutrico: racha de 12 días, energía de la semana, un mensaje de Constanza y el aviso del control",
          width: 640,
          height: 1306,
        },
      },
      {
        id: "pauta",
        titulo: "Tu pauta, clara",
        detalle: "Qué comer en cada comida y con qué opciones, según la pauta que te armó Constanza.",
        imagen: {
          src: "/mockups/app-pauta.webp",
          alt: "Mi pauta en Nutrico: el desayuno de la fase inicial con sus opciones y recordatorios",
          width: 640,
          height: 1306,
        },
      },
      {
        id: "recetas",
        titulo: "Recetas para tu pauta",
        detalle: "Un recetario chileno filtrado para tu pauta. Buscas por ingrediente o por tipo de comida.",
        imagen: {
          src: "/mockups/app-recetas.webp",
          alt: "Recetario de Nutrico con buscador, filtros por tipo de comida y recetas con foto",
          width: 640,
          height: 1318,
        },
      },
      {
        id: "lista",
        titulo: "Tu lista de compras",
        detalle: "Se arma con las recetas que eliges para tu semana, ordenada por sección. Vas marcando lo que compraste.",
        imagen: {
          src: "/mockups/app-lista.webp",
          alt: "Lista de compras de Nutrico: frutas y verduras con la receta de origen de cada ingrediente",
          width: 640,
          height: 1306,
        },
      },
      {
        id: "checkin",
        titulo: "Control cada 15 días",
        detalle:
          "Cuentas cómo has estado con la hinchazón, la fatiga y la digestión. Con eso Constanza te arma tu pauta nueva.",
        imagen: {
          src: "/mockups/app-checkin.webp",
          alt: "Control quincenal de Nutrico, paso 1 de 6: hinchazón, fatiga y dolor digestivo",
          width: 640,
          height: 1306,
        },
      },
      {
        id: "progreso",
        titulo: "Mira cómo vas",
        detalle: "Tu energía de las últimas dos semanas, tu adherencia y tus días acumulados.",
        imagen: {
          src: "/mockups/app-progreso.webp",
          alt: "Progreso en Nutrico: tendencia de energía de dos semanas, días acumulados y adherencia de 80%",
          width: 640,
          height: 1306,
        },
      },
    ],
  },

  recorrido: {
    eyebrow: "UN COMIENZO. UN CAMINO. UN GRUPO.",
    juntas: "Todas empezamos y avanzamos juntas.",
    // 15-sep: "más detalle del cómo en cada paso". Ocho pasos con lo que de
    // verdad pasa (el mes de mantención suma uno), agrupados en tres momentos
    // con su foto. Las fechas no se escriben acá: `fecha` dice cuál mostrar y
    // el componente la lee de la cohorte (sin cohorte, el paso va sin fecha).
    momentos: [
      {
        momento: "AL COMENZAR",
        foto: {
          src: "/v2/fotos/sillon-celular.jpg",
          alt: "Una mujer revisa su celular sentada en el sillón de su living",
          width: 1400,
          height: 933,
        } satisfies FotoPortada,
        pasos: [
          {
            titulo: "Te inscribes y pagas",
            detalle: "Te llega un correo con tu acceso al programa.",
            fecha: "cierre",
          },
          {
            titulo: "Respondes tu cuestionario",
            detalle: "11 variables sobre tu rutina, tus gustos y tus objetivos. Toma unos 10 minutos.",
          },
          {
            titulo: "Constanza arma tu pauta",
            detalle: "La tienes antes de que parta el grupo, para que prepares tus compras.",
          },
        ],
      },
      {
        momento: "CADA QUINCENA",
        foto: {
          src: "/v2/fotos/cocinando-casa.jpg",
          alt: "Una mujer cocina en la cocina de su casa",
          width: 960,
          height: 1200,
        } satisfies FotoPortada,
        pasos: [
          {
            titulo: "Parte el programa",
            detalle: "Tu pauta de la quincena, el recetario y la lista de compras, listos desde el primer día.",
            fecha: "inicio",
          },
          {
            titulo: "Control y pauta nueva cada 15 días",
            detalle: "Cuentas cómo vas y Constanza te arma la pauta siguiente. Son 6 pautas diferentes.",
          },
        ],
      },
      {
        momento: "DURANTE EL PROGRAMA",
        foto: {
          // 16-sep: la mandó Constanza para este paso después de aprobar la
          // página. Reemplaza el cuadro de su video.
          src: "/v2/fotos/constanza-computador.jpg",
          alt: "Constanza Jiménez Paschold sonríe frente a su computador",
          width: 960,
          height: 1317,
          // Vertical en un recuadro horizontal: 20% deja la cabeza completa
          // y centrada a 390, 800 y 1440 (verificado con captura, 16-sep).
          posicion: "center 20%",
        } satisfies FotoPortada,
        pasos: [
          {
            titulo: "En vivo y en grupo",
            detalle: "Una sesión en vivo al mes con Constanza y el grupo de WhatsApp todo el programa.",
          },
          {
            titulo: "El tercer mes, a mantener",
            detalle: "Tu pauta pasa a cuidar lo que lograste, para que no vuelvas atrás.",
          },
          {
            titulo: "Cierre a los 3 meses",
            detalle: "Todas terminan juntas, el mismo día.",
            fecha: "fin",
          },
        ],
      },
    ],
    sesionesTitulo: "Sesiones en vivo con Constanza",
  },

  constanza: {
    eyebrow: "LA PERSONA DETRÁS DE TU PAUTA",
    bajada: "Ella arma tu pauta y cada pauta nueva.",
    // La revisión del 14-sep notó que se hablaba de Constanza sin contar su
    // trayectoria. Los números salen de la landing del Reto publicada
    // (origin/main:lib/constants.ts, TRUST_BAR y PRODUCT_DEMO.credentials).
    // Confirmado por Constanza en la reunión del 15-sep.
    trayectoria: {
      numero: "+2.500",
      numeroTexto: "pacientes en 10 años de consulta",
      rasgos: [
        "Nutricionista clínica",
        "Enfoque antiinflamatorio",
        "La Serena y online",
        "Creadora del Reto Antiinflamatorio",
      ],
    },
    // Frase de Constanza, dicha por ella a quien la sigue, con un ajuste mínimo
    // (se sacó "mañana"). Fuente: reel de lanzamiento de Nutrico, junio 2026,
    // toma IMG_2130: "Si quieres venir conmigo a este viaje mañana te espero y si
    // no no pasa nada, nos seguimos viendo por acá"
    // (60-clientes/activos/constanza-nutricion/outputs/contenido/reel-4-urgencia-hf/whisper-takes/IMG_2130.json).
    // Reemplaza la cita anterior sobre la IA (decisión de Oscar del 15-sep).
    // Confirmado por Constanza en la reunión del 15-sep.
    cita: ["“Si quieres venir conmigo", "a este viaje, te espero.”"],
    firma: "CONSTANZA JIMÉNEZ PASCHOLD",
    fotoAlt: "Constanza Jiménez Paschold en su consulta",
  },

  testimonios: {
    eyebrow: "HISTORIAS REALES, EN SU PROPIA VOZ",
    bajada: "Pacientes de Constanza, en video y en Google.",
    // "Paciente de Constanza" y no "Paciente del Reto": en los videos hablan de
    // su consulta con ella.
    rotulo: "Paciente de Constanza",
    resenas: "reseñas en Google",
    rotuloResena: "Reseña en Google",
    verEnGoogle: "Ver en Google",
    nota: "Videos de pacientes de Constanza y reseñas públicas de su perfil de Google. Los resultados de cada persona pueden variar.",
  },

  oferta: {
    h2: ["El próximo paso", "puede ser"],
    h2em: "para ti.",
    cuerpo: "Haz un espacio para cuidarte.",
    // Foto de Constanza y no de stock: esta zona está junto a reseñas reales y a
    // cifras de pacientes, y una persona de stock ahí se lee como respaldo.
    foto: {
      src: "/v2/fotos/constanza-oferta.jpg",
      alt: "Constanza Jiménez Paschold sonríe a la cámara con un polar crema",
      width: 960,
      height: 1280,
    } satisfies FotoPortada,
    cierranEn: "Las inscripciones cierran en",
    tarjetaEyebrow: "TU PROGRAMA COMPLETO",
    tarjetaPildora: "3 meses",
    unSoloPago: "Un solo pago. Sin cobros mensuales.",
    pagoCon: "Pago único con Mercado Pago",
    // Zona de precio (15-sep): prueba social y confianza junto al botón. Solo
    // datos que existen: nada de cupos, garantía ni descuentos.
    pagoSeguro: "Pago seguro con Mercado Pago",
    // La preferencia de la app va con installments: 1 y sin medios excluidos.
    mediosPago: "Crédito, débito o saldo de Mercado Pago. Un solo pago, sin cuotas.",
    incluyeTitulo: "Incluye",
    // Confirmado por Constanza en la reunión del 15-sep.
    reto: { numero: "+280", texto: "personas hicieron su Reto Antiinflamatorio" },
    dudasCompra: [
      { q: "¿Tiene cuotas?", a: "No, es un solo pago." },
      { q: "¿Incluye consulta individual?", a: "No, el acompañamiento es grupal." },
      { q: "¿Y si me rechazan la tarjeta?", a: "Usa tu saldo de Mercado Pago o paga por transferencia." },
    ],
    despuesTitulo: "DESPUÉS DE PAGAR",
    despues: [
      { titulo: "Te llega tu acceso", detalle: "Un correo con cómo entrar al programa." },
      { titulo: "Respondes tu cuestionario", detalle: "Unos 10 minutos, desde tu celular." },
      { titulo: "Constanza arma tu pauta", detalle: "Te agrega al grupo de WhatsApp y parte el programa." },
    ],
    noIncluye: "No incluye consulta individual.",
    cerroEnVivo: "Las inscripciones de este grupo acaban de cerrar.",
    ninguna:
      "Todavía no hay fechas para el próximo grupo. Escríbenos y te avisamos cuando abran las inscripciones.",
    error:
      "No pudimos cargar las fechas del grupo. Recarga la página en un rato o escríbenos y te ayudamos a inscribirte.",
  },

  checkout: {
    eyebrow: "PREPARA TU VERANO",
    h2: "Tu primer paso,",
    h2em: "aquí.",
    nombre: "Tu nombre",
    email: "Tu correo",
    telefono: "Tu WhatsApp",
    telefonoAyuda: "Para que Constanza te agregue al grupo del programa. No te vamos a llamar.",
    errorTelefono: "Revisa tu número: un celular de 9 dígitos, como 9 1234 5678.",
    rut: "RUT para tu boleta (opcional)",
    rutAyuda:
      "Lo necesitas para el reembolso de tu isapre. Si no lo tienes a mano, te lo pedimos después.",
    errorNombre: "Escribe tu nombre para la inscripción.",
    errorEmail: "Revisa tu correo, parece que falta algo.",
    errorRut: "Ese RUT no calza. Revísalo o déjalo en blanco y te lo pedimos después.",
    errorConsentimiento: "Para seguir, marca que aceptas los términos.",
    inscrita: "Ya estás inscrita en el programa. Revisa tu correo o",
    errorEnvio: "No pudimos iniciar tu pago. Revisa tu conexión e inténtalo de nuevo.",
    reintentar: "Intentar de nuevo",
    avisoTarjeta:
      "Si tu tarjeta te da problemas, paga con saldo de Mercado Pago: es el medio con menos rechazos. Y si aun así no resulta, escríbenos y lo resolvemos contigo.",
    nota: "Pago seguro con Mercado Pago · boleta exenta a tu nombre",
    cerroTitulo: "Justo cerraron",
    cerroTituloEm: "las inscripciones.",
  },

  pagoRechazado: {
    titulo: "Tu pago no se completó.",
    cuerpo:
      "Casi nunca es por falta de fondos: el antifraude de Mercado Pago a veces rechaza tarjetas con montos altos. Prueba con tu saldo de Mercado Pago o con otra tarjeta. Si igual no resulta, puedes pagar por transferencia.",
    boton: "Intentar de nuevo",
    sinVenta: "Las inscripciones ya cerraron. Escríbenos y lo resolvemos contigo.",
  },

  dudas: {
    eyebrow: "ANTES DE DAR EL PASO",
    h2: "Hablemos",
    h2em: "de tus dudas.",
  },

  cierre: {
    antes: "No necesitas tenerlo todo resuelto.",
    h2: "Solo dar",
    h2em: "el primer paso.",
    foto: {
      src: "/v2/fotos/sandia-tabla.jpg",
      alt: "Tajadas de sandía sobre una tabla de madera",
      width: 1200,
      height: 1800,
    } satisfies FotoPortada,
    fotoConstanza: {
      src: "/v2/fotos/constanza-sonrisa.jpg",
      alt: "Constanza Jiménez Paschold sonriendo",
      width: 640,
      height: 640,
    } satisfies FotoPortada,
  },

  pie: {
    lema: "Nutrición que se adapta a tu vida.",
  },
} as const

/**
 * Los testimonios de la portada (decisión de Oscar del 14-sep, brief §4):
 * - los tres videos de `TESTIMONIOS_MIXTO.videos` (Norma, Jorge y Paulina),
 *   con el rótulo "Paciente de Constanza". Se leen de ese objeto por id para
 *   no tener una segunda copia de rutas y nombres;
 * - las reseñas de Google de `lib/resenas-google.ts`.
 * Salen las dos tarjetas escritas que quedaban ("Camila A." y "Valentina M."):
 * no se les encontró fuente.
 *
 * OJO: la versión anterior dejaba fuera los videos porque, transcritos el
 * 14-sep, hablan de kilos bajados (30, 10 y 10) y de consultas individuales, y
 * Meta revisa la página de destino de los anuncios. El brief los vuelve a
 * poner: "los anuncios siguen sin peso; esto aplica solo a la landing". Las
 * reseñas citadas sí se filtraron por peso. Si Meta rechaza la campaña por la
 * página de destino, esto es lo primero que hay que mirar.
 */
export const VIDEOS_PORTADA: readonly string[] = ["v1", "v2", "v3"]

/**
 * Las dudas de la portada. Son función porque varias respuestas llevan la
 * fecha o el precio de la cohorte: en la v2 estaban escritos ("después del 20
 * de septiembre", "$59.990 del 21 de septiembre al 21 de diciembre") y se
 * habrían podrido con el primer UPDATE de la fila.
 */
export function preguntasPortada(venta: EstadoVenta): { q: string; a: string }[] {
  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null
  const inicio = cohorte ? diaSemanaYFecha(cohorte.fecha_inicio) : ""
  const rango = cohorte
    ? `del ${diaYMes(cohorte.fecha_inicio)} al ${ultimoDiaDelPrograma(cohorte.fecha_fin, { mes: "long", anio: true })}`
    : ""
  const sesiones = cohorte ? sesionesLegibles(cohorte.sesiones) : null

  const preguntas: { q: string; a: string }[] = [
    {
      q: "¿Tengo que saber comer “perfecto”?",
      a: "No necesitas llegar con todo resuelto. Completas el cuestionario inicial y Constanza arma tu pauta a partir de tu rutina, tus preferencias y tus objetivos. Los controles cada quince días ayudan a revisar cómo vas y a armar tu pauta siguiente.",
    },
    {
      q: "¿Qué pasa después de inscribirme?",
      a: `Una vez aprobado tu pago, te llega un correo con tu acceso. Completas el cuestionario inicial, Constanza arma tu pauta y te agrega al grupo de WhatsApp.${
        inicio ? ` El programa empieza el ${inicio}.` : ""
      }`,
    },
    {
      q: "¿Me cobrarán de nuevo el próximo mes?",
      a: cohorte
        ? `No. Son ${formatCLP(cohorte.precio)} por los tres meses completos, ${rango}. No hay renovación automática ni una mensualidad que tengas que cancelar.`
        : "No. Es un solo pago por los tres meses completos. No hay renovación automática ni una mensualidad que tengas que cancelar.",
    },
    {
      q: "¿Incluye una consulta individual?",
      a: "No. Incluye tu pauta personalizada, una pauta nueva cada quince días, la app, el grupo de WhatsApp y tres sesiones grupales en vivo con Constanza. La consulta individual es un servicio aparte.",
    },
    {
      q: "¿Cuándo son las sesiones en vivo?",
      a: sesiones
        ? `Hay una sesión grupal al mes, tres en total: ${sesiones
            .map((s) => `${s.dia}${s.hora ? ` a las ${s.hora}` : ""}`)
            .join(", ")}. Quedan también en el grupo de WhatsApp del programa.`
        : `Hay una sesión grupal al mes, tres en total. ${PROGRAMA.sesiones.sinFechas}`,
    },
    {
      q: "¿Y si me rechazan la tarjeta?",
      a: `Puede pasar aunque tengas fondos: el antifraude de Mercado Pago a veces es duro con los montos altos. Lo más rápido es pagar con saldo de Mercado Pago en vez de tarjeta. Si igual no resulta, puedes pagar por transferencia${
        cohorte ? ` de ${formatCLP(cohorte.precio)}` : ""
      } a ${datosTransferenciaEnLinea()}. ${TRANSFERENCIA.instruccion}`,
    },
    {
      q:
        cohorte && venta.estado === "abierta"
          ? `¿Puedo entrar después del ${diaYMes(cohorte.venta_cierra)}?`
          : "¿Puedo entrar cuando el programa ya empezó?",
      // Con la venta abierta la página no tiene formulario de lista de espera
      // (solo el checkout): ahí no se ofrece "déjanos tu correo", se da el correo
      // de contacto. Con la venta próxima el formulario está en la oferta.
      a: cohorte
        ? `Las inscripciones de este grupo cierran el ${ultimoDiaDeVenta(cohorte.venta_cierra)} porque todas empiezan juntas el ${diaYMes(cohorte.fecha_inicio)} y hacen la misma quincena al mismo tiempo. ${
            venta.estado === "abierta"
              ? `Si no alcanzas, desde el día siguiente al cierre puedes dejar tu correo en esta página y te avisamos cuando abra el siguiente grupo. También puedes escribirnos a ${SITE_CONFIG.email}.`
              : "Si no alcanzas, déjanos tu correo en la inscripción y te avisamos cuando abra el siguiente grupo."
          }`
        : `No. Todas avanzan juntas y hacen la misma quincena al mismo tiempo, así que se entra al inicio de cada grupo. Escríbenos a ${SITE_CONFIG.email} y te avisamos cuando abra el siguiente.`,
    },
    {
      q: "¿Recibo boleta para mi isapre?",
      a: "Recibes boleta exenta de IVA a tu nombre. Puedes presentarla para solicitar reembolso; la cobertura depende de las condiciones de tu plan.",
    },
    {
      q: "¿Cuánto tiempo me va a tomar?",
      a: PROGRAMA.faq[5].a,
    },
  ]
  return preguntas
}

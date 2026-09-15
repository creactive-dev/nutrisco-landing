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
      "Tres meses con tu pauta antiinflamatoria personalizada, ajustada cada quince días por Constanza. Un grupo que empieza y termina junto, con fecha.",
    ctaAbierta: "Quiero entrar al programa",
    ctaProxima: "Avísame cuando abran las inscripciones",
    microcopy: "Un solo pago · sin mensualidad · boleta exenta para tu isapre",
  },

  // §02 de la propuesta, textual.
  incluye: [
    {
      titulo: "Tu pauta personalizada",
      detalle:
        "Armada con las 11 variables del cuestionario y aprobada por Constanza. No es un PDF genérico.",
    },
    {
      titulo: "Recetario chileno filtrado para tu pauta",
      detalle: "Con lista de compras y agenda semanal, para que no tengas que pensar qué cocinar.",
    },
    {
      titulo: "Ajuste cada 15 días",
      detalle: "Haces un check-in y tu plan cambia. Son seis ajustes en los tres meses.",
    },
    {
      titulo: "Grupo de WhatsApp exclusivo",
      detalle: "Solo para quienes entran a este grupo. Lo recibes apenas pagas.",
    },
    {
      titulo: "Tres sesiones grupales en vivo con Constanza",
      detalle: "Una por mes, en vivo, para preguntarle directo a ella.",
    },
    {
      titulo: "Boleta exenta de IVA",
      detalle: "La necesitas para pedir el reembolso a tu isapre.",
    },
  ],

  noIncluye: {
    titulo: "Consulta individual",
    detalle:
      "El programa es la aplicación más el acompañamiento grupal. Lo decimos claro desde el principio para que nadie llegue esperando otra cosa.",
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
      a: "Puede pasar, y no es que no tengas fondos: es el sistema antifraude de Mercado Pago, que a veces es duro con los montos altos. Si te rechaza, lo más rápido es pagar con saldo de Mercado Pago en vez de tarjeta. Y si igual no resulta, escríbenos y lo resolvemos contigo, no te quedes fuera por eso.",
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
      a: "No. El programa es la aplicación más el acompañamiento grupal: tu pauta personalizada que ella aprueba, los ajustes cada quince días, el grupo de WhatsApp y las tres sesiones en vivo. La consulta individual es un servicio aparte.",
    },
    {
      q: "¿Cuánto tiempo me va a tomar?",
      a: "El cuestionario del principio toma unos diez minutos. Después, un check-in cada quince días y cocinar con las recetas y la lista de compras que te armamos. No hay clases que seguir ni horarios, salvo las tres sesiones en vivo.",
    },
  ],

  ctaFinal: {
    h2: "Tu cuerpo va a llegar al verano igual.",
    h2b: "La pregunta es cómo.",
    body: "Tres meses alcanzan de sobra si empiezas ahora. Después del cierre, el próximo grupo es el mes que viene.",
  },
} as const

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
//   son las de la propuesta aprobada, y no la versión resumida de la v2.
// - La duda del pago rechazado usa el dato del saldo de Mercado Pago (0
//   rechazos en 49 intentos). La v2 decía "contacta al equipo antes de volver a
//   intentarlo", que frena justo a quien ya decidió pagar.
// - Sin guiones largos: el brief los prohíbe como puntuación.
// ============================================================

export const PORTADA = {
  hero: {
    eyebrow: "PREPARA TU VERANO · CON CONSTANZA JIMÉNEZ",
    descripcion:
      "Deja de improvisar qué comer. Construye una rutina que puedas sostener, con un plan hecho para ti y una nutricionista que te acompaña.",
    persona: "Con Constanza Jiménez Paschold",
    rol: "Nutricionista clínica · creadora de Nutrico",
    notaArriba: { titulo: "Tu pauta, hecha para ti", detalle: "Revisada por Constanza" },
    notaAbajoTitulo: "Vamos juntas",
    notaAbajoSinFechas: "Tres meses, en grupo",
    leyendaTelefono: "Vista ilustrativa de la app",
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
    { numero: "03", texto: "meses de acompañamiento" },
    { numero: "06", texto: "ajustes de tu pauta" },
    { numero: "01", texto: "decisión: empezar por ti" },
  ],

  problema: {
    eyebrow: "¿TE SUENA FAMILIAR?",
    grande:
      "Guardas recetas. Empiezas el lunes. Llega el jueves y vuelves a resolver la comida con lo que hay.",
    cuerpo:
      "Nutrico te ayuda a pasar de la intención al día a día: qué comer, qué comprar y cómo seguir. Con un plan que se adapta a ti y acompañamiento durante tres meses.",
    enlace: "Así se ve en tu día a día",
  },

  app: {
    eyebrow: "TU PLAN, EN EL BOLSILLO",
    cuerpo: "Tu pauta, tus recetas y tus ajustes, en un mismo lugar.",
    etiquetaDemo: "ASÍ FUNCIONA NUTRICO",
    etiquetaCaptura: "Mockup de referencia · cuenta de demostración",
    pestanas: [
      {
        id: "plan",
        titulo: "Un plan que parte de ti",
        detalle: "Tu cuestionario es el punto de partida.",
      },
      {
        id: "recetas",
        titulo: "La pregunta del día, resuelta",
        detalle: "Recetas, lista de compras y agenda.",
      },
      {
        id: "progreso",
        titulo: "Un plan que sigue contigo",
        detalle: "Check-in y ajuste cada quince días.",
      },
    ],
  },

  recorrido: {
    eyebrow: "UN COMIENZO. UN CAMINO. UN GRUPO.",
    juntas: "Todas empezamos y avanzamos juntas.",
    tarjetas: [
      {
        indice: "01",
        momento: "AL COMENZAR",
        titulo: ["Un punto de partida", "que es tuyo."],
        cuerpo:
          "Completas el cuestionario. Constanza revisa tu pauta y tienes una dirección clara para empezar.",
        pildora: "Pauta personalizada",
      },
      {
        indice: "02",
        momento: "CADA QUINCENA",
        titulo: ["Nos cuentas cómo vas.", "Tu plan se ajusta."],
        cuerpo:
          "Haces tu check-in y revisamos tu pauta. Seis ajustes en tres meses para acompañar tu proceso.",
        pildora: "Seguimiento cada 15 días",
      },
      {
        indice: "03",
        momento: "DURANTE EL PROGRAMA",
        titulo: ["Hay un grupo", "del otro lado."],
        cuerpo:
          "WhatsApp exclusivo y tres sesiones grupales en vivo con Constanza. Una por mes para preguntar y aprender.",
        pildora: "Acompañamiento real",
      },
    ],
    sesionesTitulo: "Sesiones en vivo con Constanza",
  },

  constanza: {
    eyebrow: "LA PERSONA DETRÁS DE TU PAUTA",
    parrafos: [
      "Nutrico nace de una pregunta que Constanza escucha en consulta: cómo llevar un plan de alimentación a la vida de todos los días.",
      "Por eso tu pauta y tus ajustes pasan por su revisión. La app organiza el día a día; su criterio profesional acompaña tu proceso.",
    ],
    cita: ["“La IA asiste,", "yo decido.”"],
    firma: "CONSTANZA JIMÉNEZ PASCHOLD",
    fotoAlt: "Constanza Jiménez Paschold en su consulta",
  },

  testimonios: {
    eyebrow: "HISTORIAS REALES, EN SU PROPIA VOZ",
    bajada: "Lo que cuentan pacientes de Constanza.",
    rotulo: "Paciente de Constanza",
    nota: "Mensajes reales de pacientes de Constanza, publicados con su autorización. Los resultados de cada persona pueden ser diferentes.",
  },

  oferta: {
    h2: ["El próximo paso", "puede ser"],
    h2em: "para ti.",
    cuerpo: "Haz un espacio para cuidarte en tu día a día.",
    cierranEn: "Las inscripciones cierran en",
    porQueFecha: "El grupo empieza junto; por eso hay una fecha de cierre.",
    tarjetaEyebrow: "TU PROGRAMA COMPLETO",
    tarjetaPildora: "3 meses",
    unSoloPago: "Un solo pago. Sin cobros mensuales.",
    pagoCon: "Pago único con Mercado Pago",
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
      "Si tu tarjeta te da problemas, paga con saldo de Mercado Pago. Es la vía que no falla, y si aun así no resulta, escríbenos y lo resolvemos contigo.",
    nota: "Pago seguro con Mercado Pago · boleta exenta a tu nombre",
    cerroTitulo: "Justo cerraron",
    cerroTituloEm: "las inscripciones.",
  },

  pagoRechazado: {
    titulo: "Tu pago no se completó.",
    cuerpo:
      "Casi nunca es por falta de fondos: el antifraude de Mercado Pago a veces rechaza tarjetas con montos altos. Prueba con tu saldo de Mercado Pago o con otra tarjeta.",
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
  },

  pie: {
    lema: "Nutrición que se adapta a tu vida.",
  },
} as const

/**
 * Los testimonios que se muestran en la portada del programa. Si queda vacío,
 * la sección no aparece.
 *
 * Los tres videos de `TESTIMONIOS_MIXTO.videos` NO van: transcritos el
 * 14-sep-2026, los tres hablan de kilos bajados (30, 10 y 10) y describen
 * consultas individuales, que este programa no incluye. Constanza pidió no
 * vender con peso, y Meta revisa la página de destino de los anuncios: una
 * promesa de baja de peso ahí hace rechazar la campaña.
 *
 * De las seis tarjetas escritas quedan dos, las únicas que no nombran peso,
 * talla ni consulta. El texto es el de `TESTIMONIOS_MIXTO.cards`, sin editar:
 * se referencian por id para que no exista una segunda copia que se desalinee.
 * Fuera: c2 ("reduje talla"), c3 ("89 kilos... 83"), c4 ("casi 2 kilos"),
 * c5 ("bajé 4 kilos").
 *
 * PENDIENTE: reemplazar por testimonios del programa cuando existan, y que
 * Constanza confirme estas dos ("cambió mi metabolismo" y "más liviana" son
 * las frases a mirar con el criterio de Meta).
 */
export const TESTIMONIOS_PROGRAMA: readonly string[] = ["c6", "c1"]

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
      a: "No necesitas llegar con todo resuelto. Completas el cuestionario inicial y tu pauta se construye a partir de tu rutina, preferencias y objetivos. Los check-ins ayudan a revisar cómo vas.",
    },
    {
      q: "¿Qué pasa después de inscribirme?",
      a: `Una vez aprobado tu pago, recibes las instrucciones de acceso a Nutrico. Completas el cuestionario inicial para que Constanza revise tu pauta.${
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
      a: "No. Incluye tu pauta personalizada, ajustes cada quince días, la app, el grupo de WhatsApp y tres sesiones grupales en vivo con Constanza. La consulta individual es un servicio aparte.",
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
      a: "Puede pasar aunque tengas fondos: el antifraude de Mercado Pago a veces es duro con los montos altos. Lo más rápido es pagar con saldo de Mercado Pago en vez de tarjeta. Y si igual no resulta, escríbenos y lo resolvemos contigo.",
    },
    {
      q:
        cohorte && venta.estado === "abierta"
          ? `¿Puedo entrar después del ${diaYMes(cohorte.venta_cierra)}?`
          : "¿Puedo entrar cuando el programa ya empezó?",
      a: cohorte
        ? `Las inscripciones de este grupo cierran el ${ultimoDiaDeVenta(cohorte.venta_cierra)} porque todas empiezan juntas el ${diaYMes(cohorte.fecha_inicio)} y hacen la misma quincena al mismo tiempo. Si no alcanzas, déjanos tu correo y te avisamos cuando abra el siguiente grupo.`
        : "No. Todas avanzan juntas y hacen la misma quincena al mismo tiempo, así que se entra al inicio de cada grupo. Escríbenos y te avisamos cuando abra el siguiente.",
    },
    {
      q: "¿Recibo boleta para mi isapre?",
      a: "Recibes boleta exenta de IVA a tu nombre. Puedes presentarla para solicitar reembolso; la cobertura depende de las condiciones de tu plan.",
    },
    {
      q: "¿Cuánto tiempo me va a tomar?",
      a: "El cuestionario del principio toma unos diez minutos. Después, un check-in cada quince días y cocinar con las recetas y la lista de compras de tu pauta. No hay clases que seguir ni horarios, salvo las tres sesiones en vivo.",
    },
  ]
  return preguntas
}

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

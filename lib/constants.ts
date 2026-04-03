// ============================================================
// NUTRISCO LANDING — Constantes centralizadas
// Editar aquí para actualizar copy o configuración
// ============================================================

export const SITE_CONFIG = {
  name: "Nutrisco",
  tagline: "Tu plan alimentario antiinflamatorio, personalizado por Constanza",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nutrisco.cl",
  mpPaymentUrl: process.env.NEXT_PUBLIC_MP_PAYMENT_URL ?? "#",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56900000000",
  whatsappMessage: "Hola Constanza, tengo una pregunta sobre Nutrisco",
  instagram: "@constanza.nutricion",
  email: "hola@nutrisco.cl",
}

export const NAVBAR = {
  cta: "Quiero mi plan →",
  ctaMobile: "Suscribirme",
  links: [
    { label: "Qué incluye", href: "#que-incluye" },
    { label: "Precio", href: "#precio" },
    { label: "FAQ", href: "#faq" },
  ],
}

export const HERO = {
  badge: "Precio fundador · $19.990/mes",
  h1: ["El Reto terminó.", "Tu cuerpo no."],
  subtitle:
    "Tu plan alimentario diseñado por Constanza y su equipo — personalizado para tus síntomas, ajustado cada 15 días, con soporte siempre disponible.",
  trustBadges: [
    { icon: "shield-check", text: "Reembolso isapre" },
    { icon: "receipt", text: "Boleta exenta IVA" },
    { icon: "lock", text: "Precio bloqueado de por vida" },
  ],
  cta: "Quiero mi plan personalizado →",
  microcopy: "Sin permanencia. Cancelas cuando quieras.",
}

export const PUENTE = {
  eyebrow: "Para quienes ya hicieron el Reto",
  h2: ["Ya diste el primer paso.", "El más difícil ya pasó."],
  p1: "Durante 21 días probaste que puedes. Viste lo que la alimentación antiinflamatoria hace con tu cuerpo cuando le das la oportunidad.",
  p2: "Nutrisco es lo que viene después del ebook: un plan diseñado para ti específicamente — no un PDF genérico — que evoluciona con tu progreso cada quince días.",
}

export const QUE_INCLUYE = {
  eyebrow: "Lo que incluye tu suscripción",
  h2: ["Todo lo que necesitas.", "Nada que no necesitas."],
  features: [
    {
      id: "plan",
      icon: "clipboard-list",
      title: "Tu plan, diseñado para ti",
      description:
        "Constanza y su equipo revisan tu perfil y diseñan un plan alimentario antiinflamatorio basado en tus síntomas, objetivos y condición.",
      featured: true,
    },
    {
      id: "recetario",
      icon: "utensils",
      title: "84 recetas de Constanza",
      description:
        "Filtradas automáticamente según tu tipo de pauta. Guarda tus favoritas.",
      featured: false,
    },
    {
      id: "lista",
      icon: "shopping-cart",
      title: "Lista lista para el súper",
      description:
        "Generada cada semana desde tu plan, organizada por pasillos del supermercado.",
      featured: false,
    },
    {
      id: "checkin",
      icon: "bar-chart-2",
      title: "Tu plan evoluciona",
      description:
        "Cada 15 días haces un check-in y el equipo ajusta tu plan según tu progreso.",
      featured: false,
    },
    {
      id: "soporte",
      icon: "message-circle",
      title: "Siempre disponible",
      description:
        "Respuestas basadas en la metodología de Constanza, a cualquier hora.",
      featured: false,
    },
    {
      id: "sesion",
      icon: "video",
      title: "Una vez al mes, en vivo",
      description:
        "Con Constanza. Preguntas reales, respuestas reales.",
      badge: "En vivo",
      featured: false,
    },
    {
      id: "ajuste",
      icon: "refresh-cw",
      title: "Tu plan nunca se queda quieto",
      description:
        "El equipo revisa tu progreso cada 15 días y hace los ajustes que necesitas para seguir avanzando.",
      featured: false,
      fullWidth: true,
    },
  ],
}

export const NUTRICIONISTA = {
  eyebrow: "Tu nutricionista",
  name: "Constanza Paschold N.",
  title: "Nutricionista clínica · Especialista en nutrición antiinflamatoria",
  stat: "290+",
  statLabel: "personas acompañadas",
  quote:
    "Diseñé cada pauta pensando en que la alimentación sea un alivio, no un castigo. Nutrisco me permite acompañar a muchas más personas con la misma atención que pongo en cada consulta.",
  credentials: [
    "Especialización en nutrición funcional y antiinflamatoria",
    "Metodología probada con más de 290 pacientes",
    "Disponible mensualmente en sesión grupal en vivo",
  ],
}

export const COMO_FUNCIONA = {
  eyebrow: "El proceso",
  h2: ["Cuatro pasos.", "Un solo objetivo: que tu cuerpo funcione bien."],
  steps: [
    {
      number: "01",
      title: "Suscríbete",
      description:
        "$19.990/mes. Sin contratos, sin permanencia. Cancelas cuando quieras.",
    },
    {
      number: "02",
      title: "Responde el screening",
      description:
        "Un cuestionario de 10 minutos donde le cuentas a Constanza tus síntomas, objetivos y hábitos actuales.",
    },
    {
      number: "03",
      title: "Recibe tu plan en 24 horas",
      description:
        "Constanza y su equipo revisan tu perfil y diseñan tu plan alimentario personalizado. Nada genérico.",
    },
    {
      number: "04",
      title: "Soporte continuo",
      description:
        "Check-in quincenal, ajustes de plan, soporte disponible y sesión mensual en vivo. Tu progreso, acompañado.",
    },
  ],
}

export const TESTIMONIOS = {
  eyebrow: "Resultados reales",
  h2: "Lo que dicen quienes ya empezaron",
  items: [
    {
      badge: "Hinchazón",
      quote:
        "Llevaba 3 años con el abdomen inflamado después de cada comida. En las primeras dos semanas con mi plan de Constanza, la diferencia fue notable. Por fin entiendo qué le está haciendo bien a mi cuerpo.",
      name: "María P.",
      detail: "34 años",
    },
    {
      badge: "Energía",
      quote:
        "No podía creer que algo tan simple como cambiar la alimentación me devolviera la energía que tenía antes. El plan de Constanza no es restrictivo — es inteligente.",
      name: "Valentina R.",
      detail: "41 años",
    },
    {
      badge: "Digestión",
      quote:
        "Después del Reto de 21 días sabía que quería seguir, pero sola no podía mantenerlo. Nutrisco me da la estructura que necesito y el respaldo de Constanza cuando tengo dudas.",
      name: "Claudia M.",
      detail: "38 años",
    },
  ],
}

export const PRECIO = {
  eyebrow: "Precio fundador",
  h2: ["Entraste primero.", "El precio lo reconoce."],
  price: "$19.990",
  period: "/mes",
  priceLabel: "Precio fundador — bloqueado de por vida",
  benefits: [
    {
      icon: "shield-check",
      title: "Reembolso por isapre",
      description: "Descarga el gasto en tu seguro de salud",
    },
    {
      icon: "receipt",
      title: "Boleta exenta de IVA",
      description: "Facturación correcta desde el primer cobro",
    },
    {
      icon: "lock",
      title: "Precio bloqueado de por vida",
      description: "Si el precio sube, tú quedas al precio founder",
    },
    {
      icon: "x-circle",
      title: "Sin permanencia",
      description: "Cancelas cuando quieras, sin penalidad",
    },
  ],
  cta: "Quiero mi plan personalizado →",
  microcopy: "Sin permanencia. Cancelas cuando quieras.",
  mpLabel: "Pago seguro con Mercado Pago",
}

export const FAQ_ITEMS = [
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. No hay permanencia ni contratos. Puedes cancelar en cualquier momento desde tu perfil o escribiéndonos por WhatsApp.",
  },
  {
    q: "¿Cómo funciona el reembolso por isapre?",
    a: "Muchas isapres cubren consultas y planes nutricionales. Nutrisco emite boleta exenta de IVA que puedes presentar a tu isapre para reembolso. Te recomendamos consultar con tu isapre los detalles de cobertura.",
  },
  {
    q: "¿La boleta exenta de IVA es automática?",
    a: "Sí. Cada cobro genera una boleta exenta de IVA automáticamente. La recibirás por email.",
  },
  {
    q: "¿Es lo mismo que el ebook del Reto?",
    a: "No. El ebook fue un plan fijo de 21 días. Nutrisco es un plan personalizado para tu perfil específico que se ajusta cada 15 días, con soporte continuo y sesión mensual con Constanza.",
  },
  {
    q: "¿El plan es el mismo para todos?",
    a: "No. Constanza y su equipo diseñan tu plan basado en tu cuestionario inicial: síntomas, objetivos, condiciones y hábitos. Cada plan es distinto.",
  },
  {
    q: "¿Necesito instalar una aplicación?",
    a: "No. Nutrisco funciona desde el navegador de tu celular. Solo necesitas crear una cuenta después de suscribirte.",
  },
  {
    q: "¿Cada cuánto se ajusta mi plan?",
    a: "Cada 15 días recibirás un formulario de check-in. Con esas respuestas, el equipo ajusta tu plan para la siguiente quincena.",
  },
  {
    q: "¿Puedo hacer preguntas directamente a Constanza?",
    a: "En la sesión grupal mensual en vivo, sí. Para dudas del día a día, tienes soporte disponible las 24 horas basado en la metodología de Constanza.",
  },
]

export const CTA_FINAL = {
  price: "$19.990/mes",
  priceLabel: "Precio fundador · Bloqueado de por vida",
  urgency: "Disponible mientras dure la etapa de lanzamiento",
  cta: "Quiero mi plan personalizado →",
  microcopy: "Sin permanencia. Cancelas cuando quieras.",
}

export const FOOTER = {
  legal: [
    { label: "Términos y condiciones", href: "#" },
    { label: "Política de privacidad", href: "#" },
  ],
  copyright: "© 2026 Nutrisco · Constanza Paschold N.",
}

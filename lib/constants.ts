// ============================================================
// NUTRICO LANDING — Constantes centralizadas
// Editar aquí para actualizar copy o configuración
// ============================================================

export const SITE_CONFIG = {
  name: "Nutrico",
  tagline: "Tu plan alimentario antiinflamatorio, personalizado por Constanza",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nutrico.constanzanutricion.cl",
  mpPaymentUrl: process.env.NEXT_PUBLIC_MP_PAYMENT_URL ?? "#",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56900000000",
  whatsappMessage: "Hola Constanza, tengo una pregunta sobre Nutrico",
  instagram: "@constanza.nutricion",
  email: "hola@constanzanutricion.cl",
  googleBusinessUrl: "https://share.google/fju7lUoVFux9PmfCA",
  consultaWeb: "https://www.constanzanutricion.cl",
  brand: {
    constanzaPhoto: "/brand/constanza.jpg",
    constanzaThumb: "/brand/constanza-thumb.jpg",
  },
  legal: {
    razonSocial: "Constanza Jiménez Paschold",
    rut: "78.120.238-K",
    direccion: "Jorge Montt 538, La Serena, Chile",
  },
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
  eyebrow: "Nutrición antiinflamatoria · Por Constanza Jiménez Paschold",
  badge: "Precio fundador · $19.990/mes",
  h1: ["Tu cuerpo sin inflamación,", "en 60 días."],
  subtitle:
    "El plan antiinflamatorio chileno que se ajusta a quién eres tú. Diseñado por Constanza, supervisado por ella.",
  trustBadges: [
    { icon: "shield-check", text: "Reembolso isapre" },
    { icon: "receipt", text: "Boleta exenta IVA" },
    { icon: "lock", text: "Sin permanencia" },
    { icon: "x-circle", text: "Cancelas cuando quieras" },
  ],
  cta: "Quiero mi plan →",
  microcopy: "Boleta exenta IVA · reembolso isapre · sin permanencia · cancelas cuando quieras",
}

export const PUENTE = {
  eyebrow: "Para quienes ya hicieron el Reto",
  h2: ["Ya diste el primer paso.", "El más difícil ya pasó."],
  p1: "Durante 21 días probaste que puedes. Viste lo que la alimentación antiinflamatoria hace con tu cuerpo cuando le das la oportunidad.",
  p2: "Nutrico es lo que viene después del ebook: un plan diseñado para ti específicamente — no un PDF genérico — que evoluciona con tu progreso cada quince días.",
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
        "Cada 15 días haces un check-in y Constanza ajusta tu plan según tu progreso.",
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
        "Constanza revisa tu progreso cada 15 días y aprueba los ajustes que necesitas para seguir avanzando. La tecnología asiste, ella decide.",
      featured: false,
      fullWidth: true,
    },
  ],
}

export const NUTRICIONISTA = {
  eyebrow: "Tu nutricionista",
  name: "Constanza Jiménez Paschold",
  title: "Nutricionista clínica · Especialista en nutrición antiinflamatoria",
  stat: "290+",
  statLabel: "personas acompañadas",
  quote:
    "Diseñé cada pauta pensando en que la alimentación sea un alivio, no un castigo. Nutrico me permite acompañar a muchas más personas con la misma atención que pongo en cada consulta.",
  credentials: [
    "Especialización en nutrición funcional y antiinflamatoria",
    "Metodología probada con más de 290 pacientes",
    "Cada pauta y cada ajuste pasan por mi revisión clínica antes de llegar a ti",
    "Disponible mensualmente en sesión grupal en vivo",
  ],
}

export const COMO_FUNCIONA = {
  eyebrow: "El proceso",
  h2: ["Tres pasos.", "Tu cuerpo, distinto."],
  steps: [
    {
      number: "01",
      title: "Cuestionario de 10 min",
      description:
        "Cuéntanos tus síntomas, objetivos, restricciones y hábitos. Cada respuesta entra al motor que asigna tu pauta.",
      mockup: "/mockups/screening-step5.png",
      mockupLabel: "Screening · paso 5/11",
    },
    {
      number: "02",
      title: "Tu plan en 24 horas",
      description:
        "Constanza revisa tu screening y aprueba tu plan personalizado. Lo recibes con recetas, lista de compras y agenda semanal.",
      mockup: "/mockups/plan-current.png",
      mockupLabel: "Tu plan de la semana",
    },
    {
      number: "03",
      title: "Tu plan evoluciona contigo cada 15 días",
      description:
        "Cada quincena haces un check-in y tu plan se ajusta. Sin estancarte. Sin volver a empezar.",
      mockup: "/mockups/dashboard-detail.png",
      mockupLabel: "Check-in + tu progreso",
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
        "Después del Reto de 21 días sabía que quería seguir, pero sola no podía mantenerlo. Nutrico me da la estructura que necesito y el respaldo de Constanza cuando tengo dudas.",
      name: "Claudia M.",
      detail: "38 años",
    },
  ],
}

export const PRECIO = {
  eyebrow: "Precio fundador · Solo 50 cupos",
  h2: ["Entraste primero.", "El precio lo reconoce."],
  price: "$19.990",
  period: "/mes",
  priceLabel: "Precio fundador — bloqueado de por vida",
  cuposBadge: "50 cupos · En orden de inscripción",
  benefits: [
    {
      icon: "shield-check",
      title: "Reembolsable por tu isapre",
      description: "Emitimos boleta exenta de IVA. Muchas isapres cubren planes nutricionales — el gasto puede volverte.",
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
    a: "Por cada cobro mensual recibes una boleta electrónica exenta de IVA dentro de 48 horas hábiles. Muchas isapres cubren servicios nutricionales bajo su beneficio de salud: preséntala directamente y recupera parte o el total del costo. Consulta con tu isapre qué código de prestación aplica.",
  },
  {
    q: "¿Cuándo recibo la boleta exenta de IVA?",
    a: "Dentro de 48 horas hábiles desde la confirmación del pago. La recibes en tu correo registrado y puedes presentarla a tu isapre para reembolso.",
  },
  {
    q: "¿Es lo mismo que el ebook del Reto?",
    a: "No. El ebook fue un plan fijo de 21 días. Nutrico es un plan personalizado para tu perfil específico que se ajusta cada 15 días, con soporte continuo y sesión mensual con Constanza.",
  },
  {
    q: "¿El plan es el mismo para todos?",
    a: "No. Constanza y su equipo diseñan tu plan basado en tu cuestionario inicial: síntomas, objetivos, condiciones y hábitos. Cada plan es distinto.",
  },
  {
    q: "¿Necesito instalar una aplicación?",
    a: "No. Nutrico funciona desde el navegador de tu celular. Solo necesitas crear una cuenta después de suscribirte.",
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
  urgency: "Solo 50 cupos · Bloqueas el precio por vida",
  cta: "Quiero mi plan personalizado →",
  microcopy: "Reembolsable por tu isapre · Sin permanencia · Cancelas cuando quieras.",
}

export const FOOTER = {
  legal: [
    { label: "Términos y condiciones", href: "https://app.constanzanutricion.cl/terminos" },
    { label: "Política de privacidad", href: "https://app.constanzanutricion.cl/privacidad" },
    { label: "Datos sensibles de salud", href: "https://app.constanzanutricion.cl/aviso-datos-sensibles" },
    { label: "Eliminación de datos", href: "https://app.constanzanutricion.cl/eliminacion-datos" },
  ],
  copyright: "© 2026 Nutrico · Constanza Jiménez Paschold",
}

// ============================================================
// LANDING V2 — Hormozi redesign · "Las 50 Primeras"
// Nuevos exports agregados 2026-05-28
// ============================================================

export const TOP_BAR_SCARCITY = {
  message: "Apertura vie 5 jun · 9 AM · Solo 50 cupos fundadoras",
  messageMobile: "5-jun · 9 AM · 50 cupos",
  cta: "Reservar mi cupo",
  ctaHref: "#precio",
}

export const TRUST_BAR = {
  headline: "Las primeras 290 mujeres del Reto ya están adentro.",
  stats: [
    {
      icon: "users",
      number: "+2.500",
      label: "pacientes acompañadas",
      sub: "En 10 años de consulta · La Serena y online",
    },
    {
      icon: "star",
      number: "5.0",
      label: "promedio en Google",
      sub: "Cero reseñas bajo 5 estrellas",
      cta: "Ver reseñas",
    },
    {
      icon: "sparkles",
      number: "290",
      label: "graduadas del Reto",
      sub: "Fueron las primeras en preguntar qué seguía",
    },
  ],
}

export const PROBLEM_AGITATION = {
  h2: "Los planes nutricionales son genéricos. Tu cuerpo no.",
  body: "Si terminaste el Reto a principios de año y volviste a sentirte hinchada, lo entiendes.",
}

export const PRODUCT_DEMO = {
  eyebrow: "Mira cómo se ve adentro",
  h2: ["Tres pasos.", "Tu cuerpo, distinto."],
  subcopy:
    "Estas son las pantallas reales que vas a usar. Sin filtros, sin renders — la app que estamos lanzando.",
  /** Narrativa del proceso + mockup real (pre-enmarcado) por paso */
  steps: [
    {
      number: "01",
      title: "Cuestionario de 10 min",
      description:
        "Cuéntanos tus síntomas, objetivos, restricciones y hábitos. Cada respuesta entra al motor que asigna tu pauta.",
      mockup: "/mockups/m-screening.png",
      caption: "Cuestionario · 10 min",
    },
    {
      number: "02",
      title: "Tu plan con recetas, en 24 horas",
      description:
        "Constanza aprueba tu plan personalizado: recetas chilenas filtradas para tu pauta, lista de compras y agenda semanal.",
      mockup: "/mockups/m-recetas.png",
      caption: "Recetas para tu pauta",
    },
    {
      number: "03",
      title: "Tu plan evoluciona cada 15 días",
      description:
        "Cada quincena haces un check-in y tu plan se ajusta. Ves tus tendencias, tu fase y tu progreso en un solo lugar.",
      mockup: "/mockups/m-progreso-full.png",
      caption: "Tu progreso",
    },
  ],
  footnote: "Pantallas reales de la app",
}

export const BENTO_BENEFICIOS = {
  eyebrow: "Lo que vas a sentir en 60 días",
  h2: ["Todo lo que necesitas.", "Nada que no necesitas."],
  cards: [
    {
      icon: "activity",
      title: "Despertarás sin hinchazón",
      description:
        "El protocolo antiinflamatorio reduce la respuesta inmune en el intestino. La mayoría reporta diferencia visible en la primera quincena.",
      metric: "Quincena 1-2",
      metricLabel: "primer cambio reportado",
    },
    {
      icon: "zap",
      title: "Energía sostenida sin necesidad de café",
      description:
        "Sin picos de glicemia ni caídas de mediodía. Tu plan distribuye proteína y fibra para que el cuerpo no entre en modo crash a las 4 PM.",
      metric: "Sin altibajos",
      metricLabel: "glicemia estable",
    },
    {
      icon: "shirt",
      title: "Ropa que dejaste de usar",
      description:
        "No es una dieta de hambre. Es composición corporal: menos retención, menos grasa visceral, porciones reales.",
      metric: "Sin pasar hambre",
      metricLabel: "porciones reales",
    },
    {
      icon: "smile",
      title: "Comer sin culpa ni reglas raras",
      description:
        "Cocina chilena de verdad: porotos granados, charquicán, cazuela, salmón al horno. Adaptada al protocolo, no inventada.",
      metric: "84 recetas",
      metricLabel: "cocina chilena real",
    },
    {
      icon: "user",
      title: "Tu plan sabe quién eres",
      description:
        "Síntomas, restricciones, hormonas, actividad, presupuesto. 11 variables de screening alimentan tu pauta específica. No es un PDF para todas.",
      metric: "11 variables",
      metricLabel: "screening personal",
    },
  ],
}

export const RESULTADOS_STATS = {
  eyebrow: "Lo que reportaron las que ya lo hicieron",
  h2: "21 días, en sus palabras.",
  stats: [
    {
      number: "+200",
      label: "reportaron menos hinchazón antes de la semana 3",
    },
    {
      number: "+200",
      label: "dijeron tener mejor energía a media tarde",
    },
    {
      number: "290",
      label: "completaron el Reto y están ahora en Nutrico",
    },
  ],
  footnote:
    "Mensajes y respuestas recogidas de las participantes del Reto Antiinflamatorio · diciembre 2025 → febrero 2026",
}

export const FOUNDER_STORY = {
  eyebrow: "Quién está detrás de Nutrico",
  name: "Constanza Jiménez Paschold",
  title: "Nutricionista clínica · Especialista en nutrición antiinflamatoria",
  h3: "Yo soy Constanza Jiménez Paschold, Nutricionista clínica.",
  body: "Llevo 10 años escuchando lo mismo en consulta: \"no sé qué comer, lo intenté pero volví a lo mismo\". A principios de año hice el Reto Antiinflamatorio 21 días — y casi 300 mujeres me escribieron preguntando qué seguía. Estos meses los pasé construyendo eso. Nutrico no es un ebook nuevo · es la plataforma que pensé para que después del Reto el cuerpo no se devuelva.",
  credentials: [
    "Nutricionista titulada · certificada por la Superintendencia de Salud",
    "Especialización en nutrición antiinflamatoria y metabólica",
    "+2.500 pacientes acompañadas en 10 años de consulta",
    "5.0 promedio en Google · La Serena y online",
    "Cada pauta y cada ajuste pasan por mi revisión clínica",
    "Áreas: salud hormonal, gestación, lipedema, inflamación crónica",
  ],
  quote: "La IA asiste, yo decido.",
}

export const TESTIMONIOS_MIXTO = {
  eyebrow: "Mujeres del Reto cuentan",
  h2: "No tengo que convencerte yo.",
  videos: [
    {
      id: "v1",
      name: "Norma",
      subtitle: "Paciente del Reto Antiinflamatorio",
      src: "/testimonios/testimonio-1.mp4",
      poster: "/testimonios/testimonio-1-poster.jpg",
    },
    {
      id: "v2",
      name: "Jorge",
      subtitle: "Paciente del Reto Antiinflamatorio",
      src: "/testimonios/testimonio-2.mp4",
      poster: "/testimonios/testimonio-2-poster.jpg",
    },
    {
      id: "v3",
      name: "Paulina",
      subtitle: "Paciente del Reto Antiinflamatorio",
      src: "/testimonios/testimonio-3.mp4",
      poster: "/testimonios/testimonio-3-poster.jpg",
    },
  ],
  cardsFooter: "Mensajes reales de pacientes del Reto · Diciembre 2025 → Abril 2026 · publicados con autorización",
  cards: [
    {
      id: "c1",
      name: "Valentina M.",
      initial: "V",
      quote: "Cambió mi metabolismo. Sufría de estreñimiento hacía años y el plan es saciador, desinflama de verdad. 100% recomendado, me encantó.",
    },
    {
      id: "c2",
      name: "Carolina S.",
      initial: "C",
      quote: "Me desinflamé mucho y reduje talla: ropa que no me quedaba, ahora sí. Esa ha sido mi experiencia y estoy feliz.",
    },
    {
      id: "c3",
      name: "Agustina R.",
      initial: "A",
      quote: "Cuando empecé pesaba 89 kilos. Terminé la tercera semana y hoy estoy en 83. No lo podía creer.",
    },
    {
      id: "c4",
      name: "Josefa V.",
      initial: "J",
      quote: "Es un programa excelente. Bajé casi 2 kilos en la semana sin ejercicios constantes y sin pasar hambre.",
    },
    {
      id: "c5",
      name: "Tamara B.",
      initial: "T",
      quote: "Terminé hace una semana y bajé 4 kilos. Ya quiero seguir con el plan, es lo único que he podido sostener.",
    },
    {
      id: "c6",
      name: "Camila A.",
      initial: "C",
      quote: "Despierto sin hinchazón por primera vez en años. Me siento mucho más liviana y con energía.",
    },
  ],
}

export const VALUE_STACK = {
  eyebrow: "Tarifa Las 50 Primeras",
  h2: ["$19.990 hoy.", "$220.970 de valor real."],
  monthlyItems: [
    { label: "Plan antiinflamatorio personalizado", value: 60000 },
    { label: "Check-in quincenal con ajuste de tu plan", value: 45000 },
    { label: "84 recetas chilenas filtradas para tu pauta", value: 20000 },
    { label: "Comunidad WhatsApp privada Las 50 Primeras", value: 25000 },
    { label: "Lista de compras semanal automática", value: 10000 },
    { label: "Tracker de síntomas + reporte mensual", value: 20000 },
  ],
  monthlyTotal: 180000,
  bonusEyebrow: "Bonus exclusivo Las 50 Primeras",
  bonusItems: [
    { label: "PDF Reto Antiinflamatorio 21 días", value: 17990 },
    { label: "Libro digital \"Recetas antiinflamatorias para la cocina chilena\"", value: 12990 },
    { label: "Recetario navideño antiinflamatorio (entregable dic-2026)", value: 9990 },
  ],
  bonusTotal: 40970,
  price: 19990,
  priceLabel: "/mes bloqueado de por vida",
  priceAfter: 24990,
  priceAfterLabel: "Después de las 50 primeras: $24.990/mes",
  cta: "Quiero ser una de Las 50 Primeras →",
  microcopy: "Sin permanencia · cancelas cuando quieras · boleta exenta IVA",
}

export const CTA_FINAL_V2 = {
  h2: "Las 50 Primeras de Nutrico.",
  sub: "Tu plan. Tu cuerpo. Tu lugar entre las primeras.",
  counter: "Solo para Las 50 Primeras · arranque vie 5 jun 9 AM",
  cta: "Quiero mi cupo · $19.990/mes →",
  microcopy: "Sin permanencia · cancelas cuando quieras · boleta exenta IVA · arranque vie 5 jun 9 AM",
}

// FAQ v2 — agrega 2 preguntas críticas + modifica boleta
export const FAQ_ITEMS_V2 = [
  {
    q: "¿Cómo es diferente del Reto que ya hice?",
    a: "El Reto fue un PDF de 21 días con un plan fijo, igual para todas las que lo compraron. Nutrico es una plataforma con tu plan personalizado según tu screening (síntomas, objetivos, restricciones), que se ajusta cada 15 días según cómo te sientas. El Reto fue el primer paso. Nutrico es lo que sostiene los resultados.",
  },
  {
    q: "¿Qué pasa al mes 31 si entré como Las 50 Primeras?",
    a: "Tu precio queda bloqueado en $19.990/mes de por vida mientras mantengas tu suscripción activa. No importa si subimos el precio público a $24.990 o más adelante — tú sigues pagando $19.990. Si cancelas y vuelves después, ya no aplica.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. No hay permanencia ni contratos. Puedes cancelar en cualquier momento desde tu perfil o escribiéndonos por WhatsApp.",
  },
  {
    q: "¿Cómo funciona el reembolso por isapre?",
    a: "Por cada cobro mensual recibes una boleta electrónica exenta de IVA dentro de 48 horas hábiles. Muchas isapres cubren servicios nutricionales bajo su beneficio de salud: preséntala directamente y recupera parte o el total del costo. Consulta con tu isapre qué código de prestación aplica.",
  },
  {
    q: "¿Cuándo recibo la boleta exenta de IVA?",
    a: "Dentro de 48 horas hábiles desde la confirmación del pago. La recibes en tu correo registrado y puedes presentarla a tu isapre para reembolso. La emisión es manual durante las primeras semanas (Constanza la firma) — eso garantiza que esté correcta.",
  },
  {
    q: "¿El plan es el mismo para todos?",
    a: "No. Constanza y su equipo diseñan tu plan basado en tu cuestionario inicial: síntomas, objetivos, condiciones y hábitos. Cada plan es distinto.",
  },
  {
    q: "¿Necesito instalar una aplicación?",
    a: "No. Nutrico funciona desde el navegador de tu celular. Solo necesitas crear una cuenta después de suscribirte.",
  },
  {
    q: "¿Cada cuánto se ajusta mi plan?",
    a: "Cada 15 días recibes un formulario de check-in. Con esas respuestas, Constanza revisa y ajusta tu plan para la siguiente quincena.",
  },
  {
    q: "¿Puedo hacer preguntas directamente a Constanza?",
    a: "Sí. Las dudas de carácter clínico — ajustes de tu plan, síntomas, condiciones — las responde Constanza directamente a través de la app: cuando escribes algo que requiere criterio profesional, tu consulta le llega a ella y te responde personalmente. Para las dudas del día a día (recetas, lista de compras, cómo usar la plataforma) tienes soporte con IA las 24 horas, basado en su metodología. Y en la comunidad WhatsApp privada de Las 50 Primeras también puedes escribirle.",
  },
  {
    q: "¿Qué pasa si necesito pausar mi suscripción?",
    a: "Escríbenos por WhatsApp y te ayudamos a pausar hasta 30 días sin perder tu precio bloqueado. Si necesitas pausar más tiempo, conversamos caso a caso.",
  },
]

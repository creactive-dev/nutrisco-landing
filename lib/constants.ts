import type { Testimonial, FAQItem, Feature, Step } from '@/types'

export const SITE = {
  name: 'Nutrisco',
  tagline: 'Tu plan antiinflamatorio mensual, ajustado contigo cada quincena.',
  url: 'https://nutrisco.cl',
  whatsapp: '', // pendiente número WA Business
  email: 'hola@constanzanutricion.cl',
  privacyEmail: 'privacidad@constanzanutricion.cl',
  instagram: 'https://instagram.com/constanzanutricion',
  constanzaWeb: 'https://constanzanutricion.cl',
  ga4Id: '', // GA4 Measurement ID — completar antes de F6
  metaPixelId: '', // Meta Pixel ID — completar antes de F6
}

export const LEGAL = {
  rut: '', // pendiente — proporcionar antes del 3 mayo
  direccion: '', // pendiente — proporcionar antes del 3 mayo
  nombre: 'Constanza Jiménez',
  profesion: 'Nutricionista Clínica',
}

export const OFERTA = {
  precioFundador: '$19.990',
  precioRegular: '$27.990',
  cuposTotal: 100,
  cuposDisponibles: parseInt(process.env.NEXT_PUBLIC_CUPOS_DISPONIBLES ?? '100'),
  fechaLanzamiento: '3 de mayo',
  fechaCierre: '16 de mayo de 2026',
  horaLanzamiento: '9 AM',
  mpUrl: process.env.NEXT_PUBLIC_MP_URL ?? '',
}

export const STATS = [
  { value: '+10 años', label: 'de experiencia clínica' },
  { value: '+2.500', label: 'pacientes acompañados' },
  { value: '5.0 ⭐', label: 'en Google Reviews' },
  { value: '100%', label: 'metodología validada' },
]

export const PROBLEMAS = [
  {
    icon: '🔁',
    title: 'Empiezas bien, pero no dura',
    description:
      'Cambias la alimentación, te sientes mejor los primeros días. Después la vida pasa, dejas de saber qué comer, y los síntomas vuelven. No porque no quieras — porque no tienes a nadie que te guíe cuando el plan se corta.',
  },
  {
    icon: '💬',
    title: 'Tienes dudas que no pueden esperar una consulta',
    description:
      '¿Puedo comer esto? ¿Por qué me sigo hinchando si estoy siguiendo el plan? Las preguntas llegan de noche, en el supermercado, en un almuerzo de trabajo. Y no siempre hay alguien que responda a tiempo.',
  },
  {
    icon: '📋',
    title: 'Tu plan no es tuyo de verdad',
    description:
      'Los planes genéricos no consideran tu historial, tus síntomas específicos, lo que sí y no puedes comer, ni cómo estás respondiendo hoy. Lo que funciona para otra persona puede no funcionar para ti.',
  },
]

export const PILARES = [
  {
    icon: '🎯',
    title: 'Personalizado desde el primer día',
    description:
      'Respondes 11 preguntas sobre tu historial, síntomas y objetivos. Recibes el plan antiinflamatorio que corresponde a tu perfil específico — no al promedio.',
  },
  {
    icon: '🔄',
    title: 'Se ajusta cada quincena',
    description:
      'Cada 15 días haces un check-in breve. Tu plan evoluciona según cómo vas respondiendo. No es estático — crece contigo.',
  },
  {
    icon: '💬',
    title: 'Soporte cuando lo necesitas',
    description:
      'Si tienes una duda sobre tu plan, hay soporte disponible. Respuestas contextualizadas a tu pauta — no respuestas genéricas de internet.',
  },
]

export const PASOS: Step[] = [
  {
    number: '01',
    title: 'Te suscribes',
    description:
      'Ingresas a Nutrisco y activas tu suscripción mensual. En segundos tienes acceso a la plataforma.',
  },
  {
    number: '02',
    title: 'Completas tu perfil',
    description:
      '11 preguntas sobre tu historial, síntomas, preferencias y objetivos. En menos de 24 horas tienes tu plan personalizado asignado.',
  },
  {
    number: '03',
    title: 'Seguimos juntas',
    description:
      'Tienes tu plan semanal, recetas, lista de compras, soporte para dudas y check-in cada 15 días. Tu plan evoluciona contigo — mes a mes.',
  },
]

export const MOCKUPS = [
  {
    src: '/mockups/plan.png',
    label: 'Tu plan semanal — personalizado a tu perfil',
    alt: 'Pantalla del plan semanal de Nutrisco mostrando las comidas de la semana',
  },
  {
    src: '/mockups/progreso.png',
    label: 'Tu evolución en el tiempo — no solo el plan de hoy',
    alt: 'Pantalla de progreso de Nutrisco con gráfico de evolución de síntomas',
  },
  {
    src: '/mockups/recetario.png',
    label: 'Recetas vinculadas a tu plan — con lista de compras incluida',
    alt: 'Pantalla del recetario antiinflamatorio de Nutrisco',
  },
]

export const FEATURES: Feature[] = [
  {
    icon: '📅',
    title: 'Plan alimentario semanal',
    description: 'Personalizado a tu perfil. Desayuno, almuerzo, once y cena — visualizados día a día.',
  },
  {
    icon: '🔄',
    title: 'Ajuste quincenal',
    description: 'Tu plan se revisa y actualiza cada 15 días según tu check-in.',
  },
  {
    icon: '💬',
    title: 'Soporte sobre tu plan',
    description: 'Resuelve dudas de tu pauta específica, cuando las necesitas.',
  },
  {
    icon: '🍳',
    title: 'Recetario antiinflamatorio',
    description: 'Recetas vinculadas a tu plan semanal, con ingredientes y preparación.',
  },
  {
    icon: '🛒',
    title: 'Lista de compras automática',
    description: 'Se genera sola desde tu plan de la semana.',
  },
  {
    icon: '📊',
    title: 'Dashboard de progreso',
    description: 'Sigue tu evolución: energía, síntomas y adherencia en el tiempo.',
  },
  {
    icon: '🤝',
    title: 'Comunidad',
    description: 'Grupo con personas en el mismo proceso.',
  },
]

export const CHECKS = [
  'Plan alimentario personalizado',
  'Ajuste quincenal del plan',
  'Soporte disponible sobre tu pauta',
  'Recetario + lista de compras',
  'Dashboard de progreso',
  'Acceso a la comunidad',
  'Precio bloqueado de por vida',
  'Cancela cuando quieras, sin contratos',
]

export const GARANTIAS = [
  {
    icon: '🔓',
    title: 'Cancela cuando quieras',
    description: 'Desde tu perfil, en un clic. Sin formularios ni llamadas.',
  },
  {
    icon: '🔒',
    title: 'Tus datos están protegidos',
    description:
      'Cumplimos con la Ley 19.628 de protección de datos de Chile. Tu información de salud está cifrada y nunca se comparte.',
  },
  {
    icon: '📄',
    title: 'Boleta electrónica automática',
    description:
      'Recibes tu boleta exenta de IVA cada mes, lista para presentar a tu isapre.',
  },
]

export const FAQS: FAQItem[] = [
  {
    question: '¿Necesito saber de nutrición para usar Nutrisco?',
    answer:
      'No. Todo está explicado en lenguaje simple, sin tecnicismos. Si tienes dudas sobre algo en tu plan, el soporte está disponible para resolverlas.',
  },
  {
    question: '¿Puedo cancelar cuando quiera?',
    answer:
      'Sí. No hay contratos de permanencia ni multas. Cancelas desde tu perfil y el cobro no se renueva el siguiente mes. Tus datos se guardan por 30 días en caso de que quieras retomar.',
  },
  {
    question: '¿Funciona si tengo celiaquía, SII, hipotiroidismo u otra condición?',
    answer:
      'Sí. El screening inicial incluye preguntas sobre condiciones específicas. Tu plan considera esas restricciones desde el primer día.',
  },
  {
    question: '¿El plan es el mismo para todas?',
    answer:
      'No. Cada plan se asigna según tu perfil: tus síntomas, objetivos, hábitos, restricciones alimentarias y nivel de actividad física. No es un plan genérico.',
  },
  {
    question: '¿Cómo funciona el reembolso de la isapre?',
    answer:
      'Cada mes recibes una boleta electrónica exenta de IVA emitida por Constanza Jiménez (nutricionista). Lleva esa boleta a tu isapre y solicita el reembolso por prestaciones de nutrición. El monto cubierto depende de tu plan de salud — te recomendamos consultar directamente con tu isapre.',
  },
  {
    question: '¿Cuánto tiempo tarda en asignarse mi plan después de registrarme?',
    answer:
      'En menos de 24 horas desde que completas el screening. Recibirás un email cuando esté listo y puedas verlo en la plataforma.',
  },
  {
    question: '¿Qué pasa cuando se acaben los 100 cupos fundadores?',
    answer:
      'El precio sube a $27.990/mes. Las personas que ya están suscritas al precio fundador lo mantienen de por vida, sin importar cuánto suba el precio regular en el futuro.',
  },
]

export const TESTIMONIALS_PLACEHOLDER: Testimonial[] = [
  {
    stars: 5,
    quote:
      'Por fin sé exactamente qué comer sin tener que investigar todo desde cero. Mi nivel de energía mejoró notablemente en las primeras 2 semanas.',
    name: 'Beta tester',
    city: 'Chile',
    is_placeholder: true,
  },
  {
    stars: 5,
    quote:
      'La inflamación abdominal que tenía todos los días bajó casi completamente. Y lo mejor es que el plan se ajusta si algo no me está funcionando.',
    name: 'Beta tester',
    city: 'Chile',
    is_placeholder: true,
  },
  {
    stars: 5,
    quote:
      'La diferencia con el PDF es que acá alguien está mirando cómo voy. No estoy sola tratando de descifrar qué hago mal.',
    name: 'Beta tester',
    city: 'Chile',
    is_placeholder: true,
  },
]

// Set to false when real testimonials arrive to show them publicly
export const SHOW_TESTIMONIALS = true

export const CONSTANZA = {
  nombre: 'Constanza Jiménez',
  titulo: 'Nutricionista Clínica',
  bio: 'Llevo más de 10 años acompañando a personas a recuperar su salud a través de la alimentación antiinflamatoria.',
  story:
    'He atendido a miles de pacientes y vi el mismo patrón repetirse: empiezan bien, tienen resultados, pero sin seguimiento continuo vuelven al punto de partida. No por falta de compromiso — por falta de acompañamiento real entre sesión y sesión.\n\nConstruí Nutrisco para resolver eso. Para que el trabajo que hacemos juntas no se pierda cuando termina la consulta.',
  credentials: [
    'Nutricionista clínica titulada',
    '+10 años de experiencia en nutrición antiinflamatoria',
    '+2.500 pacientes acompañados',
    'Metodología antiinflamatoria propia',
  ],
  photo: '/constanzaoficial.jpeg',
}

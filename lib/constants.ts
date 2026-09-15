// ============================================================
// NUTRICO LANDING · Constantes centralizadas
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
  email: "contacto@constanzanutricion.cl",
  googleBusinessUrl: "https://share.google/fju7lUoVFux9PmfCA",
  consultaWeb: "https://www.constanzanutricion.cl",
  brand: {
    constanzaPhoto: "/brand/constanza.jpg",
    constanzaThumb: "/brand/constanza-thumb.jpg",
  },
  legal: {
    // Quien emite la boleta es la SpA de Constanza (corrección del 15-sep: el pie
    // mostraba su nombre con el RUT de la sociedad).
    razonSocial: "CJP Nutrición SpA",
    rut: "78.120.238-K",
    direccion: "Jorge Montt 538, La Serena, Chile",
  },
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

// ============================================================
// RESEÑAS DE GOOGLE DE CONSTANZA
//
// Fuente: la ficha de Google de Constanza Jiménez Paschold, extraída con
// Playwright el 15-sep-2026 (`60-clientes/activos/constanza-nutricion/outputs/
// lanzamiento-verano/landing-aprobacion/resenas-google/`, con `resenas.json`,
// las fotos y la captura de la calificación como evidencia). Ese día la ficha
// mostraba 5,0 con 90 reseñas, todas de 5 estrellas. El 14-sep un CSV exportado
// decía una más: se usa lo que Google muestra hoy.
//
// Criterios (brief del 14-sep, §4, y plan del 15-sep):
// - fuera las que mencionan peso (kilo, kg, peso, bajar, talla, adelgazar,
//   gorda/o), revisando la reseña completa y no solo el fragmento citado;
// - primero las que hablan del método, del acompañamiento y de los hábitos;
// - nombre más la inicial del apellido, sin fecha;
// - foto de perfil SOLO si la persona tiene una en Google (96×96, en
//   `public/v2/resenas/`). Sin foto va la inicial en un círculo de color, como
//   la muestra Google. Nunca una foto de stock: sería inventar cómo se ve quien
//   escribió la reseña.
// Quedó fuera además la de Oscar Vergara: es de CreActive Studio, la agencia
// que hace esta página. Y la de "Constanza Martinez", que se confunde con la
// nutricionista.
//
// El texto es el de la reseña, sin corregir. Cuando se cita un fragmento, los
// puntos suspensivos marcan dónde se cortó.
// ============================================================

export interface ResenaGoogle {
  /** Estable, para las keys de React. */
  id: string
  nombre: string
  cita: string
  /** Foto de perfil real de Google. Sin foto, la tarjeta muestra la inicial. */
  foto?: string
  /**
   * Cita corta para la zona de precio. Va solo ahí y no en la grilla de
   * testimonios, para que la misma frase no aparezca dos veces en la página.
   */
  corta?: boolean
}

export const RESENAS_GOOGLE = {
  promedio: "5,0",
  total: 90,
  citas: [
    {
      id: "milita",
      nombre: "Milita D.",
      cita: "Gracias a su acompañamiento logré tener una buena relación con todo tipo de alimentos, sin culpas ni restricciones extremas.",
      foto: "/v2/resenas/r-milita-duarte-morales.webp",
    },
    {
      id: "macarena",
      nombre: "Macarena C.",
      cita: "…se adapta a tus requerimientos cuando comienzas con la dieta. No te da pauta estrictas y de verdad te ofrece alternativas adecuadas a tu realidad",
      foto: "/v2/resenas/r-macarena-cifmor.webp",
    },
    {
      id: "evelyn",
      nombre: "Evelyn B.",
      cita: "No te deja sola en el proceso. Responsabilidad y puntualidad en su atención…",
      corta: true,
    },
    {
      id: "hilda",
      nombre: "Hilda A.",
      cita: "Quisiera agradecer el compromiso profesional de Constanza, su juicio clínico y disponibilidad para atender todas las dudas que surgen.",
      foto: "/v2/resenas/r-hilda-aravena-paez.webp",
    },
    {
      id: "andrea",
      nombre: "Andrea V.",
      cita: "…Te motiva y va cambiando la minuta según tus gustos !! Te pregunta cómo vas…",
      foto: "/v2/resenas/r-andrea-veliz.webp",
    },
    {
      id: "gianina",
      nombre: "Gianina M.",
      cita: "…sus pautas son personalizadas y no son difíciles de seguir.",
      corta: true,
    },
    {
      id: "clarimar",
      nombre: "Clarimar T.",
      cita: "…con ella he aprendido a comer, tener más consciencia de lo que consumo y de cómo afecta mi cuerpo.",
      foto: "/v2/resenas/r-clarimar-tabares.webp",
    },
    {
      id: "johana",
      nombre: "Johana M.",
      cita: "Acompaña en todo momento el proceso de cambios de hábitos. Cercana y preocupada por sus pacientes.",
    },
    {
      id: "soledad",
      nombre: "Soledad H.",
      cita: "Encontrar a Cony en mi camino de auto sanacion física y mental ha sido una experiencia más que gratificante.",
      foto: "/v2/resenas/r-soledad-hinojosa-luna.webp",
    },
    {
      id: "marigen",
      nombre: "Marigen K.",
      cita: "Excelente atención, la simpatía y profesionalismo de Constanza…",
      foto: "/v2/resenas/r-marigen-kuchen.webp",
    },
    {
      id: "gloria",
      nombre: "Gloria R.",
      cita: "…afable con regímenes que no son difíciles de realizar. Adecuados de acuerdo a los requerimientos de cada paciente.",
      foto: "/v2/resenas/r-gloria-riveros-escobar.webp",
    },
  ] satisfies ResenaGoogle[] as ResenaGoogle[],
}

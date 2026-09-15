// ============================================================
// RESEÑAS DE GOOGLE DE CONSTANZA
//
// Fuente: exportación de las reseñas del perfil de Google de Constanza Jiménez
// Paschold (`google (3).csv`, 91 reseñas, todas de 5 estrellas), recibida el
// 14-sep-2026. El CSV no se versiona: trae nombres completos, fotos de perfil y
// fechas que la página no muestra. Columnas usadas: `d4r55` (nombre) y
// `wiI7pd` (texto).
//
// Criterios del brief (`BRIEF-ajustes-landing-v2-2026-09-14.md`, §4):
// - fuera las que mencionan peso (kilo, kg, peso, bajar, talla, adelgazar,
//   gorda/o), revisando la reseña completa y no solo el fragmento citado;
// - primero las que hablan de ella como profesional, del acompañamiento y de
//   los hábitos;
// - nombre más la inicial del apellido, avatar con la inicial, sin foto de
//   perfil ni fecha.
// Quedó fuera además la de Oscar Vergara: es de CreActive Studio, la agencia
// que hace esta página.
//
// El texto es el de la reseña, sin corregir. Cuando se cita un fragmento, los
// puntos suspensivos marcan dónde se cortó. `fila` es la posición en el CSV
// (base 0), para volver a la reseña completa.
// ============================================================

export interface ResenaGoogle {
  nombre: string
  cita: string
  fila: number
}

export const RESENAS_GOOGLE = {
  promedio: "5,0",
  total: 91,
  citas: [
    {
      nombre: "Milita D.",
      cita: "Gracias a su acompañamiento logré tener una buena relación con todo tipo de alimentos, sin culpas ni restricciones extremas.",
      fila: 15,
    },
    {
      nombre: "Johana M.",
      cita: "Acompaña en todo momento el proceso de cambios de hábitos. Cercana y preocupada por sus pacientes.",
      fila: 23,
    },
    {
      nombre: "Hilda A.",
      cita: "Quisiera agradecer el compromiso profesional de Constanza, su juicio clínico y disponibilidad para atender todas las dudas que surgen.",
      fila: 30,
    },
    {
      nombre: "Gianina M.",
      cita: "…sus pautas son personalizadas y no son difíciles de seguir.",
      fila: 17,
    },
    {
      nombre: "Evelyn B.",
      cita: "No te deja sola en el proceso. Responsabilidad y puntualidad en su atención…",
      fila: 0,
    },
    {
      nombre: "Clarimar T.",
      cita: "…con ella he aprendido a comer, tener más consciencia de lo que consumo y de cómo afecta mi cuerpo.",
      fila: 71,
    },
  ] satisfies ResenaGoogle[],
} as const

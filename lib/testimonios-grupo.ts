// ============================================================
// TESTIMONIOS DEL GRUPO DE OCTUBRE (C1)
//
// Diseño de la C2 §9.11: prueba nueva desde el jue 22-oct, después del primer
// control del grupo (20-oct). Se llenan agregando objetos a la lista en un PR
// chico (tarea 16 del plan): la página no cambia.
//
// Reglas (diseño §2 y plan maestro, tarea 19):
// - solo con permiso escrito, guardado en
//   `60-clientes/activos/constanza-nutricion/outputs/lanzamiento-c2/testimonios/`;
// - sin kilos, peso ni tallas: la página es destino de anuncios;
// - nombre y la inicial del apellido, sin foto (va la inicial, como en las
//   reseñas de Google sin foto).
// ============================================================

export interface TestimonioGrupo {
  id: string
  /** "Nombre A." */
  nombre: string
  cita: string
  /** Qué lo respalda: fecha (YYYY-MM-DD) y archivo del permiso en el monorepo. */
  permiso: { fecha: string; archivo: string }
}

export const TESTIMONIOS_GRUPO: TestimonioGrupo[] = []

// Con `new RegExp` y no con literal: el tsconfig no declara `target` y TS rechaza
// la bandera `u` en un literal (TS1501). El motor (Node, navegadores) la soporta.
const PALABRAS_DE_PESO = new RegExp(
  "(?<!\\p{L})(kilos?|kg|peso|pesaba|baj[eéó]|bajar|talla|tallas|adelgac\\p{L}*|engord\\p{L}*|gorda|gordo)(?!\\p{L})",
  "iu"
)

/** Se publica solo con nombre, cita, permiso y sin hablar de peso. */
export function testimonioPublicable(t: TestimonioGrupo): boolean {
  return (
    t.nombre.trim() !== "" &&
    t.cita.trim() !== "" &&
    /^\d{4}-\d{2}-\d{2}$/.test(t.permiso.fecha) &&
    t.permiso.archivo.trim() !== "" &&
    !PALABRAS_DE_PESO.test(t.cita)
  )
}

/** Para revisar el diseño en local: tres válidos y uno que nunca se debe ver. */
const DE_PRUEBA: TestimonioGrupo[] = [
  {
    id: "prueba-1",
    nombre: "Testimonio de prueba A.",
    cita: "Texto de prueba de largo medio, para ver cómo queda la tarjeta en celular y en escritorio.",
    permiso: { fecha: "2026-10-21", archivo: "prueba" },
  },
  {
    id: "prueba-2",
    nombre: "Testimonio de prueba B.",
    cita: "Otro texto de prueba, más corto.",
    permiso: { fecha: "2026-10-21", archivo: "prueba" },
  },
  {
    id: "prueba-3",
    nombre: "Testimonio de prueba C.",
    cita: "Un tercer texto de prueba, que ocupa dos o tres líneas, para medir el alto de la sección completa antes del precio.",
    permiso: { fecha: "2026-10-21", archivo: "prueba" },
  },
  {
    id: "prueba-peso",
    nombre: "No debe verse",
    cita: "Bajé 3 kilos.",
    permiso: { fecha: "2026-10-21", archivo: "prueba" },
  },
]

/** Los testimonios que se muestran. `TESTIMONIOS_MOCK=1` usa los de prueba, nunca en producción. */
export function testimoniosVisibles(
  vercelEnv: string | undefined = process.env.VERCEL_ENV,
  mock: string | undefined = process.env.TESTIMONIOS_MOCK
): TestimonioGrupo[] {
  const fuente = vercelEnv !== "production" && mock === "1" ? DE_PRUEBA : TESTIMONIOS_GRUPO
  return fuente.filter(testimonioPublicable)
}

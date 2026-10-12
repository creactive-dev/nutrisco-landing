// ============================================================
// REGALO DE LA C2 · la mini guía de fiestas
//
// Diseño de la campaña C2 §8: quien todavía no conoce a Constanza recibe
// primero algo de valor. La guía la produce la tarea 5 del plan maestro y vive
// en una ruta fija de `public/`; `scripts/verificar-regalo.mjs` revisa que sea
// el PDF real antes de publicar.
//
// Las fechas del grupo no se escriben acá: salen de la cohorte, igual que en la
// portada.
// ============================================================

import { diaSemanaYFecha, diaYMes, mesDe, ultimoDiaDeVenta, type EstadoVenta } from "@/lib/programa"

/** Cuánto espera la página a la app para leer la cohorte antes de seguir sin ella. */
export const TOPE_COHORTE_MS = 2500
/** Cuánto espera el formulario la respuesta de la app. Mayor que el tope del CRM en la app (8 s). */
export const TOPE_ENVIO_MS = 12000

/**
 * La guía no puede depender de que la app responda: si una promesa tarda más
 * que `ms`, se sigue con `alVencer`. La promesa original no se cancela.
 */
export async function conTope<T>(promesa: Promise<T>, ms: number, alVencer: T): Promise<T> {
  let reloj: ReturnType<typeof setTimeout> | undefined
  const vencida = new Promise<T>((resolver) => {
    reloj = setTimeout(() => resolver(alVencer), ms)
  })
  try {
    return await Promise.race([promesa, vencida])
  } finally {
    clearTimeout(reloj)
  }
}

export const REGALO_FIESTAS = {
  /** El mismo que la app conoce en `REGALOS` (`app/src/lib/programa/regalos.ts`). */
  slug: "guia-fiestas",
  pdf: "/regalo/guia-fiestas.pdf",
  nombreArchivo: "guia-de-fiestas-constanza-jimenez.pdf",
  // Igual al de la portada del PDF.
  titulo: "5 platos de fiestas que no inflaman",
  eyebrow: "UN REGALO DE CONSTANZA JIMÉNEZ, NUTRICIONISTA",
  bajada: "Un menú completo para Navidad o Año Nuevo, de la entrada al postre. En PDF y gratis.",
  /** Lo que trae la guía, en lista corta bajo la bajada. */
  puntos: [
    "Cada receta con su paso a paso y lo que puedes dejar listo el día anterior.",
    "Cómo armar tu plato en una cena para disfrutar sin culpa.",
  ],
  // Medidas reales de la portada generada desde el PDF (paso 10).
  portada: {
    src: "/regalo/guia-fiestas-portada.jpg",
    alt: "Portada de la guía de fiestas de Constanza Jiménez Paschold",
    width: 635,
    height: 900,
  },
  form: {
    nombre: "Tu nombre",
    email: "Tu correo",
    cta: "Quiero la guía",
    cargando: "Preparando tu guía...",
    errorNombre: "Escribe tu nombre para mandarte la guía.",
    errorEmail: "Revisa tu correo, parece que falta algo.",
  },
  listo: {
    titulo: "Aquí está tu guía.",
    descargar: "Descargar la guía en PDF",
    correo: "También te la mandamos a",
    promociones: "Si no la ves, revisa la carpeta Promociones.",
  },
  persona: "Constanza Jiménez Paschold · Nutricionista clínica",
  verPrograma: "Conoce el programa",
} as const

/** La invitación al grupo que está a la venta, leída de la cohorte. Null si no hay. */
export function invitacionAlGrupo(venta: EstadoVenta): string | null {
  if (venta.estado === "abierta") {
    return `Las inscripciones del grupo de ${mesDe(venta.cohorte.fecha_inicio)} están abiertas hasta el ${ultimoDiaDeVenta(venta.cohorte.venta_cierra)}.`
  }
  if (venta.estado === "proxima") {
    return `Las inscripciones del grupo de ${mesDe(venta.cohorte.fecha_inicio)} abren el ${diaSemanaYFecha(venta.cohorte.venta_abre)}, y el grupo parte el ${diaYMes(venta.cohorte.fecha_inicio)}.`
  }
  return null
}

/** Qué correos va a recibir quien pide la guía. Honesto: la secuencia invita al grupo. */
export function notaCorreos(venta: EstadoVenta): string {
  const grupo =
    venta.estado === "abierta" || venta.estado === "proxima"
      ? ` y su grupo de ${mesDe(venta.cohorte.fecha_inicio)}`
      : ""
  return `Te mandamos la guía y algunos correos de Constanza sobre las fiestas${grupo}. Te das de baja cuando quieras.`
}

// ============================================================
// PROGRAMA "PREPARA TU VERANO" — estado de venta y formato de fechas
//
// La página NO sabe fechas ni precios: los lee del endpoint público de la app,
// que a su vez los lee de la fila de `cohortes_programa`. Un cambio de fecha o
// de precio es un UPDATE en esa tabla y esta página lo refleja sola. Si acá se
// copiaran los números a mano, editar la fila los desalinearía en silencio.
// ============================================================

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.constanzanutricion.cl"

export interface Sesion {
  fecha: string
  tema: string
}

export interface CohorteAbierta {
  slug: string
  nombre: string
  precio: number
  venta_cierra: string
  fecha_inicio: string
  fecha_fin: string
  sesiones: Sesion[] | null
}

export interface CohorteProxima extends CohorteAbierta {
  venta_abre: string
}

export type EstadoVenta =
  | { estado: "abierta"; cohorte: CohorteAbierta }
  | { estado: "proxima"; cohorte: CohorteProxima }
  | { estado: "ninguna" }
  | { estado: "error" }

function esFechaUsable(valor: unknown): valor is string {
  return typeof valor === "string" && Number.isFinite(new Date(valor).getTime())
}

/**
 * Lee qué se puede comprar hoy. Nunca lanza: la landing tiene que renderizar
 * igual si la app está caída, mostrando el estado neutral en vez de una página
 * rota. `error` y `ninguna` se distinguen a propósito, porque significan cosas
 * distintas para el visitante.
 *
 * La respuesta se valida campo por campo y no se cree por venir con un 200. La
 * primera versión confiaba en la forma, la app respondió una forma anterior sin
 * `fecha_fin`, y `Intl.DateTimeFormat` con una fecha inválida tira RangeError
 * durante el render: 500 en la página que vende, no un dato faltante. Una forma
 * que no calza se degrada a `error`, que la página sabe mostrar.
 */
export async function leerCohorteActual(): Promise<EstadoVenta> {
  try {
    const res = await fetch(`${APP_URL}/api/programa/cohorte-actual`, {
      cache: "no-store",
    })
    if (!res.ok) return { estado: "error" }
    const data: unknown = await res.json()
    if (typeof data !== "object" || data === null) return { estado: "error" }

    const cuerpo = data as Record<string, unknown>
    if (cuerpo.estado === "ninguna") return { estado: "ninguna" }
    if (cuerpo.estado !== "abierta" && cuerpo.estado !== "proxima") return { estado: "error" }

    const c = cuerpo.cohorte as Record<string, unknown> | undefined
    if (!c) return { estado: "error" }

    const fechasRequeridas = ["venta_cierra", "fecha_inicio", "fecha_fin"]
    if (cuerpo.estado === "proxima") fechasRequeridas.push("venta_abre")

    const completa =
      typeof c.slug === "string" &&
      typeof c.nombre === "string" &&
      typeof c.precio === "number" &&
      fechasRequeridas.every((campo) => esFechaUsable(c[campo]))

    if (!completa) return { estado: "error" }

    return cuerpo.estado === "abierta"
      ? { estado: "abierta", cohorte: c as unknown as CohorteAbierta }
      : { estado: "proxima", cohorte: c as unknown as CohorteProxima }
  } catch {
    return { estado: "error" }
  }
}

// ── Fechas ────────────────────────────────────────────────────────────────
// Todo se formatea en la zona de Chile explícitamente. El servidor de Vercel
// corre en UTC y el teléfono de quien mira puede estar en cualquier parte: sin
// `timeZone` fijo, un programa que arranca el lunes 21 a medianoche se muestra
// como domingo 20 a alguien y el día de la semana también sale mal.

const ZONA = "America/Santiago"

/**
 * Segunda línea de defensa contra el 500.
 *
 * `Intl.DateTimeFormat().format()` no devuelve un valor raro cuando la fecha es
 * inválida: tira `RangeError`. En un componente de servidor eso es la página
 * entera caída. `leerCohorteActual` ya filtra las respuestas mal formadas, pero
 * cualquier fecha que llegue por otro camino (las sesiones, por ejemplo, que se
 * cargan a mano con un UPDATE) pasa por acá. Un texto vacío se ve mal; una
 * página caída no se ve.
 */
function formatear(iso: string, opciones: Intl.DateTimeFormatOptions): string {
  const fecha = new Date(iso)
  if (!Number.isFinite(fecha.getTime())) return ""
  try {
    return new Intl.DateTimeFormat("es-CL", { ...opciones, timeZone: ZONA }).format(fecha)
  } catch {
    return ""
  }
}

export function diaYMes(iso: string): string {
  return formatear(iso, { day: "numeric", month: "long" })
}

export function diaMesCorto(iso: string): string {
  return formatear(iso, { day: "numeric", month: "short" })
}

export function diaSemanaYFecha(iso: string): string {
  // es-CL mete una coma entre el día de la semana y la fecha ("lunes, 14 de
  // septiembre"). Dentro de una frase se lee mal, y acá siempre va dentro de
  // una frase.
  return formatear(iso, { weekday: "long", day: "numeric", month: "long" }).replace(",", "")
}

/**
 * El último día del programa, a partir del instante de corte.
 *
 * `fecha_fin` NO es el último día: es el instante en que se acaba el acceso,
 * medianoche del día siguiente en Chile. Mostrarlo crudo anuncia un día más de
 * programa del que se vendió. La cohorte 1 termina el 21 de diciembre, que es
 * lo que dice el PDF que Constanza aprobó, y `fecha_fin` es el 22 a las 00:00.
 *
 * Y el día anterior no es la fecha menos 24 horas: en las transiciones de
 * horario hay días de 23 y de 25 horas, y restar milisegundos cae en el día
 * equivocado. Se resta un día del CALENDARIO chileno, que es otra operación.
 */
export function ultimoDiaDelPrograma(fechaFin: string): string {
  const corte = new Date(fechaFin)
  if (!Number.isFinite(corte.getTime())) return ""

  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(corte)

  const [anio, mes, dia] = partes.split("-").map(Number)
  if (!anio || !mes || !dia) return ""

  // Fecha civil pura en UTC: sin hora local de por medio, restar un día acá es
  // aritmética de calendario y no de reloj.
  const civil = new Date(Date.UTC(anio, mes - 1, dia))
  civil.setUTCDate(civil.getUTCDate() - 1)

  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(civil)
}

/**
 * El último día en que todavía se alcanza a entrar. `venta_cierra` es el
 * instante del corte (23:59:59 del domingo), así que el día que hay que
 * mostrarle a la gente es el de ese mismo instante, no el siguiente.
 */
export function ultimoDiaDeVenta(ventaCierra: string): string {
  return diaSemanaYFecha(ventaCierra)
}

export function formatCLP(valor: number): string {
  return `$${valor.toLocaleString("es-CL")}`
}

/**
 * Cuánto falta para un instante. Devuelve null cuando ya pasó, que es la señal
 * para que la cuenta regresiva desaparezca en vez de mostrar números negativos.
 */
export function faltanteHasta(iso: string, ahora: number = Date.now()) {
  const restante = new Date(iso).getTime() - ahora
  if (!Number.isFinite(restante) || restante <= 0) return null
  const segundos = Math.floor(restante / 1000)
  return {
    dias: Math.floor(segundos / 86400),
    horas: Math.floor((segundos % 86400) / 3600),
    minutos: Math.floor((segundos % 3600) / 60),
    segundos: segundos % 60,
  }
}

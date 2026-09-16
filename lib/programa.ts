// ============================================================
// PROGRAMA "PREPARA TU VERANO" · estado de venta y formato de fechas
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
  const simulado = estadoSimulado()
  if (simulado) return simulado

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

// ── Estado simulado (solo fuera de producción) ────────────────────────────
// Los tres estados de la página dependen del calendario de la fila real: sin
// esto, revisar la lista de espera obliga a esperar a que cierre la venta, y
// revisar el checkout obliga a que esté abierta. `COHORTE_MOCK` deja pedir
// cualquiera de los cuatro en local y en las previews.
//
// La guarda es `VERCEL_ENV`, que la plataforma pone sola y vale "production"
// SOLO en el despliegue de producción. Por eso la variable se ignora ahí aunque
// alguien la deje definida en el panel por error: una página de venta que
// muestra una cohorte inventada es peor que una caída. Se verificó levantando
// el build con VERCEL_ENV=production y COHORTE_MOCK definida: la página siguió
// leyendo el endpoint real.

export type EstadoSimulable = "abierta" | "proxima" | "ninguna" | "error"

const DIA = 24 * 60 * 60 * 1000

export function estadoSimulado(
  entorno: Record<string, string | undefined> = process.env,
  ahora: number = Date.now()
): EstadoVenta | null {
  if (entorno.VERCEL_ENV === "production") return null
  const pedido = entorno.COHORTE_MOCK
  if (!pedido) return null

  // Sesiones solo si se piden aparte: en las capturas de aprobación no puede
  // aparecer un horario que Constanza no dio.
  const sesiones =
    entorno.COHORTE_MOCK_SESIONES === "1"
      ? [1, 2, 3].map((n) => ({
          fecha: new Date(ahora + (12 + 30 * (n - 1)) * DIA).toISOString(),
          tema: `Sesión simulada ${n}`,
        }))
      : null

  // Fechas con la forma de las reales: la venta cierra a las 23:59:59 de Chile,
  // el programa arranca a las 00:00 del día siguiente y `fecha_fin` es el
  // corte de 92 días después (como la cohorte 1: 21 sep al 21 dic).
  const cohorte = (diasHastaCierre: number) => {
    const cierre = instanteChile(ahora + diasHastaCierre * DIA, "23:59:59")
    const inicio = instanteChile(ahora + (diasHastaCierre + 1) * DIA, "00:00:00")
    const fin = instanteChile(ahora + (diasHastaCierre + 93) * DIA, "00:00:00")
    return {
      slug: `simulada-${pedido}`,
      nombre: "Prepara tu Verano",
      precio: 59990,
      venta_cierra: cierre,
      fecha_inicio: inicio,
      fecha_fin: fin,
      sesiones,
    }
  }

  switch (pedido as EstadoSimulable) {
    case "abierta":
      return { estado: "abierta", cohorte: cohorte(4) }
    case "proxima":
      return {
        estado: "proxima",
        cohorte: { ...cohorte(9), venta_abre: instanteChile(ahora + 2 * DIA, "00:00:00") },
      }
    case "ninguna":
      return { estado: "ninguna" }
    case "error":
      return { estado: "error" }
    default:
      return null
  }
}

/**
 * Un instante ISO para una hora de reloj chileno en el día (de Chile) en que
 * cae `instante`. Prueba los dos husos de Chile continental y se queda con el
 * que, leído de vuelta en America/Santiago, da la hora pedida. Solo lo usa el
 * estado simulado.
 */
function instanteChile(instante: number, hora: "00:00:00" | "23:59:59"): string {
  const dia = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(instante))
  for (const huso of ["-03:00", "-04:00"]) {
    const candidato = new Date(`${dia}T${hora}${huso}`)
    const leido = new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Santiago",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).format(candidato)
    if (leido === hora) return candidato.toISOString()
  }
  return new Date(`${dia}T${hora}-03:00`).toISOString()
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
export function ultimoDiaDelPrograma(
  fechaFin: string,
  opciones: { mes?: "short" | "long"; anio?: boolean } = {}
): string {
  const civil = fechaCivilChile(fechaFin)
  if (!civil) return ""

  // Fecha civil pura en UTC: sin hora local de por medio, restar un día acá es
  // aritmética de calendario y no de reloj.
  civil.setUTCDate(civil.getUTCDate() - 1)

  try {
    return new Intl.DateTimeFormat("es-CL", {
      day: "numeric",
      month: opciones.mes ?? "short",
      ...(opciones.anio ? { year: "numeric" } : {}),
      timeZone: "UTC",
    }).format(civil)
  } catch {
    return ""
  }
}

/**
 * El día del calendario chileno en que cae un instante, como fecha civil pura
 * (medianoche UTC de ese día). Sirve para aritmética de días sin que el reloj
 * ni el horario de verano se metan: ver `ultimoDiaDelPrograma`.
 */
function fechaCivilChile(iso: string): Date | null {
  const instante = new Date(iso)
  if (!Number.isFinite(instante.getTime())) return null

  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instante)

  const [anio, mes, dia] = partes.split("-").map(Number)
  if (!anio || !mes || !dia) return null
  return new Date(Date.UTC(anio, mes - 1, dia))
}

/** "septiembre". Para nombrar el grupo por el mes en que arranca. */
export function mesDe(iso: string): string {
  return formatear(iso, { month: "long" })
}

/** "2026", contado en la zona de Chile y no en la del servidor. */
export function anioDe(iso: string): string {
  return formatear(iso, { year: "numeric" })
}

/**
 * "20/09". Se arma a mano desde la fecha civil: el formato numérico de es-CL
 * separa con guion ("20-09", que en una barra de anuncio se lee como rango) y
 * además ignora el `2-digit` del mes ("20-9").
 */
export function diaMesNumerico(iso: string): string {
  const civil = fechaCivilChile(iso)
  if (!civil) return ""
  const dia = String(civil.getUTCDate()).padStart(2, "0")
  const mes = String(civil.getUTCMonth() + 1).padStart(2, "0")
  return `${dia}/${mes}`
}

/** "23:59", hora de Chile. */
export function horaDe(iso: string): string {
  return formatear(iso, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
}

/**
 * La semana (lunes a domingo) en que cae un instante, en el calendario
 * chileno. La usa el teléfono ilustrativo del hero para que su tira de días
 * sea la semana en que arranca el grupo y no una semana escrita a mano.
 */
export function semanaDe(iso: string): { inicial: string; dia: number; esElDia: boolean }[] {
  const civil = fechaCivilChile(iso)
  if (!civil) return []
  const iniciales = ["L", "M", "M", "J", "V", "S", "D"]
  // getUTCDay: domingo 0. Se corre para que el lunes sea 0.
  const indice = (civil.getUTCDay() + 6) % 7
  const lunes = new Date(civil)
  lunes.setUTCDate(civil.getUTCDate() - indice)
  return iniciales.map((inicial, i) => {
    const dia = new Date(lunes)
    dia.setUTCDate(lunes.getUTCDate() + i)
    return { inicial, dia: dia.getUTCDate(), esElDia: i === indice }
  })
}

/**
 * El último día en que todavía se alcanza a entrar. `venta_cierra` es el
 * instante del corte (23:59:59 del domingo), así que el día que hay que
 * mostrarle a la gente es el de ese mismo instante, no el siguiente.
 */
export function ultimoDiaDeVenta(ventaCierra: string): string {
  return diaSemanaYFecha(ventaCierra)
}

/**
 * Cómo se muestra una sesión en vivo. Las sesiones se cargan a mano en un
 * jsonb sin formato fijo, así que llegan de dos formas:
 * - con hora ("2026-10-05T19:00:00-03:00"): día y hora en Chile;
 * - solo fecha ("2026-10-05"): `new Date` la lee como medianoche UTC, que en
 *   Chile es el día ANTERIOR a las 21:00. Se trata como fecha civil y sin hora.
 * Devuelve null si no se puede leer, para descartar la fila y no mostrar una
 * viñeta vacía.
 */
export function fechaDeSesion(fecha: string): { dia: string; hora: string | null } | null {
  if (typeof fecha !== "string") return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    const civil = new Date(`${fecha}T00:00:00Z`)
    if (!Number.isFinite(civil.getTime())) return null
    try {
      const dia = new Intl.DateTimeFormat("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "UTC",
      })
        .format(civil)
        .replace(",", "")
      return { dia, hora: null }
    } catch {
      return null
    }
  }
  const dia = diaSemanaYFecha(fecha)
  if (!dia) return null
  return { dia, hora: horaDe(fecha) || null }
}

/** Las sesiones que se pueden mostrar, ya formateadas. Null si no hay ninguna. */
export function sesionesLegibles(
  sesiones: Sesion[] | null | undefined
): { dia: string; hora: string | null; tema: string }[] | null {
  if (!Array.isArray(sesiones)) return null
  const legibles = sesiones.flatMap((s) => {
    const f = s && fechaDeSesion(s.fecha)
    return f ? [{ ...f, tema: typeof s.tema === "string" ? s.tema : "" }] : []
  })
  return legibles.length > 0 ? legibles : null
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

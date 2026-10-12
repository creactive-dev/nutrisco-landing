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
//
// `COHORTE_MOCK_INICIO`, `COHORTE_MOCK_SLUG` y `COHORTE_MOCK_SESIONES` afinan el
// simulado; ver la función.

export type EstadoSimulable = "abierta" | "proxima" | "ninguna" | "error"

const DIA = 24 * 60 * 60 * 1000

export function estadoSimulado(
  entorno: Record<string, string | undefined> = process.env,
  ahora: number = Date.now()
): EstadoVenta | null {
  if (entorno.VERCEL_ENV === "production") return null
  const pedido = entorno.COHORTE_MOCK
  if (!pedido) return null

  // `COHORTE_MOCK_INICIO=2026-11-05` fija el día en que parte el grupo
  // simulado, con el cierre de la venta 6 días antes (como la C2 real). Sin
  // esto el grupo parte a los 5 días de hoy y lo que depende del calendario,
  // como el bloque de las fiestas, no se puede revisar. Mediodía UTC para que
  // el día civil de Chile sea el mismo.
  const inicioFijo = /^\d{4}-\d{2}-\d{2}$/.test(entorno.COHORTE_MOCK_INICIO ?? "")
    ? Date.parse(`${entorno.COHORTE_MOCK_INICIO}T12:00:00Z`)
    : null
  // `COHORTE_MOCK_SLUG=2026-10` hace pasar al simulador por la C2, para ver lo
  // que solo tiene esa cohorte (el bono).
  const slug = entorno.COHORTE_MOCK_SLUG || `simulada-${pedido}`

  // Sesiones solo si se piden aparte: en las capturas de aprobación no puede
  // aparecer un horario que Constanza no dio. Con inicio fijo caen donde las
  // propone el diseño de la C2: mediados de noviembre, 10 de diciembre y
  // mediados de enero.
  let sesiones: Sesion[] | null = null
  if (entorno.COHORTE_MOCK_SESIONES === "1") {
    sesiones =
      inicioFijo !== null
        ? [10, 35, 70].map((dias, i) => ({
            fecha: `${new Date(inicioFijo + dias * DIA).toISOString().slice(0, 10)}T19:00:00-03:00`,
            tema: `Sesión simulada ${i + 1}`,
          }))
        : [1, 2, 3].map((n) => ({
            fecha: new Date(ahora + (12 + 30 * (n - 1)) * DIA).toISOString(),
            tema: `Sesión simulada ${n}`,
          }))
  }

  // Fechas con la forma de las reales: la venta cierra a las 23:59:59 de Chile,
  // el programa arranca a las 00:00 del día de inicio y `fecha_fin` es el
  // corte de 92 días después (como la cohorte 1: 21 sep al 21 dic).
  const cohorte = (diasHastaCierre: number) => {
    if (inicioFijo !== null) {
      return {
        slug,
        nombre: "Prepara tu Verano",
        precio: 59990,
        venta_cierra: instanteChile(inicioFijo - 6 * DIA, "23:59:59"),
        fecha_inicio: instanteChile(inicioFijo, "00:00:00"),
        fecha_fin: instanteChile(inicioFijo + 93 * DIA, "00:00:00"),
        sesiones,
      }
    }
    const cierre = instanteChile(ahora + diasHastaCierre * DIA, "23:59:59")
    const inicio = instanteChile(ahora + (diasHastaCierre + 1) * DIA, "00:00:00")
    const fin = instanteChile(ahora + (diasHastaCierre + 93) * DIA, "00:00:00")
    return {
      slug,
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

// ── Controles del programa ───────────────────────────────────────────────
// `cohorte-actual` no devuelve los controles: se calculan acá con la MISMA
// regla de la app (`app/src/lib/programa/control-programa.ts`,
// `fechasControles`): cada 15 días exactos desde el inicio de la cohorte, seis
// en total, el sexto de cierre. Si la app cambia la regla, esta también.

export const DIAS_ENTRE_CONTROLES = 15
export const CONTROLES_PROGRAMA = 6

/** Las seis fechas de control, como fechas civiles de Chile "YYYY-MM-DD". */
export function fechasControles(fechaInicio: string): string[] {
  const inicio = fechaCivilChile(fechaInicio)
  if (!inicio) return []
  return Array.from({ length: CONTROLES_PROGRAMA }, (_, i) => {
    const dia = new Date(inicio)
    dia.setUTCDate(inicio.getUTCDate() + DIAS_ENTRE_CONTROLES * (i + 1))
    return dia.toISOString().slice(0, 10)
  })
}

export interface ControlesFiestas {
  antesDeNavidad: string
  despuesDeAnoNuevo: string
}

/**
 * El control justo antes de Navidad (del 15 al 24 de diciembre) y el justo
 * después de Año Nuevo (del 1 al 10 de enero). Null si el grupo no tiene los
 * dos: ahí la página no habla de las fiestas (diseño C2 §3.2).
 */
export function controlesDeFiestas(fechas: string[]): ControlesFiestas | null {
  const entre = (fecha: string, desde: string, hasta: string) =>
    fecha.slice(5) >= desde && fecha.slice(5) <= hasta
  const antes = [...fechas].reverse().find((f) => entre(f, "12-15", "12-24"))
  if (!antes) return null
  const despues = fechas.find((f) => entre(f, "01-01", "01-10") && f > antes)
  return despues ? { antesDeNavidad: antes, despuesDeAnoNuevo: despues } : null
}

/** "20 de diciembre" (o "20 dic") de una fecha civil "YYYY-MM-DD". Vacío si no se puede leer. */
export function diaYMesCivil(fecha: string, mes: "long" | "short" = "long"): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return ""
  try {
    return new Intl.DateTimeFormat("es-CL", { day: "numeric", month: mes, timeZone: "UTC" }).format(
      new Date(`${fecha}T00:00:00Z`)
    )
  } catch {
    return ""
  }
}

/** La sesión en vivo que cae en diciembre (la de las fiestas), si la fila la trae. */
export function sesionEnDiciembre(
  sesiones: Sesion[] | null | undefined
): { dia: string; hora: string | null; tema: string } | null {
  if (!Array.isArray(sesiones)) return null
  for (const s of sesiones) {
    if (!s || typeof s.fecha !== "string") continue
    const mes = /^\d{4}-\d{2}-\d{2}$/.test(s.fecha)
      ? Number(s.fecha.slice(5, 7))
      : (fechaCivilChile(s.fecha)?.getUTCMonth() ?? -1) + 1
    if (mes !== 12) continue
    const legible = fechaDeSesion(s.fecha)
    if (legible) return { ...legible, tema: typeof s.tema === "string" ? s.tema : "" }
  }
  return null
}

export function formatCLP(valor: number): string {
  return `$${valor.toLocaleString("es-CL")}`
}

/**
 * "Son menos de $20.000 al mes por 3 meses de acompañamiento." El precio
 * dividido en tres, redondeado hacia arriba al mil; si la división da justo un
 * mil, se dice el monto exacto. No habla de cuotas ni de interés: el interés,
 * si lo hay, lo pone el banco de quien paga (auditoría §3.8).
 */
export function textoPorMes(precio: number): string {
  if (!Number.isFinite(precio) || precio <= 0) return ""
  const porMes = precio / 3
  const tope = Math.ceil(porMes / 1000) * 1000
  const monto = tope === porMes ? formatCLP(porMes) : `menos de ${formatCLP(tope)}`
  return `Son ${monto} al mes por 3 meses de acompañamiento.`
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

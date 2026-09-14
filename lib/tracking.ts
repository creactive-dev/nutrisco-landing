// ============================================================
// MEDICIÓN — lo que viaja con cada envío a la app
//
// El píxel del navegador cuenta menos de lo que pasa: bloqueadores, el
// navegador de Instagram, gente que cierra antes de que cargue. La app va a
// mandar los mismos eventos por la API de Conversiones desde el servidor, y
// Meta los junta con los del píxel por `event_id`. Para eso la app necesita,
// junto con el correo, el mismo `event_id` que usó el píxel y las huellas del
// clic (`_fbp`, `_fbc`, UTM). Todo eso se arma acá.
//
// Sin dependencias y sin tirar nunca: la medición no puede romper un checkout.
// ============================================================

export interface Utm {
  source: string
  medium: string
  campaign: string
  content: string
  term: string
}

export interface Tracking {
  event_id: string
  fbp: string | null
  fbc: string | null
  source_url: string
  utm: Utm
}

interface PrimeraVisita {
  utm: Utm
  fbclid: string | null
  /** Cuándo se vio el fbclid por primera vez, en ms. Es parte del formato de `_fbc`. */
  visto: number
}

const CLAVE_PRIMERA_VISITA = "nutrico_primera_visita"
const CAMPOS_UTM = ["source", "medium", "campaign", "content", "term"] as const

function utmVacio(): Utm {
  return { source: "", medium: "", campaign: "", content: "", term: "" }
}

function utmDesdeUrl(url: URL): Utm {
  const utm = utmVacio()
  for (const campo of CAMPOS_UTM) utm[campo] = url.searchParams.get(`utm_${campo}`) ?? ""
  return utm
}

function tieneAlgo(utm: Utm): boolean {
  return CAMPOS_UTM.some((campo) => utm[campo] !== "")
}

function urlActual(): URL | null {
  if (typeof window === "undefined") return null
  try {
    return new URL(window.location.href)
  } catch {
    return null
  }
}

function leerPrimeraVisita(): PrimeraVisita | null {
  try {
    const crudo = window.sessionStorage.getItem(CLAVE_PRIMERA_VISITA)
    if (!crudo) return null
    const valor = JSON.parse(crudo) as PrimeraVisita
    if (!valor || typeof valor !== "object" || !valor.utm) return null
    return valor
  } catch {
    return null
  }
}

/**
 * Guarda los UTM y el fbclid con que llegó la persona. Se llama al montar la
 * página. Un anuncio trae `?utm_source=...&fbclid=...`, pero basta con que la
 * persona toque un ancla o vuelva de Mercado Pago para que la URL ya no los
 * tenga, y la venta quedaría sin campaña.
 *
 * Solo guarda si la URL trae algo y si no había nada guardado: gana el primer
 * clic con datos de la sesión, no la última recarga pelada.
 */
export function guardarPrimeraVisita(): void {
  const url = urlActual()
  if (!url) return
  try {
    if (leerPrimeraVisita()) return
    const utm = utmDesdeUrl(url)
    const fbclid = url.searchParams.get("fbclid")
    if (!tieneAlgo(utm) && !fbclid) return
    const visita: PrimeraVisita = { utm, fbclid, visto: Date.now() }
    window.sessionStorage.setItem(CLAVE_PRIMERA_VISITA, JSON.stringify(visita))
  } catch {
    /* sessionStorage bloqueado: se usa lo que traiga la URL del momento */
  }
}

function leerCookie(nombre: string): string | null {
  if (typeof document === "undefined") return null
  try {
    for (const par of document.cookie.split(";")) {
      const [clave, ...resto] = par.trim().split("=")
      if (clave === nombre) {
        const valor = decodeURIComponent(resto.join("="))
        return valor || null
      }
    }
  } catch {
    /* cookies no disponibles */
  }
  return null
}

/** La cookie de navegador del píxel. Null si el píxel no cargó. */
export function leerFbp(): string | null {
  return leerCookie("_fbp")
}

/**
 * La huella del clic en el anuncio. Si el píxel cargó, está en la cookie
 * `_fbc`. Si no cargó (bloqueador, navegador de Instagram), se arma igual que
 * la arma Meta: `fb.1.<ms en que se vio>.<fbclid>`. El fbclid de la URL actual
 * manda sobre el guardado, porque es el clic más reciente.
 */
export function leerFbc(): string | null {
  const cookie = leerCookie("_fbc")
  if (cookie) return cookie

  const url = urlActual()
  const primera = typeof window === "undefined" ? null : leerPrimeraVisita()
  const enUrl = url?.searchParams.get("fbclid") ?? null

  if (enUrl) {
    const visto = primera?.fbclid === enUrl ? primera.visto : Date.now()
    return `fb.1.${visto}.${enUrl}`
  }
  if (primera?.fbclid) return `fb.1.${primera.visto}.${primera.fbclid}`
  return null
}

/** Los UTM de la primera visita con datos; si no hay, los de la URL actual. */
export function leerUtm(): Utm {
  const primera = typeof window === "undefined" ? null : leerPrimeraVisita()
  if (primera && tieneAlgo(primera.utm)) return { ...utmVacio(), ...primera.utm }
  const url = urlActual()
  return url ? utmDesdeUrl(url) : utmVacio()
}

/**
 * Un identificador por evento. `crypto.randomUUID` no existe en navegadores
 * viejos ni fuera de https, y el navegador de Instagram en iPhone antiguos es
 * justo por donde entra la pauta: se arma a mano con `getRandomValues`, y si
 * tampoco está, con `Math.random`. Para deduplicar alcanza.
 */
export function nuevoEventId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID()
    }
  } catch {
    /* sigue abajo */
  }
  const bytes = new Uint8Array(16)
  try {
    crypto.getRandomValues(bytes)
  } catch {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256)
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

/** Todo lo que acompaña un envío a la app, con un `event_id` ya decidido. */
export function armarTracking(eventId: string): Tracking {
  return {
    event_id: eventId,
    fbp: leerFbp(),
    fbc: leerFbc(),
    source_url: typeof window === "undefined" ? "" : window.location.href,
    utm: leerUtm(),
  }
}

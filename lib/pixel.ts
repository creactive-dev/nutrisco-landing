// ============================================================
// MEDICIÓN — Meta Pixel
//
// La página nunca tuvo píxel. Sin él Meta cuenta menos ventas de las que
// ocurren y optimiza con datos incompletos: en la campaña del Reto subcontó un
// 36% de las ventas reales, medidas contra la pasarela.
//
// El ID vive en una variable de entorno y no en el código: si algún día hay que
// cambiarlo o apagarlo, es una variable en Vercel y no un deploy. Cuando no
// está definida, todas las funciones de acá no hacen nada, que es lo correcto
// en desarrollo y en previews.
// ============================================================

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ""

type Fbq = (
  comando: "init" | "track" | "trackCustom",
  evento: string,
  parametros?: Record<string, unknown>
) => void

declare global {
  interface Window {
    fbq?: Fbq
  }
}

/**
 * Manda un evento estándar. Silencioso a propósito: la medición no puede
 * romper la página ni bloquear un checkout. Si el bloqueador de anuncios del
 * visitante se comió el script, `window.fbq` no existe y acá no pasa nada.
 */
export function track(evento: string, parametros?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return
  try {
    window.fbq("track", evento, parametros)
  } catch {
    /* la medición nunca interrumpe */
  }
}

/** Alguien miró la oferta del programa. */
export function verOferta(cohorte: string, precio: number) {
  track("ViewContent", {
    content_name: "Programa Prepara tu Verano",
    content_ids: [cohorte],
    content_type: "product",
    value: precio,
    currency: "CLP",
  })
}

/**
 * Alguien apretó el botón de pagar y se va a Mercado Pago. Es el evento que
 * más importa mientras el checkout siga rechazando: la distancia entre esto y
 * la venta real es exactamente lo que el antifraude se está comiendo.
 */
export function iniciarCheckout(cohorte: string, precio: number) {
  track("InitiateCheckout", {
    content_name: "Programa Prepara tu Verano",
    content_ids: [cohorte],
    content_type: "product",
    value: precio,
    currency: "CLP",
  })
}

/** Alguien dejó su correo para el grupo del mes siguiente. */
export function anotarseEnListaEspera(cohorte: string) {
  track("Lead", {
    content_name: "Lista de espera Prepara tu Verano",
    content_ids: [cohorte],
  })
}

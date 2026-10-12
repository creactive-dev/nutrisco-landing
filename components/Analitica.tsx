"use client"

import { Analytics } from "@vercel/analytics/next"
import { urlSinDatosPersonales } from "@/lib/medicion"

/**
 * Vercel Web Analytics en todas las páginas (diseño C2 §9.10). Sin cookies.
 * Antes de mandar cada visita, la URL pierde todo lo que no sea UTM o fbclid.
 * Es componente de cliente porque `beforeSend` es una función.
 */
export function Analitica() {
  return <Analytics beforeSend={(evento) => ({ ...evento, url: urlSinDatosPersonales(evento.url) })} />
}

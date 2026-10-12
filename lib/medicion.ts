// ============================================================
// MEDICIÓN PROPIA · Vercel Web Analytics
//
// El píxel del navegador casi no ve el tráfico de correo ni de WhatsApp
// (auditoría de la C2, §2.3). Vercel Web Analytics suma las visitas por
// página, sin cookies. En el plan Hobby solo se guardan las visitas; el origen
// de cada venta se lee en `suscripciones.tracking`.
//
// Nunca datos de la persona: un link del CRM puede traer el correo o el id del
// contacto en la query, y esa URL no puede viajar a la analítica.
// ============================================================

/**
 * La URL que viaja a Vercel, solo con los UTM y el fbclid (mismo criterio que
 * `urlSinDatosPersonales` de la app, en `src/lib/meta/capi.ts`).
 */
export function urlSinDatosPersonales(url: string): string {
  try {
    const original = new URL(url)
    const limpia = new URL(`${original.origin}${original.pathname}`)
    original.searchParams.forEach((valor, clave) => {
      if (clave.startsWith("utm_") || clave === "fbclid") limpia.searchParams.set(clave, valor)
    })
    return limpia.toString()
  } catch {
    return url
  }
}

import type { Metadata } from "next"

/**
 * `NEXT_PUBLIC_NOINDEX=1` saca la página de los buscadores. Es para la URL de
 * revisión pública que se le manda a Constanza: sin esto Google puede indexar
 * una preview y competir con la portada real. Como toda variable NEXT_PUBLIC_,
 * se fija al construir: tiene que estar definida en el entorno del build de esa
 * URL, no basta con agregarla después.
 */
export const ROBOTS: Metadata["robots"] =
  process.env.NEXT_PUBLIC_NOINDEX === "1"
    ? { index: false, follow: false }
    : { index: true, follow: true }

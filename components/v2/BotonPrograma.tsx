"use client"

import { PORTADA } from "@/lib/constants-programa"
import { useVenta } from "@/components/v2/VentaProvider"

/**
 * El botón de acción de la portada.
 *
 * Con la venta abierta abre el checkout directo, sin pasar por la sección del
 * precio: en móvil, quien toca "Quiero entrar" desde el hero ya decidió, y cada
 * scroll de más es una oportunidad de irse. El precio y lo que incluye están en
 * el mismo formulario.
 *
 * En cualquier otro estado lleva a `#precio`, donde está la lista de espera o
 * el contacto. Nunca queda un botón que no hace nada.
 */
export function BotonPrograma({
  className,
  corto = false,
  texto,
}: {
  className: string
  corto?: boolean
  /** Texto fijo para la venta abierta (ej. el cierre de la página). */
  texto?: string
}) {
  const { estado, abrirCheckout } = useVenta()
  const flecha = <span aria-hidden="true">↗</span>

  if (estado === "abierta") {
    return (
      <button type="button" className={className} onClick={abrirCheckout}>
        {texto ?? (corto ? PORTADA.cta.abiertaCorto : PORTADA.cta.abierta)} {flecha}
      </button>
    )
  }

  const etiqueta =
    estado === "proxima"
      ? corto
        ? PORTADA.cta.proximaCorto
        : PORTADA.cta.proxima
      : corto
        ? PORTADA.cta.neutralCorto
        : PORTADA.cta.neutral

  return (
    <a href="#precio" className={className}>
      {etiqueta} {flecha}
    </a>
  )
}

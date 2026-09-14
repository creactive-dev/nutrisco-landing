"use client"

import { useEffect, useState } from "react"
import { PORTADA } from "@/lib/constants-programa"
import { diaMesCorto, formatCLP } from "@/lib/programa"
import { useVenta } from "@/components/v2/VentaProvider"
import { BotonPrograma } from "@/components/v2/BotonPrograma"

/**
 * CTA fijo abajo en móvil (el CSS lo esconde en escritorio). Se retira cuando
 * la tarjeta de la oferta está en pantalla, para no tapar el botón de verdad
 * con una copia de sí mismo.
 */
export function CtaMovil() {
  const { estado, cohorte, venta } = useVenta()
  const [oculto, setOculto] = useState(false)

  useEffect(() => {
    const tarjeta = document.getElementById("oferta-tarjeta")
    if (!tarjeta || !("IntersectionObserver" in window)) return
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) setOculto(e.isIntersecting)
    })
    obs.observe(tarjeta)
    return () => obs.disconnect()
  }, [])

  let principal: string
  let secundario: string
  if (estado === "abierta" && cohorte) {
    principal = formatCLP(cohorte.precio)
    secundario = "Pago único · 3 meses"
  } else if (estado === "proxima" && venta.estado === "proxima") {
    principal = `Abren el ${diaMesCorto(venta.cohorte.venta_abre)}`
    secundario = `${formatCLP(venta.cohorte.precio)} · pago único`
  } else if (estado === "cerro") {
    principal = "Cerraron"
    secundario = "Te avisamos del próximo grupo"
  } else {
    principal = "Prepara tu Verano"
    secundario = "3 meses · un solo pago"
  }

  return (
    <div className={`mobile-cta${oculto ? " is-hidden" : ""}`} aria-label="Inscripción al programa">
      <div>
        <strong>{principal}</strong>
        <span>{secundario}</span>
      </div>
      <BotonPrograma className="button primary" corto />
    </div>
  )
}

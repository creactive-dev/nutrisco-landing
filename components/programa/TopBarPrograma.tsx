"use client"

import { useState } from "react"
import { Sparkles, X } from "lucide-react"
import { diaMesCorto, diaSemanaYFecha, type EstadoVenta } from "@/lib/programa"

/**
 * La barra de arriba dice el estado real de la venta, leído de la fila.
 *
 * La versión anterior de esta barra decía "Apertura vie 5 jun · 9 AM · Solo 50
 * cupos fundadoras" y llevaba casi tres meses anunciando algo que ya había
 * pasado, porque el texto estaba escrito a mano en un archivo.
 */
export function TopBarPrograma({ venta }: { venta: EstadoVenta }) {
  const [cerrada, setCerrada] = useState(false)
  if (cerrada) return null

  let largo: string
  let corto: string

  if (venta.estado === "abierta") {
    largo = `Inscripciones abiertas hasta el ${diaSemanaYFecha(venta.cohorte.venta_cierra)}`
    corto = `Cierra el ${diaMesCorto(venta.cohorte.venta_cierra)}`
  } else if (venta.estado === "proxima") {
    largo = `Las inscripciones abren el ${diaSemanaYFecha(venta.cohorte.venta_abre)}`
    corto = `Abren el ${diaMesCorto(venta.cohorte.venta_abre)}`
  } else {
    // Sin cohorte que anunciar, la barra no inventa una fecha: no aparece.
    return null
  }

  return (
    <div
      role="region"
      aria-label="Estado de las inscripciones"
      className="sticky top-0 z-[60] overflow-hidden text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-sandia via-[#E73D4D] to-sandia"
      />
      <div className="relative z-10 flex h-10 items-center justify-center gap-2 px-3 text-[11.5px] md:gap-2.5 md:text-[13px]">
        <Sparkles size={12} aria-hidden="true" className="hidden shrink-0 animate-pulse-soft text-white/95 sm:inline-block" />
        <span className="hidden font-medium tracking-tight sm:inline">{largo}</span>
        <span className="whitespace-nowrap font-medium tracking-tight sm:hidden">{corto}</span>
        <a
          href="#precio"
          className="ml-1 inline-flex items-center gap-1 whitespace-nowrap font-semibold underline decoration-white/60 underline-offset-2 transition-all hover:decoration-white md:ml-2"
        >
          {venta.estado === "abierta" ? "Quiero entrar" : "Avísenme"}
          <span aria-hidden="true">→</span>
        </a>
        <button
          type="button"
          onClick={() => setCerrada(true)}
          aria-label="Cerrar anuncio"
          className="ml-1 shrink-0 rounded-full p-1 transition-colors hover:bg-white/15 md:ml-2"
        >
          <X size={13} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

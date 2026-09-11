"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { PROGRAMA } from "@/lib/constants-programa"
import { MeshAurora } from "@/components/ui/MeshAurora"
import { CuentaRegresiva } from "@/components/programa/CuentaRegresiva"
import {
  diaMesCorto,
  formatCLP,
  ultimoDiaDelPrograma,
  type EstadoVenta,
} from "@/lib/programa"

export function CTAFinalPrograma({ venta }: { venta: EstadoVenta }) {
  const abierta = venta.estado === "abierta"
  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null

  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <MeshAurora variant="dark" blobs grain />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-section-mobile text-white md:text-section">
          {PROGRAMA.ctaFinal.h2}
          <br />
          <span className="bg-gradient-warm bg-clip-text text-transparent">
            {PROGRAMA.ctaFinal.h2b}
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/70">
          {PROGRAMA.ctaFinal.body}
        </p>

        {cohorte && (
          <p className="mt-6 text-sm text-white/60">
            {diaMesCorto(cohorte.fecha_inicio)} al {ultimoDiaDelPrograma(cohorte.fecha_fin)}
            {abierta && <> · {formatCLP(cohorte.precio)} pago único</>}
          </p>
        )}

        {abierta && cohorte && (
          <div className="mt-8 flex justify-center">
            <CuentaRegresiva
              hasta={cohorte.venta_cierra}
              etiqueta="para que cierren las inscripciones"
              tone="oscuro"
            />
          </div>
        )}

        <div className="mt-9">
          <a
            href="#precio"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-warm px-7 py-4 text-base font-semibold text-white shadow-glow-sandia transition-all duration-250 hover:shadow-[0_0_0_1px_rgba(233,69,85,0.24),0_12px_36px_-4px_rgba(233,69,85,0.40)]"
          >
            {abierta ? PROGRAMA.hero.ctaAbierta : PROGRAMA.hero.ctaProxima}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

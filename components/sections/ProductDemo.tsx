"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PRODUCT_DEMO } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

export function ProductDemo() {
  const [activeIdx, setActiveIdx] = useState(0)
  const screens = PRODUCT_DEMO.staticScreens
  const active = screens[activeIdx]

  const prev = () => setActiveIdx((i) => (i - 1 + screens.length) % screens.length)
  const next = () => setActiveIdx((i) => (i + 1) % screens.length)

  return (
    <section
      aria-label="Demo del producto"
      className="relative overflow-hidden py-20 px-5 md:py-28 md:px-8 bg-surface-low"
    >
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-50" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex mb-5">
          <Eyebrow tone="celeste">{PRODUCT_DEMO.eyebrow}</Eyebrow>
        </div>
        <h2 className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]">
          Tu plan, listo en{" "}
          <span className="text-gradient-warm">24 horas</span>.
        </h2>
        <p className="text-[1rem] md:text-[1.0625rem] text-text-muted mt-5 max-w-xl mx-auto leading-relaxed">
          Estas son las pantallas reales que vas a ver. Sin filtros, sin
          renders — la app que estamos lanzando el 5 de junio.
        </p>
      </motion.div>

      {/* Carrusel de screens reales */}
      <motion.div
        className="relative z-10 max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Halo glow detrás */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-warm-cool opacity-30 blur-[80px] pointer-events-none"
        />

        {/* iPhone frame con screen real */}
        <div className="relative bg-text-dark rounded-[2.5rem] p-3 shadow-glass ring-1 ring-white/10">
          {/* Notch */}
          <div
            aria-hidden="true"
            className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-text-dark rounded-b-2xl z-30"
          />
          <div className="relative aspect-[9/19] w-full bg-surface-low rounded-[2rem] overflow-hidden">
            {screens.map((screen, idx) => (
              <div
                key={screen.src}
                className={[
                  "absolute inset-0 transition-opacity duration-500 ease-out",
                  idx === activeIdx ? "opacity-100" : "opacity-0",
                ].join(" ")}
                aria-hidden={idx !== activeIdx}
              >
                <Image
                  src={screen.src}
                  alt={`App Nutrico — ${screen.label}`}
                  fill
                  sizes="(min-width: 768px) 400px, 90vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Label flotante step */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-strong rounded-full px-4 py-2 flex items-center gap-2">
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-sandia animate-pulse-soft"
          />
          <span className="text-[12px] font-semibold text-text-dark">
            {active.label}
          </span>
          <span className="text-[10px] text-text-muted">· {active.step}</span>
        </div>
      </motion.div>

      {/* Controles + indicadores */}
      <div className="relative z-10 mt-14 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Pantalla anterior"
          className="glass-pill rounded-full p-2.5 hover:-translate-y-0.5 transition-transform"
        >
          <ChevronLeft size={18} className="text-text-dark" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Pantallas">
          {screens.map((s, idx) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={idx === activeIdx}
              aria-label={`Ir a ${s.label}`}
              onClick={() => setActiveIdx(idx)}
              className={[
                "h-2 rounded-full transition-all duration-300",
                idx === activeIdx
                  ? "w-8 bg-gradient-warm"
                  : "w-2 bg-text-dark/15 hover:bg-text-dark/30",
              ].join(" ")}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Pantalla siguiente"
          className="glass-pill rounded-full p-2.5 hover:-translate-y-0.5 transition-transform"
        >
          <ChevronRight size={18} className="text-text-dark" aria-hidden="true" />
        </button>
      </div>

      <p className="text-[12px] text-text-muted text-center mt-6">
        Pantallas reales de la app · capturas de QA · 28 de mayo 2026
      </p>
    </section>
  )
}

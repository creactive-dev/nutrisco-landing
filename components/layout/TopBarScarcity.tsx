"use client"

import { useState } from "react"
import { X, Sparkles } from "lucide-react"
import { TOP_BAR_SCARCITY } from "@/lib/constants"

export function TopBarScarcity() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      role="region"
      aria-label="Anuncio de apertura · cupos limitados"
      className="sticky top-0 z-[60] overflow-hidden text-white"
    >
      {/* Background con gradient + shimmer sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-sandia via-[#E73D4D] to-sandia"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="relative z-10 h-10 flex items-center justify-center px-3 text-[11.5px] md:text-[13px] gap-2 md:gap-2.5">
        <Sparkles
          size={12}
          className="text-white/95 flex-shrink-0 animate-pulse-soft hidden xs:inline-block sm:inline-block"
          aria-hidden="true"
        />

        {/* Desktop message */}
        <span className="hidden sm:inline font-medium tracking-tight">
          {TOP_BAR_SCARCITY.message}
        </span>

        {/* Mobile message — copy más corto */}
        <span className="sm:hidden font-medium tracking-tight whitespace-nowrap">
          {TOP_BAR_SCARCITY.messageMobile}
        </span>

        <a
          href={TOP_BAR_SCARCITY.ctaHref}
          className="ml-1 md:ml-2 inline-flex items-center gap-1 underline decoration-white/60 underline-offset-2 font-semibold hover:decoration-white transition-all whitespace-nowrap"
        >
          <span className="hidden xs:inline sm:inline">{TOP_BAR_SCARCITY.cta}</span>
          <span className="xs:hidden sm:hidden">Reservar</span>
          <span aria-hidden="true">→</span>
        </a>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Cerrar anuncio"
          className="ml-1 md:ml-2 p-1 rounded-full hover:bg-white/15 transition-colors flex-shrink-0"
        >
          <X size={13} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

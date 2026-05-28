"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { TOP_BAR_SCARCITY } from "@/lib/constants"

export function TopBarScarcity() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      role="region"
      aria-label="Anuncio de apertura · cupos limitados"
      className="bg-sandia text-white sticky top-0 z-[60] h-9 flex items-center justify-center text-[12px] md:text-[13px] px-3"
    >
      <span aria-hidden="true" className="mr-2 text-white/80">
        ▸
      </span>

      {/* Desktop message */}
      <span className="hidden sm:inline">{TOP_BAR_SCARCITY.message}</span>

      {/* Mobile message — copy más corto */}
      <span className="sm:hidden">{TOP_BAR_SCARCITY.messageMobile}</span>

      <a
        href={TOP_BAR_SCARCITY.ctaHref}
        className="ml-3 underline font-semibold hover:text-white/90 transition-colors"
      >
        {TOP_BAR_SCARCITY.cta} →
      </a>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Cerrar anuncio"
        className="ml-3 p-0.5 rounded-full hover:bg-white/10 transition-colors"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  )
}

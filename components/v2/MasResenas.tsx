"use client"

import { useState, type ReactNode } from "react"

/**
 * La grilla de reseñas. En escritorio se ven todas; en celular, las primeras
 * cuatro y un botón para ver el resto: nueve tarjetas apiladas eran casi dos
 * pantallas de texto antes de llegar al precio. El CSS decide qué se esconde
 * (`.quote-grid:not(.todas)`), así que sin JavaScript se ven todas.
 */
export function MasResenas({ total, children }: { total: number; children: ReactNode }) {
  const [todas, setTodas] = useState(false)
  const ocultas = Math.max(0, total - 4)
  return (
    <>
      <div className={`quote-grid${todas ? " todas" : ""}`} id="resenas-lista">
        {children}
      </div>
      {ocultas > 0 && !todas && (
        <button
          type="button"
          className="resenas-mas"
          aria-controls="resenas-lista"
          aria-expanded={todas}
          onClick={() => setTodas(true)}
        >
          Ver {ocultas} reseñas más
        </button>
      )}
    </>
  )
}

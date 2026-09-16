"use client"

import { useEffect, useState } from "react"

/**
 * El movimiento de la página (teléfono y notas flotando, entradas al hacer
 * scroll) y el botón para pausarlo.
 *
 * Respeta `prefers-reduced-motion` sin que nadie toque nada, y además deja
 * pausarlo a mano: hay gente a la que el movimiento marea y no sabe que existe
 * esa preferencia del sistema.
 */
export function Movimiento() {
  const [pausaManual, setPausaManual] = useState(false)
  const [reducido, setReducido] = useState(false)

  useEffect(() => {
    const raiz = document.documentElement
    if ("IntersectionObserver" in window) raiz.classList.add("js-motion")

    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sincronizar = () => setReducido(consulta.matches)
    sincronizar()
    consulta.addEventListener?.("change", sincronizar)
    return () => {
      consulta.removeEventListener?.("change", sincronizar)
      raiz.classList.remove("js-motion", "paused-motion")
    }
  }, [])

  const pausado = pausaManual || reducido

  useEffect(() => {
    document.documentElement.classList.toggle("paused-motion", pausado)
  }, [pausado])

  const etiqueta = pausado ? "Activar movimiento" : "Pausar movimiento"

  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={pausado}
      aria-label={etiqueta}
      title={etiqueta}
      onClick={() => setPausaManual((actual) => !actual)}
    >
      <span aria-hidden="true">{pausado ? "▷" : "Ⅱ"}</span>
    </button>
  )
}

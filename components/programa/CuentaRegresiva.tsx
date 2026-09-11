"use client"

import { useEffect, useState } from "react"
import { faltanteHasta } from "@/lib/programa"

type Props = {
  /** Instante al que se cuenta, en ISO. */
  hasta: string
  /** Qué pasa en ese instante. Ej: "para que cierren las inscripciones". */
  etiqueta: string
  tone?: "claro" | "oscuro"
}

/**
 * Cuenta regresiva al cierre de inscripciones.
 *
 * Arranca en null y solo calcula después de montar. Es a propósito: el servidor
 * renderiza en UTC y en un instante distinto al del navegador, así que calcular
 * en el servidor produce un desajuste de hidratación y un parpadeo con números
 * que no coinciden. Mientras no hay valor reserva el alto, para que la página
 * no salte cuando aparece.
 *
 * Cuando el instante ya pasó, `faltanteHasta` devuelve null y esto desaparece
 * en vez de mostrar números negativos.
 */
export function CuentaRegresiva({ hasta, etiqueta, tone = "claro" }: Props) {
  const [falta, setFalta] = useState<ReturnType<typeof faltanteHasta>>(null)
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    setMontado(true)
    const tick = () => setFalta(faltanteHasta(hasta))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [hasta])

  if (montado && !falta) return null

  const celdas = [
    { valor: falta?.dias, sufijo: "días" },
    { valor: falta?.horas, sufijo: "horas" },
    { valor: falta?.minutos, sufijo: "min" },
    { valor: falta?.segundos, sufijo: "seg" },
  ]

  const esOscuro = tone === "oscuro"

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 md:gap-3" suppressHydrationWarning>
        {celdas.map((celda) => (
          <div
            key={celda.sufijo}
            className={[
              "flex min-w-[58px] md:min-w-[68px] flex-col items-center rounded-2xl px-2.5 py-2 md:px-3 md:py-2.5",
              esOscuro
                ? "bg-white/10 ring-1 ring-white/15"
                : "glass ring-1 ring-black/5",
            ].join(" ")}
          >
            <span
              className={[
                "font-serif text-2xl md:text-3xl font-bold tabular-nums leading-none",
                esOscuro ? "text-white" : "text-text-dark",
              ].join(" ")}
            >
              {celda.valor === undefined ? "--" : String(celda.valor).padStart(2, "0")}
            </span>
            <span
              className={[
                "mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.1em]",
                esOscuro ? "text-white/60" : "text-text-muted",
              ].join(" ")}
            >
              {celda.sufijo}
            </span>
          </div>
        ))}
      </div>
      <span
        className={[
          "text-[11px] md:text-xs tracking-wide",
          esOscuro ? "text-white/70" : "text-text-muted",
        ].join(" ")}
      >
        {etiqueta}
      </span>
    </div>
  )
}

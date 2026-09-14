"use client"

import { useEffect, useState } from "react"
import { faltanteHasta } from "@/lib/programa"

/**
 * Cuenta regresiva al cierre de inscripciones, con el formato de la v2 (días,
 * horas, minutos).
 *
 * Arranca sin valor y calcula recién al montar: el servidor renderiza en UTC y
 * en otro instante que el navegador, así que calcular allá produce un desajuste
 * de hidratación y números que saltan. Mientras tanto muestra "--" y reserva el
 * alto. Cuando el instante pasa desaparece, en vez de mostrar ceros o negativos:
 * el cierre real lo decide la app, que responde 409 y la página pasa sola a
 * lista de espera.
 */
export function CuentaAtras({ hasta, titulo }: { hasta: string; titulo: string }) {
  const [falta, setFalta] = useState<ReturnType<typeof faltanteHasta>>(null)
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    setMontado(true)
    const tick = () => setFalta(faltanteHasta(hasta))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [hasta])

  if (montado && !falta) return null

  const dos = (valor: number | undefined) =>
    valor === undefined ? "--" : String(valor).padStart(2, "0")

  return (
    <>
      <span>{titulo}</span>
      <div className="countdown" role="timer" aria-label="Tiempo hasta el cierre de inscripciones">
        <span>
          <b>{dos(falta?.dias)}</b>
          <small>DÍAS</small>
        </span>
        <i aria-hidden="true">:</i>
        <span>
          <b>{dos(falta?.horas)}</b>
          <small>HORAS</small>
        </span>
        <i aria-hidden="true">:</i>
        <span>
          <b>{dos(falta?.minutos)}</b>
          <small>MINUTOS</small>
        </span>
      </div>
    </>
  )
}

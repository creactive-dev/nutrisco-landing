"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CalendarClock, CheckCircle2 } from "lucide-react"
import { PROGRAMA } from "@/lib/constants-programa"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { anotarseEnListaEspera } from "@/lib/pixel"
import { APP_URL, diaSemanaYFecha, type EstadoVenta } from "@/lib/programa"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Lo que ve alguien que llega fuera de la ventana de venta.
 *
 * No es una puerta cerrada a propósito: la pauta corre los 30 días del mes y la
 * ventana dura una semana, así que la mayor parte del tráfico pagado aterriza
 * acá. Cerrar con un "vuelve el lunes" sería tirar ese presupuesto.
 */
export function ListaEspera({ venta }: { venta: EstadoVenta }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)
  const [listo, setListo] = useState(false)

  const cohorte =
    venta.estado === "proxima" || venta.estado === "abierta" ? venta.cohorte : null
  const slug = cohorte?.slug ?? null

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    const limpio = email.trim()
    if (!EMAIL_REGEX.test(limpio)) {
      setError("Revisa tu correo, parece que falta algo")
      return
    }
    if (!slug) {
      setError("Justo ahora no podemos anotarte. Escríbenos por WhatsApp y lo hacemos nosotros.")
      return
    }
    setError(null)
    setCargando(true)
    try {
      const res = await fetch(`${APP_URL}/api/programa/lista-espera`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: limpio, cohorte_slug: slug }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? "No pudimos anotarte")
      }
      anotarseEnListaEspera(slug)
      setListo(true)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No pudimos anotarte. Inténtalo de nuevo."
      )
    } finally {
      setCargando(false)
    }
  }

  return (
    <section id="precio" className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow tone="celeste">{PROGRAMA.listaEspera.eyebrow}</Eyebrow>
        <h2 className="mt-5 font-serif text-section-mobile text-text-dark md:text-section">
          {PROGRAMA.listaEspera.h2}
        </h2>

        {venta.estado === "proxima" && (
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl glass px-4 py-2.5">
            <CalendarClock className="h-4 w-4 shrink-0 text-celeste-600" />
            <span className="text-sm text-text-dark">
              Abren el{" "}
              <span className="font-semibold">{diaSemanaYFecha(venta.cohorte.venta_abre)}</span>
            </span>
          </div>
        )}

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-text-muted">
          {PROGRAMA.listaEspera.body}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass-strong mx-auto mt-9 max-w-md rounded-4xl p-6 md:p-8"
        >
          {listo ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <CheckCircle2 className="h-10 w-10 text-celeste-600" />
              <p className="text-base font-medium text-text-dark">
                {PROGRAMA.listaEspera.exito}
              </p>
            </div>
          ) : (
            <form onSubmit={enviar} className="space-y-4">
              <label htmlFor="email-espera" className="sr-only">
                Tu correo
              </label>
              <input
                id="email-espera"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(null)
                }}
                placeholder="tu@correo.cl"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "error-espera" : undefined}
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-base text-text-dark outline-none transition-colors placeholder:text-text-muted/60 focus:border-celeste-400 focus:ring-2 focus:ring-celeste-200"
              />
              <button
                type="submit"
                disabled={cargando}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-warm px-6 py-4 text-base font-semibold text-white shadow-glow-sandia transition-all duration-250 hover:shadow-[0_0_0_1px_rgba(233,69,85,0.24),0_12px_36px_-4px_rgba(233,69,85,0.40)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cargando ? PROGRAMA.listaEspera.ctaCargando : PROGRAMA.listaEspera.cta}
                {!cargando && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
              {error && (
                <p role="alert" className="text-sm text-sandia-600">
                  {error}
                </p>
              )}
              <p className="text-[12px] text-text-muted">
                Te escribimos una vez, cuando abran. Nada más.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

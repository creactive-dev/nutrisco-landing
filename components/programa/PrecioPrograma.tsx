"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Info, Lock, Receipt, X } from "lucide-react"
import { PROGRAMA } from "@/lib/constants-programa"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { CuentaRegresiva } from "@/components/programa/CuentaRegresiva"
import { ListaEspera } from "@/components/programa/ListaEspera"
import { iniciarCheckout } from "@/lib/pixel"
import { APP_URL, formatCLP, ultimoDiaDeVenta, type EstadoVenta } from "@/lib/programa"

const LEGAL_CONSENT_STORAGE_KEY = "nutrico_legal_consent"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function PrecioPrograma({ venta }: { venta: EstadoVenta }) {
  const [email, setEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState<string | null>(null)
  const [acepta, setAcepta] = useState(false)
  const [tiembla, setTiembla] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null)
  // Si la venta se cierra mientras alguien tenía la página abierta, el endpoint
  // responde 409 y pasamos a lista de espera sin recargar ni perder el correo
  // que ya escribió.
  const [cerroEnVivo, setCerroEnVivo] = useState(false)

  const abierta = venta.estado === "abierta" && !cerroEnVivo

  // Fuera de ventana la página captura el correo en vez de mostrar una puerta
  // cerrada. La pauta corre los 30 días y no puede caer en un muro.
  if (!abierta) {
    return <ListaEspera venta={venta} />
  }

  const cohorte = venta.cohorte

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setErrorEnvio(null)

    if (!acepta) {
      setTiembla(true)
      setTimeout(() => setTiembla(false), 600)
      return
    }
    const limpio = email.trim()
    if (!EMAIL_REGEX.test(limpio)) {
      setErrorEmail("Revisa tu correo, parece que falta algo")
      return
    }
    setErrorEmail(null)

    try {
      window.localStorage.setItem(
        LEGAL_CONSENT_STORAGE_KEY,
        JSON.stringify({
          accepted_at: new Date().toISOString(),
          documents: { terminos: "v1.0", privacidad: "v3.0", aviso_datos_sensibles: "v1.0" },
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        })
      )
    } catch {
      /* almacenamiento no disponible: la aceptación queda por el click */
    }

    setCargando(true)
    try {
      const res = await fetch(`${APP_URL}/api/programa/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: limpio }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.status === 409) {
        setCerroEnVivo(true)
        return
      }
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "No pudimos iniciar tu pago")
      }

      iniciarCheckout(cohorte.slug, cohorte.precio)
      window.location.href = data.url as string
    } catch (err) {
      setErrorEnvio(
        err instanceof Error ? err.message : "No pudimos iniciar tu pago. Inténtalo de nuevo."
      )
      setCargando(false)
    }
  }

  return (
    <section id="precio" className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Eyebrow tone="sandia">{PROGRAMA.precio.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-section-mobile text-text-dark md:text-section">
            {cohorte.nombre}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass-strong mt-9 rounded-4xl p-6 md:p-10"
        >
          <div className="text-center">
            <p className="font-serif text-5xl font-bold text-text-dark md:text-6xl">
              {formatCLP(cohorte.precio)}
            </p>
            <p className="mt-2 text-sm text-text-muted">{PROGRAMA.precio.labelPrecio}</p>
            <p className="mt-1 text-sm text-text-muted">{PROGRAMA.precio.permanencia}</p>
          </div>

          <div className="mt-7 flex justify-center">
            <CuentaRegresiva
              hasta={cohorte.venta_cierra}
              etiqueta="para que cierren las inscripciones"
            />
          </div>

          <p className="mt-4 text-center text-sm text-text-muted">
            Se alcanza a entrar hasta el{" "}
            <span className="font-semibold text-text-dark">
              {ultimoDiaDeVenta(cohorte.venta_cierra)}
            </span>
            .
          </p>

          <form onSubmit={enviar} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email-programa" className="sr-only">
                Tu correo
              </label>
              <input
                id="email-programa"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errorEmail) setErrorEmail(null)
                }}
                placeholder="tu@correo.cl"
                aria-invalid={Boolean(errorEmail)}
                aria-describedby={errorEmail ? "error-email-programa" : undefined}
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-base text-text-dark outline-none transition-colors placeholder:text-text-muted/60 focus:border-celeste-400 focus:ring-2 focus:ring-celeste-200"
              />
              {errorEmail && (
                <p id="error-email-programa" className="mt-2 text-sm text-sandia-600">
                  {errorEmail}
                </p>
              )}
            </div>

            <label
              className={[
                "flex cursor-pointer items-start gap-3 rounded-2xl p-3 text-left transition-colors",
                tiembla ? "animate-shake bg-sandia-50 ring-1 ring-sandia-200" : "",
              ].join(" ")}
            >
              <input
                type="checkbox"
                checked={acepta}
                onChange={(e) => setAcepta(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-sandia"
              />
              <span className="text-[13px] leading-relaxed text-text-muted">
                {PROGRAMA.precio.consentimiento}{" "}
                <a
                  href={`${APP_URL}/terminos`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-text-muted/40 underline-offset-2 hover:text-text-dark"
                >
                  Leerlos
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={cargando}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-warm px-6 py-4 text-base font-semibold text-white shadow-glow-sandia transition-all duration-250 hover:shadow-[0_0_0_1px_rgba(233,69,85,0.24),0_12px_36px_-4px_rgba(233,69,85,0.40)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cargando ? PROGRAMA.precio.ctaCargando : PROGRAMA.precio.cta}
              {!cargando && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>

            {errorEnvio && (
              <p role="alert" className="text-center text-sm text-sandia-600">
                {errorEnvio}
              </p>
            )}
          </form>

          {/* El checkout rechaza casi la mitad de las tarjetas por antifraude y
              el saldo de Mercado Pago no rechazó ninguno de 49 intentos. Decirlo
              ANTES del pago cuesta una línea y evita una venta perdida. */}
          <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-celeste-50 p-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-celeste-600" />
            <p className="text-[13px] leading-relaxed text-text-muted">
              Si tu tarjeta te da problemas, paga con{" "}
              <span className="font-medium text-text-dark">saldo de Mercado Pago</span>. Es la vía
              que no falla, y si aun así no resulta, escríbenos y lo resolvemos contigo.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> Pago seguro con Mercado Pago
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Receipt className="h-3.5 w-3.5" /> Boleta exenta a tu nombre
            </span>
          </div>
        </motion.div>

        {/* Qué incluye y qué no, juntos, porque el "no" es lo que evita que
            alguien llegue esperando una consulta individual. */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-celeste-600">
              Incluye
            </p>
            <ul className="mt-4 space-y-3">
              {PROGRAMA.incluye.map((linea) => (
                <li key={linea.titulo} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-celeste-600" />
                  <span className="text-sm text-text-dark">{linea.titulo}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sandia-600">
              No incluye
            </p>
            <div className="mt-4 flex gap-2.5">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-sandia-600" />
              <div>
                <p className="text-sm font-medium text-text-dark">{PROGRAMA.noIncluye.titulo}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">
                  {PROGRAMA.noIncluye.detalle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

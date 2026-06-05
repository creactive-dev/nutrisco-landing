"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, Gift, CreditCard, ArrowRight, Sparkles } from "lucide-react"
import { VALUE_STACK } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.constanzanutricion.cl"
const LEGAL_CONSENT_STORAGE_KEY = "nutrico_legal_consent"

type BillingCycle = "mensual" | "trimestral" | "anual"

// Matriz canónica de precios — debe coincidir con
// app/src/lib/mercadopago/client.ts y con el RPC reservar_cohort_pendiente.
const PRECIOS: Record<"fundador" | "regular", Record<BillingCycle, number>> = {
  fundador: { mensual: 19990, trimestral: 53970, anual: 191900 },
  regular: { mensual: 24990, trimestral: 67470, anual: 239900 },
}

const CYCLE_LABEL: Record<BillingCycle, { short: string; full: string; per: string; meses: number }> = {
  mensual: { short: "Mensual", full: "Mensual", per: "/mes", meses: 1 },
  trimestral: { short: "Trimestral", full: "Trimestral", per: "/trimestre", meses: 3 },
  anual: { short: "Anual", full: "Anual", per: "/año", meses: 12 },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

function formatCLP(value: number): string {
  return `$${value.toLocaleString("es-CL")}`
}

interface Contador {
  ocupadas: number
  total: number
  disponibles: number
}

export function PrecioLas50() {
  const [cycle, setCycle] = useState<BillingCycle>("mensual")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null)
  const [accepted, setAccepted] = useState(false)
  const [shake, setShake] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [contador, setContador] = useState<Contador | null>(null)

  // Poll del contador para mostrar "Quedan X cupos" en vivo
  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(`${APP_URL}/api/contador`, { cache: "no-store" })
        if (!res.ok) return
        const data = (await res.json()) as Contador
        if (!cancelled) setContador(data)
      } catch {
        // CORS / red caída: la UI se queda en estado neutral
      }
    }
    load()
    const id = setInterval(load, 60_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  // Cohort activo: si hay cupos disponibles, fundador; si no, regular.
  // La decisión final la toma el backend (atómica), pero esta señal de UI
  // ya muestra al usuario lo que efectivamente va a pagar.
  const cohortActivo: "fundador" | "regular" =
    contador && contador.disponibles === 0 ? "regular" : "fundador"

  const precioActivo = PRECIOS[cohortActivo][cycle]
  const precioMensualBase = PRECIOS[cohortActivo].mensual
  const ahorroTrim = precioMensualBase * 3 - PRECIOS[cohortActivo].trimestral
  const ahorroAnual = precioMensualBase * 12 - PRECIOS[cohortActivo].anual
  const precioMensualEquivalente = Math.round(precioActivo / CYCLE_LABEL[cycle].meses)

  function validarEmail(value: string): string | null {
    const v = value.trim()
    if (!v) return "Ingresa tu email"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Email inválido"
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError(null)

    if (!accepted) {
      setShake(true)
      setTimeout(() => setShake(false), 600)
      return
    }

    const emailValidationError = validarEmail(email)
    if (emailValidationError) {
      setEmailError(emailValidationError)
      return
    }
    setEmailError(null)

    // Registrar consentimiento legal en localStorage (igual que antes)
    try {
      const consentRecord = {
        accepted_at: new Date().toISOString(),
        documents: {
          terminos: "v1.0",
          privacidad: "v3.0",
          aviso_datos_sensibles: "v1.0",
        },
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      }
      window.localStorage.setItem(
        LEGAL_CONSENT_STORAGE_KEY,
        JSON.stringify(consentRecord)
      )
    } catch {
      /* storage no disponible — la aceptación queda por click intencional */
    }

    setLoading(true)
    try {
      const res = await fetch(`${APP_URL}/api/suscripciones/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          billing_cycle: cycle,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error ?? "No pudimos iniciar tu pago")
      }
      if (!data.url) {
        throw new Error("No recibimos el link de pago. Inténtalo de nuevo en un momento.")
      }
      // Redirect a Mercado Pago
      window.location.href = data.url
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error inesperado"
      setSubmitError(msg)
      setLoading(false)
    }
  }

  const esFundador = cohortActivo === "fundador"
  const eyebrowText = esFundador
    ? VALUE_STACK.eyebrow
    : "Plan regular · Cupos fundadora agotados"

  return (
    <section
      id="precio"
      aria-label="Precio Las 50 Primeras"
      className="relative overflow-hidden py-20 px-5 md:py-28 md:px-8"
    >
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh" />
      <div aria-hidden="true" className="grain-subtle" />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
      >
        <motion.div variants={item} className="inline-flex mb-5">
          <Eyebrow tone="sandia">{eyebrowText}</Eyebrow>
        </motion.div>
        <motion.h2
          variants={item}
          className="font-serif font-bold text-text-dark text-[2rem] md:text-[3rem] leading-[1.1] tracking-[-0.025em]"
        >
          <span className="text-gradient-warm">{VALUE_STACK.h2[0]}</span>
          <br />
          {VALUE_STACK.h2[1]}
        </motion.h2>
      </motion.div>

      {/* Card de precio + value stack — glass strong */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          aria-hidden="true"
          className="absolute -inset-4 bg-gradient-warm-cool opacity-30 rounded-[2.5rem] blur-3xl pointer-events-none"
        />

        <div className="relative glass-strong rounded-[2rem] p-7 md:p-10 shadow-glass overflow-hidden">
          {/* Ribbon "Founder" o "Regular" */}
          <div className="absolute top-6 right-6 glass-pill rounded-full px-3 py-1.5 flex items-center gap-1.5 ring-1 ring-sandia/20">
            <Sparkles size={12} className="text-sandia" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-sandia-600 uppercase tracking-wider">
              {esFundador ? "Founder" : "Regular"}
            </span>
          </div>

          {/* Contador inline de cupos fundadora */}
          {contador && esFundador && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-sandia/10 px-3 py-1.5 ring-1 ring-sandia/20">
              <span className="h-1.5 w-1.5 rounded-full bg-sandia animate-pulse-soft" aria-hidden="true" />
              <span className="text-[12px] font-medium text-sandia-600">
                Quedan <strong className="tabular-nums">{contador.disponibles}</strong> de {contador.total} cupos fundadora
              </span>
            </div>
          )}
          {contador && !esFundador && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-text-dark/5 px-3 py-1.5 ring-1 ring-text-dark/10">
              <span className="text-[12px] font-medium text-text-muted">
                Cupos fundadora agotados — sigues con plan regular
              </span>
            </div>
          )}

          {/* Switcher mensual / trimestral / anual */}
          <div role="tablist" aria-label="Frecuencia de pago" className="grid grid-cols-3 gap-1.5 rounded-2xl bg-text-dark/[0.04] p-1 mb-6">
            {(["mensual", "trimestral", "anual"] as BillingCycle[]).map((c) => {
              const active = c === cycle
              const ahorro = c === "trimestral" ? ahorroTrim : c === "anual" ? ahorroAnual : 0
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setCycle(c)}
                  className={`relative rounded-xl py-2.5 px-2 text-[12px] md:text-[13px] font-semibold transition-all ${
                    active
                      ? "bg-white text-text-dark shadow-sm ring-1 ring-sandia/30"
                      : "text-text-muted hover:text-text-dark"
                  }`}
                >
                  <span className="block">{CYCLE_LABEL[c].short}</span>
                  {ahorro > 0 && (
                    <span className={`block text-[10px] font-medium ${active ? "text-sandia-600" : "text-text-muted/70"}`}>
                      Ahorra {formatCLP(ahorro)}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Value Stack mensual (no cambia con switcher — siempre describe el beneficio mensual) */}
          <div className="mb-1">
            <p className="text-[12px] font-medium text-text-muted uppercase tracking-wider mb-4">
              Lo que recibes cada mes
            </p>
          </div>
          <ul className="flex flex-col gap-3" aria-label="Qué incluye tu suscripción">
            {VALUE_STACK.monthlyItems.map((stackItem, i) => (
              <li
                key={i}
                className="flex items-start gap-3 justify-between border-b border-text-dark/8 last:border-0 pb-3 last:pb-0"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-celeste/10 flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-celeste-600" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="text-[14px] md:text-[15px] text-text-dark leading-snug">
                    {stackItem.label}
                  </span>
                </div>
                <span className="text-[14px] md:text-[15px] text-text-muted font-medium tabular-nums flex-shrink-0">
                  {formatCLP(stackItem.value)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 pt-5 border-t-2 border-text-dark/15 flex items-center justify-between">
            <span className="text-[15px] md:text-[16px] font-semibold text-text-dark">
              Valor total mensual
            </span>
            <span className="text-[18px] md:text-[20px] font-bold text-text-dark tabular-nums">
              {formatCLP(VALUE_STACK.monthlyTotal)}
            </span>
          </div>

          {/* Bonus stack */}
          <div className="mt-8 relative overflow-hidden rounded-3xl p-5 md:p-6 bg-gradient-to-br from-sandia/10 via-sandia/5 to-celeste/5 ring-1 ring-sandia/20">
            <div className="flex items-center gap-2 mb-4">
              <Gift size={18} className="text-sandia" aria-hidden="true" />
              <p className="text-[12px] font-semibold text-sandia-600 uppercase tracking-[0.08em]">
                {VALUE_STACK.bonusEyebrow}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {VALUE_STACK.bonusItems.map((bonus, i) => (
                <li key={i} className="flex items-start gap-3 justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span aria-hidden="true" className="flex-shrink-0 w-5 h-5 rounded-full bg-sandia/15 flex items-center justify-center mt-0.5">
                      <span className="text-sandia font-bold text-[12px]">+</span>
                    </span>
                    <span className="text-[14px] text-text-dark leading-snug">
                      {bonus.label}
                    </span>
                  </div>
                  <span className="text-[13px] text-text-muted font-medium tabular-nums flex-shrink-0">
                    {formatCLP(bonus.value)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-sandia/20 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-sandia-600">
                Valor total bonus
              </span>
              <span className="text-[15px] font-bold text-sandia-600 tabular-nums">
                {formatCLP(VALUE_STACK.bonusTotal)}
              </span>
            </div>
          </div>

          {/* Precio dinámico — depende de cycle y cohortActivo */}
          <div className="mt-8 text-center">
            <p className="text-[13px] text-text-muted mb-2">
              Valor real combinado:{" "}
              <span className="font-semibold text-text-dark line-through decoration-text-muted/40 tabular-nums">
                {formatCLP(VALUE_STACK.monthlyTotal + VALUE_STACK.bonusTotal)}
              </span>
            </p>
            <p className="text-[12px] text-text-muted">
              {esFundador ? "Tu precio fundadora hoy:" : "Tu precio hoy:"}
            </p>

            <div className="flex items-baseline justify-center gap-2 mt-2 flex-wrap">
              <span className="font-serif font-bold text-gradient-warm text-[3.5rem] md:text-[4.5rem] leading-none tabular-nums">
                {formatCLP(precioActivo)}
              </span>
              <span className="text-text-muted text-[15px] font-medium">
                {CYCLE_LABEL[cycle].per}
              </span>
            </div>

            {cycle !== "mensual" && (
              <p className="text-[13px] text-text-muted mt-2">
                Equivalente a {formatCLP(precioMensualEquivalente)}/mes
              </p>
            )}

            {esFundador && (
              <p className="text-[14px] text-text-muted mt-3">
                {VALUE_STACK.priceLabel}
              </p>
            )}
          </div>

          {/* Email input */}
          <div className="mt-6">
            <label htmlFor="precio-email" className="block text-[13px] font-medium text-text-dark mb-2">
              Tu email
            </label>
            <input
              id="precio-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError(null)
              }}
              className={`w-full rounded-2xl bg-white/70 px-4 py-3 text-[15px] text-text-dark placeholder:text-text-muted/60 ring-1 transition-all focus:outline-none focus:ring-2 focus:ring-sandia/40 ${
                emailError ? "ring-red-400" : "ring-text-dark/10"
              }`}
            />
            {emailError && (
              <p className="mt-1 text-[12px] text-red-600">{emailError}</p>
            )}
            <p className="mt-1 text-[11px] text-text-muted">
              Lo usamos para crear tu cuenta y enviarte el acceso post-pago.
            </p>
          </div>

          {/* Consentimiento legal — checkbox blocking */}
          <div
            className={`mt-6 rounded-2xl p-4 transition-all duration-200 ${
              shake ? "ring-2 ring-sandia animate-shake" : ""
            } ${accepted ? "bg-celeste/5 ring-1 ring-celeste/20" : "bg-text-dark/[0.03] ring-1 ring-text-dark/8"}`}
            aria-live="polite"
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-text-dark/30 text-sandia focus:ring-2 focus:ring-sandia/40 cursor-pointer flex-shrink-0"
                aria-describedby="legal-consent-text"
              />
              <span id="legal-consent-text" className="text-[13px] text-text-dark leading-relaxed">
                He leído y acepto los{" "}
                <a
                  href={`${APP_URL}/terminos`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sandia underline underline-offset-2 hover:opacity-80"
                  onClick={(e) => e.stopPropagation()}
                >
                  Términos y Condiciones
                </a>
                , la{" "}
                <a
                  href={`${APP_URL}/privacidad`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sandia underline underline-offset-2 hover:opacity-80"
                  onClick={(e) => e.stopPropagation()}
                >
                  Política de Privacidad
                </a>{" "}
                y el{" "}
                <a
                  href={`${APP_URL}/aviso-datos-sensibles`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sandia underline underline-offset-2 hover:opacity-80"
                  onClick={(e) => e.stopPropagation()}
                >
                  tratamiento de mis datos sensibles de salud
                </a>
                . Declaro ser mayor de 18 años.
              </span>
            </label>
          </div>

          {/* CTA — form submit */}
          <form onSubmit={handleSubmit} className="mt-5">
            {submitError && (
              <p className="mb-3 text-[13px] text-red-600 text-center">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 bg-gradient-warm text-white font-semibold rounded-full py-4 text-[17px] transition-all duration-300 text-center ${
                loading
                  ? "opacity-70 cursor-wait"
                  : "shadow-glow-sandia hover:shadow-[0_0_0_1px_rgba(233,69,85,0.24),0_18px_48px_-6px_rgba(233,69,85,0.45)] animate-breathe"
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative z-10 inline-flex items-center gap-2">
                {loading
                  ? "Preparando pago…"
                  : esFundador
                    ? "Quiero ser una de Las 50 Primeras"
                    : "Suscribirme con plan regular"}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </button>

            {!accepted && (
              <p className="text-[11px] text-sandia-600 text-center mt-2 font-medium">
                Marca la casilla de aceptación para continuar
              </p>
            )}

            <div className="flex items-center justify-center gap-1.5 mt-4">
              <CreditCard
                size={14}
                className="text-text-muted flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[12px] text-text-muted">
                Pago seguro con Mercado Pago
              </span>
            </div>

            <p className="text-[12px] text-text-muted text-center mt-3">
              {VALUE_STACK.microcopy}
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  )
}

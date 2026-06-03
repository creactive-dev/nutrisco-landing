"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Gift, CreditCard, ArrowRight, Sparkles } from "lucide-react"
import { VALUE_STACK, SITE_CONFIG } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

const APP_URL = "https://app.constanzanutricion.cl"
const LEGAL_CONSENT_STORAGE_KEY = "nutrico_legal_consent"

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

export function PrecioLas50() {
  const [accepted, setAccepted] = useState(false)
  const [shake, setShake] = useState(false)

  function handleCtaClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!accepted) {
      e.preventDefault()
      setShake(true)
      setTimeout(() => setShake(false), 600)
      return
    }
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
      window.localStorage.setItem(LEGAL_CONSENT_STORAGE_KEY, JSON.stringify(consentRecord))
    } catch {
      /* Storage no disponible — la aceptación queda registrada por el click intencional */
    }
  }

  return (
    <section
      id="precio"
      aria-label="Precio Las 50 Primeras"
      className="relative overflow-hidden py-20 px-5 md:py-28 md:px-8"
    >
      {/* Aurora mesh light */}
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
          <Eyebrow tone="sandia">{VALUE_STACK.eyebrow}</Eyebrow>
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
        {/* Halo dorado detrás de la card */}
        <div
          aria-hidden="true"
          className="absolute -inset-4 bg-gradient-warm-cool opacity-30 rounded-[2.5rem] blur-3xl pointer-events-none"
        />

        <div className="relative glass-strong rounded-[2rem] p-7 md:p-10 shadow-glass overflow-hidden">
          {/* Ribbon "founder" decorativo top-right */}
          <div className="absolute top-6 right-6 glass-pill rounded-full px-3 py-1.5 flex items-center gap-1.5 ring-1 ring-sandia/20">
            <Sparkles size={12} className="text-sandia" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-sandia-600 uppercase tracking-wider">
              Founder
            </span>
          </div>

          {/* Value Stack mensual */}
          <div className="mb-1">
            <p className="text-[12px] font-medium text-text-muted uppercase tracking-wider mb-4">
              Lo que recibes cada mes
            </p>
          </div>
          <ul
            className="flex flex-col gap-3"
            aria-label="Qué incluye tu suscripción"
          >
            {VALUE_STACK.monthlyItems.map((stackItem, i) => (
              <li
                key={i}
                className="flex items-start gap-3 justify-between border-b border-text-dark/8 last:border-0 pb-3 last:pb-0"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-celeste/10 flex items-center justify-center mt-0.5">
                    <Check
                      size={12}
                      className="text-celeste-600"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
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

          {/* Total mensual */}
          <div className="mt-5 pt-5 border-t-2 border-text-dark/15 flex items-center justify-between">
            <span className="text-[15px] md:text-[16px] font-semibold text-text-dark">
              Valor total mensual
            </span>
            <span className="text-[18px] md:text-[20px] font-bold text-text-dark tabular-nums">
              {formatCLP(VALUE_STACK.monthlyTotal)}
            </span>
          </div>

          {/* Bonus stack — glass tinted sandia */}
          <div className="mt-8 relative overflow-hidden rounded-3xl p-5 md:p-6 bg-gradient-to-br from-sandia/10 via-sandia/5 to-celeste/5 ring-1 ring-sandia/20">
            <div className="flex items-center gap-2 mb-4">
              <Gift size={18} className="text-sandia" aria-hidden="true" />
              <p className="text-[12px] font-semibold text-sandia-600 uppercase tracking-[0.08em]">
                {VALUE_STACK.bonusEyebrow}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {VALUE_STACK.bonusItems.map((bonus, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 justify-between"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-sandia/15 flex items-center justify-center mt-0.5"
                    >
                      <span className="text-sandia font-bold text-[12px]">
                        +
                      </span>
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

          {/* Tarjeta de valor total tachado */}
          <div className="mt-8 text-center">
            <p className="text-[13px] text-text-muted mb-2">
              Valor real combinado:{" "}
              <span className="font-semibold text-text-dark line-through decoration-text-muted/40 tabular-nums">
                {formatCLP(VALUE_STACK.monthlyTotal + VALUE_STACK.bonusTotal)}
              </span>
            </p>
            <p className="text-[12px] text-text-muted">Tu precio fundadora hoy:</p>

            {/* Precio principal con gradient */}
            <div className="flex items-baseline justify-center gap-1 mt-2">
              <span className="font-serif font-bold text-gradient-warm text-[4.5rem] md:text-[6rem] leading-none tabular-nums">
                {formatCLP(VALUE_STACK.price)}
              </span>
            </div>
            <p className="text-[14px] text-text-muted mt-3">
              {VALUE_STACK.priceLabel}
            </p>

            {/* Precio post-fundadora tachado */}
            <p className="text-[13px] text-text-muted/80 mt-3 italic">
              <span className="line-through decoration-sandia/60 decoration-2">
                {VALUE_STACK.priceAfterLabel}
              </span>
            </p>
          </div>

          {/* Consentimiento legal — checkbox blocking */}
          <div
            className={`mt-8 rounded-2xl p-4 transition-all duration-200 ${
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
              <span
                id="legal-consent-text"
                className="text-[13px] text-text-dark leading-relaxed"
              >
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

          {/* CTA + Mercado Pago */}
          <div className="mt-5">
            <a
              href={SITE_CONFIG.mpPaymentUrl}
              onClick={handleCtaClick}
              aria-disabled={!accepted}
              tabIndex={accepted ? 0 : -1}
              className={`group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 bg-gradient-warm text-white font-semibold rounded-full py-4 text-[17px] transition-all duration-300 text-center ${
                accepted
                  ? "shadow-glow-sandia hover:shadow-[0_0_0_1px_rgba(233,69,85,0.24),0_18px_48px_-6px_rgba(233,69,85,0.45)] animate-breathe"
                  : "opacity-50 cursor-not-allowed grayscale-[0.3]"
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative z-10 inline-flex items-center gap-2">
                {VALUE_STACK.cta.replace(" →", "")}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>

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
          </div>
        </div>
      </motion.div>
    </section>
  )
}

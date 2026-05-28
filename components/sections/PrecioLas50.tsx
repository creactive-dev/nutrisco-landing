"use client"

import { motion } from "framer-motion"
import { Check, Gift, CreditCard } from "lucide-react"
import { VALUE_STACK, SITE_CONFIG } from "@/lib/constants"

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
  return (
    <section
      id="precio"
      aria-label="Precio Las 50 Primeras"
      className="bg-surface-low py-16 px-5 md:py-24 md:px-8"
    >
      <motion.div
        className="max-w-2xl mx-auto text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
      >
        <motion.p
          variants={item}
          className="text-[13px] font-medium text-sandia uppercase tracking-[0.08em] mb-4"
        >
          {VALUE_STACK.eyebrow}
        </motion.p>
        <motion.h2
          variants={item}
          className="font-serif font-bold text-text-dark text-[2rem] md:text-[3rem] leading-[1.1] tracking-[-0.025em]"
        >
          {VALUE_STACK.h2[0]}
          <br />
          {VALUE_STACK.h2[1]}
        </motion.h2>
      </motion.div>

      {/* Card de precio + value stack */}
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="bg-crema rounded-4xl p-7 md:p-10 shadow-ambient">
          {/* Value Stack mensual */}
          <ul
            className="flex flex-col gap-3"
            aria-label="Qué incluye tu suscripción"
          >
            {VALUE_STACK.monthlyItems.map((stackItem, i) => (
              <li
                key={i}
                className="flex items-start gap-3 justify-between border-b border-surface-high last:border-0 pb-3 last:pb-0"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Check
                    size={18}
                    className="text-celeste flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
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
          <div className="mt-5 pt-5 border-t-2 border-text-dark flex items-center justify-between">
            <span className="text-[15px] md:text-[16px] font-semibold text-text-dark">
              Valor total mensual
            </span>
            <span className="text-[18px] md:text-[20px] font-bold text-text-dark tabular-nums">
              {formatCLP(VALUE_STACK.monthlyTotal)}
            </span>
          </div>

          {/* Bonus stack */}
          <div className="mt-8 bg-sandia/5 border border-sandia/20 rounded-3xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Gift size={18} className="text-sandia" aria-hidden="true" />
              <p className="text-[12px] font-semibold text-sandia uppercase tracking-[0.06em]">
                {VALUE_STACK.bonusEyebrow}
              </p>
            </div>

            <ul className="flex flex-col gap-2.5">
              {VALUE_STACK.bonusItems.map((bonus, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 justify-between"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                      aria-hidden="true"
                      className="text-sandia font-bold flex-shrink-0 mt-0.5"
                    >
                      +
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
              <span className="text-[13px] font-semibold text-sandia">
                Valor total bonus
              </span>
              <span className="text-[15px] font-bold text-sandia tabular-nums">
                {formatCLP(VALUE_STACK.bonusTotal)}
              </span>
            </div>
          </div>

          {/* Precio */}
          <div className="mt-10 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-serif font-bold text-sandia text-[4.5rem] md:text-[6rem] leading-none">
                {formatCLP(VALUE_STACK.price)}
              </span>
            </div>
            <p className="text-[14px] text-text-muted mt-2">
              {VALUE_STACK.priceLabel}
            </p>

            {/* Precio post-fundadora tachado */}
            <p className="text-[13px] text-text-muted/80 mt-3 italic">
              <span className="line-through decoration-sandia/60 decoration-2">
                {VALUE_STACK.priceAfterLabel}
              </span>
            </p>
          </div>

          {/* CTA + Mercado Pago */}
          <div className="mt-8">
            <a
              href={SITE_CONFIG.mpPaymentUrl}
              className="w-full inline-block bg-sandia hover:bg-[#D63B4A] active:bg-[#C0353F] text-white font-semibold rounded-xl py-4 text-[17px] transition-colors duration-200 animate-breathe text-center"
            >
              {VALUE_STACK.cta}
            </a>

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

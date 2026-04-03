"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Receipt, Lock, XCircle, CreditCard } from "lucide-react"
import { PRECIO, SITE_CONFIG } from "@/lib/constants"

const iconMap = {
  "shield-check": ShieldCheck,
  receipt: Receipt,
  lock: Lock,
  "x-circle": XCircle,
} as const

type BenefitIconKey = keyof typeof iconMap

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function PrecioFundador() {
  return (
    <section
      id="precio"
      className="bg-surface-lowest py-16 px-5 md:py-24 md:px-8"
    >
      {/* Header */}
      <motion.div
        className="max-w-xl mx-auto text-center mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
      >
        <motion.p
          variants={item}
          className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4"
        >
          {PRECIO.eyebrow}
        </motion.p>
        <motion.h2
          variants={item}
          className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
        >
          {PRECIO.h2[0]}
          <br />
          {PRECIO.h2[1]}
        </motion.h2>
      </motion.div>

      {/* Card de precio */}
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="bg-crema rounded-4xl p-8 shadow-ambient">

          {/* Precio principal */}
          <div className="flex items-baseline gap-1">
            <span className="font-serif font-bold text-[4.5rem] text-sandia leading-none">
              {PRECIO.price}
            </span>
            <span className="font-sans font-normal text-[1.5rem] text-text-muted">
              {PRECIO.period}
            </span>
          </div>

          {/* Label precio */}
          <p className="text-[14px] text-text-muted mt-1">
            {PRECIO.priceLabel}
          </p>

          {/* Separador tonal */}
          <div
            aria-hidden="true"
            className="w-full h-px bg-surface-high my-6"
          />

          {/* Beneficios */}
          <ul className="flex flex-col gap-4" aria-label="Beneficios incluidos">
            {PRECIO.benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon as BenefitIconKey]
              return (
                <li key={index} className="flex items-start gap-3">
                  {Icon && (
                    <Icon
                      size={18}
                      className="text-celeste flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <p className="text-[0.9375rem] font-semibold text-text-dark leading-snug">
                      {benefit.title}
                    </p>
                    <p className="text-[13px] text-text-muted mt-0.5">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Separador tonal */}
          <div
            aria-hidden="true"
            className="w-full h-px bg-surface-high my-6"
          />

          {/* Logo Mercado Pago */}
          <div className="flex items-center gap-2">
            <CreditCard
              size={16}
              className="text-text-muted flex-shrink-0"
              aria-hidden="true"
            />
            <span className="font-sans font-semibold text-text-muted text-[14px]">
              Mercado Pago
            </span>
            <span className="text-[13px] text-text-muted">
              · {PRECIO.mpLabel}
            </span>
          </div>

          {/* CTA Principal */}
          <a
            href={SITE_CONFIG.mpPaymentUrl}
            className="mt-6 w-full inline-block bg-sandia hover:bg-[#D63B4A] active:bg-[#C0353F] text-white font-semibold rounded-xl py-4 text-[17px] transition-colors duration-200 animate-breathe text-center"
          >
            {PRECIO.cta}
          </a>

          {/* Microcopy */}
          <p className="text-[13px] text-text-muted text-center mt-3">
            {PRECIO.microcopy}
          </p>

        </div>
      </motion.div>
    </section>
  )
}

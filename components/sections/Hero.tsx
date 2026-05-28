"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Receipt, Lock, XCircle } from "lucide-react"
import { HERO, SITE_CONFIG } from "@/lib/constants"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const trustIconMap = {
  "shield-check": ShieldCheck,
  receipt: Receipt,
  lock: Lock,
  "x-circle": XCircle,
} as const

type TrustIconKey = keyof typeof trustIconMap

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-crema warm-mesh relative overflow-hidden pt-24 pb-16 px-5 md:pt-32 md:pb-24 md:px-8"
    >
      <div aria-hidden="true" className="grain" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
          {/* Columna izquierda — copy */}
          <motion.div
            className="text-center md:text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              variants={item}
              className="text-[12px] md:text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-5"
            >
              {HERO.eyebrow}
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={item}
              className="font-serif font-bold text-text-dark text-[2.5rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] leading-[1.0] tracking-[-0.03em]"
            >
              {HERO.h1[0]}
              <br className="block" />
              {HERO.h1[1]}
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              variants={item}
              className="text-[1.0625rem] md:text-[1.1875rem] text-text-muted leading-[1.6] mt-5 max-w-lg mx-auto md:mx-0"
            >
              {HERO.subtitle}
            </motion.p>

            {/* CTA Principal */}
            <motion.div variants={item} className="mt-8 flex justify-center md:justify-start">
              <a
                href={SITE_CONFIG.mpPaymentUrl}
                className="w-full sm:w-auto sm:min-w-[280px] inline-block bg-sandia hover:bg-[#D63B4A] active:bg-[#C0353F] text-white font-semibold rounded-xl px-8 py-4 text-[17px] transition-colors duration-200 animate-breathe text-center"
              >
                {HERO.cta}
              </a>
            </motion.div>

            {/* Trust microcopy */}
            <motion.p
              variants={item}
              className="mt-4 text-[12px] md:text-[13px] text-text-muted leading-relaxed"
            >
              {HERO.microcopy}
            </motion.p>

            {/* Trust badges */}
            <motion.div
              variants={item}
              className="hidden md:flex flex-wrap gap-2 mt-5"
            >
              {HERO.trustBadges.map((badge) => {
                const Icon = trustIconMap[badge.icon as TrustIconKey]
                return (
                  <div
                    key={badge.icon + badge.text}
                    className="bg-surface-lowest rounded-full px-3 py-1.5 text-[12px] text-text-muted flex items-center gap-1.5 shadow-card-sm"
                  >
                    {Icon && <Icon size={13} className="text-celeste flex-shrink-0" aria-hidden="true" />}
                    {badge.text}
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Columna derecha — mockup iPhone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="hidden md:flex justify-center md:justify-end mt-12 md:mt-0"
          >
            <div
              data-placeholder="true"
              className="relative w-[280px] lg:w-[320px] aspect-[9/19] bg-gradient-to-br from-text-dark to-text-dark/90 rounded-[2.75rem] p-3 shadow-ambient"
              aria-label="Mockup app Nutrico pendiente"
            >
              <div className="w-full h-full bg-surface-low rounded-[2.25rem] flex items-center justify-center overflow-hidden">
                <span className="text-text-muted text-sm text-center px-4">
                  [Mockup pendiente]
                  <br />
                  <span className="text-[11px] text-text-muted/70">
                    mock-dashboard-home.png
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

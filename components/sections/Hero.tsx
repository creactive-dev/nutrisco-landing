"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Receipt, Lock, XCircle, ArrowRight } from "lucide-react"
import { HERO, SITE_CONFIG } from "@/lib/constants"
import { MeshAurora } from "@/components/ui/MeshAurora"
import { Eyebrow } from "@/components/ui/Eyebrow"

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
      className="relative overflow-hidden pt-36 pb-20 px-5 md:pt-44 md:pb-28 md:px-8"
    >
      <MeshAurora variant="light" blobs grain />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
          {/* Columna izquierda — copy */}
          <motion.div
            className="text-center md:text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow glass pill */}
            <motion.div
              variants={item}
              className="inline-flex mb-6 justify-center md:justify-start w-full md:w-auto"
            >
              <Eyebrow tone="celeste">{HERO.eyebrow}</Eyebrow>
            </motion.div>

            {/* H1 con gradient en última palabra */}
            <motion.h1
              variants={item}
              className="font-serif font-bold text-text-dark text-[2.5rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] leading-[1.0] tracking-[-0.03em]"
            >
              {HERO.h1[0]}
              <br className="block" />
              <span className="text-gradient-warm">{HERO.h1[1]}</span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              variants={item}
              className="text-[1.0625rem] md:text-[1.1875rem] text-text-muted leading-[1.6] mt-6 max-w-lg mx-auto md:mx-0"
            >
              {HERO.subtitle}
            </motion.p>

            {/* CTA Principal */}
            <motion.div
              variants={item}
              className="mt-9 flex flex-col items-center md:items-start gap-4"
            >
              <a
                href={SITE_CONFIG.mpPaymentUrl}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[300px] bg-gradient-warm text-white font-semibold rounded-full px-8 py-4 text-[17px] shadow-glow-sandia hover:shadow-[0_0_0_1px_rgba(233,69,85,0.24),0_18px_48px_-6px_rgba(233,69,85,0.45)] transition-all duration-300 animate-breathe text-center"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  {HERO.cta.replace(" →", "")}
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>

              {/* Trust microcopy */}
              <p className="text-[12px] md:text-[13px] text-text-muted leading-relaxed max-w-md">
                {HERO.microcopy}
              </p>
            </motion.div>

            {/* Trust badges como glass pills */}
            <motion.div
              variants={item}
              className="hidden md:flex flex-wrap gap-2 mt-7"
            >
              {HERO.trustBadges.map((badge) => {
                const Icon = trustIconMap[badge.icon as TrustIconKey]
                return (
                  <div
                    key={badge.icon + badge.text}
                    className="glass-pill rounded-full px-3.5 py-1.5 text-[12px] text-text-dark/80 flex items-center gap-1.5"
                  >
                    {Icon && (
                      <Icon
                        size={13}
                        className="text-celeste-600 flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {badge.text}
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Columna derecha — mockup iPhone con glow halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            className="hidden md:flex justify-center md:justify-end mt-12 md:mt-0 relative"
          >
            {/* Glow halo detrás del mockup */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 right-12 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-gradient-warm-cool opacity-40 blur-[80px] pointer-events-none"
            />

            <div className="relative">
              {/* Tarjeta glass float decorativa */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: -20, rotate: -8 }}
                animate={{ opacity: 1, x: 0, rotate: -6 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -left-12 top-12 z-20 glass rounded-2xl px-4 py-3 w-[150px]"
              >
                <p className="text-[10px] font-medium text-celeste-600 uppercase tracking-wider">
                  Esta semana
                </p>
                <p className="text-[14px] font-semibold text-text-dark mt-0.5 leading-tight">
                  Pauta antiinflamatoria · Fase 1
                </p>
                <div className="mt-2 h-1 rounded-full bg-surface-high overflow-hidden">
                  <div
                    className="h-full bg-gradient-warm rounded-full"
                    style={{ width: "62%" }}
                  />
                </div>
              </motion.div>

              {/* Tarjeta glass float check-in */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: 20, rotate: 8 }}
                animate={{ opacity: 1, x: 0, rotate: 5 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -right-8 bottom-16 z-20 glass rounded-2xl px-4 py-3 w-[160px]"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full bg-celeste animate-pulse-soft"
                  />
                  <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                    Check-in
                  </p>
                </div>
                <p className="text-[14px] font-semibold text-text-dark mt-1 leading-tight">
                  Energía hoy
                </p>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`flex-1 h-1.5 rounded-full ${
                        n <= 4 ? "bg-gradient-warm" : "bg-surface-high"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Mockup iPhone */}
              <div
                data-placeholder="true"
                className="relative w-[280px] lg:w-[320px] aspect-[9/19] bg-gradient-to-br from-text-dark to-[#0a0a0a] rounded-[2.75rem] p-3 shadow-glass z-10"
                aria-label="Mockup app Nutrico pendiente"
              >
                <div className="w-full h-full bg-surface-low rounded-[2.25rem] flex items-center justify-center overflow-hidden relative">
                  {/* Mock header decorativo */}
                  <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-center">
                    <div className="w-20 h-1 rounded-full bg-text-dark/10" />
                  </div>
                  <span className="text-text-muted text-sm text-center px-4 relative z-10">
                    [Mockup pendiente]
                    <br />
                    <span className="text-[11px] text-text-muted/70">
                      mock-dashboard-home.png
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

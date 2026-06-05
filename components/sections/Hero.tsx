"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck, Receipt, Lock, XCircle, ArrowRight, Star } from "lucide-react"
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
      className="relative overflow-hidden pt-28 pb-16 px-5 md:pt-44 md:pb-28 md:px-8"
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
            {/* Social proof rating pill encima del eyebrow */}
            <motion.div
              variants={item}
              className="inline-flex mb-4 justify-center md:justify-start w-full md:w-auto"
            >
              <a
                href={SITE_CONFIG.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill rounded-full px-3 py-1.5 inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
              >
                <span className="flex items-center gap-0.5" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={11}
                      className="text-[#fbbf24]"
                      fill="currentColor"
                    />
                  ))}
                </span>
                <span className="text-[11px] font-semibold text-text-dark">
                  5.0
                </span>
                <span className="text-[11px] text-text-muted">
                  · +2.500 pacientes
                </span>
                <span className="hidden sm:inline text-[11px] text-text-muted">
                  · 10 años
                </span>
              </a>
            </motion.div>

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
                href="#precio"
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
            </motion.div>

            {/* Trust badges como glass pills */}
            <motion.div
              variants={item}
              className="flex flex-wrap justify-center md:justify-start gap-2 mt-7"
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

          {/* Columna derecha — mockup iPhone REAL con foto Constanza floating */}
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
              {/* Floating card — Constanza dice */}
              <motion.div
                initial={{ opacity: 0, x: -20, rotate: -8 }}
                animate={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -left-16 top-8 z-20 glass rounded-2xl px-3 py-2.5 w-[180px] flex items-start gap-2.5"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white">
                  <Image
                    src={SITE_CONFIG.brand.constanzaThumb}
                    alt="Constanza Jiménez"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-celeste-600 uppercase tracking-wider">
                    Constanza dice
                  </p>
                  <p className="text-[11px] text-text-dark mt-0.5 leading-snug">
                    Llevas 4 días en fase 1. Vamos bien.
                  </p>
                </div>
              </motion.div>

              {/* Floating card — Check-in */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: 20, rotate: 8 }}
                animate={{ opacity: 1, x: 0, rotate: 5 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -right-10 bottom-20 z-20 glass rounded-2xl px-4 py-3 w-[170px]"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full bg-celeste animate-pulse-soft"
                  />
                  <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                    Check-in del día
                  </p>
                </div>
                <p className="text-[14px] font-semibold text-text-dark mt-1.5 leading-tight">
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

              {/* Mockup real pre-enmarcado — Tu Progreso */}
              <div
                className="relative w-[280px] lg:w-[320px] z-10"
                aria-label="App Nutrico — tu progreso del día"
              >
                <Image
                  src="/mockups/m-progreso.png"
                  alt="App Nutrico — vista de tu progreso del día con check-in y plan activo"
                  width={701}
                  height={1444}
                  sizes="(min-width: 1024px) 320px, 280px"
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

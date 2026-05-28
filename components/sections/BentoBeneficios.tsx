"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Activity, Zap, Shirt, Smile, User, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { BENTO_BENEFICIOS, SITE_CONFIG } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  zap: Zap,
  shirt: Shirt,
  smile: Smile,
  user: User,
  "shield-check": ShieldCheck,
}

// Bento spans desktop — card de Constanza ocupa 2 col
const cellSpan: Record<number, string> = {
  0: "md:col-span-1",
  1: "md:col-span-1",
  2: "md:col-span-1",
  3: "md:col-span-1",
  4: "md:col-span-1",
  5: "md:col-span-2",
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function BentoBeneficios() {
  return (
    <section
      aria-label="Beneficios"
      className="relative overflow-hidden bg-crema py-20 px-5 md:py-28 md:px-8"
    >
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex mb-5">
            <Eyebrow tone="celeste">{BENTO_BENEFICIOS.eyebrow}</Eyebrow>
          </div>
          <h2 className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]">
            {BENTO_BENEFICIOS.h2[0]}
            <br />
            <span className="text-gradient-warm">{BENTO_BENEFICIOS.h2[1]}</span>
          </h2>
        </div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 auto-rows-fr"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {BENTO_BENEFICIOS.cards.map((card, index) => {
            const Icon = iconMap[card.icon] ?? Activity
            const isConstanza = card.icon === "shield-check"
            const accentColor = index % 2 === 0 ? "sandia" : "celeste"
            return (
              <motion.article
                key={index}
                variants={item}
                className={[
                  "group relative glass rounded-3xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-hover overflow-hidden",
                  cellSpan[index] ?? "",
                ].join(" ")}
              >
                {/* Halo glow on hover */}
                <div
                  aria-hidden="true"
                  className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isConstanza
                      ? "bg-gradient-warm-cool"
                      : accentColor === "sandia"
                      ? "bg-gradient-warm"
                      : "bg-gradient-cool"
                  }`}
                  style={{
                    maskImage:
                      "radial-gradient(circle at 50% 0%, black 0%, transparent 70%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 0%, black 0%, transparent 70%)",
                    opacity: 0,
                  }}
                />

                {isConstanza ? (
                  // Card de Constanza expandida — col-span-2 desktop, vertical mobile
                  <div className="relative z-10 flex flex-col md:grid md:grid-cols-[auto_1fr] gap-5 items-start h-full">
                    {/* Foto real Constanza */}
                    <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden ring-2 ring-white/60 shadow-card flex-shrink-0">
                      <Image
                        src={SITE_CONFIG.brand.constanzaThumb}
                        alt="Constanza Jiménez — nutricionista"
                        fill
                        sizes="112px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-col gap-2 h-full">
                      <div className="flex items-center gap-2">
                        <ShieldCheck
                          size={14}
                          className="text-celeste-600"
                          aria-hidden="true"
                        />
                        <p className="text-[11px] font-semibold text-celeste-600 uppercase tracking-wider">
                          Supervisión clínica
                        </p>
                      </div>
                      <h3 className="font-serif font-semibold text-[1.25rem] md:text-[1.5rem] text-text-dark leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-[14px] text-text-muted leading-relaxed">
                        {card.description}
                      </p>

                      {/* Stats inline */}
                      <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-text-dark/8">
                        <div>
                          <p className="text-[20px] font-serif font-bold text-gradient-warm leading-none tabular-nums">
                            +2.500
                          </p>
                          <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">
                            pacientes
                          </p>
                        </div>
                        <div className="h-8 w-px bg-text-dark/10" aria-hidden="true" />
                        <div>
                          <p className="text-[20px] font-serif font-bold text-gradient-warm leading-none tabular-nums">
                            10
                          </p>
                          <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">
                            años
                          </p>
                        </div>
                        <div className="h-8 w-px bg-text-dark/10" aria-hidden="true" />
                        <div>
                          <p className="text-[20px] font-serif font-bold text-gradient-warm leading-none tabular-nums">
                            5.0
                          </p>
                          <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">
                            Google
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Cards normales con descripción + metric
                  <div className="relative z-10 flex flex-col gap-4 h-full">
                    {/* Icon glass squircle */}
                    <div
                      className={[
                        "w-12 h-12 rounded-2xl flex items-center justify-center ring-1 flex-shrink-0",
                        accentColor === "sandia"
                          ? "bg-sandia/10 ring-sandia/20 text-sandia-600"
                          : "bg-celeste/10 ring-celeste/20 text-celeste-600",
                      ].join(" ")}
                    >
                      <Icon size={22} aria-hidden="true" />
                    </div>

                    <h3 className="font-serif font-semibold text-[1.125rem] md:text-[1.25rem] text-text-dark leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-[14px] text-text-muted leading-relaxed flex-1">
                      {card.description}
                    </p>

                    {/* Metric chip al fondo */}
                    <div className="flex items-center gap-2 mt-1 pt-3 border-t border-text-dark/8">
                      <span
                        aria-hidden="true"
                        className={[
                          "w-1.5 h-1.5 rounded-full",
                          accentColor === "sandia"
                            ? "bg-sandia"
                            : "bg-celeste",
                        ].join(" ")}
                      />
                      <span className="text-[12px] font-semibold text-text-dark">
                        {card.metric}
                      </span>
                      <span className="text-[11px] text-text-muted">
                        · {card.metricLabel}
                      </span>
                    </div>
                  </div>
                )}
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

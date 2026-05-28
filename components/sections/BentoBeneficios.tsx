"use client"

import { motion } from "framer-motion"
import { Activity, Zap, Shirt, Smile, User, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { BENTO_BENEFICIOS } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  zap: Zap,
  shirt: Shirt,
  smile: Smile,
  user: User,
  "shield-check": ShieldCheck,
}

// Bento spans desktop — card de Constanza ocupa 2x1
const cellSpan: Record<number, string> = {
  0: "md:col-span-1 md:row-span-1",
  1: "md:col-span-1 md:row-span-1",
  2: "md:col-span-1 md:row-span-1",
  3: "md:col-span-1 md:row-span-1",
  4: "md:col-span-1 md:row-span-1",
  5: "md:col-span-2 md:row-span-1",
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
      {/* Aurora soft */}
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto">
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
            return (
              <motion.div
                key={index}
                variants={item}
                className={[
                  "group relative glass rounded-3xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-hover",
                  cellSpan[index] ?? "",
                ].join(" ")}
              >
                {/* Halo glow on hover */}
                <div
                  aria-hidden="true"
                  className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isConstanza
                      ? "bg-gradient-warm-cool"
                      : index % 2 === 0
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

                <div className="relative z-10 flex flex-col gap-4 h-full">
                  {isConstanza ? (
                    <div className="flex items-start gap-4">
                      {/* Foto Constanza glass circular */}
                      <div
                        data-placeholder="true"
                        className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center flex-shrink-0 ring-1 ring-sandia/20"
                        aria-label="Foto Constanza pendiente"
                      >
                        <span className="text-text-muted text-[10px] text-center leading-tight px-1">
                          [Foto]
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-celeste-600 uppercase tracking-wider mb-1">
                          Supervisión clínica
                        </p>
                        <h3 className="font-serif font-semibold text-[1.25rem] md:text-[1.375rem] text-text-dark leading-snug">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Icon en glass squircle */}
                      <div
                        className={[
                          "w-12 h-12 rounded-2xl flex items-center justify-center ring-1",
                          index % 2 === 0
                            ? "bg-sandia/10 ring-sandia/20 text-sandia-600"
                            : "bg-celeste/10 ring-celeste/20 text-celeste-600",
                        ].join(" ")}
                      >
                        <Icon size={22} aria-hidden="true" />
                      </div>

                      <h3 className="font-serif font-semibold text-[1.125rem] md:text-[1.25rem] text-text-dark leading-snug">
                        {card.title}
                      </h3>
                    </>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Users, Star, Sparkles, ArrowUpRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { TRUST_BAR, SITE_CONFIG } from "@/lib/constants"

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  star: Star,
  sparkles: Sparkles,
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function TrustBar() {
  return (
    <section
      aria-label="Métricas de confianza"
      className="relative overflow-hidden text-white py-14 px-5 md:py-20 md:px-8"
    >
      {/* Aurora dark mesh */}
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-dark" />

      {/* Decorative animated orbs */}
      <div
        aria-hidden="true"
        className="aurora-blob bg-sandia/25 w-[360px] h-[360px] -top-24 -left-24 animate-aurora-drift"
        style={{ animationDuration: "22s" }}
      />
      <div
        aria-hidden="true"
        className="aurora-blob bg-celeste/20 w-[320px] h-[320px] top-1/4 -right-24 animate-aurora-drift"
        style={{ animationDuration: "26s", animationDelay: "-6s" }}
      />
      <div aria-hidden="true" className="grain-subtle" />

      {/* Hairlines top/bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Glass cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {TRUST_BAR.stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] ?? Sparkles
            const isGoogle = stat.icon === "star"
            const accentTone = i === 0 ? "celeste" : i === 1 ? "amber" : "sandia"

            return (
              <motion.article
                key={i}
                variants={item}
                className="group relative glass-dark rounded-3xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-hover overflow-hidden"
              >
                {/* Halo radial on hover */}
                <div
                  aria-hidden="true"
                  className={[
                    "absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    accentTone === "celeste"
                      ? "bg-gradient-cool"
                      : accentTone === "amber"
                      ? "bg-gradient-to-br from-[#fbbf24] to-[#f59e0b]"
                      : "bg-gradient-warm",
                  ].join(" ")}
                  style={{
                    maskImage:
                      "radial-gradient(circle at 50% 0%, black 0%, transparent 70%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 0%, black 0%, transparent 70%)",
                    opacity: 0,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full gap-4">
                  {/* Header con icon + número grande */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={[
                        "w-11 h-11 rounded-2xl flex items-center justify-center ring-1 flex-shrink-0",
                        accentTone === "celeste"
                          ? "bg-celeste/15 ring-celeste/25 text-celeste-400"
                          : accentTone === "amber"
                          ? "bg-[#fbbf24]/15 ring-[#fbbf24]/30 text-[#fbbf24]"
                          : "bg-sandia/15 ring-sandia/25 text-sandia-400",
                      ].join(" ")}
                    >
                      <Icon
                        size={20}
                        aria-hidden="true"
                        fill={isGoogle ? "currentColor" : "none"}
                      />
                    </div>

                    {isGoogle && (
                      <div
                        className="flex items-center gap-0.5"
                        aria-label="Calificación 5 de 5 estrellas"
                      >
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={12}
                            className="text-[#fbbf24]"
                            fill="currentColor"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Número grande */}
                  <p
                    className={[
                      "font-serif font-bold text-[3rem] md:text-[3.5rem] leading-none tracking-tight tabular-nums",
                      accentTone === "amber"
                        ? "bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent"
                        : "text-gradient-warm",
                    ].join(" ")}
                  >
                    {stat.number}
                  </p>

                  {/* Label primario */}
                  <p className="text-white font-semibold text-[15px] md:text-[16px] leading-snug">
                    {stat.label}
                  </p>

                  {/* Sub-label de contexto */}
                  <p className="text-white/60 text-[13px] leading-relaxed flex-1">
                    {stat.sub}
                  </p>

                  {/* CTA Google sólo en card de Google */}
                  {isGoogle && stat.cta && (
                    <a
                      href={SITE_CONFIG.googleBusinessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[12px] text-celeste-300 hover:text-celeste-200 font-medium transition-colors mt-1 group/cta"
                    >
                      {stat.cta} en Google
                      <ArrowUpRight
                        size={12}
                        className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { TRUST_BAR, SITE_CONFIG } from "@/lib/constants"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function TrustBar() {
  return (
    <section
      aria-label="Métricas de confianza"
      className="relative overflow-hidden text-white py-12 px-5 md:py-16 md:px-8"
    >
      {/* Aurora dark */}
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-dark" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {TRUST_BAR.stats.map((stat, i) => {
            const isGoogle = stat.number === "5.0"
            return (
              <motion.div
                key={i}
                variants={item}
                className="text-center md:text-left relative"
              >
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"
                  />
                )}
                <div className="flex items-baseline gap-3 justify-center md:justify-start">
                  <p className="font-serif font-bold text-gradient-warm text-[2.75rem] md:text-[3.5rem] leading-none tracking-tight tabular-nums">
                    {stat.number}
                  </p>
                  {isGoogle && (
                    <span className="flex items-center gap-0.5" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          className="text-[#fbbf24]"
                          fill="currentColor"
                        />
                      ))}
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-[14px] md:text-[15px] mt-3 leading-snug max-w-xs mx-auto md:mx-0">
                  {stat.label}
                </p>
                {isGoogle && (
                  <a
                    href={SITE_CONFIG.googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-celeste-400 hover:text-celeste-300 underline underline-offset-2 inline-block mt-2"
                  >
                    Ver reseñas en Google →
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

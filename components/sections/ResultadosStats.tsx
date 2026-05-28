"use client"

import { motion } from "framer-motion"
import { RESULTADOS_STATS } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function ResultadosStats() {
  return (
    <section
      aria-label="Resultados cuantificados"
      className="relative overflow-hidden py-20 px-5 md:py-28 md:px-8 bg-surface-low"
    >
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-60" />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div variants={item} className="inline-flex mb-5">
            <Eyebrow tone="celeste">{RESULTADOS_STATS.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={item}
            className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
          >
            Los números del{" "}
            <span className="text-gradient-warm">piloto</span>.
          </motion.h2>
        </div>

        {/* Stats en glass cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {RESULTADOS_STATS.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              data-placeholder={i < 2 ? "true" : undefined}
              className="group relative glass rounded-3xl p-7 md:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-hover"
            >
              {/* Halo gradient on hover */}
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-warm-cool"
                style={{
                  maskImage:
                    "radial-gradient(circle at 50% 0%, black 0%, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at 50% 0%, black 0%, transparent 75%)",
                  opacity: 0,
                }}
              />

              <div className="relative z-10">
                <p className="font-serif font-bold text-gradient-warm text-[3.5rem] md:text-[4.5rem] leading-none tracking-tight">
                  {stat.number}
                </p>
                <p className="text-text-muted text-[14px] md:text-[15px] mt-4 leading-snug max-w-[20rem] mx-auto">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          variants={item}
          className="text-[12px] text-text-muted text-center mt-12 italic"
        >
          {RESULTADOS_STATS.footnote}
        </motion.p>
      </motion.div>
    </section>
  )
}

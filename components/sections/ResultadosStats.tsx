"use client"

import { motion } from "framer-motion"
import { RESULTADOS_STATS } from "@/lib/constants"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function ResultadosStats() {
  return (
    <section
      aria-label="Resultados cuantificados"
      className="bg-surface-low py-16 px-5 md:py-24 md:px-8"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            variants={item}
            className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4"
          >
            {RESULTADOS_STATS.eyebrow}
          </motion.p>
          <motion.h2
            variants={item}
            className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
          >
            {RESULTADOS_STATS.h2}
          </motion.h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {RESULTADOS_STATS.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="text-center"
              data-placeholder={i < 2 ? "true" : undefined}
            >
              <p className="font-serif font-bold text-sandia text-[3.5rem] md:text-[4.5rem] leading-none tracking-tight">
                {stat.number}
              </p>
              <p className="text-text-muted text-[15px] md:text-[16px] mt-3 leading-snug max-w-[18rem] mx-auto">
                {stat.label}
              </p>
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

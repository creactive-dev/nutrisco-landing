"use client"

import { motion } from "framer-motion"
import { COMO_FUNCIONA } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const stepItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const headerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function ComoFunciona() {
  return (
    <section className="relative overflow-hidden bg-crema py-20 px-5 md:py-28 md:px-8">
      {/* Soft aurora background */}
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.div variants={headerItem} className="inline-flex mb-5">
            <Eyebrow tone="celeste">{COMO_FUNCIONA.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={headerItem}
            className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
          >
            {COMO_FUNCIONA.h2[0]}
            <br />
            <span className="text-gradient-warm">{COMO_FUNCIONA.h2[1]}</span>
          </motion.h2>
        </motion.div>

        {/* Pasos — 3 cols desktop, vertical mobile */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Connecting line desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[110px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-sandia/30 to-transparent"
          />

          {COMO_FUNCIONA.steps.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={stepItem}
              className="relative flex flex-col items-center text-center"
            >
              {/* Mockup iPhone con halo glow */}
              <div className="relative mb-6">
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-[2rem] blur-2xl opacity-40 ${
                    idx === 1 ? "bg-celeste/40" : "bg-sandia/30"
                  }`}
                />
                <div
                  data-placeholder="true"
                  className="relative w-full max-w-[220px] aspect-[9/19] bg-gradient-to-br from-text-dark to-[#0a0a0a] rounded-[2rem] p-2.5 shadow-glass"
                  aria-label={`Mockup ${step.mockupLabel} pendiente`}
                >
                  <div className="w-full h-full bg-surface-low rounded-[1.5rem] flex items-center justify-center overflow-hidden p-4">
                    <span className="text-text-muted text-xs text-center leading-snug">
                      [Mockup pendiente]
                      <br />
                      <span className="text-[10px] text-text-muted/70 mt-1 block">
                        {step.mockup}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Número en glass pill circular */}
              <div className="relative glass rounded-full w-14 h-14 flex items-center justify-center mb-4 z-10">
                <span
                  aria-hidden="true"
                  className="font-serif font-bold text-[1.5rem] text-gradient-warm leading-none"
                >
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif font-semibold text-[1.25rem] text-text-dark leading-snug mb-3 max-w-[26ch]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[0.9375rem] text-text-muted leading-[1.6] max-w-[28ch]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

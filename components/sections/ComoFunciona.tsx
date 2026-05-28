"use client"

import { motion } from "framer-motion"
import { COMO_FUNCIONA } from "@/lib/constants"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const stepItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
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
    <section className="bg-crema py-16 px-5 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.p
            variants={headerItem}
            className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4"
          >
            {COMO_FUNCIONA.eyebrow}
          </motion.p>
          <motion.h2
            variants={headerItem}
            className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
          >
            {COMO_FUNCIONA.h2[0]}
            <br />
            {COMO_FUNCIONA.h2[1]}
          </motion.h2>
        </motion.div>

        {/* Pasos — 3 cols desktop, vertical mobile */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {COMO_FUNCIONA.steps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepItem}
              className="flex flex-col items-center text-center"
            >
              {/* Mockup iPhone */}
              <div
                data-placeholder="true"
                className="w-full max-w-[220px] aspect-[9/19] bg-gradient-to-br from-text-dark to-text-dark/90 rounded-[2rem] p-2.5 shadow-ambient mb-6"
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

              {/* Número decorativo */}
              <p
                aria-hidden="true"
                className="font-serif font-bold text-[3rem] text-sandia opacity-30 leading-none select-none mb-2"
              >
                {step.number}
              </p>

              {/* Title */}
              <h3 className="font-serif font-semibold text-[1.25rem] text-text-dark leading-snug mb-2">
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

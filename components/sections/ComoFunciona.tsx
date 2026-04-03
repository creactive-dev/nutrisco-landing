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
      <div className="max-w-3xl mx-auto">

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

        {/* Pasos — mobile: lista vertical / desktop: grid 2×2 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {COMO_FUNCIONA.steps.map((step, index) => {
            const isLast = index === COMO_FUNCIONA.steps.length - 1
            const isLastInColumn =
              COMO_FUNCIONA.steps.length % 2 === 0
                ? index === COMO_FUNCIONA.steps.length - 1 || index === COMO_FUNCIONA.steps.length - 2
                : index === COMO_FUNCIONA.steps.length - 1

            return (
              <motion.div key={step.number} variants={stepItem}>
                {/* Paso */}
                <div className="relative pt-2">
                  {/* Número decorativo */}
                  <p
                    aria-hidden="true"
                    className="font-serif font-bold text-[5rem] md:text-[6rem] text-text-dark opacity-[0.07] leading-none select-none"
                  >
                    {step.number}
                  </p>

                  {/* Contenido del paso — superpuesto sobre el número */}
                  <div className="-mt-4">
                    <h3 className="font-serif font-semibold text-[1.25rem] text-text-dark leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[0.9375rem] text-text-muted leading-[1.6] mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Separador vertical entre pasos en mobile */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className={`md:hidden w-0.5 h-8 bg-surface-high mx-auto my-4 ${
                      isLastInColumn ? "hidden" : ""
                    }`}
                  />
                )}

                {/* Espaciado extra en desktop entre filas del grid */}
                {!isLastInColumn && (
                  <div className="hidden md:block mb-10" aria-hidden="true" />
                )}
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

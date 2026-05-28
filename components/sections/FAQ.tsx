"use client"

import { motion } from "framer-motion"
import { Accordion } from "@/components/ui/Accordion"
import { FAQ_ITEMS_V2 } from "@/lib/constants"
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

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-crema py-20 px-5 md:py-28 md:px-8"
    >
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-50" />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <motion.div variants={item} className="text-center mb-10">
          <div className="inline-flex mb-5">
            <Eyebrow tone="celeste">Resolvemos tus dudas</Eyebrow>
          </div>
          <h2 className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]">
            Preguntas{" "}
            <span className="text-gradient-warm">frecuentes</span>
          </h2>
        </motion.div>

        {/* Accordion en glass card */}
        <motion.div variants={item} className="glass rounded-3xl p-2 md:p-3">
          <Accordion items={FAQ_ITEMS_V2} />
        </motion.div>
      </motion.div>
    </section>
  )
}

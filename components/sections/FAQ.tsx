"use client"

import { motion } from "framer-motion"
import { Accordion } from "@/components/ui/Accordion"
import { FAQ_ITEMS } from "@/lib/constants"

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
    <section id="faq" className="bg-crema py-16 px-5 md:py-24 md:px-8">
      <motion.div
        className="max-w-2xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <motion.div variants={item} className="text-center mb-10">
          <h2 className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]">
            Preguntas frecuentes
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div variants={item}>
          <Accordion items={FAQ_ITEMS} />
        </motion.div>
      </motion.div>
    </section>
  )
}

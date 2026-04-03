"use client"

import { motion } from "framer-motion"
import { PUENTE } from "@/lib/constants"

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

export default function ElPuente() {
  return (
    <section className="bg-surface-lowest py-14 px-5 md:py-20 md:px-8">
      <motion.div
        className="max-w-xl md:max-w-2xl mx-auto text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4"
        >
          {PUENTE.eyebrow}
        </motion.p>

        {/* H2 */}
        <motion.h2
          variants={item}
          className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
        >
          {PUENTE.h2[0]}
          <br />
          {PUENTE.h2[1]}
        </motion.h2>

        {/* Párrafo 1 */}
        <motion.p
          variants={item}
          className="text-[1.0625rem] text-text-muted leading-[1.6] mt-5"
        >
          {PUENTE.p1}
        </motion.p>

        {/* Párrafo 2 */}
        <motion.p
          variants={item}
          className="text-[1.0625rem] text-text-muted leading-[1.6] mt-4"
        >
          {PUENTE.p2}
        </motion.p>

        {/* Separador visual — desktop only */}
        <motion.div variants={item}>
          <div className="hidden md:block w-12 h-0.5 bg-surface-high mx-auto mt-12" />
        </motion.div>
      </motion.div>
    </section>
  )
}

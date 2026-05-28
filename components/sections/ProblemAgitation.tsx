"use client"

import { motion } from "framer-motion"
import { PROBLEM_AGITATION } from "@/lib/constants"

export function ProblemAgitation() {
  return (
    <section
      aria-label="El problema"
      className="relative overflow-hidden bg-crema py-24 px-5 md:py-32 md:px-8"
    >
      {/* Soft mesh background */}
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft" />
      <div aria-hidden="true" className="grain-subtle" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Quote mark decorativo */}
        <div
          aria-hidden="true"
          className="font-serif text-[6rem] md:text-[8rem] text-sandia/15 leading-none select-none mb-[-2rem] md:mb-[-3rem]"
        >
          “
        </div>

        <h2 className="font-serif font-bold text-text-dark text-[1.875rem] md:text-[3rem] leading-[1.1] tracking-[-0.025em]">
          Los planes nutricionales son genéricos.
          <br />
          <span className="text-gradient-warm">Tu cuerpo no.</span>
        </h2>
        <p className="text-[1.0625rem] md:text-[1.25rem] text-text-muted leading-[1.6] mt-8 max-w-2xl mx-auto">
          {PROBLEM_AGITATION.body}
        </p>

        <div className="tonal-divider-gradient mt-12" />
      </motion.div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { PROGRAMA } from "@/lib/constants-programa"
import { Accordion } from "@/components/ui/Accordion"
import { Eyebrow } from "@/components/ui/Eyebrow"

export function FAQPrograma() {
  return (
    <section id="faq" className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Eyebrow tone="celeste">Antes de que preguntes</Eyebrow>
          <h2 className="mt-5 font-serif text-section-mobile text-text-dark md:text-section">
            Preguntas frecuentes
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <Accordion items={PROGRAMA.faq.map((f) => ({ q: f.q, a: f.a }))} />
        </motion.div>
      </div>
    </section>
  )
}

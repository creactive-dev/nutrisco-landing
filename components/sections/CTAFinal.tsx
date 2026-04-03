"use client"

import { motion } from "framer-motion"
import { CTA_FINAL, SITE_CONFIG } from "@/lib/constants"

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

export function CTAFinal() {
  return (
    <section className="bg-sandia/[0.06] warm-mesh py-16 px-5 md:py-20 md:px-8">
      <motion.div
        className="max-w-lg mx-auto text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Precio */}
        <motion.p
          variants={item}
          className="text-[2.5rem] font-bold font-serif text-sandia leading-none"
        >
          {CTA_FINAL.price}
        </motion.p>

        {/* Label precio */}
        <motion.p
          variants={item}
          className="text-[1rem] text-text-muted mt-1"
        >
          {CTA_FINAL.priceLabel}
        </motion.p>

        {/* Urgencia */}
        <motion.p
          variants={item}
          className="text-[0.875rem] text-text-muted mt-2"
        >
          {CTA_FINAL.urgency}
        </motion.p>

        {/* CTA */}
        <motion.div variants={item} className="mt-8 flex justify-center">
          <a
            href={SITE_CONFIG.mpPaymentUrl}
            className="w-full sm:w-auto sm:min-w-[320px] inline-block bg-sandia hover:bg-[#D63B4A] active:bg-[#C0353F] text-white font-semibold rounded-xl px-8 py-4 text-[17px] transition-colors duration-200 animate-breathe text-center"
          >
            {CTA_FINAL.cta}
          </a>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          variants={item}
          className="text-[13px] text-text-muted mt-3"
        >
          {CTA_FINAL.microcopy}
        </motion.p>
      </motion.div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { CTA_FINAL_V2, SITE_CONFIG } from "@/lib/constants"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function CTAFinalScarcity() {
  return (
    <section
      aria-label="CTA final"
      className="relative bg-text-dark text-white overflow-hidden py-20 px-5 md:py-28 md:px-8"
    >
      {/* Decorative orb */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-sandia/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[380px] h-[380px] rounded-full bg-celeste/10 blur-[120px]"
      />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.h2
          variants={item}
          className="font-serif font-bold text-[2.5rem] md:text-[4rem] leading-[1.05] tracking-[-0.025em]"
        >
          {CTA_FINAL_V2.h2}
        </motion.h2>

        <motion.p
          variants={item}
          className="text-[1.125rem] md:text-[1.375rem] text-white/80 mt-5 max-w-xl mx-auto leading-snug"
        >
          {CTA_FINAL_V2.sub}
        </motion.p>

        {/* Counter */}
        <motion.div
          variants={item}
          className="mt-8 inline-flex items-center gap-2 bg-sandia/10 border border-sandia/30 rounded-full px-4 py-2"
        >
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-sandia animate-pulse"
          />
          <span className="text-[14px] font-medium text-white tracking-tight">
            {CTA_FINAL_V2.counter}
          </span>
        </motion.div>

        {/* CTA full-width */}
        <motion.div variants={item} className="mt-10">
          <a
            href={SITE_CONFIG.mpPaymentUrl}
            className="w-full block bg-sandia hover:bg-[#D63B4A] active:bg-[#C0353F] text-white font-semibold rounded-2xl px-8 py-5 text-[18px] md:text-[20px] transition-colors duration-200 shadow-ambient animate-breathe text-center"
          >
            {CTA_FINAL_V2.cta}
          </a>
        </motion.div>

        <motion.p
          variants={item}
          className="text-[13px] text-white/60 mt-5 leading-relaxed"
        >
          {CTA_FINAL_V2.microcopy}
        </motion.p>
      </motion.div>
    </section>
  )
}

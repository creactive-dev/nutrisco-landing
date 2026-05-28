"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
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
      className="relative overflow-hidden py-24 px-5 md:py-32 md:px-8 text-white"
    >
      {/* Aurora dark mesh */}
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-dark" />

      {/* Decorative orbs animados */}
      <div
        aria-hidden="true"
        className="aurora-blob bg-sandia/40 w-[480px] h-[480px] -top-32 -right-32 animate-aurora-drift"
        style={{ animationDuration: "20s" }}
      />
      <div
        aria-hidden="true"
        className="aurora-blob bg-celeste/30 w-[420px] h-[420px] -bottom-40 -left-40 animate-aurora-drift"
        style={{ animationDuration: "24s", animationDelay: "-6s" }}
      />
      <div aria-hidden="true" className="grain-subtle" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Counter glass pill arriba */}
        <motion.div variants={item} className="mb-7 flex justify-center">
          <div className="glass-pill-dark rounded-full px-4 py-2 inline-flex items-center gap-2 ring-1 ring-sandia/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sandia opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sandia" />
            </span>
            <span className="text-[12px] md:text-[13px] font-medium text-white tracking-tight">
              {CTA_FINAL_V2.counter}
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={item}
          className="font-serif font-bold text-[2.5rem] md:text-[4rem] leading-[1.05] tracking-[-0.025em]"
        >
          Las 50 Primeras{" "}
          <span className="text-gradient-warm">de Nutrico</span>.
        </motion.h2>

        <motion.p
          variants={item}
          className="text-[1.125rem] md:text-[1.375rem] text-white/75 mt-6 max-w-xl mx-auto leading-snug"
        >
          {CTA_FINAL_V2.sub}
        </motion.p>

        {/* CTA full-width con glow */}
        <motion.div variants={item} className="mt-10">
          <a
            href={SITE_CONFIG.mpPaymentUrl}
            className="group relative overflow-hidden w-full block bg-gradient-warm text-white font-semibold rounded-full px-8 py-5 text-[18px] md:text-[20px] shadow-glow-sandia hover:shadow-[0_0_0_1px_rgba(233,69,85,0.30),0_24px_64px_-8px_rgba(233,69,85,0.55)] transition-all duration-300 animate-breathe text-center"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              {CTA_FINAL_V2.cta.replace(" →", "")}
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </a>
        </motion.div>

        <motion.p
          variants={item}
          className="text-[13px] text-white/55 mt-6 leading-relaxed"
        >
          {CTA_FINAL_V2.microcopy}
        </motion.p>
      </motion.div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { PRODUCT_DEMO } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function ProductDemo() {
  return (
    <section
      aria-label="Mira cómo se ve adentro"
      className="relative overflow-hidden py-20 px-5 md:py-28 md:px-8 bg-surface-low"
    >
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-50" />

      {/* Header */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center mb-14 md:mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
      >
        <motion.div variants={item} className="inline-flex mb-5">
          <Eyebrow tone="celeste">{PRODUCT_DEMO.eyebrow}</Eyebrow>
        </motion.div>
        <motion.h2
          variants={item}
          className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
        >
          {PRODUCT_DEMO.h2[0]}{" "}
          <span className="text-gradient-warm">{PRODUCT_DEMO.h2[1]}</span>
        </motion.h2>
        <motion.p
          variants={item}
          className="text-[1rem] md:text-[1.0625rem] text-text-muted mt-5 max-w-xl mx-auto leading-relaxed"
        >
          {PRODUCT_DEMO.subcopy}
        </motion.p>
      </motion.div>

      {/* Cuerpo — pasos + mockups */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Pasos */}
        <motion.ol
          className="flex flex-col gap-8 order-2 md:order-1"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PRODUCT_DEMO.steps.map((step) => (
            <motion.li key={step.number} variants={item} className="flex gap-5">
              <div className="flex-shrink-0 glass rounded-2xl w-12 h-12 flex items-center justify-center">
                <span
                  aria-hidden="true"
                  className="font-serif font-bold text-[1.15rem] text-gradient-warm leading-none"
                >
                  {step.number}
                </span>
              </div>
              <div className="pt-0.5">
                <h3 className="font-serif font-semibold text-[1.2rem] text-text-dark leading-snug mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[0.9375rem] text-text-muted leading-[1.6]">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* Mockups escalonados */}
        <motion.div
          className="relative order-1 md:order-2 flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Halo glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-warm-cool opacity-25 blur-[80px] pointer-events-none"
          />

          <div className="relative w-[260px] sm:w-[300px] md:w-[340px]">
            {/* Mockup trasero (screening) */}
            <div className="absolute -left-16 sm:-left-20 top-10 w-[58%] hidden sm:block opacity-90 -rotate-6">
              <Image
                src={PRODUCT_DEMO.framedScreens[0].src}
                alt={`App Nutrico — ${PRODUCT_DEMO.framedScreens[0].caption}`}
                width={701}
                height={1444}
                sizes="200px"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            {/* Mockup principal (progreso) */}
            <div className="relative z-10 rotate-2">
              <Image
                src={PRODUCT_DEMO.framedScreens[1].src}
                alt={`App Nutrico — ${PRODUCT_DEMO.framedScreens[1].caption}`}
                width={701}
                height={1444}
                sizes="(min-width: 768px) 340px, 280px"
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      <p className="relative z-10 text-[12px] text-text-muted text-center mt-14 md:mt-16">
        {PRODUCT_DEMO.footnote}
      </p>
    </section>
  )
}

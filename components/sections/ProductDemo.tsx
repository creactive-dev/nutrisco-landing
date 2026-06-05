"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { PRODUCT_DEMO } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const stepItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
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
        className="relative z-10 max-w-3xl mx-auto text-center mb-14 md:mb-20"
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

      {/* Showcase — 3 phones, uno por paso */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Línea conectora desktop */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-[290px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-sandia/30 to-transparent"
        />

        {PRODUCT_DEMO.steps.map((step, idx) => (
          <motion.div
            key={step.number}
            variants={stepItem}
            className="relative flex flex-col items-center text-center"
          >
            {/* Mockup pre-enmarcado */}
            <div className="relative w-[220px] sm:w-[240px] mb-7">
              <div
                aria-hidden="true"
                className={`absolute inset-0 rounded-[2rem] blur-2xl opacity-35 ${
                  idx === 1 ? "bg-celeste/40" : "bg-sandia/30"
                }`}
              />
              <Image
                src={step.mockup}
                alt={`App Nutrico — ${step.caption}`}
                width={701}
                height={1444}
                sizes="240px"
                className="relative w-full h-auto drop-shadow-2xl"
                priority={idx === 0}
              />
              {/* Caption flotante */}
              <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-strong rounded-full px-3 py-1 text-[10px] font-medium text-text-dark whitespace-nowrap z-20">
                {step.caption}
              </p>
            </div>

            {/* Número */}
            <div className="relative glass rounded-full w-12 h-12 flex items-center justify-center mb-4 z-10">
              <span
                aria-hidden="true"
                className="font-serif font-bold text-[1.25rem] text-gradient-warm leading-none"
              >
                {step.number}
              </span>
            </div>

            {/* Título + descripción */}
            <h3 className="font-serif font-semibold text-[1.2rem] text-text-dark leading-snug mb-2.5 max-w-[24ch]">
              {step.title}
            </h3>
            <p className="text-[0.9375rem] text-text-muted leading-[1.6] max-w-[30ch]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <p className="relative z-10 text-[12px] text-text-muted text-center mt-14 md:mt-16">
        {PRODUCT_DEMO.footnote}
      </p>
    </section>
  )
}

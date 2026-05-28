"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { FOUNDER_STORY } from "@/lib/constants"
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

export function Nutricionista() {
  return (
    <section
      aria-label="Quién está detrás de Nutrico"
      className="relative overflow-hidden py-20 px-5 md:py-28 md:px-8 bg-surface-lowest"
    >
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="md:grid md:grid-cols-[1fr_1.4fr] md:gap-14 md:items-center">
          {/* Columna izquierda — foto con frame glass + halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center md:justify-start mb-10 md:mb-0"
          >
            <div className="relative">
              {/* Halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 bg-gradient-warm-cool opacity-30 rounded-[2.5rem] blur-3xl"
              />

              {/* Glass frame */}
              <div className="relative glass rounded-[2.25rem] p-3">
                <div
                  data-placeholder="true"
                  className="w-56 h-56 md:w-full md:max-w-[360px] md:aspect-square rounded-3xl bg-gradient-to-br from-sandia/25 to-celeste/25 flex items-center justify-center overflow-hidden"
                  aria-label="Foto Constanza pendiente"
                >
                  <span className="text-text-muted text-sm text-center px-4">
                    [Foto Constanza pendiente]
                  </span>
                </div>

                {/* Badge credencial flotante */}
                <div className="absolute -bottom-3 -right-3 glass-strong rounded-full px-4 py-2 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full bg-celeste animate-pulse-soft"
                  />
                  <span className="text-[11px] font-semibold text-text-dark">
                    +1.200 pacientes
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha — story */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item} className="inline-flex mb-5">
              <Eyebrow tone="celeste">{FOUNDER_STORY.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h2
              variants={item}
              className="font-serif font-bold text-text-dark text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em]"
            >
              {FOUNDER_STORY.h3}
            </motion.h2>

            <motion.p
              variants={item}
              className="text-[1.0625rem] text-text-muted leading-[1.65] mt-6"
            >
              {FOUNDER_STORY.body}
            </motion.p>

            {/* Credentials — glass mini cards */}
            <motion.ul
              variants={item}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
              aria-label="Credenciales profesionales"
            >
              {FOUNDER_STORY.credentials.map((credential, index) => (
                <li
                  key={index}
                  className="glass-soft rounded-2xl px-4 py-3 flex items-start gap-2.5"
                >
                  <CheckCircle2
                    size={16}
                    className="text-celeste-600 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-[0.875rem] text-text-dark leading-snug">
                    {credential}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Quote signature */}
            <motion.blockquote
              variants={item}
              className="relative mt-10 glass rounded-3xl px-7 py-6 overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute -top-8 -left-2 font-serif text-[8rem] text-sandia/15 leading-none select-none pointer-events-none"
              >
                “
              </div>
              <p className="relative font-serif italic text-[1.5rem] md:text-[1.875rem] text-gradient-warm leading-snug tracking-tight">
                {FOUNDER_STORY.quote}
              </p>
              <p className="relative text-[12px] text-text-muted mt-2 tracking-wide">
                — Constanza Jiménez Paschold
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

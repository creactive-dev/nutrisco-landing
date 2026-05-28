"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { FOUNDER_STORY } from "@/lib/constants"

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
      className="bg-surface-lowest py-16 px-5 md:py-24 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="md:grid md:grid-cols-[1fr_1.4fr] md:gap-14 md:items-center">
          {/* Columna izquierda — foto cropped square */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center md:justify-start mb-10 md:mb-0"
          >
            <div
              data-placeholder="true"
              className="w-56 h-56 md:w-full md:max-w-[360px] md:aspect-square rounded-3xl bg-gradient-to-br from-sandia/25 to-celeste/25 flex items-center justify-center shadow-ambient overflow-hidden"
              aria-label="Foto Constanza pendiente"
            >
              <span className="text-text-muted text-sm text-center px-4">
                [Foto Constanza pendiente]
              </span>
            </div>
          </motion.div>

          {/* Columna derecha — story */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={item}
              className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4"
            >
              {FOUNDER_STORY.eyebrow}
            </motion.p>

            <motion.h2
              variants={item}
              className="font-serif font-bold text-text-dark text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em]"
            >
              {FOUNDER_STORY.h3}
            </motion.h2>

            <motion.p
              variants={item}
              className="text-[1.0625rem] text-text-muted leading-[1.65] mt-5"
            >
              {FOUNDER_STORY.body}
            </motion.p>

            {/* Credentials */}
            <motion.ul
              variants={item}
              className="mt-7 flex flex-col gap-3"
              aria-label="Credenciales profesionales"
            >
              {FOUNDER_STORY.credentials.map((credential, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={18}
                    className="text-celeste flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-[0.9375rem] text-text-dark leading-snug">
                    {credential}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Quote sandía italic */}
            <motion.blockquote
              variants={item}
              className="mt-8 border-l-4 border-sandia pl-5 py-2"
            >
              <p className="font-serif italic text-[1.5rem] md:text-[1.875rem] text-sandia leading-snug tracking-tight">
                &ldquo;{FOUNDER_STORY.quote}&rdquo;
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

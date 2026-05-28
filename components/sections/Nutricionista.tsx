"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle2, Star, ExternalLink } from "lucide-react"
import { FOUNDER_STORY, SITE_CONFIG } from "@/lib/constants"
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
          {/* Columna izquierda — foto REAL con frame glass + halo */}
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

              {/* Glass frame con foto real */}
              <div className="relative glass rounded-[2.25rem] p-3">
                <div className="relative w-56 h-72 md:w-[320px] md:h-[420px] rounded-3xl overflow-hidden ring-1 ring-white/40">
                  <Image
                    src={SITE_CONFIG.brand.constanzaPhoto}
                    alt="Constanza Jiménez Paschold — Nutricionista clínica · La Serena, Chile"
                    fill
                    sizes="(min-width: 768px) 320px, 224px"
                    className="object-cover object-center"
                  />

                  {/* Gradient overlay sutil bottom para legibilidad del badge */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-text-dark/40 via-text-dark/0 to-transparent"
                  />
                </div>

                {/* Badge credencial flotante — Google rating */}
                <a
                  href={SITE_CONFIG.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -bottom-3 -right-3 glass-strong rounded-2xl px-4 py-3 flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="flex items-center gap-0.5" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className="text-[#fbbf24]"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-text-dark leading-none">
                      5.0 en Google
                    </span>
                    <span className="text-[10px] text-text-muted leading-none mt-0.5">
                      ver reseñas
                    </span>
                  </div>
                  <ExternalLink
                    size={12}
                    className="text-text-muted flex-shrink-0"
                    aria-hidden="true"
                  />
                </a>

                {/* Badge pacientes flotante top-left */}
                <div className="absolute -top-3 -left-3 glass-strong rounded-2xl px-3.5 py-2 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full bg-celeste animate-pulse-soft"
                  />
                  <div>
                    <p className="text-[11px] font-bold text-text-dark leading-none">
                      +2.500 pacientes
                    </p>
                    <p className="text-[9px] text-text-muted leading-none mt-0.5">
                      en 10 años de consulta
                    </p>
                  </div>
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

            {/* Credentials — glass mini cards en grid 2 cols */}
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

            {/* Quote signature en glass card */}
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
                — Constanza Jiménez Paschold · Nutricionista clínica certificada
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

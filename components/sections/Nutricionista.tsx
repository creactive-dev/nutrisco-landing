"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { NUTRICIONISTA } from "@/lib/constants"

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
    <section className="bg-surface-lowest py-16 px-5 md:py-24 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="md:grid md:grid-cols-2 md:gap-16 md:items-start">

          {/* Columna izquierda — foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center md:justify-start mb-10 md:mb-0"
          >
            {/*
              TODO: Reemplazar este placeholder con:
              <img
                src="/images/constanza-foto.jpg"
                alt="Constanza Paschold N., nutricionista clínica"
                className="w-full h-auto rounded-4xl object-cover shadow-ambient"
              />
            */}
            <div className="w-32 h-32 md:w-72 md:h-80 rounded-4xl bg-gradient-to-br from-sandia/20 to-celeste/20 flex items-center justify-center mx-auto md:mx-0 shadow-ambient">
              <span className="text-text-muted text-sm select-none">
                Foto de Constanza
              </span>
            </div>
          </motion.div>

          {/* Columna derecha — bio */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={item}
              className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4"
            >
              {NUTRICIONISTA.eyebrow}
            </motion.p>

            {/* H2 — nombre */}
            <motion.h2
              variants={item}
              className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.5rem] leading-[1.1] tracking-[-0.025em]"
            >
              {NUTRICIONISTA.name}
            </motion.h2>

            {/* Título / credenciales */}
            <motion.p
              variants={item}
              className="text-[0.9375rem] text-text-muted mt-2"
            >
              {NUTRICIONISTA.title}
            </motion.p>

            {/* Stat prominente */}
            <motion.div variants={item} className="mt-6">
              <span className="font-serif font-bold text-[3rem] text-sandia leading-none">
                {NUTRICIONISTA.stat}
              </span>
              <p className="text-text-muted text-[0.9375rem] mt-1">
                {NUTRICIONISTA.statLabel}
              </p>
            </motion.div>

            {/* Cita */}
            <motion.div
              variants={item}
              className="relative mt-6 pl-4"
            >
              {/* Comilla decorativa */}
              <span
                aria-hidden="true"
                className="absolute -top-1 -left-1 text-[2.5rem] font-serif text-sandia/20 leading-none select-none"
              >
                &ldquo;
              </span>
              <p className="italic text-[1rem] text-text-muted leading-[1.65]">
                {NUTRICIONISTA.quote}
              </p>
            </motion.div>

            {/* Lista de credenciales */}
            <motion.ul
              variants={item}
              className="mt-6 flex flex-col gap-3"
              aria-label="Credenciales profesionales"
            >
              {NUTRICIONISTA.credentials.map((credential, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-celeste flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-[0.9375rem] text-text-muted leading-snug">
                    {credential}
                  </span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

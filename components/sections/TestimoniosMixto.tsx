"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { TESTIMONIOS_MIXTO } from "@/lib/constants"
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

export function TestimoniosMixto() {
  return (
    <section
      aria-label="Testimonios de mujeres del Reto"
      className="relative overflow-hidden bg-crema py-20 px-5 md:py-28 md:px-8"
    >
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-50" />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <motion.div variants={item} className="inline-flex mb-5">
            <Eyebrow tone="celeste">{TESTIMONIOS_MIXTO.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={item}
            className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
          >
            No tengo que{" "}
            <span className="text-gradient-warm">convencerte</span> yo.
          </motion.h2>
        </div>

        {/* Bloque 1 — Videos */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-20"
        >
          {TESTIMONIOS_MIXTO.videos.map((video, idx) => (
            <button
              key={video.id}
              type="button"
              data-placeholder="true"
              aria-label={`Reproducir testimonio de ${video.name}`}
              className="group relative aspect-[9/16] bg-text-dark rounded-[1.75rem] overflow-hidden shadow-glass hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Halo glow */}
              <div
                aria-hidden="true"
                className={`absolute -inset-1 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  idx === 1 ? "bg-celeste/40" : "bg-sandia/40"
                }`}
              />

              <div className="relative h-full">
                {/* Placeholder gradient (TODO: replace with poster image) */}
                <div className="absolute inset-0 bg-gradient-to-br from-text-dark via-text-dark to-sandia/30" />

                {/* Topic badge glass */}
                <div className="absolute top-4 left-4 glass-pill-dark rounded-full px-3 py-1">
                  <span className="text-[11px] font-medium text-white tracking-tight">
                    {video.topic}
                  </span>
                </div>

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full glass-strong flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play
                      size={22}
                      className="text-sandia ml-1"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-left">
                  <p className="text-white font-semibold text-[15px]">
                    {video.name}
                  </p>
                  <p className="text-white/70 text-[13px]">{video.age}</p>
                  <p className="text-white/40 text-[11px] mt-1">
                    [Video pendiente]
                  </p>
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Bloque 2 — WhatsApp wall (estilo chat real) */}
        <motion.div variants={item} className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {TESTIMONIOS_MIXTO.whatsapps.map((msg, idx) => (
              <div
                key={msg.id}
                data-placeholder="true"
                className="group relative transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  transform: `rotate(${idx % 2 === 0 ? -0.6 : 0.6}deg)`,
                }}
              >
                <div className="bg-[#dcf8c6] rounded-2xl rounded-tr-[4px] p-4 shadow-card">
                  <p className="text-[14px] text-[#075e54] leading-[1.5] mb-3">
                    {msg.message}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#075e54]/80 font-medium">
                      {msg.author}
                    </span>
                    <svg
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-[#075e54]/70"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M2 8L5 11L13 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 8L9 11L14 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={item}
          className="text-[12px] text-text-muted text-center mt-10 italic"
        >
          {TESTIMONIOS_MIXTO.whatsappFooter}
        </motion.p>
      </motion.div>
    </section>
  )
}

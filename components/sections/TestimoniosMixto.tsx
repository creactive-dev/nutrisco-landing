"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { TESTIMONIOS_MIXTO } from "@/lib/constants"

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
      className="bg-crema py-16 px-5 md:py-24 md:px-8"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            variants={item}
            className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4"
          >
            {TESTIMONIOS_MIXTO.eyebrow}
          </motion.p>
          <motion.h2
            variants={item}
            className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
          >
            {TESTIMONIOS_MIXTO.h2}
          </motion.h2>
        </div>

        {/* Bloque 1 — Videos */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-20"
        >
          {TESTIMONIOS_MIXTO.videos.map((video) => (
            <button
              key={video.id}
              type="button"
              data-placeholder="true"
              aria-label={`Reproducir testimonio de ${video.name}`}
              className="group relative aspect-[9/16] bg-text-dark rounded-3xl overflow-hidden shadow-card hover:shadow-ambient transition-shadow"
            >
              {/* Placeholder gradient (TODO: replace with poster image) */}
              <div className="absolute inset-0 bg-gradient-to-br from-text-dark via-text-dark to-sandia/30" />

              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-sandia flex items-center justify-center shadow-ambient group-hover:scale-105 transition-transform">
                  <Play size={24} className="text-white ml-1" fill="currentColor" aria-hidden="true" />
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left">
                <p className="text-white font-semibold text-[15px]">
                  {video.name}
                </p>
                <p className="text-white/80 text-[13px]">
                  {video.age} · {video.topic}
                </p>
                <p className="text-white/50 text-[11px] mt-1">[Video pendiente]</p>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Bloque 2 — WhatsApp wall */}
        <motion.div variants={item} className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {TESTIMONIOS_MIXTO.whatsapps.map((msg) => (
              <div
                key={msg.id}
                data-placeholder="true"
                className="bg-[#dcf8c6] rounded-2xl rounded-tr-sm p-4 shadow-card-sm relative"
              >
                <p className="text-[14px] text-[#075e54] leading-[1.5] mb-3">
                  {msg.message}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#075e54]/70 font-medium">
                    {msg.author}
                  </span>
                  <span className="text-[10px] text-[#075e54]/50">
                    [Screenshot real pendiente]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={item}
          className="text-[12px] text-text-muted text-center mt-8 italic"
        >
          {TESTIMONIOS_MIXTO.whatsappFooter}
        </motion.p>
      </motion.div>
    </section>
  )
}

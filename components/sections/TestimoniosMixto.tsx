"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Star, BadgeCheck, Volume2, VolumeX } from "lucide-react"
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

type VideoData = (typeof TESTIMONIOS_MIXTO.videos)[number]

/**
 * Card de video testimonio.
 * Autoplay muted + loop + playsInline. Se reproduce SOLO cuando entra al viewport
 * (IntersectionObserver) y se pausa al salir — evita 3 videos corriendo en background.
 * Botón opcional para activar el sonido (autoplay arranca en mute por requerimiento).
 */
function VideoCard({ video, accent }: { video: VideoData; accent: "sandia" | "celeste" }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* algunos navegadores bloquean autoplay aun en mute — no es crítico */
          })
        } else {
          el.pause()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function toggleSound() {
    const el = ref.current
    if (!el) return
    const next = !muted
    el.muted = next
    setMuted(next)
    if (!next) el.play().catch(() => {})
  }

  return (
    <div className="group relative aspect-[9/16] rounded-[1.75rem] overflow-hidden shadow-glass hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-1 bg-text-dark">
      {/* Halo glow */}
      <div
        aria-hidden="true"
        className={`absolute -inset-1 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          accent === "celeste" ? "bg-celeste/40" : "bg-sandia/40"
        }`}
      />

      <video
        ref={ref}
        className="relative h-full w-full object-cover"
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Botón de sonido */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
        className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full glass-strong flex items-center justify-center hover:scale-105 transition-transform"
      >
        {muted ? (
          <VolumeX size={16} className="text-white" aria-hidden="true" />
        ) : (
          <Volume2 size={16} className="text-white" aria-hidden="true" />
        )}
      </button>

      {/* Label inferior */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4 text-left pointer-events-none">
        <p className="text-white font-semibold text-[15px] leading-tight">
          {video.name}
        </p>
        <p className="text-white/65 text-[12px] mt-0.5">{video.subtitle}</p>
      </div>
    </div>
  )
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

        {/* Bloque 1 — Videos autoplay */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20 max-w-xs sm:max-w-none mx-auto"
        >
          {TESTIMONIOS_MIXTO.videos.map((video, idx) => (
            <VideoCard
              key={video.id}
              video={video}
              accent={idx === 1 ? "celeste" : "sandia"}
            />
          ))}
        </motion.div>

        {/* Bloque 2 — Cards de testimonios (estilo reseña verificada) */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {TESTIMONIOS_MIXTO.cards.map((c) => (
            <div
              key={c.id}
              className="glass rounded-[1.5rem] p-6 flex flex-col shadow-card hover:-translate-y-0.5 transition-transform duration-300"
            >
              {/* Estrellas */}
              <div className="flex items-center gap-0.5 mb-4" aria-label="5 de 5 estrellas">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className="text-[#fbbf24]"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[15px] text-text-dark/90 leading-[1.6] italic flex-1">
                &ldquo;{c.quote}&rdquo;
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 rounded-full bg-sandia/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sandia-600 font-bold text-[15px]">
                    {c.initial}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-text-dark leading-tight">
                    {c.name}
                  </p>
                  <p className="text-[12px] text-emerald-600 flex items-center gap-1 mt-0.5">
                    <BadgeCheck size={13} className="flex-shrink-0" aria-hidden="true" />
                    Verificado
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="text-[12px] text-text-muted text-center mt-10 italic"
        >
          {TESTIMONIOS_MIXTO.cardsFooter}
        </motion.p>
      </motion.div>
    </section>
  )
}

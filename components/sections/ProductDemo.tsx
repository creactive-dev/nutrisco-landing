"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { Volume2, VolumeX, Play } from "lucide-react"
import { PRODUCT_DEMO } from "@/lib/constants"
import { Eyebrow } from "@/components/ui/Eyebrow"

export function ProductDemo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleAudio = () => {
    if (!videoRef.current) return
    const next = !muted
    videoRef.current.muted = next
    setMuted(next)
  }

  return (
    <section
      aria-label="Demo del producto"
      className="relative overflow-hidden py-20 px-5 md:py-28 md:px-8 bg-surface-low"
    >
      {/* Soft backdrop */}
      <div aria-hidden="true" className="absolute inset-0 aurora-mesh-soft opacity-50" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex mb-5">
          <Eyebrow tone="celeste">{PRODUCT_DEMO.eyebrow}</Eyebrow>
        </div>
        <h2 className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]">
          Tu plan, listo en{" "}
          <span className="text-gradient-warm">24 horas</span>.
        </h2>
      </motion.div>

      <motion.div
        className="relative z-10 max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Halo glow detrás del video */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-warm-cool opacity-30 blur-[80px] pointer-events-none"
        />

        <div className="relative bg-text-dark rounded-[2rem] overflow-hidden shadow-glass ring-1 ring-white/5">
          {/* TODO: replace with /mockups/mock-flow-completo.mp4 */}
          <div
            data-placeholder="true"
            className="aspect-[9/19] w-full bg-gradient-to-br from-text-dark via-text-dark to-celeste/20 flex items-center justify-center relative"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0"
              aria-label="Demo del flujo de la app Nutrico"
            >
              {/* <source src={PRODUCT_DEMO.videoSrc} type="video/mp4" /> */}
            </video>

            <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
              <button
                type="button"
                aria-label="Reproducir demo"
                className="group w-20 h-20 rounded-full glass-strong flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <Play
                  size={28}
                  className="text-sandia ml-1 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  aria-hidden="true"
                />
              </button>
              <span className="text-white/80 text-sm mt-2">
                [Video demo pendiente]
              </span>
              <span className="text-white/40 text-xs">
                {PRODUCT_DEMO.videoSrc}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleAudio}
            aria-label={muted ? "Activar audio" : "Silenciar audio"}
            className="absolute bottom-4 right-4 z-20 glass-strong text-text-dark rounded-full p-2.5 hover:scale-105 transition-all duration-200"
          >
            {muted ? (
              <VolumeX size={18} aria-hidden="true" />
            ) : (
              <Volume2 size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        <p className="text-[13px] text-text-muted text-center mt-5">
          {PRODUCT_DEMO.microcopy}
        </p>
      </motion.div>
    </section>
  )
}

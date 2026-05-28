"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { PRODUCT_DEMO } from "@/lib/constants"

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
      className="bg-surface-low py-16 px-5 md:py-24 md:px-8"
    >
      <motion.div
        className="max-w-3xl mx-auto text-center mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4">
          {PRODUCT_DEMO.eyebrow}
        </p>
        <h2 className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]">
          {PRODUCT_DEMO.h2}
        </h2>
      </motion.div>

      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative bg-text-dark rounded-3xl overflow-hidden shadow-ambient">
          {/* TODO: replace with /mockups/mock-flow-completo.mp4 + /mockups/mock-flow-poster.jpg */}
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
              <div className="w-16 h-16 rounded-full bg-sandia/20 border border-sandia/40 flex items-center justify-center">
                <span className="text-sandia text-2xl">▶</span>
              </div>
              <span className="text-white/80 text-sm">[Video demo pendiente]</span>
              <span className="text-white/50 text-xs">
                {PRODUCT_DEMO.videoSrc}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleAudio}
            aria-label={muted ? "Activar audio" : "Silenciar audio"}
            className="absolute bottom-4 right-4 z-20 bg-white/90 hover:bg-white text-text-dark rounded-full p-2.5 shadow-card transition-colors"
          >
            {muted ? (
              <VolumeX size={18} aria-hidden="true" />
            ) : (
              <Volume2 size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        <p className="text-[13px] text-text-muted text-center mt-4">
          {PRODUCT_DEMO.microcopy}
        </p>
      </motion.div>
    </section>
  )
}

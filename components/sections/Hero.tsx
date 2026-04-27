'use client'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { CTAPrincipal } from '@/components/ui/CTAPrincipal'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import type { LaunchMode } from '@/types'

interface HeroProps {
  mode: LaunchMode
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const GoogleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export function Hero({ mode }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const mockupY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -40]
  )

  return (
    <section
      ref={sectionRef}
      className="bg-crema warm-mesh pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="container-landing px-5 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Columna texto */}
          <motion.div
            className="flex-1 lg:max-w-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow badges */}
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2.5 flex-wrap">
              <Pill
                variant="outline-coral"
                icon={<span className="text-sandia text-[9px] animate-pulse">✦</span>}
              >
                Plan mensual antiinflamatorio
              </Pill>

              {/* Google Reviews badge */}
              <Pill
                variant="glass-light"
                icon={<GoogleIcon />}
              >
                <span className="text-yellow-500 text-[10px] leading-none mr-0.5">★</span>
                <span className="text-gray-mid">5.0 Google</span>
              </Pill>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-black text-4xl md:text-5xl lg:text-display text-carbon leading-[1.1] tracking-tight mb-6"
            >
              Deja de empezar de cero cada vez.{' '}
              <span className="block mt-2 text-sandia">
                Tu plan antiinflamatorio se ajusta contigo.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-mid font-body leading-relaxed mb-8"
            >
              Sin dietas genéricas. Sin esperar turno de consulta para resolver una duda.
              Solo tu protocolo antiinflamatorio, personalizado y ajustado a cómo vas
              respondiendo — mes a mes.
            </motion.p>

            {/* CTA principal */}
            <motion.div variants={itemVariants}>
              <CTAPrincipal mode={mode} variant="hero" darkBg={false} />
            </motion.div>

            {/* CTA secundario */}
            {(mode === 'venta' || mode === 'preregistro') && (
              <motion.div variants={itemVariants} className="mt-4">
                <Button
                  variant="ghost"
                  href="#como-funciona"
                  className="text-gray-mid hover:text-sandia"
                >
                  Ver cómo funciona ↓
                </Button>
              </motion.div>
            )}

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-3 bg-white border border-black/[0.06] shadow-card rounded-xl max-w-max px-4 py-3"
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2 flex-shrink-0">
                {['#E8847A','#73C3E4','#A8D5B5','#F4C56E'].map((color, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-crema flex items-center justify-center"
                    style={{ background: `${color}30` }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="8" r="4" fill={color} opacity="0.9"/>
                      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill={color} opacity="0.9"/>
                    </svg>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#FBBF24" aria-hidden="true">
                      <path d="M5 0.833L6.175 3.508L9.167 3.817L7.083 5.8L7.592 8.833L5 7.292L2.408 8.833L2.917 5.8L0.833 3.817L3.825 3.508L5 0.833Z"/>
                    </svg>
                  ))}
                  <span className="text-[11px] text-yellow-500 font-semibold ml-1 font-body">5.0</span>
                </div>
                <p className="text-[12px] text-gray-mid font-body leading-tight">
                  Más de <strong className="text-carbon font-semibold">2.500 pacientes</strong> acompañadas
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Columna mockup — solo desktop */}
          <div className="hidden lg:flex flex-1 justify-center items-center relative">
            <div className="absolute inset-0 bg-sandia/15 blur-[80px] rounded-full w-[280px] h-[280px] m-auto z-0" />
            <motion.div style={{ y: mockupY }} className="animate-float relative z-10">
              <Image
                src="/mockups/mockuphome.png"
                alt="Vista previa de Nutrisco — tu plan antiinflamatorio personalizado"
                width={380}
                height={520}
                className="w-full max-w-[320px] object-contain drop-shadow-[0_24px_48px_rgba(14,34,51,0.18)]"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

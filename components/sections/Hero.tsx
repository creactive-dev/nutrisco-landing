"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Receipt, Lock } from "lucide-react"
import { HERO, SITE_CONFIG } from "@/lib/constants"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const trustIconMap = {
  "shield-check": ShieldCheck,
  receipt: Receipt,
  lock: Lock,
} as const

type TrustIconKey = keyof typeof trustIconMap

export default function Hero() {
  return (
    <section className="bg-crema warm-mesh relative overflow-hidden pt-24 pb-16 px-5 md:pt-32 md:pb-24 md:px-8">
      <div aria-hidden="true" className="grain" />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Badge fundador */}
        <motion.div variants={item} className="inline-flex items-center gap-2 bg-celeste/15 text-celeste rounded-full px-4 py-1.5 text-[13px] font-medium">
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-celeste animate-breathe"
          />
          {HERO.badge}
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={item}
          className="font-serif font-bold text-text-dark mt-5 text-[2.75rem] md:text-[4.5rem] leading-[1.0] tracking-[-0.03em]"
        >
          {HERO.h1[0]}
          <br className="block" />
          {HERO.h1[1]}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={item}
          className="text-[1.0625rem] md:text-[1.125rem] text-text-muted leading-[1.6] mt-5 max-w-lg mx-auto"
        >
          {HERO.subtitle}
        </motion.p>

        {/* Trust badges */}
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-3 mt-6"
        >
          {HERO.trustBadges.map((badge) => {
            const Icon = trustIconMap[badge.icon as TrustIconKey]
            return (
              <div
                key={badge.icon}
                className="bg-surface-lowest rounded-full px-3 py-1.5 text-[13px] text-text-muted flex items-center gap-1.5 shadow-card"
              >
                {Icon && <Icon size={13} className="text-celeste flex-shrink-0" />}
                {badge.text}
              </div>
            )
          })}
        </motion.div>

        {/* CTA Principal */}
        <motion.div variants={item} className="mt-8 flex justify-center">
          <a
            href={SITE_CONFIG.mpPaymentUrl}
            className="w-full sm:w-auto sm:min-w-[320px] inline-block bg-sandia hover:bg-[#D63B4A] active:bg-[#C0353F] text-white font-semibold rounded-xl px-8 py-4 text-[17px] transition-colors duration-200 animate-breathe text-center"
          >
            {HERO.cta}
          </a>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          variants={item}
          className="mt-3 text-[13px] text-text-muted"
        >
          {HERO.microcopy}
        </motion.p>
      </motion.div>
    </section>
  )
}

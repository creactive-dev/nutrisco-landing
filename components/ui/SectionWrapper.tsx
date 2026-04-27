'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  bg?: string
  className?: string
  noPadding?: boolean
}

export function SectionWrapper({
  children,
  id,
  bg = 'bg-crema',
  className = '',
  noPadding = false,
}: SectionWrapperProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={[bg, !noPadding ? 'section-padding' : '', className].filter(Boolean).join(' ')}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.section>
  )
}

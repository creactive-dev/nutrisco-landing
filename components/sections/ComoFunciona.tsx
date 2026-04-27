'use client'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Pill } from '@/components/ui/Pill'
import { PASOS } from '@/lib/constants'

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.15 },
  }),
}

export function ComoFunciona() {
  return (
    <SectionWrapper bg="bg-crema" id="como-funciona">
      <div className="container-landing">
        {/* Eyebrow */}
        <div className="flex justify-center mb-4">
          <Pill variant="solid">El método único</Pill>
        </div>

        <h2 className="font-display font-black text-display-sm text-carbon text-center tracking-tight">
          Así funciona en 3 pasos
        </h2>

        <div className="flex flex-col md:flex-row gap-8 mt-14 relative">
          {/* Línea conectora — solo desktop */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px border-t-2 border-dashed border-sandia/30 -z-0 pointer-events-none" />

          {PASOS.map((paso, index) => (
            <motion.div
              key={paso.title}
              custom={index}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative z-10"
            >
              {/* Número editorial grande */}
              <div className="w-20 h-20 rounded-full border-2 border-sandia/15 bg-sandia/5 flex items-center justify-center mb-3 flex-shrink-0">
                <span className="font-display font-black text-[2.25rem] text-sandia leading-none select-none">
                  {paso.number}
                </span>
              </div>

              <h3 className="font-display font-bold text-carbon text-lg mt-1">
                {paso.title}
              </h3>
              <p className="font-body text-gray-mid text-sm leading-relaxed mt-2">
                {paso.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

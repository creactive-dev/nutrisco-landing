'use client'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { PILARES } from '@/lib/constants'

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export function QueEsNutrisco() {
  return (
    <SectionWrapper bg="bg-carbon" id="que-es-nutrisco">
      <div className="container-landing">
        <h2 className="font-display font-bold text-display-sm text-white text-center">
          Nutrisco es el acompañamiento mensual que siempre necesitaste
        </h2>
        <p className="text-[#D1D5DB] text-base leading-relaxed font-body max-w-2xl mx-auto mt-4 mb-12 text-center">
          No es una app de recetas. No es un curso. No es un plan genérico que le sirve a
          cualquiera. Nutrisco es la metodología antiinflamatoria de Constanza en formato
          digital: un plan personalizado para ti, que se ajusta cada 15 días según cómo
          estás respondiendo, con soporte real cuando lo necesitas.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PILARES.map((pilar, index) => (
            <motion.div
              key={pilar.title}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-dark-card rounded-card p-6 flex flex-col gap-3 transition-shadow hover:shadow-lg"
            >
              <span
                className={[
                  'text-3xl',
                  index % 2 === 0 ? 'text-[#E94555]' : 'text-[#73C3E4]',
                ].join(' ')}
              >
                {pilar.icon}
              </span>
              <h3 className="font-body font-medium text-white text-[15px]">
                {pilar.title}
              </h3>
              <p className="font-body text-[#9CA3AF] text-sm leading-relaxed">
                {pilar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

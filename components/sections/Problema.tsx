'use client'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { PROBLEMAS } from '@/lib/constants'

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

export function Problema() {
  return (
    <SectionWrapper bg="bg-white" id="problema">
      <div className="container-landing">
        <h2 className="font-display font-bold text-display-sm text-carbon text-center">
          ¿Te suena familiar?
        </h2>
        <p className="text-gray-mid text-base text-center mb-12 mt-3 max-w-2xl mx-auto font-body leading-relaxed">
          Si llevas meses sintiéndote así, no es falta de voluntad. Es falta de
          acompañamiento real.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PROBLEMAS.map((problema) => (
            <motion.div
              key={problema.title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative overflow-hidden bg-white rounded-card p-8 flex flex-col gap-4 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-sandia/20 group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sandia to-celeste opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-14 h-14 rounded-full bg-surface-low flex items-center justify-center text-3xl mb-2 group-hover:bg-sandia/5 transition-colors">
                {problema.icon}
              </div>
              <h3 className="font-body font-bold text-carbon text-[17px]">
                {problema.title}
              </h3>
              <p className="font-body text-gray-mid text-[15px] leading-relaxed">
                {problema.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

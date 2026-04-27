'use client'
import { motion } from 'framer-motion'
import { Mockup } from '@/components/ui/Mockup'
import { MOCKUPS } from '@/lib/constants'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const mockupVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function ProductPreview() {
  return (
    <section className="bg-white section-padding" id="producto">
      <div className="container-landing">
        <h2 className="font-display font-bold text-display-sm text-carbon text-center">
          Así se ve por dentro
        </h2>
        <p className="text-gray-mid text-base text-center mt-3 mb-12 font-body">
          Diseñado para ser simple. Sin curva de aprendizaje.
        </p>

        {/* Desktop — 3 mockups con el del centro elevado */}
        <motion.div
          className="hidden md:flex justify-center gap-10 mt-12 items-end"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {MOCKUPS.map((mockup, index) => (
            <motion.div
              key={mockup.src}
              variants={mockupVariants}
              className={[
                'transition-transform',
                index === 0
                  ? 'scale-110 z-10'
                  : 'opacity-80 scale-95',
              ].join(' ')}
            >
              <Mockup src={mockup.src} alt={mockup.alt} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile — carrusel horizontal */}
        <motion.div
          className="overflow-x-auto flex gap-6 snap-x snap-mandatory pb-4 md:hidden mt-12 -mx-5 px-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {MOCKUPS.map((mockup) => (
            <motion.div
              key={mockup.src}
              variants={mockupVariants}
              className="snap-center flex-shrink-0"
            >
              <Mockup src={mockup.src} alt={mockup.alt} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

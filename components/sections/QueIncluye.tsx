'use client'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FEATURES } from '@/lib/constants'

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function QueIncluye() {
  return (
    <SectionWrapper bg="bg-crema" id="que-incluye">
      <div className="container-landing">
        <h2 className="font-display font-bold text-display-sm text-carbon text-center">
          Todo lo que incluye tu suscripción mensual
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className={[
                'bg-white rounded-card p-5 flex items-start gap-4 shadow-card ghost-border transition-shadow hover:shadow-md',
                index === 6 ? 'sm:col-span-2 lg:col-span-1' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{feature.icon}</span>
              <div>
                <h3 className="font-body font-medium text-carbon text-[15px]">
                  {feature.title}
                </h3>
                <p className="font-body text-gray-mid text-[13px] leading-relaxed mt-1">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

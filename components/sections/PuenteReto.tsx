'use client'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Pill } from '@/components/ui/Pill'

const RETO_ITEMS = [
  'Un mapa claro para 21 días',
  'Probaste que tu cuerpo responde',
  'Mejoraste energía, digestión e inflamación',
]

const NUTRISCO_ITEMS = [
  'Plan mensual ajustado a tu perfil específico',
  'Se actualiza cada 15 días según cómo vas',
  'Los resultados no se pierden cuando termina',
]

function CheckItem({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 text-sm font-body leading-snug">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="mt-0.5 flex-shrink-0"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7" fill={dark ? 'rgba(255,255,255,0.15)' : 'rgba(233,69,85,0.12)'}/>
        <path d="M5 8l2 2 4-4" stroke={dark ? '#fff' : '#E94555'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className={dark ? 'text-white/80' : 'text-carbon/80'}>{text}</span>
    </li>
  )
}

export function PuenteReto() {
  return (
    <SectionWrapper bg="bg-[#FDF5F0]" id="puente-reto">
      <div className="container-landing max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-4"
        >
          <Pill variant="outline-coral">Para quienes ya hicieron el reto</Pill>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="font-display font-black text-display-sm text-carbon text-center tracking-tight mb-6"
        >
          ¿Hiciste el Reto Antiinflamatorio<br className="hidden sm:block" /> de 21 Días?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-body text-carbon/70 text-base leading-relaxed text-center max-w-2xl mx-auto mb-8"
        >
          Entonces ya sabes que el cuerpo responde cuando le das lo que necesita.
          Lo viste en tus niveles de energía, en tu digestión, en cómo te sentiste
          esas semanas.
        </motion.p>

        {/* Callout — insight clave */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="bg-carbon rounded-card px-8 py-7 text-center mb-8"
        >
          <p className="font-display font-black text-2xl md:text-3xl text-white leading-tight tracking-tight">
            El problema es lo que pasa
            <span className="text-sandia"> después del día 21.</span>
          </p>
        </motion.div>

        {/* Comparación dos columnas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Columna 1 — El reto */}
          <div className="bg-white rounded-card p-6 ghost-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">📋</span>
              <p className="font-display font-bold text-carbon text-sm uppercase tracking-[0.1em]">
                El reto te dio
              </p>
            </div>
            <ul className="space-y-3">
              {RETO_ITEMS.map((item) => (
                <CheckItem key={item} text={item} dark={false} />
              ))}
            </ul>
          </div>

          {/* Columna 2 — Nutrisco */}
          <div className="bg-sandia rounded-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">🔄</span>
              <p className="font-display font-bold text-white text-sm uppercase tracking-[0.1em]">
                Nutrisco es lo que sigue
              </p>
            </div>
            <ul className="space-y-3">
              {NUTRISCO_ITEMS.map((item) => (
                <CheckItem key={item} text={item} dark={true} />
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

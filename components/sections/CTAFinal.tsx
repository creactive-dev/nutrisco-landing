'use client'
import { motion } from 'framer-motion'
import { CTAPrincipal } from '@/components/ui/CTAPrincipal'
import { Button } from '@/components/ui/Button'
import type { LaunchMode } from '@/types'
import { OFERTA } from '@/lib/constants'

interface CTAFinalProps {
  mode: LaunchMode
}

export function CTAFinal({ mode }: CTAFinalProps) {
  return (
    <section className="bg-sandia section-padding" id="cta-final">
      <div className="container-landing text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="font-display font-black text-display text-white text-balance tracking-tight">
            Ya no más empezar de cero.
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed max-w-xl mx-auto mt-4 mb-8">
            Únete a las primeras 100 fundadoras de Nutrisco y mantén tu precio bloqueado para siempre.
          </p>

          {mode === 'preregistro' ? (
            <div className="max-w-md mx-auto">
              <CTAPrincipal mode={mode} variant="final" darkBg={true} />
            </div>
          ) : (
            <Button variant="invert" href={OFERTA.mpUrl} size="lg">
              → Empezar ahora — {OFERTA.precioFundador}/mes
            </Button>
          )}

          <p className="font-body text-white/60 text-[13px] mt-4">
            Suscripción mensual · Cancelas cuando quieras · Boleta exenta de IVA incluida
          </p>
        </motion.div>
      </div>
    </section>
  )
}

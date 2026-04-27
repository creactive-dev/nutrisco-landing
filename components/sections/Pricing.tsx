'use client'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BloqueIsapre } from '@/components/ui/BloqueIsapre'
import { ContadorCupos } from '@/components/ui/ContadorCupos'
import { CTAPrincipal } from '@/components/ui/CTAPrincipal'
import { Pill } from '@/components/ui/Pill'
import { CHECKS, OFERTA } from '@/lib/constants'
import type { LaunchMode } from '@/types'

interface PricingProps {
  mode: LaunchMode
}

export function Pricing({ mode }: PricingProps) {
  return (
    <SectionWrapper bg="bg-carbon" id="precio">
      <div className="container-landing max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <Pill variant="outline-coral">Oferta Fundadora</Pill>
          <h2 className="font-display font-black text-display-sm text-white mt-4 tracking-tight">
            Precio bloqueado para siempre
          </h2>
          <p className="text-[#9CA3AF] text-base font-body mt-2">
            Solo para las primeras 100 personas. Sin letra chica.
          </p>
        </div>

        {/* Card central */}
        <div className="relative mt-12">
          {/* Fondo resplandeciente */}
          <div className="absolute inset-0 bg-sandia/20 blur-[60px] rounded-full animate-pulse" />
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative bg-dark-card rounded-card p-8 md:p-10 space-y-6 border border-white/10 glass-dark"
          >
            {/* Badge superpuesto */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sandia to-[#ff6b7a] text-white text-[11px] uppercase tracking-wider font-bold font-body px-5 py-1.5 rounded-full shadow-[0_4px_14px_rgba(233,69,85,0.5)] whitespace-nowrap z-10 border border-white/20">
              SOLO 100 CUPOS DISPONIBLES
            </div>
            
            {/* Precio */}
            <div className="space-y-1">
            <span className="font-body text-gray-mid text-base line-through">
              {OFERTA.precioRegular} / mes
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-body font-bold text-5xl text-white">
                {OFERTA.precioFundador}
              </span>
              <span className="text-[#9CA3AF] font-body">/ mes</span>
            </div>
            <p className="text-celeste text-xs font-medium font-body uppercase tracking-wide">
              bloqueado de por vida
            </p>
          </div>

          <div className="border-t border-white/10" />

          {/* Lista de checks */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CHECKS.map((check, i) => (
              <li key={i} className="flex items-center gap-2 text-[14px] text-white/80 font-body">
                <span className="text-celeste text-base flex-shrink-0">✅</span>
                {check}
              </li>
            ))}
          </ul>

          <div className="border-t border-white/10" />

          {/* CTA */}
          <div className="[&_a]:shadow-[0_8px_28px_rgba(233,69,85,0.5)] [&_button]:shadow-[0_8px_28px_rgba(233,69,85,0.5)]">
            <CTAPrincipal mode={mode} variant="pricing" darkBg={true} />
          </div>

          <p className="text-center text-[12px] text-white/40 font-body">
            Pago mensual recurrente. Cancelas cuando quieras desde tu perfil.
          </p>

          {mode === 'venta' && <ContadorCupos />}
          </motion.div>
        </div>

        {/* Bloque Isapre */}
        <div className="mt-6">
          <BloqueIsapre />
        </div>
      </div>
    </SectionWrapper>
  )
}

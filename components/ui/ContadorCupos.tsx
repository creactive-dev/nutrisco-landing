'use client'

import { motion } from 'framer-motion'
import { OFERTA } from '@/lib/constants'

export function ContadorCupos() {
  const cupos = OFERTA.cuposDisponibles
  const porcentaje = Math.round(((OFERTA.cuposTotal - cupos) / OFERTA.cuposTotal) * 100)

  return (
    <div className="mt-6 space-y-2">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-sandia rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${porcentaje}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
        />
      </div>
      <div className="flex items-center justify-between">
        <motion.p
          className="text-[13px] text-white/70 font-body"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Quedan{' '}
          <span className="text-white font-semibold">{cupos} cupos</span> al precio fundador
        </motion.p>
        <p className="text-[12px] text-white/50 font-body">
          Cierra {OFERTA.fechaCierre}
        </p>
      </div>
    </div>
  )
}

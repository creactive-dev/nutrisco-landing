import type { LaunchMode } from '@/types'
import { OFERTA } from '@/lib/constants'

interface BarraUrgenciaProps {
  mode: LaunchMode
}

export function BarraUrgencia({ mode }: BarraUrgenciaProps) {
  const text =
    mode === 'preregistro'
      ? `⏳ Lanzamiento ${OFERTA.fechaLanzamiento} — Reserva tu acceso antes de que abra al público`
      : mode === 'venta'
      ? `⚡ Precio fundador disponible hasta el ${OFERTA.fechaCierre} · Solo ${OFERTA.cuposTotal} cupos`
      : null

  if (!text) return null

  return (
    <div
      className="w-full text-white text-[12px] font-body py-2.5 px-4"
      style={{ background: 'linear-gradient(90deg, #c73444 0%, #E94555 50%, #e8607a 100%)' }}
      role="banner"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
        <span className="font-medium text-center leading-tight">{text}</span>
        <a
          href="#precio"
          className="flex-shrink-0 bg-white/20 hover:bg-white/30 border border-white/30 text-white text-[11px] font-semibold px-3 py-1 rounded-full transition-colors duration-150 whitespace-nowrap"
        >
          Ver precio →
        </a>
      </div>
    </div>
  )
}

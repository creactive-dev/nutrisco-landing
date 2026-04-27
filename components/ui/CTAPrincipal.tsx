'use client'

import { Button } from '@/components/ui/Button'
import { PreregistroForm } from '@/components/ui/PreregistroForm'
import { OFERTA } from '@/lib/constants'
import { trackCheckoutBegin } from '@/lib/analytics'
import type { LaunchMode } from '@/types'

interface CTAPrincipalProps {
  mode: LaunchMode
  variant?: 'hero' | 'pricing' | 'final'
  darkBg?: boolean
}

export function CTAPrincipal({ mode, variant = 'pricing', darkBg = true }: CTAPrincipalProps) {
  if (mode === 'preregistro') {
    if (variant === 'hero') {
      return (
        <div className="max-w-lg">
          <PreregistroForm darkBg={darkBg} />
        </div>
      )
    }
    return (
      <div className="space-y-3">
        <PreregistroForm darkBg={darkBg} />
      </div>
    )
  }

  if (mode === 'venta') {
    const handleClick = () => trackCheckoutBegin()

    if (!OFERTA.mpUrl) {
      return (
        <div className="rounded-btn px-7 py-3.5 bg-white/10 text-white/50 font-body font-medium text-[15px] text-center cursor-not-allowed">
          Disponible el 3 de mayo
        </div>
      )
    }

    const label =
      variant === 'final'
        ? `→ Asegurar mi precio de por vida — ${OFERTA.precioFundador}/mes`
        : `→ Asegurar mi cupo fundador — ${OFERTA.precioFundador}/mes`

    return (
      <Button
        variant={variant === 'final' ? 'invert' : 'primary'}
        href={OFERTA.mpUrl}
        onClick={handleClick}
        fullWidth={variant === 'pricing'}
        size="lg"
      >
        {label}
      </Button>
    )
  }

  // cerrado
  return (
    <div className="rounded-btn px-7 py-3.5 bg-white/10 text-white/50 font-body font-medium text-[15px] text-center">
      La oferta fundadora cerró el {OFERTA.fechaCierre}
    </div>
  )
}

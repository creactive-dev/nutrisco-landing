import { type ReactNode } from 'react'

type Variant = 'solid' | 'outline-coral' | 'glass-light' | 'glass-dark'

interface PillProps {
  variant?: Variant
  children: ReactNode
  icon?: ReactNode
  className?: string
}

const variantStyles: Record<Variant, string> = {
  solid:
    'bg-sandia text-white uppercase tracking-[0.14em] text-[10px] font-bold shadow-[0_2px_8px_rgba(233,69,85,0.3)]',
  'outline-coral':
    'bg-sandia/8 text-sandia border border-sandia/25 text-[11px] font-medium',
  'glass-light':
    'bg-white text-gray-mid border border-black/[0.06] shadow-sm text-[11px] font-medium',
  'glass-dark':
    'bg-white/8 text-white/70 border border-white/12 backdrop-blur-md text-[11px] font-medium',
}

export function Pill({ variant = 'outline-coral', children, icon, className = '' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-body ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

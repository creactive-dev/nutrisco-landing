import type { LaunchMode } from '@/types'

export function getLaunchMode(now: Date = new Date()): LaunchMode {
  const override = process.env.NEXT_PUBLIC_LAUNCH_MODE as LaunchMode | undefined
  if (override && ['preregistro', 'venta', 'cerrado'].includes(override)) {
    return override
  }

  // Pre-registro: 24 abril → 2 mayo 2026
  const preregistroStart = new Date('2026-04-24T00:00:00-04:00')
  const ventaStart = new Date('2026-05-03T09:00:00-04:00')
  const ventaEnd = new Date('2026-05-16T23:59:59-04:00')

  if (now >= ventaStart && now <= ventaEnd) return 'venta'
  if (now >= preregistroStart && now < ventaStart) return 'preregistro'
  if (now > ventaEnd) return 'cerrado'
  return 'preregistro' // default while building
}

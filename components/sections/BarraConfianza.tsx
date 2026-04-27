import { Stat } from '@/components/ui/Stat'
import { STATS } from '@/lib/constants'

export function BarraConfianza() {
  return (
    <div className="bg-dark-section py-6 px-5 md:px-10">
      <div className="container-landing">
        <div className="grid grid-cols-2 md:flex md:flex-row md:justify-center md:items-center">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                'flex justify-center py-4 px-6',
                index < STATS.length - 1
                  ? 'border-r border-white/5'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <Stat value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

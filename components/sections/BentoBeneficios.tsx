import { Activity, Zap, Shirt, Smile, User, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { BENTO_BENEFICIOS } from "@/lib/constants"

const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  zap: Zap,
  shirt: Shirt,
  smile: Smile,
  user: User,
  "shield-check": ShieldCheck,
}

export function BentoBeneficios() {
  return (
    <section
      aria-label="Beneficios"
      className="bg-crema py-16 px-5 md:py-24 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4">
            {BENTO_BENEFICIOS.eyebrow}
          </p>
          <h2 className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]">
            {BENTO_BENEFICIOS.h2[0]}
            <br />
            {BENTO_BENEFICIOS.h2[1]}
          </h2>
        </div>

        {/* Grid 3x2 desktop / 1x6 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {BENTO_BENEFICIOS.cards.map((card, index) => {
            const Icon = iconMap[card.icon] ?? Activity
            const isConstanza = card.icon === "shield-check"
            return (
              <div
                key={index}
                className="bg-surface-lowest rounded-3xl p-6 shadow-card-sm hover:shadow-card transition-shadow flex flex-col gap-4"
              >
                {isConstanza ? (
                  <div
                    data-placeholder="true"
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-sandia/30 to-celeste/30 flex items-center justify-center"
                    aria-label="Foto Constanza pendiente"
                  >
                    <span className="text-text-muted text-[10px] text-center leading-tight px-1">
                      [Foto]
                    </span>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-sandia/10 flex items-center justify-center">
                    <Icon size={22} className="text-sandia" aria-hidden="true" />
                  </div>
                )}

                <h3 className="font-serif font-semibold text-[1.125rem] md:text-[1.25rem] text-text-dark leading-snug">
                  {card.title}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

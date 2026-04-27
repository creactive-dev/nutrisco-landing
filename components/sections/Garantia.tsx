import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GARANTIAS } from '@/lib/constants'

export function Garantia() {
  return (
    <SectionWrapper bg="bg-crema" id="garantia">
      <div className="text-center container-landing">
        <h2 className="font-display font-bold text-editorial text-carbon">
          Sin riesgos, sin contratos
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 container-landing">
        {GARANTIAS.map((garantia, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center gap-3 p-6 bg-white rounded-card shadow-card"
          >
            <span className="text-3xl">{garantia.icon}</span>
            <h3 className="font-body font-semibold text-carbon text-[15px]">
              {garantia.title}
            </h3>
            <p className="font-body text-gray-mid text-sm leading-relaxed">
              {garantia.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

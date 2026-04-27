import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Pill } from '@/components/ui/Pill'
import { CONSTANZA } from '@/lib/constants'

export function SobreConstanza() {
  return (
    <SectionWrapper bg="bg-carbon" id="sobre-constanza">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center container-landing">
        {/* Foto izquierda */}
        <div className="lg:w-72 flex-shrink-0 flex flex-col items-center gap-3">
          <div className="relative w-full overflow-hidden rounded-card" style={{ aspectRatio: '3/4' }}>
            <Image
              src={CONSTANZA.photo}
              alt="Constanza Jiménez Paschold — Nutricionista Clínica"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 288px"
            />
          </div>
        </div>

        {/* Contenido derecho */}
        <div className="flex-1">
          <div className="mb-4">
            <Pill variant="glass-dark">Quién está detrás de Nutrisco</Pill>
          </div>

          <h2 className="font-display font-bold text-display-sm text-white">
            {CONSTANZA.nombre}
          </h2>

          <p className="font-body text-[#9CA3AF] text-base mb-6">{CONSTANZA.titulo}</p>

          <p className="font-body text-[#D1D5DB] text-base leading-relaxed">
            {CONSTANZA.bio}
          </p>

          <p className="font-body text-[#D1D5DB] text-base leading-relaxed mt-4">
            {CONSTANZA.story}
          </p>

          <div className="border-t border-white/10 my-6" />

          <ul className="space-y-2">
            {CONSTANZA.credentials.map((cred: string) => (
              <li
                key={cred}
                className="flex items-center gap-2 text-[14px] text-white/80 font-body"
              >
                <span className="text-[#73C3E4] text-base">✓</span>
                {cred}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}

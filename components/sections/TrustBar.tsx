import { TRUST_BAR } from "@/lib/constants"

export function TrustBar() {
  return (
    <section
      aria-label="Métricas de confianza"
      className="bg-text-dark text-white py-10 px-5 md:py-14 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {TRUST_BAR.stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="font-serif font-bold text-sandia text-[2.75rem] md:text-[3.25rem] leading-none tracking-tight">
                {stat.number}
              </p>
              <p className="text-white/70 text-[14px] md:text-[15px] mt-2 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

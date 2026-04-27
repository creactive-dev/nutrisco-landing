export function BloqueIsapre() {
  return (
    <div className="relative overflow-hidden rounded-card p-6 bg-isapre-bg border border-isapre-border/30 shadow-[0_4px_24px_rgba(34,197,94,0.1)] group transition-all hover:shadow-[0_8px_32px_rgba(34,197,94,0.15)]">
      <div className="absolute top-0 left-0 w-1 h-full bg-isapre-border" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-isapre-border/20 text-2xl group-hover:scale-110 transition-transform">
          🏥
        </div>
        <div className="flex-1">
          <p className="font-body font-bold text-carbon text-[16px] mb-1.5 leading-tight">
            Ahórrate el costo reembolsando con tu Isapre
          </p>
          <p className="font-body text-[13px] text-carbon/80 leading-relaxed mb-2">
            Emitimos <strong>boleta electrónica de Nutricionista</strong>. Dependiendo de tu plan de salud, al solicitar el reembolso, el costo real para ti podría ser muy inferior.
          </p>
          <a
            href="https://www.superdesalud.gob.cl/difusion/575/w3-channel.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-isapre-border hover:underline"
          >
            → Más información sobre reembolsos
          </a>
        </div>
      </div>
    </div>
  )
}

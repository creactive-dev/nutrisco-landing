import { MessageCircle, Instagram } from "lucide-react"
import { SITE_CONFIG, FOOTER } from "@/lib/constants"

export function Footer() {
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappMessage
  )}`

  return (
    <footer className="relative overflow-hidden bg-surface-lowest border-t border-text-dark/8">
      {/* Soft mesh subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 aurora-mesh-soft opacity-30"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-12 flex flex-col gap-10">
        {/* Fila superior: logo + tagline corto */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-text-dark/8">
          <div>
            <a
              href="#"
              aria-label={`${SITE_CONFIG.name} — Inicio`}
              className="flex-shrink-0 inline-block"
            >
              <span className="font-serif text-2xl font-bold tracking-tight text-text-dark">
                nutri
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-gradient-warm">
                co
              </span>
            </a>
            <p className="text-[14px] text-text-muted mt-2 max-w-md">
              Nutrición antiinflamatoria personalizada, supervisada por Constanza
              Jiménez Paschold.
            </p>
          </div>

          {/* Redes sociales — glass pills */}
          <div className="flex items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp de ${SITE_CONFIG.name}`}
              className="glass-pill rounded-full p-2.5 text-text-muted hover:text-sandia hover:-translate-y-0.5 transition-all duration-200"
            >
              <MessageCircle size={18} strokeWidth={1.8} />
            </a>
            <a
              href={`https://instagram.com/${SITE_CONFIG.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${SITE_CONFIG.instagram}`}
              className="glass-pill rounded-full p-2.5 text-text-muted hover:text-sandia hover:-translate-y-0.5 transition-all duration-200"
            >
              <Instagram size={18} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        {/* Fila media: links + copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Links legales"
          >
            {FOOTER.legal.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-xs text-text-muted hover:text-text-dark transition-colors duration-200 group"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-sandia scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                />
              </a>
            ))}
          </nav>

          <p className="text-xs text-text-muted">{FOOTER.copyright}</p>
        </div>

        {/* Fila inferior: datos legales obligatorios */}
        <div className="text-xs text-text-muted leading-relaxed border-t border-text-dark/8 pt-6">
          <p>
            <strong className="text-text-dark/80">
              {SITE_CONFIG.legal.razonSocial}
            </strong>
            {" · "}
            RUT {SITE_CONFIG.legal.rut}
            {" · "}
            {SITE_CONFIG.legal.direccion}
          </p>
          <p className="mt-1">
            Nutricionista titulada · Prestación profesional de servicios de salud
            exentos de IVA conforme al Art. 12 letra E N° 20 del DL 825.
          </p>
        </div>
      </div>
    </footer>
  )
}

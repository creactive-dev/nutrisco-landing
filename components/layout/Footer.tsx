import { MessageCircle, Instagram } from "lucide-react"
import { SITE_CONFIG, FOOTER } from "@/lib/constants"

export function Footer() {
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappMessage
  )}`

  return (
    <footer className="bg-surface-high">
      <div className="mx-auto max-w-5xl px-5 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <a href="#" aria-label={`${SITE_CONFIG.name} — Inicio`} className="flex-shrink-0">
          <span className="font-serif text-lg font-bold tracking-tight text-text-dark">
            nutri
          </span>
          <span className="font-serif text-lg font-bold tracking-tight text-sandia">
            sco
          </span>
        </a>

        {/* Links legales */}
        <nav
          className="flex flex-wrap gap-x-5 gap-y-1"
          aria-label="Links legales"
        >
          {FOOTER.legal.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs text-text-muted hover:text-text-dark transition-colors duration-150"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Redes sociales */}
        <div className="flex items-center gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de Nutrisco"
            className="text-text-muted hover:text-sandia transition-colors duration-150"
          >
            <MessageCircle size={18} strokeWidth={1.8} />
          </a>
          <a
            href={`https://instagram.com/${SITE_CONFIG.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${SITE_CONFIG.instagram}`}
            className="text-text-muted hover:text-sandia transition-colors duration-150"
          >
            <Instagram size={18} strokeWidth={1.8} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-text-muted md:text-right">
          {FOOTER.copyright}
        </p>
      </div>
    </footer>
  )
}

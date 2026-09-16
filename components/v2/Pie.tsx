import { FOOTER, SITE_CONFIG } from "@/lib/constants"
import { PORTADA } from "@/lib/constants-programa"
import { Logo } from "@/components/v2/Logo"

/**
 * El pie de la v2 más lo que una página que cobra tiene que tener a la vista:
 * los documentos legales y los datos de quien emite la boleta.
 */
export function Pie() {
  return (
    <footer className="wrap footer">
      <Logo />
      <p>
        {PORTADA.pie.lema}
        <br />© 2026 · {SITE_CONFIG.legal.razonSocial}
      </p>
      <nav className="footer-legal" aria-label="Documentos legales">
        {FOOTER.legal.map((item) => (
          <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
            {item.label}
          </a>
        ))}
      </nav>
      <p className="footer-datos">
        {SITE_CONFIG.legal.razonSocial} · RUT {SITE_CONFIG.legal.rut} · {SITE_CONFIG.legal.direccion}
        <br />
        Nutricionista titulada · Prestación profesional de servicios de salud exentos de IVA conforme
        al Art. 12 letra E N° 20 del DL 825.
      </p>
    </footer>
  )
}

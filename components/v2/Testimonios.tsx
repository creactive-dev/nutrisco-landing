import { PORTADA, TESTIMONIOS_PROGRAMA } from "@/lib/constants-programa"
import { TESTIMONIOS_MIXTO } from "@/lib/constants"
import { Revelar } from "@/components/v2/Revelar"

/**
 * Testimonios de la portada del programa. Muestra solo los ids que están en
 * `TESTIMONIOS_PROGRAMA`, con el texto tal cual está en `TESTIMONIOS_MIXTO`, y
 * desaparece entera si la lista queda vacía. Ver el comentario de
 * `TESTIMONIOS_PROGRAMA` para por qué los videos no están.
 */
export function Testimonios() {
  const tarjetas = TESTIMONIOS_PROGRAMA.flatMap((id) => {
    const t = TESTIMONIOS_MIXTO.cards.find((c) => c.id === id)
    return t ? [t] : []
  })

  if (tarjetas.length === 0) return null

  return (
    <section className="section wrap testimonials">
      <Revelar className="section-heading">
        <div>
          <p className="eyebrow">{PORTADA.testimonios.eyebrow}</p>
          <h2>
            Ya dieron
            <br />
            <em>su primer paso.</em>
          </h2>
        </div>
        <p>{PORTADA.testimonios.bajada}</p>
      </Revelar>
      <div className="quote-grid">
        {tarjetas.map((t) => (
          <Revelar as="article" className="quote-card" key={t.id}>
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>{t.quote}</blockquote>
            <div className="quote-author">
              <span className="quote-initial" aria-hidden="true">
                {t.initial}
              </span>
              <p>
                {t.name}
                <span>{PORTADA.testimonios.rotulo}</span>
              </p>
            </div>
          </Revelar>
        ))}
      </div>
      <p className="section-footnote">{PORTADA.testimonios.nota}</p>
    </section>
  )
}

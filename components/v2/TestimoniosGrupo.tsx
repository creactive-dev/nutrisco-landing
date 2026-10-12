import { PORTADA } from "@/lib/constants-programa"
import type { TestimonioGrupo } from "@/lib/testimonios-grupo"
import { Revelar } from "@/components/v2/Revelar"
import { AvatarResena } from "@/components/v2/AvatarResena"

/**
 * Testimonios del grupo de octubre (diseño C2 §9.11), justo antes del precio.
 * Sin testimonios publicables no aparece nada.
 */
export function TestimoniosGrupo({ testimonios }: { testimonios: TestimonioGrupo[] }) {
  if (testimonios.length === 0) return null
  const g = PORTADA.grupoOctubre
  return (
    <section className="section wrap grupo-octubre" id="grupo-octubre" aria-labelledby="grupo-octubre-titulo">
      <Revelar className="section-heading">
        <div>
          <p className="eyebrow">{g.eyebrow}</p>
          <h2 id="grupo-octubre-titulo">
            {g.h2.lineas.map((linea) => (
              <span className="h2-linea" key={linea}>
                {linea}{" "}
              </span>
            ))}
            <em>{g.h2.em}</em>
          </h2>
        </div>
        <p>{g.bajada}</p>
      </Revelar>
      <ul className="grupo-octubre-lista">
        {testimonios.map((t) => (
          <li className="testimonio-grupo" key={t.id}>
            <blockquote>{t.cita}</blockquote>
            <p className="prueba-autora">
              <AvatarResena resena={t} tamano={30} />
              <span>
                {t.nombre}
                <small>{g.rotulo}</small>
              </span>
            </p>
          </li>
        ))}
      </ul>
      <p className="section-footnote">{g.nota}</p>
    </section>
  )
}

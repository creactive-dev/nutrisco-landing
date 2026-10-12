import { PORTADA } from "@/lib/constants-programa"
import { RESENAS_GOOGLE } from "@/lib/resenas-google"
import { Revelar } from "@/components/v2/Revelar"
import { AvatarResena } from "@/components/v2/AvatarResena"
import { FondoDecorativo } from "@/components/v2/FondoDecorativo"

/**
 * "Esto es para ti si…" y "Por qué esta vez es distinto" (diseño C2 §9.4).
 * Responde de entrada las dos objeciones que la página no tocaba (diagnóstico
 * y dietas que no resultaron) con las palabras de sus reseñas. Ocupa el lugar
 * y el `id` de "¿Te suena familiar?", al que apunta el menú.
 */
export function ParaTi() {
  const p = PORTADA.paraTi
  const citas = RESENAS_GOOGLE.citas.filter((r) => r.paraTi)
  return (
    <section id="programa" className="familiar con-fondo para-ti" aria-labelledby="para-ti-titulo">
      <FondoDecorativo variante="familiar" />
      <div className="section wrap para-ti-grid">
        <Revelar className="para-ti-copy">
          <p className="eyebrow">{p.eyebrow}</p>
          <h2 id="para-ti-titulo">
            {p.h2.lineas.map((linea) => (
              <span className="h2-linea" key={linea}>
                {linea}{" "}
              </span>
            ))}
            <em>{p.h2.em}</em>
          </h2>
          <ul className="para-ti-lista">
            {p.lista.map((linea) => (
              <li key={linea}>{linea}</li>
            ))}
          </ul>
        </Revelar>
        <Revelar className="para-ti-distinto">
          <h3>{p.distintoTitulo}</h3>
          <p>{p.distinto}</p>
          <ul className="para-ti-citas" aria-label="Reseñas en Google">
            {citas.map((r) => (
              <li key={r.id}>
                <blockquote>{r.cita}</blockquote>
                <p className="prueba-autora">
                  <AvatarResena resena={r} tamano={30} />
                  <span>
                    {r.nombre}
                    <small>{PORTADA.testimonios.rotuloResena}</small>
                  </span>
                </p>
              </li>
            ))}
          </ul>
          <a className="text-link" href="#como-funciona">
            {p.enlace} <span aria-hidden="true">↘</span>
          </a>
        </Revelar>
      </div>
    </section>
  )
}

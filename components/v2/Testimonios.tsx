import { PORTADA, VIDEOS_PORTADA } from "@/lib/constants-programa"
import { SITE_CONFIG, TESTIMONIOS_MIXTO } from "@/lib/constants"
import { RESENAS_GOOGLE } from "@/lib/resenas-google"
import { Revelar } from "@/components/v2/Revelar"

/**
 * Testimonios: los videos de pacientes de Constanza y sus reseñas de Google.
 * Ver el comentario de `VIDEOS_PORTADA` para el origen de cada cosa.
 *
 * Los videos pesan entre 2,7 y 4,7 MB: van con `preload="none"` y su póster,
 * así que no se descarga nada hasta que alguien aprieta play.
 */
export function Testimonios() {
  const videos = VIDEOS_PORTADA.flatMap((id) => {
    const v = TESTIMONIOS_MIXTO.videos.find((video) => video.id === id)
    return v ? [v] : []
  })

  return (
    <section className="section wrap testimonials" id="testimonios">
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

      {videos.length > 0 && (
        <div className="video-grid">
          {videos.map((v) => (
            <Revelar as="article" className="video-card" key={v.id}>
              <video
                controls
                preload="none"
                playsInline
                poster={v.poster}
                aria-label={`Testimonio de ${v.name}, ${PORTADA.testimonios.rotulo.toLowerCase()}`}
              >
                <source src={v.src} type="video/mp4" />
              </video>
              <div>
                <h3>{v.name}</h3>
                <span>{PORTADA.testimonios.rotulo}</span>
              </div>
            </Revelar>
          ))}
        </div>
      )}

      <div className="resenas">
        <Revelar className="resenas-cabecera">
          <p className="resenas-promedio">
            <b>{RESENAS_GOOGLE.promedio}</b>
            <span className="estrellas" aria-hidden="true">
              ★★★★★
            </span>
          </p>
          <p>
            {RESENAS_GOOGLE.total} {PORTADA.testimonios.resenas}
          </p>
          <a
            className="text-link"
            href={SITE_CONFIG.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {PORTADA.testimonios.verEnGoogle} <span aria-hidden="true">↗</span>
          </a>
        </Revelar>
        <div className="quote-grid">
          {RESENAS_GOOGLE.citas.map((r) => (
            <Revelar as="article" className="quote-card" key={r.fila}>
              <blockquote>{r.cita}</blockquote>
              <div className="quote-author">
                <span className="quote-initial" aria-hidden="true">
                  {r.nombre.charAt(0)}
                </span>
                <p>
                  {r.nombre}
                  <span>{PORTADA.testimonios.rotuloResena}</span>
                </p>
              </div>
            </Revelar>
          ))}
        </div>
      </div>

      <p className="section-footnote">{PORTADA.testimonios.nota}</p>
    </section>
  )
}

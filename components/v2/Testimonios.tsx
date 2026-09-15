import Image from "next/image"
import { PORTADA, VIDEOS_PORTADA } from "@/lib/constants-programa"
import { SITE_CONFIG, TESTIMONIOS_MIXTO } from "@/lib/constants"
import { RESENAS_GOOGLE } from "@/lib/resenas-google"
import { Revelar } from "@/components/v2/Revelar"
import { AvatarResena } from "@/components/v2/AvatarResena"
import { MasResenas } from "@/components/v2/MasResenas"
import { VideosTestimonio } from "@/components/v2/VideosTestimonio"

/**
 * Testimonios: los videos de pacientes de Constanza y sus reseñas de Google.
 * Ver el comentario de `VIDEOS_PORTADA` para el origen de los videos y
 * `lib/resenas-google.ts` para el de las reseñas.
 *
 * Los videos parten solos y en silencio al entrar en pantalla, sin descargarse
 * al cargar la página (ver `VideosTestimonio`). Las reseñas llevan el logo de
 * Google, el promedio y el total, y la foto de perfil de quien la tiene en
 * Google o su inicial.
 */
export function Testimonios() {
  const videos = VIDEOS_PORTADA.flatMap((id) => {
    const v = TESTIMONIOS_MIXTO.videos.find((video) => video.id === id)
    return v ? [{ id: v.id, name: v.name, src: v.src, poster: v.poster }] : []
  })
  const conFoto = RESENAS_GOOGLE.citas.filter((r) => r.foto).slice(0, 4)
  // Las citas cortas van junto al botón de compra (PruebaSocialCompra).
  const grilla = RESENAS_GOOGLE.citas.filter((r) => !r.corta)

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

      {videos.length > 0 && <VideosTestimonio videos={videos} rotulo={PORTADA.testimonios.rotulo} />}

      <div className="resenas">
        <Revelar className="resenas-cabecera">
          <div className="resenas-marca">
            <Image
              className="logo-google"
              src="/v2/logos/google.svg"
              alt="Google"
              width={30}
              height={30}
              unoptimized
            />
            <p className="resenas-promedio">
              <b>{RESENAS_GOOGLE.promedio}</b>
              <span className="estrellas" role="img" aria-label="5 de 5 estrellas">
                ★★★★★
              </span>
            </p>
            <p className="resenas-total">
              {RESENAS_GOOGLE.total} {PORTADA.testimonios.resenas}
            </p>
          </div>
          <div className="avatares-pila" aria-hidden="true">
            {conFoto.map((r) => (
              <AvatarResena key={r.id} resena={r} tamano={38} />
            ))}
          </div>
          <a
            className="text-link"
            href={SITE_CONFIG.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {PORTADA.testimonios.verEnGoogle} <span aria-hidden="true">↗</span>
          </a>
        </Revelar>

        <MasResenas total={grilla.length}>
          {grilla.map((r) => (
            <Revelar as="article" className="quote-card" key={r.id}>
              <div className="quote-top">
                <span className="estrellas-mini" role="img" aria-label="5 estrellas">
                  ★★★★★
                </span>
                <Image src="/v2/logos/google.svg" alt="" width={16} height={16} unoptimized />
              </div>
              <blockquote>{r.cita}</blockquote>
              <div className="quote-author">
                <AvatarResena resena={r} tamano={40} />
                <p>
                  {r.nombre}
                  <span>{PORTADA.testimonios.rotuloResena}</span>
                </p>
              </div>
            </Revelar>
          ))}
        </MasResenas>
      </div>

      <p className="section-footnote">{PORTADA.testimonios.nota}</p>
    </section>
  )
}

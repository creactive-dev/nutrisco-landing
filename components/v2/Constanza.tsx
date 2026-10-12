import Image from "next/image"
import { PORTADA } from "@/lib/constants-programa"
import { RESENAS_GOOGLE } from "@/lib/resenas-google"
import type { VideoConstanza as Video } from "@/lib/video-constanza"
import { Revelar } from "@/components/v2/Revelar"
import { VideoConstanza } from "@/components/v2/VideoConstanza"

/**
 * Constanza: quién es y su trayectoria. Desde la C2 va en la segunda pantalla
 * y con su video a cámara en vez de la foto (diseño §9.3, auditoría §3.6): la
 * clienta que viene de un anuncio con Constanza hablando la sigue escuchando.
 * Sin video (o con el de prueba en el dominio) queda su foto.
 */
export function Constanza({ video }: { video: Video | null }) {
  const { trayectoria, foto, h2 } = PORTADA.constanza
  return (
    <section className="founder-section" id="constanza">
      <div className="wrap founder-grid">
        {video ? (
          <Revelar className="founder-video">
            <VideoConstanza video={video} />
            <p className="founder-video-nota">{PORTADA.constanza.notaVideo}</p>
          </Revelar>
        ) : (
          <Revelar className="founder-photo">
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 45vw, 520px"
              style={{ objectPosition: foto.posicion }}
            />
            <div className="photo-caption">
              Tu nutricionista.
              <br />
              <em>También en este camino.</em>
              <span>Constanza Jiménez Paschold</span>
            </div>
          </Revelar>
        )}
        <Revelar className="founder-copy">
          <p className="eyebrow">{PORTADA.constanza.eyebrow}</p>
          <h2>
            {h2.lineas.map((linea) => (
              <span className="h2-linea" key={linea}>
                {linea}{" "}
              </span>
            ))}
            <em>{h2.em}</em>
          </h2>
          <p>{PORTADA.constanza.bajada}</p>

          <div className="trayectoria">
            <p>
              <b>{trayectoria.numero}</b>
              <span>{trayectoria.numeroTexto}</span>
            </p>
            <p>
              <b>{RESENAS_GOOGLE.promedio}</b>
              <span>
                {RESENAS_GOOGLE.total} {PORTADA.testimonios.resenas}
              </span>
            </p>
          </div>
          <ul className="trayectoria-rasgos">
            {trayectoria.rasgos.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <blockquote>
            {PORTADA.constanza.cita[0]}
            <br />
            {PORTADA.constanza.cita[1]}
          </blockquote>
          <p className="founder-signature">
            {PORTADA.constanza.firma}
            <span>{PORTADA.hero.rol}</span>
          </p>
        </Revelar>
      </div>
    </section>
  )
}

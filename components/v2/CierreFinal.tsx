import Image from "next/image"
import { PORTADA } from "@/lib/constants-programa"
import { BotonPrograma } from "@/components/v2/BotonPrograma"
import { Sandia } from "@/components/v2/Sandia"

/**
 * El cierre de la página: la sandía (la de la foto y la del logo) y Constanza
 * sonriendo, junto a la última invitación. Una imagen en vez de otro párrafo.
 */
export function CierreFinal() {
  const { foto, fotoConstanza } = PORTADA.cierre
  return (
    <section className="final-cta wrap">
      <div className="final-fotos">
        <div className="final-foto-sandia">
          <Image
            src={foto.src}
            alt={foto.alt}
            width={foto.width}
            height={foto.height}
            sizes="(max-width: 760px) 70vw, 340px"
          />
        </div>
        <div className="final-foto-constanza">
          <Image
            src={fotoConstanza.src}
            alt={fotoConstanza.alt}
            width={fotoConstanza.width}
            height={fotoConstanza.height}
            sizes="170px"
          />
        </div>
      </div>
      <div className="final-texto">
        <Sandia className="final-sandia" />
        <p>{PORTADA.cierre.antes}</p>
        <h2>
          {PORTADA.cierre.h2} <em>{PORTADA.cierre.h2em}</em>
        </h2>
        <BotonPrograma className="button primary" texto={PORTADA.cta.cierre} />
      </div>
    </section>
  )
}

import Image from "next/image"
import { PORTADA } from "@/lib/constants-programa"
import { SITE_CONFIG } from "@/lib/constants"
import { Revelar } from "@/components/v2/Revelar"

export function Constanza() {
  return (
    <section className="founder-section" id="constanza">
      <div className="wrap founder-grid">
        <Revelar className="founder-photo">
          <Image
            src={SITE_CONFIG.brand.constanzaPhoto}
            alt={PORTADA.constanza.fotoAlt}
            fill
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 45vw, 520px"
          />
          <div className="photo-caption">
            Tu nutricionista.
            <br />
            <em>También en este camino.</em>
            <span>Constanza Jiménez Paschold</span>
          </div>
        </Revelar>
        <Revelar className="founder-copy">
          <p className="eyebrow">{PORTADA.constanza.eyebrow}</p>
          <h2>
            La tecnología
            <br />
            lo hace simple.
            <br />
            <em>Constanza lo hace tuyo.</em>
          </h2>
          {PORTADA.constanza.parrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
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

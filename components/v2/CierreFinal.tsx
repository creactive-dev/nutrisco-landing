import { PORTADA } from "@/lib/constants-programa"
import { BotonPrograma } from "@/components/v2/BotonPrograma"
import { Sandia } from "@/components/v2/Sandia"

export function CierreFinal() {
  return (
    <section className="final-cta wrap">
      <Sandia className="final-sandia" />
      <p>{PORTADA.cierre.antes}</p>
      <h2>
        {PORTADA.cierre.h2} <em>{PORTADA.cierre.h2em}</em>
      </h2>
      <BotonPrograma className="button primary" texto={PORTADA.cta.cierre} />
    </section>
  )
}

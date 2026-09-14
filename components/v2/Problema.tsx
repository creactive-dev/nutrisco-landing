import { PORTADA } from "@/lib/constants-programa"
import { Revelar } from "@/components/v2/Revelar"

export function Problema() {
  return (
    <section id="programa" className="section wrap intro">
      <Revelar className="intro-heading">
        <p className="eyebrow">{PORTADA.problema.eyebrow}</p>
        <h2>
          Sabes que quieres
          <br />
          cuidarte.
          <br />
          <em>¿Y por dónde partes?</em>
        </h2>
      </Revelar>
      <Revelar className="intro-details">
        <p className="large-copy">{PORTADA.problema.grande}</p>
        <p>{PORTADA.problema.cuerpo}</p>
        <a className="text-link" href="#tu-app">
          {PORTADA.problema.enlace} <span aria-hidden="true">↘</span>
        </a>
      </Revelar>
    </section>
  )
}

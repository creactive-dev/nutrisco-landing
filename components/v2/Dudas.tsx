import { PORTADA, preguntasPortada } from "@/lib/constants-programa"
import type { EstadoVenta } from "@/lib/programa"
import { Revelar } from "@/components/v2/Revelar"

export function Dudas({ venta }: { venta: EstadoVenta }) {
  const preguntas = preguntasPortada(venta)
  return (
    <section className="section wrap faq" id="preguntas">
      <Revelar>
        <p className="eyebrow">{PORTADA.dudas.eyebrow}</p>
        <h2>
          {PORTADA.dudas.h2}
          <br />
          <em>{PORTADA.dudas.h2em}</em>
        </h2>
      </Revelar>
      <Revelar className="faq-list">
        {preguntas.map((p) => (
          <details key={p.q}>
            <summary>
              {p.q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{p.a}</p>
          </details>
        ))}
      </Revelar>
    </section>
  )
}

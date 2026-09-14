import { PORTADA, PROGRAMA } from "@/lib/constants-programa"
import {
  diaYMes,
  sesionesLegibles,
  ultimoDiaDelPrograma,
  type EstadoVenta,
} from "@/lib/programa"
import { Revelar } from "@/components/v2/Revelar"

/**
 * "Tres meses. Contigo, de principio a fin." Las fechas del programa salen de
 * la cohorte. Las sesiones en vivo se listan solo si la fila las trae: si no,
 * se dice que se confirman. Una fecha inventada acá es una promesa que alguien
 * compra.
 */
export function Acompanamiento({ venta }: { venta: EstadoVenta }) {
  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null
  const sesiones = cohorte ? sesionesLegibles(cohorte.sesiones) : null

  return (
    <section className="section wrap journey">
      <Revelar className="section-heading">
        <div>
          <p className="eyebrow">{PORTADA.recorrido.eyebrow}</p>
          <h2>
            Tres meses.
            <br />
            <em>Contigo, de principio a fin.</em>
          </h2>
        </div>
        <p>
          {cohorte && (
            <>
              Del {diaYMes(cohorte.fecha_inicio)} al{" "}
              {ultimoDiaDelPrograma(cohorte.fecha_fin, { mes: "long" })}.
              <br />
            </>
          )}
          {PORTADA.recorrido.juntas}
        </p>
      </Revelar>

      <div className="journey-grid">
        {PORTADA.recorrido.tarjetas.map((t) => (
          <Revelar as="article" className="journey-card" key={t.indice}>
            <span className="journey-index">
              {t.indice} <small>{t.momento}</small>
            </span>
            <h3>
              {t.titulo[0]}
              <br />
              {t.titulo[1]}
            </h3>
            <p>{t.cuerpo}</p>
            <span className="mini-pill">{t.pildora}</span>
          </Revelar>
        ))}
      </div>

      {sesiones ? (
        <div className="sesiones-vivo">
          <p className="eyebrow">{PORTADA.recorrido.sesionesTitulo.toUpperCase()}</p>
          <ul>
            {sesiones.map((s, i) => (
              <li key={`${s.dia}-${i}`}>
                <b>
                  {s.dia}
                  {s.hora ? `, ${s.hora}` : ""}
                </b>
                {s.tema && <span>{s.tema}</span>}
              </li>
            ))}
          </ul>
          <p className="section-footnote">El programa no incluye consulta individual.</p>
        </div>
      ) : (
        <p className="section-footnote">
          {PROGRAMA.sesiones.sinFechas} El programa no incluye consulta individual.
        </p>
      )}
    </section>
  )
}

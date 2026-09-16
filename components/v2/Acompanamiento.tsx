import Image from "next/image"
import { PORTADA, PROGRAMA, type FotoPortada } from "@/lib/constants-programa"
import {
  diaYMes,
  sesionesLegibles,
  ultimoDiaDelPrograma,
  type EstadoVenta,
} from "@/lib/programa"
import { Revelar } from "@/components/v2/Revelar"

type ClaveFecha = "cierre" | "inicio" | "fin"

/**
 * "Tres meses. Contigo, de principio a fin." El cómo del programa en ocho
 * pasos, agrupados en tres momentos con su foto (15-sep: más detalle del cómo
 * en cada paso, con el mes de mantención como paso propio).
 *
 * Las fechas de los pasos (cierre de inscripciones, inicio y último día) salen
 * de la cohorte; sin cohorte, los pasos van sin fecha. Las sesiones en vivo se
 * listan solo si la fila las trae: si no, se dice que se confirman. Una fecha
 * inventada acá es una promesa que alguien compra.
 */
export function Acompanamiento({ venta }: { venta: EstadoVenta }) {
  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null
  const sesiones = cohorte ? sesionesLegibles(cohorte.sesiones) : null

  const fechas: Record<ClaveFecha, string | null> = {
    cierre: cohorte ? `Hasta el ${diaYMes(cohorte.venta_cierra)}` : null,
    inicio: cohorte ? diaYMes(cohorte.fecha_inicio) : null,
    fin: cohorte ? ultimoDiaDelPrograma(cohorte.fecha_fin, { mes: "long" }) : null,
  }

  let numero = 0

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
        {PORTADA.recorrido.momentos.map((m) => (
          <Revelar as="article" className="journey-card" key={m.momento}>
            <div className="journey-foto">
              <Image
                src={m.foto.src}
                alt={m.foto.alt}
                width={m.foto.width}
                height={m.foto.height}
                sizes="(max-width: 760px) calc(100vw - 40px), 380px"
                style={
                  (m.foto as FotoPortada).posicion
                    ? { objectPosition: (m.foto as FotoPortada).posicion }
                    : undefined
                }
              />
              <span className="journey-index">{m.momento}</span>
            </div>
            <ol className="journey-pasos">
              {m.pasos.map((p) => {
                numero += 1
                const fecha = "fecha" in p ? fechas[p.fecha as ClaveFecha] : null
                return (
                  <li key={p.titulo}>
                    <span className="journey-num" aria-hidden="true">
                      {String(numero).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{p.titulo}</h3>
                      <p>{p.detalle}</p>
                      {fecha && <span className="journey-fecha">{fecha}</span>}
                    </div>
                  </li>
                )
              })}
            </ol>
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

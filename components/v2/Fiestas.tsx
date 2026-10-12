import Image from "next/image"
import { PORTADA, bonoDeLaCohorte, textoFiestas } from "@/lib/constants-programa"
import {
  controlesDeFiestas,
  diaYMesCivil,
  fechasControles,
  sesionEnDiciembre,
  type EstadoVenta,
} from "@/lib/programa"
import { Revelar } from "@/components/v2/Revelar"

/**
 * "¿Y las fiestas?" (diseño C2 §9.5): el mensaje central con las fechas reales
 * del grupo y el calendario de los seis controles, que hace de "cómo funciona"
 * antes del precio. Las fechas se calculan desde el inicio de la cohorte con la
 * regla de la app. Si el grupo no tiene control antes de Navidad y después de
 * Año Nuevo, la sección no aparece.
 */
export function Fiestas({ venta }: { venta: EstadoVenta }) {
  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null
  if (!cohorte) return null
  const fechas = fechasControles(cohorte.fecha_inicio)
  const fiestas = controlesDeFiestas(fechas)
  if (!fiestas) return null
  const sesion = sesionEnDiciembre(cohorte.sesiones)
  const bono = bonoDeLaCohorte(cohorte)
  const f = PORTADA.fiestas

  return (
    <section className="section wrap fiestas" id="fiestas" aria-labelledby="fiestas-titulo">
      <Revelar className="fiestas-copy">
        <p className="eyebrow">{f.eyebrow}</p>
        <h2 id="fiestas-titulo">
          {f.h2.lineas.map((linea) => (
            <span className="h2-linea" key={linea}>
              {linea}{" "}
            </span>
          ))}
          <em>{f.h2.em}</em>
        </h2>
        <p>{textoFiestas(fiestas)}</p>
        {sesion && (
          <p className="fiestas-sesion">
            Y el {sesion.dia}
            {sesion.hora ? ` a las ${sesion.hora}` : ""} hay sesión en vivo con Constanza
            {sesion.tema ? `: ${sesion.tema}` : ""}.
          </p>
        )}
        {bono && (
          <div className="fiestas-bono">
            {bono.portada && (
              <Image
                src={bono.portada.src}
                alt={bono.portada.alt}
                width={bono.portada.width}
                height={bono.portada.height}
                sizes="72px"
              />
            )}
            <p>
              <b>{bono.titulo}</b>
              <span>{bono.detalle}</span>
            </p>
          </div>
        )}
      </Revelar>
      <Revelar className="fiestas-calendario">
        <ol aria-label="Tus controles, cada 15 días">
          {fechas.map((fecha, i) => {
            const nota =
              fecha === fiestas.antesDeNavidad
                ? f.antesDeNavidad
                : fecha === fiestas.despuesDeAnoNuevo
                  ? f.despuesDeAnoNuevo
                  : null
            return (
              <li key={fecha} className={nota ? "es-fiesta" : undefined}>
                <span>
                  {f.etiquetaControl} {i + 1}
                  {i === fechas.length - 1 ? ` · ${f.etiquetaCierre}` : ""}
                </span>
                <b>{diaYMesCivil(fecha)}</b>
                {nota && <small>{nota}</small>}
              </li>
            )
          })}
        </ol>
      </Revelar>
    </section>
  )
}

import Image from "next/image"
import { PORTADA } from "@/lib/constants-programa"
import { RESENAS_GOOGLE } from "@/lib/resenas-google"
import {
  controlesDeFiestas,
  diaSemanaYFecha,
  diaYMes,
  diaYMesCivil,
  fechasControles,
  formatCLP,
  type EstadoVenta,
} from "@/lib/programa"
import { BotonPrograma } from "@/components/v2/BotonPrograma"
import { Sandia } from "@/components/v2/Sandia"

/**
 * Primera pantalla de la C2 (diseño §9.2, auditoría §3.1): su situación en el
 * titular y la bajada, el calendario de las fiestas, las cuotas pegadas al
 * botón, el 5,0 de Google y Constanza en vez del teléfono. Fechas y precio
 * salen de la cohorte; sin cohorte no se inventa ninguna.
 */
export function Hero({ venta }: { venta: EstadoVenta }) {
  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null
  const fiestas = cohorte ? controlesDeFiestas(fechasControles(cohorte.fecha_inicio)) : null
  const { foto } = PORTADA.hero

  let notaPrecio: React.ReactNode
  if (venta.estado === "abierta") {
    notaPrecio = (
      <>
        <strong>{formatCLP(venta.cohorte.precio)}</strong> {PORTADA.cuotas.largo} · {PORTADA.cuotas.sinMensualidad} · parte el{" "}
        {diaYMes(venta.cohorte.fecha_inicio)}
      </>
    )
  } else if (venta.estado === "proxima") {
    notaPrecio = (
      <>
        <strong>{formatCLP(venta.cohorte.precio)}</strong> {PORTADA.cuotas.corto} · {PORTADA.cuotas.sinMensualidad} · inscripciones desde el{" "}
        {diaSemanaYFecha(venta.cohorte.venta_abre)}
      </>
    )
  } else {
    notaPrecio = `Hasta 3 cuotas con tarjeta de crédito · ${PORTADA.cuotas.sinMensualidad} · 3 meses para ti`
  }

  return (
    <section className="hero hero-c2 wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="short-line" /> {PORTADA.hero.eyebrow}
        </p>
        <h1 id="hero-title" className="hero-titulo">
          {PORTADA.hero.h1.lineas.map((linea, i, todas) => (
            <span className="hero-linea" key={linea}>
              {linea}
              {i === todas.length - 1 && (
                <>
                  {" "}
                  <em>{PORTADA.hero.h1.em}</em>
                </>
              )}
            </span>
          ))}
        </h1>
        <p className="hero-description">{PORTADA.hero.descripcion}</p>
        {fiestas && (
          <p className="hero-fiestas">
            <Sandia className="hero-fiestas-sandia" />
            <span>
              Pasas las fiestas acompañada: control el {diaYMesCivil(fiestas.antesDeNavidad)} y el{" "}
              {diaYMesCivil(fiestas.despuesDeAnoNuevo)}.
            </span>
          </p>
        )}
        <BotonPrograma className="button primary hero-cta" />
        <p className="price-note">{notaPrecio}</p>
        <p className="hero-google">
          <span className="estrellas-mini" role="img" aria-label={`${RESENAS_GOOGLE.promedio} de 5 estrellas`}>
            ★★★★★
          </span>
          <span>
            <b>{RESENAS_GOOGLE.promedio}</b> en Google · {RESENAS_GOOGLE.total} reseñas
          </span>
        </p>
      </div>

      <div className="hero-art hero-foto">
        <div className="hero-foto-marco">
          <Image
            src={foto.src}
            alt={foto.alt}
            width={foto.width}
            height={foto.height}
            priority
            sizes="(max-width: 760px) calc(100vw - 52px), (max-width: 1100px) 45vw, 560px"
            style={{ objectPosition: foto.posicion }}
          />
        </div>
        <div className="floating-note nota-foto">
          <span className="note-icon">✓</span>
          <div>
            {PORTADA.hero.notaFoto.titulo}
            <small>{PORTADA.hero.notaFoto.detalle}</small>
          </div>
        </div>
        <span className="mockup-caption hero-foto-leyenda">{PORTADA.hero.leyendaFoto}</span>
      </div>
    </section>
  )
}

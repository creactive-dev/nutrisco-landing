import Image from "next/image"
import { PORTADA } from "@/lib/constants-programa"
import { SITE_CONFIG } from "@/lib/constants"
import {
  diaMesCorto,
  diaSemanaYFecha,
  formatCLP,
  ultimoDiaDelPrograma,
  type EstadoVenta,
} from "@/lib/programa"
import { BotonPrograma } from "@/components/v2/BotonPrograma"
import { TelefonoIlustrativo } from "@/components/v2/TelefonoIlustrativo"
import { Sandia } from "@/components/v2/Sandia"

export function Hero({ venta, ahora }: { venta: EstadoVenta; ahora: string }) {
  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null

  let notaPrecio: React.ReactNode
  if (venta.estado === "abierta") {
    notaPrecio = (
      <>
        <strong>{formatCLP(venta.cohorte.precio)}</strong> · un solo pago · 3 meses para ti
      </>
    )
  } else if (venta.estado === "proxima") {
    notaPrecio = (
      <>
        <strong>{formatCLP(venta.cohorte.precio)}</strong> · un solo pago · inscripciones desde el{" "}
        {diaSemanaYFecha(venta.cohorte.venta_abre)}
      </>
    )
  } else {
    notaPrecio = "Un solo pago · 3 meses para ti"
  }

  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="short-line" /> {PORTADA.hero.eyebrow}
        </p>
        <h1 id="hero-title">
          Este verano,
          <br />
          empieza
          <br />
          por <em>ti.</em>
          <Sandia className="hero-spark" />
        </h1>
        <p className="hero-description">{PORTADA.hero.descripcion}</p>
        <BotonPrograma className="button primary hero-cta" />
        <p className="price-note">{notaPrecio}</p>
        <div className="hero-person">
          <Image src={SITE_CONFIG.brand.constanzaThumb} alt="" width={42} height={42} sizes="42px" />
          <p>
            {PORTADA.hero.persona}
            <span>{PORTADA.hero.rol}</span>
          </p>
        </div>
      </div>

      <div
        className="hero-art"
        role="img"
        aria-label="Vista ilustrativa de Nutrico, basada en los mockups de la aplicación"
      >
        <div className="art-orbit" aria-hidden="true" />
        <span className="art-word" aria-hidden="true">
          a tu ritmo.
        </span>
        <div className="floating-note note-top">
          <span className="note-icon">✓</span>
          <div>
            {PORTADA.hero.notaArriba.titulo}
            <small>{PORTADA.hero.notaArriba.detalle}</small>
          </div>
        </div>
        <TelefonoIlustrativo semanaDesde={cohorte?.fecha_inicio ?? ahora} />
        <div className="floating-note note-bottom">
          <span className="note-icon sun">
            <Sandia />
          </span>
          <div>
            {PORTADA.hero.notaAbajoTitulo}
            <small>
              {cohorte
                ? `${diaMesCorto(cohorte.fecha_inicio)} al ${ultimoDiaDelPrograma(cohorte.fecha_fin)}`
                : PORTADA.hero.notaAbajoSinFechas}
            </small>
          </div>
        </div>
        <div className="round-seal" aria-hidden="true">
          <span>MENOS IMPROVISAR</span>
          <b>
            más
            <br />
            cuidarte.
          </b>
          <span>PREPARA TU VERANO</span>
        </div>
        <span className="mockup-caption">{PORTADA.hero.leyendaTelefono}</span>
      </div>
    </section>
  )
}

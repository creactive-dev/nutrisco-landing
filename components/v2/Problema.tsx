import Image from "next/image"
import { PORTADA } from "@/lib/constants-programa"
import { Revelar } from "@/components/v2/Revelar"
import { Sandia } from "@/components/v2/Sandia"
import { FondoDecorativo } from "@/components/v2/FondoDecorativo"

/**
 * "¿Te suena familiar?". Tres frases cortas y una foto en vez de los dos
 * párrafos de la v2: la escena cuenta el problema más rápido que el texto.
 *
 * Desde el 15-sep la sección ocupa todo el ancho para llevar el fondo
 * decorativo de la marca detrás; el contenido sigue en la grilla de siempre.
 */
export function Problema() {
  const { foto } = PORTADA.problema
  return (
    <section id="programa" className="familiar con-fondo">
      <FondoDecorativo variante="familiar" />
      <div className="section wrap intro">
        <Revelar className="intro-heading">
          <p className="eyebrow">{PORTADA.problema.eyebrow}</p>
          <h2>
            Sabes que quieres
            <br />
            cuidarte.
            <br />
            <em>¿Y por dónde partes?</em>
          </h2>
          <p className="large-copy">{PORTADA.problema.grande}</p>
          <p className="intro-cuerpo">{PORTADA.problema.cuerpo}</p>
          <a className="text-link" href="#tu-app">
            {PORTADA.problema.enlace} <span aria-hidden="true">↘</span>
          </a>
        </Revelar>
        <Revelar className="intro-foto">
          <Image
            src={foto.src}
            alt={foto.alt}
            width={foto.width}
            height={foto.height}
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 45vw, 560px"
          />
          <p className="intro-nota" aria-hidden="true">
            <Sandia />
            {PORTADA.problema.nota}
          </p>
        </Revelar>
      </div>
    </section>
  )
}

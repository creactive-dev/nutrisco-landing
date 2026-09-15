import Image from "next/image"
import { PORTADA } from "@/lib/constants-programa"
import { Revelar } from "@/components/v2/Revelar"
import { Sandia } from "@/components/v2/Sandia"

/**
 * "¿Te suena familiar?". Tres frases cortas y una foto en vez de los dos
 * párrafos de la v2: la escena (una cocina un jueves cualquiera) cuenta el
 * problema más rápido que el texto.
 */
export function Problema() {
  const { foto } = PORTADA.problema
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
    </section>
  )
}

"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { PORTADA } from "@/lib/constants-programa"
import { SITE_CONFIG } from "@/lib/constants"
import { Revelar } from "@/components/v2/Revelar"

type Id = (typeof PORTADA.app.pestanas)[number]["id"]

/**
 * "Tu plan, en el bolsillo": el recorrido de la app en tres pestañas,
 * accesible por teclado (flechas, Inicio, Fin), como la v2. Las capturas de
 * recetas y progreso solo se descargan cuando su pestaña se abre: van con
 * `loading="lazy"` dentro de un panel oculto.
 */
export function RecorridoApp() {
  const [activa, setActiva] = useState<Id>("plan")
  const botones = useRef<(HTMLButtonElement | null)[]>([])
  const pestanas = PORTADA.app.pestanas

  const mover = (indice: number) => {
    const destino = pestanas[(indice + pestanas.length) % pestanas.length]
    setActiva(destino.id)
    botones.current[(indice + pestanas.length) % pestanas.length]?.focus()
  }

  return (
    <section className="app-section" id="tu-app">
      <div className="wrap app-layout">
        <Revelar className="app-explainer">
          <p className="eyebrow">{PORTADA.app.eyebrow}</p>
          <h2>
            Menos pensar
            <br />
            qué comer.
            <br />
            <em>Más vivir tu día.</em>
          </h2>
          <p>{PORTADA.app.cuerpo}</p>
      <div className="feature-tabs" role="tablist" aria-label="Explorar Nutrico" aria-orientation="vertical">
        {pestanas.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              botones.current[i] = el
            }}
            id={`tab-${p.id}`}
            role="tab"
            type="button"
            aria-selected={activa === p.id}
            aria-controls="app-panel"
            tabIndex={activa === p.id ? 0 : -1}
            onClick={() => setActiva(p.id)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault()
                mover(i + 1)
              } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault()
                mover(i - 1)
              } else if (e.key === "Home") {
                e.preventDefault()
                mover(0)
              } else if (e.key === "End") {
                e.preventDefault()
                mover(pestanas.length - 1)
              }
            }}
          >
            <span className="tab-number">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <b>{p.titulo}</b>
              <small>{p.detalle}</small>
            </span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

        </Revelar>
        <PanelApp activa={activa} />
      </div>
    </section>
  )
}

function PanelApp({ activa }: { activa: Id }) {
  return (
    <Revelar className="app-demo">
      <div role="tabpanel" id="app-panel" aria-labelledby={`tab-${activa}`} tabIndex={0} className="app-panel">
      <span className="demo-label">{PORTADA.app.etiquetaDemo}</span>
      <div className="demo-plan" hidden={activa !== "plan"}>
        <span className="demo-symbol" aria-hidden="true">
          ✳
        </span>
        <p className="eyebrow">EL INICIO DE TU PROGRAMA</p>
        <h3>
          Primero,
          <br />
          te conocemos.
        </h3>
        <p>Tu rutina, tus preferencias y tus objetivos son la base de tu pauta.</p>
        <div className="question-example">
          <span>Tu cuestionario inicial</span>
          <b>
            11 variables sobre ti <span aria-hidden="true">↗</span>
          </b>
          <div className="steps" aria-hidden="true">
            {Array.from({ length: 11 }).map((_, i) => (
              <i key={i} />
            ))}
          </div>
          <small>Aproximadamente 10 minutos</small>
        </div>
        <div className="approval">
          <Image src={SITE_CONFIG.brand.constanzaThumb} width={42} height={42} sizes="42px" alt="" />
          <span>
            Tu pauta es revisada y
            <br />
            <b>aprobada por Constanza.</b>
          </span>
        </div>
      </div>
      <div className="screenshot-panel" hidden={activa !== "recetas"}>
        <Image
          src="/mockups/m-recetas.png"
          alt="Mockup existente del recetario de Nutrico: recetas y lista de compras"
          width={701}
          height={1444}
          sizes="210px"
          loading="lazy"
        />
        <span className="screenshot-label">{PORTADA.app.etiquetaCaptura}</span>
      </div>
      <div className="screenshot-panel" hidden={activa !== "progreso"}>
        <Image
          src="/mockups/m-progreso-full.png"
          alt="Mockup existente de seguimiento de progreso en Nutrico"
          width={701}
          height={1444}
          sizes="210px"
          loading="lazy"
        />
        <span className="screenshot-label">{PORTADA.app.etiquetaCaptura}</span>
      </div>
      </div>
    </Revelar>
  )
}

"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import { PORTADA } from "@/lib/constants-programa"
import { Revelar } from "@/components/v2/Revelar"
import { FondoDecorativo } from "@/components/v2/FondoDecorativo"

const PANTALLAS = PORTADA.app.pantallas
const PASOS = PANTALLAS.length

/**
 * Cuándo el recorrido va fijo y avanza con el scroll. Debajo de 900 px de
 * ancho (o con una pantalla muy baja, donde la sección fija no cabe) los pasos
 * van apilados, cada uno con su pantalla. El CSS usa la misma consulta.
 */
const ESCRITORIO = "(min-width: 900px) and (min-height: 620px)"

/**
 * "Tu plan, en el bolsillo": seis pantallas reales de la app, cada una con un
 * título corto y lo que hace (15-sep: más información y más pantallas).
 *
 * En escritorio la sección mide varias pantallas de alto y su contenido queda
 * fijo (sticky) mientras se baja: el paso activo sale del avance del scroll
 * dentro de la sección, sin depender de un clic (decisión de Oscar del
 * 14-sep). El paso activo muestra su detalle; los demás, solo el título. Las
 * pestañas siguen siendo pestañas: clic, flechas, Inicio y Fin cambian el paso
 * y llevan el scroll hasta él, para que la página y el paso no se contradigan.
 *
 * Mientras ese scroll viaja pasa por los pasos intermedios. `destino` los
 * ignora hasta llegar, para que la pestaña no parpadee.
 *
 * En celular no hay pestañas: los seis pasos apilados, cada uno con su pantalla
 * y su texto al lado. Sin librerías: un listener de scroll pasivo que mide una
 * vez por cuadro con requestAnimationFrame. Con `prefers-reduced-motion` o el
 * movimiento pausado, el cambio de pantalla no se anima y el scroll salta en
 * vez de deslizarse.
 */
export function RecorridoApp() {
  const [activa, setActiva] = useState(0)
  const seccion = useRef<HTMLElement>(null)
  const botones = useRef<(HTMLButtonElement | null)[]>([])
  const destino = useRef<{ indice: number; hasta: number } | null>(null)

  useEffect(() => {
    const el = seccion.current
    if (!el) return
    const consulta = window.matchMedia(ESCRITORIO)
    let cuadro = 0

    const medir = () => {
      cuadro = 0
      if (!consulta.matches) return
      const recorrible = el.offsetHeight - window.innerHeight
      if (recorrible <= 0) return
      const avance = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / recorrible))
      el.style.setProperty("--avance", avance.toFixed(4))
      const indice = Math.min(PASOS - 1, Math.floor(avance * PASOS))

      const viaje = destino.current
      if (viaje) {
        if (indice !== viaje.indice && Date.now() < viaje.hasta) return
        destino.current = null
      }
      setActiva(indice)
    }

    const pedirMedida = () => {
      if (!cuadro) cuadro = window.requestAnimationFrame(medir)
    }

    medir()
    window.addEventListener("scroll", pedirMedida, { passive: true })
    window.addEventListener("resize", pedirMedida)
    consulta.addEventListener?.("change", pedirMedida)
    return () => {
      window.removeEventListener("scroll", pedirMedida)
      window.removeEventListener("resize", pedirMedida)
      consulta.removeEventListener?.("change", pedirMedida)
      if (cuadro) window.cancelAnimationFrame(cuadro)
    }
  }, [])

  const irAlPaso = (indice: number, enfocar: boolean) => {
    const i = (indice + PASOS) % PASOS
    setActiva(i)
    if (enfocar) botones.current[i]?.focus({ preventScroll: true })

    const el = seccion.current
    if (!el || !window.matchMedia(ESCRITORIO).matches) return
    const recorrible = el.offsetHeight - window.innerHeight
    if (recorrible <= 0) return
    const inicio = el.getBoundingClientRect().top + window.scrollY
    const sinMovimiento =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("paused-motion")

    destino.current = { indice: i, hasta: Date.now() + 1600 }
    window.scrollTo({
      // Al medio del tramo del paso, no a su borde: un pixel de redondeo en el
      // borde lo dejaría en el paso anterior.
      top: Math.round(inicio + recorrible * ((i + 0.5) / PASOS)),
      behavior: sinMovimiento ? "auto" : "smooth",
    })
  }

  const numero = (i: number) => String(i + 1).padStart(2, "0")

  return (
    <section
      className="app-section recorrido con-fondo"
      id="tu-app"
      ref={seccion}
      style={{ "--pasos": PASOS } as CSSProperties}
    >
      <FondoDecorativo variante="bolsillo" />
      <div className="recorrido-fijo">
        <div className="wrap app-layout">
          <div className="app-explainer">
            <Revelar>
              <p className="eyebrow">{PORTADA.app.eyebrow}</p>
              <h2>
                Menos pensar
                <br />
                qué comer.
                <br />
                <em>Más vivir tu día.</em>
              </h2>
              <p>{PORTADA.app.cuerpo}</p>
            </Revelar>

            <div
              className="feature-tabs"
              role="tablist"
              aria-label="Pantallas de Nutrico"
              aria-orientation="vertical"
            >
              <span className="recorrido-riel" aria-hidden="true" />
              {PANTALLAS.map((p, i) => (
                <button
                  key={p.id}
                  ref={(el) => {
                    botones.current[i] = el
                  }}
                  id={`tab-${p.id}`}
                  role="tab"
                  type="button"
                  aria-selected={activa === i}
                  aria-controls={`panel-${p.id}`}
                  tabIndex={activa === i ? 0 : -1}
                  onClick={() => irAlPaso(i, false)}
                  onKeyDown={(e) => {
                    let siguiente: number | null = null
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") siguiente = i + 1
                    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") siguiente = i - 1
                    else if (e.key === "Home") siguiente = 0
                    else if (e.key === "End") siguiente = PASOS - 1
                    if (siguiente === null) return
                    e.preventDefault()
                    irAlPaso(siguiente, true)
                  }}
                >
                  <span className="tab-number">{numero(i)}</span>
                  <span className="tab-texto">
                    <b>{p.titulo}</b>
                    <span className="tab-detalle">
                      <span>{p.detalle}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="app-demo recorrido-demo">
            <span className="demo-label">{PORTADA.app.etiquetaDemo}</span>
            {PANTALLAS.map((p, i) => (
              <div
                key={p.id}
                role="tabpanel"
                id={`panel-${p.id}`}
                aria-labelledby={`tab-${p.id}`}
                tabIndex={activa === i ? 0 : -1}
                className="recorrido-panel"
                data-activo={activa === i}
              >
                <Image
                  src={p.imagen.src}
                  alt={p.imagen.alt}
                  width={p.imagen.width}
                  height={p.imagen.height}
                  sizes="270px"
                  loading="lazy"
                />
              </div>
            ))}
            <div className="recorrido-pie" aria-hidden="true">
              <span className="recorrido-contador">
                <b>{numero(activa)}</b> / {numero(PASOS - 1)}
              </span>
              <span className="screenshot-label">{PORTADA.app.etiquetaCaptura}</span>
            </div>
          </div>
        </div>
      </div>

      <ol className="wrap recorrido-pasos">
        {PANTALLAS.map((p, i) => (
          <li key={p.id} className="recorrido-paso">
            <div className="recorrido-paso-pantalla">
              <Image
                src={p.imagen.src}
                alt={p.imagen.alt}
                width={p.imagen.width}
                height={p.imagen.height}
                sizes="(max-width: 520px) 44vw, 220px"
                loading="lazy"
              />
            </div>
            <div className="recorrido-paso-texto">
              <span className="tab-number">{numero(i)}</span>
              <b>{p.titulo}</b>
              <p>{p.detalle}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="wrap recorrido-paso-nota">{PORTADA.app.etiquetaCaptura}</p>
    </section>
  )
}

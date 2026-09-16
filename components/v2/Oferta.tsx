"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { PORTADA, PROGRAMA } from "@/lib/constants-programa"
import {
  anioDe,
  diaMesCorto,
  diaSemanaYFecha,
  diaYMes,
  formatCLP,
  horaDe,
  mesDe,
  ultimoDiaDeVenta,
  ultimoDiaDelPrograma,
} from "@/lib/programa"
import { canalDeContacto } from "@/lib/contacto"
import { useVenta } from "@/components/v2/VentaProvider"
import { Revelar } from "@/components/v2/Revelar"
import { CuentaAtras } from "@/components/v2/CuentaAtras"
import { FormListaEspera } from "@/components/v2/FormListaEspera"
import { CalificacionGoogle, PruebaSocialCompra } from "@/components/v2/PruebaSocialCompra"

/**
 * La oferta (#precio). Cambia según el estado, y ninguno es una puerta cerrada:
 * - abierta: precio, cuenta regresiva al cierre y el botón que abre el checkout;
 * - proxima: la oferta completa, cuándo abren y la lista de espera;
 * - cerro (cerró con la página abierta): lista de espera con el correo escrito;
 * - ninguna / error: el programa sin fechas ni precio inventados, y contacto.
 *   Sin cohorte no hay a qué anotar a nadie (la app exige el slug), así que un
 *   formulario ahí fallaría siempre: se ofrece escribir.
 *
 * El ViewContent se dispara acá, una vez, cuando la sección entra en pantalla.
 *
 * Desde el 14-sep lleva una foto junto a la cuenta regresiva y la razón de la
 * fecha de cierre ya no se repite acá: la explica la pregunta "¿Puedo entrar
 * después del...?" de las dudas.
 *
 * Desde el 15-sep la tarjeta pone el botón justo debajo del precio y, pegados a
 * él, el pago seguro con el logo de Mercado Pago, la calificación de Google y
 * tres dudas cortas de compra; lo que incluye va después. Al lado (debajo, en
 * celular) van las citas cortas, las cifras de Constanza y qué pasa después de
 * pagar. Sin cupos, garantía ni descuentos.
 */
export function Oferta() {
  const { estado, cohorte, venta, abrirCheckout, registrarVistaOferta } = useVenta()
  const seccion = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = seccion.current
    if (!el || !("IntersectionObserver" in window)) return
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          registrarVistaOferta()
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [registrarVistaOferta])

  const contacto = canalDeContacto("Hola, quiero saber cuándo abre el próximo grupo de Prepara tu Verano")
  const flecha = <span aria-hidden="true">↗</span>

  const eyebrow = cohorte
    ? `GRUPO ${mesDe(cohorte.fecha_inicio).toUpperCase()} ${anioDe(cohorte.fecha_inicio)}`
    : "PREPARA TU VERANO"

  let cuerpo: string
  if (estado === "abierta" && cohorte) {
    cuerpo = `${PORTADA.oferta.cuerpo} El ${diaYMes(cohorte.fecha_inicio)} empezamos juntas.`
  } else if (estado === "proxima" && cohorte) {
    cuerpo = `${PORTADA.oferta.cuerpo} El grupo empieza el ${diaYMes(cohorte.fecha_inicio)}.`
  } else if (estado === "cerro") {
    cuerpo = `${PORTADA.oferta.cerroEnVivo} ${PROGRAMA.listaEspera.body}`
  } else if (estado === "ninguna") {
    cuerpo = PORTADA.oferta.ninguna
  } else {
    cuerpo = PORTADA.oferta.error
  }

  const mostrarPrecio = Boolean(cohorte) && (estado === "abierta" || estado === "proxima")

  return (
    <section className="enrollment-section" id="precio" ref={seccion}>
      <div className="wrap enrollment-grid">
        <Revelar className="enrollment-copy">
          <p className="eyebrow">
            {estado === "abierta" && <span className="live-dot" />} {eyebrow}
          </p>
          <h2 id="oferta-titulo">
            {PORTADA.oferta.h2[0]}
            <br />
            {PORTADA.oferta.h2[1]}
            <br />
            <em>{PORTADA.oferta.h2em}</em>
          </h2>
          <div className="oferta-cuerpo">
            <div className="oferta-foto">
              <Image
                src={PORTADA.oferta.foto.src}
                alt={PORTADA.oferta.foto.alt}
                width={PORTADA.oferta.foto.width}
                height={PORTADA.oferta.foto.height}
                sizes="(max-width: 760px) 96px, 200px"
              />
            </div>
            <p className="oferta-texto">{cuerpo}</p>

            {estado === "abierta" && cohorte && (
              <div className="closing">
                <CuentaAtras hasta={cohorte.venta_cierra} titulo={PORTADA.oferta.cierranEn} />
                <p>
                  Cierre: {ultimoDiaDeVenta(cohorte.venta_cierra)} a las{" "}
                  {horaDe(cohorte.venta_cierra)}, hora de Chile.
                </p>
              </div>
            )}

            {estado === "proxima" && venta.estado === "proxima" && (
              <div className="closing">
                <span>Las inscripciones abren el</span>
                <p className="apertura">{diaSemanaYFecha(venta.cohorte.venta_abre)}</p>
                <p>Y cierran el {ultimoDiaDeVenta(venta.cohorte.venta_cierra)}.</p>
              </div>
            )}
          </div>
        </Revelar>

        <Revelar className="price-card" id="oferta-tarjeta">
          <div className="price-top">
            <span className="eyebrow">{PORTADA.oferta.tarjetaEyebrow}</span>
            <span className="mini-pill">{PORTADA.oferta.tarjetaPildora}</span>
          </div>
          <h3>{cohorte?.nombre ?? PROGRAMA.nombre}</h3>

          {cohorte ? (
            <>
              <p className="price">
                <span>$</span>
                {formatCLP(cohorte.precio).replace("$", "")} <small>CLP</small>
              </p>
              <p className="price-explanation">{PORTADA.oferta.unSoloPago}</p>
              <div className="date-range">
                <span>{diaMesCorto(cohorte.fecha_inicio).toUpperCase()}</span>
                <span aria-hidden="true" className="date-range-line" />
                <span>
                  {ultimoDiaDelPrograma(cohorte.fecha_fin, { anio: true }).toUpperCase()}
                </span>
              </div>
            </>
          ) : (
            <p className="price-explanation price-explanation-sola">
              Tres meses. {PORTADA.oferta.unSoloPago}
            </p>
          )}

          {estado === "abierta" && (
            <button className="button primary" id="enroll-button" type="button" onClick={abrirCheckout}>
              {PORTADA.cta.abierta} {flecha}
            </button>
          )}

          {(estado === "proxima" || estado === "cerro") && (
            <div className="espera">
              <p className="espera-titulo">{PROGRAMA.listaEspera.h2}</p>
              <FormListaEspera idCampo="oferta-espera-email" />
            </div>
          )}

          {(estado === "ninguna" || estado === "error") && (
            <>
              <a className="button primary" href={contacto.href} target="_blank" rel="noopener noreferrer">
                {contacto.etiqueta} {flecha}
              </a>
              {contacto.detalle && <p className="payment-note">{contacto.detalle}</p>}
            </>
          )}

          {mostrarPrecio && (
            <div className="pago-seguro">
              <Image
                src="/v2/logos/mercadopago.svg"
                alt="Mercado Pago"
                width={36}
                height={36}
                unoptimized
              />
              <p>
                <b>{PORTADA.oferta.pagoSeguro}</b>
                <span>{PORTADA.oferta.mediosPago}</span>
              </p>
            </div>
          )}

          {estado === "abierta" && (
            <dl className="dudas-compra">
              {PORTADA.oferta.dudasCompra.map((d) => (
                <div key={d.q}>
                  <dt>{d.q}</dt>
                  <dd>{d.a}</dd>
                </div>
              ))}
            </dl>
          )}

          <CalificacionGoogle />

          <p className="incluye-titulo">{PORTADA.oferta.incluyeTitulo}</p>
          <ul className="included-list">
            {PROGRAMA.incluye.map((linea) => (
              <li key={linea.titulo}>
                {linea.titulo}
                <small>{linea.detalle}</small>
              </li>
            ))}
          </ul>

          {estado !== "abierta" && <p className="not-included">{PORTADA.oferta.noIncluye}</p>}
        </Revelar>

        <Revelar className="enrollment-prueba">
          <PruebaSocialCompra inicio={mostrarPrecio && cohorte ? diaYMes(cohorte.fecha_inicio) : null} />
        </Revelar>
      </div>
    </section>
  )
}

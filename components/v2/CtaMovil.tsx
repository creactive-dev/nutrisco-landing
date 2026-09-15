"use client"

import { useEffect, useState } from "react"
import { diaMesCorto, formatCLP } from "@/lib/programa"
import { useVenta } from "@/components/v2/VentaProvider"
import { BotonPrograma } from "@/components/v2/BotonPrograma"

/**
 * CTA fijo abajo en celular (el CSS lo esconde en escritorio).
 *
 * Se retira desde que el titular de la oferta entra en pantalla hasta que el
 * botón de verdad (o el formulario, si la venta no está abierta) sale por
 * arriba (15-sep):
 * - así no tapa el titular de la oferta mientras se lee;
 * - no duplica el botón cuando el botón real está a la vista;
 * - y vuelve apenas ese botón queda atrás, para que siempre haya uno visible
 *   mientras se leen la prueba social y las dudas.
 * Un listener de scroll pasivo que mide una vez por cuadro.
 */
export function CtaMovil() {
  const { estado, cohorte, venta } = useVenta()
  const [oculto, setOculto] = useState(false)

  useEffect(() => {
    let cuadro = 0
    const medir = () => {
      cuadro = 0
      const titulo = document.getElementById("oferta-titulo")
      const boton =
        document.getElementById("enroll-button") ?? document.getElementById("oferta-tarjeta")
      if (!titulo || !boton) return
      const alto = window.innerHeight
      const tituloEntro = titulo.getBoundingClientRect().top < alto - 90
      const botonSigue = boton.getBoundingClientRect().bottom > 0
      setOculto(tituloEntro && botonSigue)
    }
    const pedir = () => {
      if (!cuadro) cuadro = window.requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener("scroll", pedir, { passive: true })
    window.addEventListener("resize", pedir)
    return () => {
      window.removeEventListener("scroll", pedir)
      window.removeEventListener("resize", pedir)
      if (cuadro) window.cancelAnimationFrame(cuadro)
    }
    // El botón real cambia de elemento cuando la venta cierra en vivo.
  }, [estado])

  let principal: string
  let secundario: string
  if (estado === "abierta" && cohorte) {
    principal = formatCLP(cohorte.precio)
    secundario = "Pago único · 3 meses"
  } else if (estado === "proxima" && venta.estado === "proxima") {
    principal = `Abren el ${diaMesCorto(venta.cohorte.venta_abre)}`
    secundario = `${formatCLP(venta.cohorte.precio)} · pago único`
  } else if (estado === "cerro") {
    principal = "Cerraron"
    secundario = "Te avisamos del próximo grupo"
  } else {
    principal = "Prepara tu Verano"
    secundario = "3 meses · un solo pago"
  }

  return (
    <div className={`mobile-cta${oculto ? " is-hidden" : ""}`} aria-label="Inscripción al programa">
      <div>
        <strong>{principal}</strong>
        <span>{secundario}</span>
      </div>
      <BotonPrograma className="button primary" corto />
    </div>
  )
}

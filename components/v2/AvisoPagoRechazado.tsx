"use client"

import { PORTADA } from "@/lib/constants-programa"
import { canalDeContacto } from "@/lib/contacto"
import { useVenta } from "@/components/v2/VentaProvider"

/**
 * Lo que ve quien vuelve de Mercado Pago con `?pago=rechazado`.
 *
 * Casi la mitad de las tarjetas se rechazan por antifraude, y la persona cree
 * que el problema es suyo. Esta franja le dice que casi nunca es por fondos, le
 * da la vía que funciona (saldo de Mercado Pago) y le reabre el checkout con su
 * correo ya puesto. No dispara eventos de Meta: ya contó su InitiateCheckout la
 * primera vez, y otro evento acá inflaría el embudo.
 */
export function AvisoPagoRechazado() {
  const { estado, abrirCheckout } = useVenta()
  const contacto = canalDeContacto("Hola, mi pago de Prepara tu Verano no se completó")

  return (
    <div className="pago-rechazado" role="alert">
      <div className="wrap pago-rechazado-grid">
        <div>
          <p className="pago-rechazado-titulo">{PORTADA.pagoRechazado.titulo}</p>
          <p>
            {estado === "abierta" ? PORTADA.pagoRechazado.cuerpo : PORTADA.pagoRechazado.sinVenta}
            {estado !== "abierta" && contacto.detalle ? ` ${contacto.detalle}` : ""}
          </p>
        </div>
        {estado === "abierta" ? (
          <button type="button" className="button primary small" onClick={abrirCheckout}>
            {PORTADA.pagoRechazado.boton} <span aria-hidden="true">↗</span>
          </button>
        ) : (
          <a className="button primary small" href={contacto.href} target="_blank" rel="noopener noreferrer">
            {contacto.etiqueta} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  )
}

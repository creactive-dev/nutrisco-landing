"use client"

import { useState } from "react"
import { PROGRAMA } from "@/lib/constants-programa"
import { APP_URL } from "@/lib/programa"
import { anotarseEnListaEspera } from "@/lib/pixel"
import { armarTracking, nuevoEventId } from "@/lib/tracking"
import { canalDeContacto } from "@/lib/contacto"
import { useVenta } from "@/components/v2/VentaProvider"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Lista de espera. Anotarse NO es comprar: la app guarda el correo y escribe
 * cuando abre la venta.
 *
 * El correo es el mismo estado que el del checkout (vive en el contexto): si
 * la venta cierra mientras alguien estaba pagando, pasa acá con su correo ya
 * escrito. La primera versión prometía eso en un comentario pero partía con el
 * campo vacío.
 */
export function FormListaEspera({ idCampo }: { idCampo: string }) {
  const { email, setEmail, slugListaEspera, sinEventos } = useVenta()
  const [error, setError] = useState<{ texto: string; contacto: boolean } | null>(null)
  const [cargando, setCargando] = useState(false)
  const [listo, setListo] = useState(false)
  const contacto = canalDeContacto("Hola, quiero que me avisen cuando abra Prepara tu Verano")

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    const limpio = email.trim()
    if (!EMAIL_REGEX.test(limpio)) {
      setError({ texto: "Revisa tu correo, parece que falta algo.", contacto: false })
      return
    }
    if (!slugListaEspera) {
      setError({ texto: "Justo ahora no podemos anotarte desde acá.", contacto: true })
      return
    }
    setError(null)
    setCargando(true)
    const eventId = nuevoEventId()
    try {
      const res = await fetch(`${APP_URL}/api/programa/lista-espera`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: limpio,
          cohorte_slug: slugListaEspera,
          tracking: armarTracking(eventId),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      if (!sinEventos) anotarseEnListaEspera(slugListaEspera, eventId)
      setListo(true)
    } catch {
      setError({ texto: "No pudimos anotarte. Inténtalo de nuevo en un momento o", contacto: true })
    } finally {
      setCargando(false)
    }
  }

  if (listo) {
    return (
      <div className="espera-listo" role="status">
        <span aria-hidden="true">✓</span>
        <p>{PROGRAMA.listaEspera.exito}</p>
      </div>
    )
  }

  return (
    <form className="espera-form" onSubmit={enviar} noValidate>
      <div className="campo">
        <label htmlFor={idCampo}>Tu correo</label>
        <input
          id={idCampo}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="tu@correo.cl"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${idCampo}-error` : undefined}
        />
      </div>
      <button type="submit" className="button primary" disabled={cargando}>
        {cargando ? PROGRAMA.listaEspera.ctaCargando : PROGRAMA.listaEspera.cta}{" "}
        {!cargando && <span aria-hidden="true">↗</span>}
      </button>
      {error && (
        <p id={`${idCampo}-error`} role="alert" className="campo-error">
          {error.texto}
          {error.contacto && (
            <>
              {" "}
              <a href={contacto.href} target="_blank" rel="noopener noreferrer">
                {contacto.etiqueta.charAt(0).toLowerCase() + contacto.etiqueta.slice(1)}
              </a>
              .
            </>
          )}
        </p>
      )}
      <p className="espera-nota">Te escribimos una vez, cuando abran. Nada más.</p>
    </form>
  )
}

"use client"

import { useEffect, useState } from "react"
import { APP_URL } from "@/lib/programa"
import { REGALO_FIESTAS } from "@/lib/regalo"
import { pedirGuiaFiestas } from "@/lib/pixel"
import { armarTracking, guardarPrimeraVisita, nuevoEventId } from "@/lib/tracking"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errores = Partial<Record<"nombre" | "email", string>>
type Listo = { crm: boolean; nombre: string; email: string }

/**
 * El formulario de /guia-fiestas (diseño C2 §8). Pide nombre y correo, los
 * manda a la app (que etiqueta `ptv-regalo-fiestas` en el CRM y avisa el Lead a
 * Meta) y entrega el PDF en la misma pantalla.
 *
 * El PDF se entrega SIEMPRE, aunque el CRM o la app fallen: la persona ya dio
 * su correo. Lo que cambia es la promesa del correo, que se hace solo si el CRM
 * confirmó la etiqueta (es lo que dispara G0).
 *
 * `yaLaPidio`: llega desde el formulario de Meta (`?ok=1`), que ya le pidió el
 * correo. Se le muestra la descarga sin pedir nada y sin contar otro Lead.
 */
export function FormRegalo({ yaLaPidio, nota }: { yaLaPidio: boolean; nota: string }) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [trampa, setTrampa] = useState("")
  const [errores, setErrores] = useState<Errores>({})
  const [cargando, setCargando] = useState(false)
  const [listo, setListo] = useState<Listo | null>(yaLaPidio ? { crm: false, nombre: "", email: "" } : null)

  // Guarda los UTM del DM o del anuncio: si después pasa a la portada, su
  // inscripción queda con el origen correcto.
  useEffect(() => {
    guardarPrimeraVisita()
  }, [])

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (cargando) return
    const limpio = email.trim()
    const nuevos: Errores = {}
    if (!nombre.trim()) nuevos.nombre = REGALO_FIESTAS.form.errorNombre
    if (!EMAIL_REGEX.test(limpio)) nuevos.email = REGALO_FIESTAS.form.errorEmail
    setErrores(nuevos)
    if (nuevos.nombre || nuevos.email) {
      document.getElementById(nuevos.nombre ? "regalo-nombre" : "regalo-email")?.focus()
      return
    }

    const eventId = nuevoEventId()
    setCargando(true)
    let crm = false
    try {
      const res = await fetch(`${APP_URL}/api/programa/regalo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: limpio,
          nombre: nombre.trim(),
          regalo: REGALO_FIESTAS.slug,
          sitio_web: trampa,
          tracking: armarTracking(eventId),
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { crm?: unknown; error?: unknown }
      if (res.status === 400 && data.error === "Email inválido") {
        setErrores({ email: REGALO_FIESTAS.form.errorEmail })
        setCargando(false)
        document.getElementById("regalo-email")?.focus()
        return
      }
      if (res.ok) {
        crm = data.crm === true
        pedirGuiaFiestas(eventId)
      }
    } catch {
      /* sin conexión con la app: la guía se entrega igual */
    }
    setCargando(false)
    setListo({ crm, nombre: nombre.trim(), email: limpio })
  }

  if (listo) {
    const primerNombre = listo.nombre.split(/\s+/)[0]
    return (
      <div className="regalo-listo" role="status">
        <span className="regalo-check" aria-hidden="true">
          ✓
        </span>
        <p className="regalo-listo-titulo">
          {primerNombre ? `Listo, ${primerNombre}.` : "Listo."} {REGALO_FIESTAS.listo.titulo}
        </p>
        <a
          className="button primary"
          href={REGALO_FIESTAS.pdf}
          download={REGALO_FIESTAS.nombreArchivo}
          target="_blank"
          rel="noopener"
        >
          {REGALO_FIESTAS.listo.descargar} <span aria-hidden="true">↓</span>
        </a>
        {listo.crm && (
          <p className="regalo-listo-correo">
            {REGALO_FIESTAS.listo.correo} <b>{listo.email}</b>. {REGALO_FIESTAS.listo.promociones}
          </p>
        )}
      </div>
    )
  }

  return (
    <form className="regalo-form" onSubmit={enviar} noValidate>
      <div className="campo">
        <label htmlFor="regalo-nombre">{REGALO_FIESTAS.form.nombre}</label>
        <input
          id="regalo-nombre"
          name="nombre"
          type="text"
          autoComplete="given-name"
          autoCapitalize="words"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value)
            if (errores.nombre) setErrores((x) => ({ ...x, nombre: undefined }))
          }}
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? "regalo-nombre-error" : undefined}
        />
        {errores.nombre && (
          <p id="regalo-nombre-error" className="campo-error">
            {errores.nombre}
          </p>
        )}
      </div>
      <div className="campo">
        <label htmlFor="regalo-email">{REGALO_FIESTAS.form.email}</label>
        <input
          id="regalo-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          placeholder="tu@correo.cl"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (errores.email) setErrores((x) => ({ ...x, email: undefined }))
          }}
          aria-invalid={Boolean(errores.email)}
          aria-describedby={errores.email ? "regalo-email-error" : undefined}
        />
        {errores.email && (
          <p id="regalo-email-error" className="campo-error">
            {errores.email}
          </p>
        )}
      </div>
      {/* Trampa para bots: invisible para personas y para lectores de pantalla. */}
      <div className="regalo-trampa" aria-hidden="true">
        <label htmlFor="regalo-sitio">Tu sitio web</label>
        <input
          id="regalo-sitio"
          name="sitio_web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
        />
      </div>
      <button type="submit" className="button primary" disabled={cargando} aria-busy={cargando}>
        {cargando ? REGALO_FIESTAS.form.cargando : REGALO_FIESTAS.form.cta}{" "}
        {!cargando && <span aria-hidden="true">↗</span>}
      </button>
      <p className="regalo-nota">
        {nota}{" "}
        <a href={`${APP_URL}/privacidad`} target="_blank" rel="noopener noreferrer">
          Política de privacidad
        </a>
        .
      </p>
    </form>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { PORTADA, PROGRAMA } from "@/lib/constants-programa"
import {
  APP_URL,
  diaMesCorto,
  diaSemanaYFecha,
  formatCLP,
  ultimoDiaDelPrograma,
} from "@/lib/programa"
import { iniciarCheckout } from "@/lib/pixel"
import { armarTracking, nuevoEventId } from "@/lib/tracking"
import { formatearRut } from "@/lib/rut"
import { canalDeContacto } from "@/lib/contacto"
import { CLAVE_DATOS, useVenta } from "@/components/v2/VentaProvider"
import { FormListaEspera } from "@/components/v2/FormListaEspera"

const LEGAL_CONSENT_STORAGE_KEY = "nutrico_legal_consent"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errores = Partial<Record<"nombre" | "email" | "rut" | "consentimiento", string>>

/**
 * El formulario que cobra. Modal, como la v2: en móvil evita un scroll largo
 * entre la decisión y el pago, y deja el precio a la vista mientras se llena.
 *
 * Respuestas de `POST /api/programa/inscribir`:
 * - 200 `{url}`: InitiateCheckout con el mismo `event_id` que viaja a la app, y
 *   a Mercado Pago.
 * - 409 CON `venta_abre` (aunque venga null): la venta cerró en vivo. Toda la
 *   página pasa a lista de espera y este modal también, con el correo escrito.
 * - 409 SIN `venta_abre`: ya está inscrita. El PR anterior trataba cualquier
 *   409 como venta cerrada y a una clienta que ya pagó le ofrecía anotarse a
 *   la lista de espera.
 * - cualquier otro error: mensaje amable y el mismo botón para reintentar.
 */
export function DialogoCheckout() {
  const {
    estado,
    cohorte,
    checkoutAbierto,
    cerrarCheckout,
    cerrarVenta,
    email,
    setEmail,
    sinEventos,
    registrarVistaOferta,
    ventaAbreSiguiente,
  } = useVenta()

  const dialogo = useRef<HTMLDialogElement>(null)
  const campoNombre = useRef<HTMLInputElement>(null)
  const [nombre, setNombre] = useState("")
  const [rut, setRut] = useState("")
  const [acepta, setAcepta] = useState(false)
  const [tiembla, setTiembla] = useState(false)
  const [errores, setErrores] = useState<Errores>({})
  const [cargando, setCargando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(false)
  const [yaInscrita, setYaInscrita] = useState(false)

  const contacto = canalDeContacto("Hola, tengo una duda con mi inscripción a Prepara tu Verano")

  // Nombre guardado de un intento anterior (vuelta de un pago rechazado).
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_DATOS)
      if (!guardado) return
      const datos = JSON.parse(guardado) as { nombre?: string }
      if (typeof datos.nombre === "string") setNombre((actual) => actual || datos.nombre || "")
    } catch {
      /* sin almacenamiento */
    }
  }, [])

  // Volver con el botón atrás desde Mercado Pago restaura la página desde la
  // caché del navegador con el botón en "Preparando tu pago...", deshabilitado
  // para siempre. Se destraba.
  useEffect(() => {
    const alVolver = (evento: PageTransitionEvent) => {
      if (evento.persisted) setCargando(false)
    }
    window.addEventListener("pageshow", alVolver)
    return () => window.removeEventListener("pageshow", alVolver)
  }, [])

  // Abrir y cerrar el <dialog> nativo desde el estado.
  useEffect(() => {
    const el = dialogo.current
    if (!el) return
    if (checkoutAbierto && !el.open) {
      if (typeof el.showModal === "function") {
        el.showModal()
      } else {
        // Navegadores sin <dialog> (iOS anteriores a 15.4): se abre como capa fija.
        el.setAttribute("open", "")
        el.classList.add("dialogo-sin-modal")
      }
      registrarVistaOferta()
      // En escritorio se escribe de inmediato. En un teléfono, enfocar abre el
      // teclado y tapa el precio: ahí se deja que la persona toque el campo.
      if (window.matchMedia("(pointer: fine)").matches) {
        campoNombre.current?.focus()
      } else {
        el.focus()
      }
    } else if (!checkoutAbierto && el.open) {
      if (typeof el.close === "function") el.close()
      else el.removeAttribute("open")
    }
  }, [checkoutAbierto, registrarVistaOferta])

  if (estado !== "abierta" && estado !== "cerro") {
    return null
  }

  const cerro = estado === "cerro"

  function validar(): { errores: Errores; rutFormateado: string | null } {
    const nuevos: Errores = {}
    if (!nombre.trim()) nuevos.nombre = PORTADA.checkout.errorNombre
    if (!EMAIL_REGEX.test(email.trim())) nuevos.email = PORTADA.checkout.errorEmail
    let rutFormateado: string | null = null
    if (rut.trim()) {
      rutFormateado = formatearRut(rut)
      if (!rutFormateado) nuevos.rut = PORTADA.checkout.errorRut
    }
    if (!acepta) nuevos.consentimiento = PORTADA.checkout.errorConsentimiento
    return { errores: nuevos, rutFormateado }
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (cargando || !cohorte) return
    setErrorEnvio(false)
    setYaInscrita(false)

    const { errores: nuevos, rutFormateado } = validar()
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) {
      if (nuevos.consentimiento) {
        setTiembla(true)
        window.setTimeout(() => setTiembla(false), 600)
      }
      const primero = (["nombre", "email", "rut", "consentimiento"] as const).find((c) => nuevos[c])
      const ids = {
        nombre: "checkout-nombre",
        email: "checkout-email",
        rut: "checkout-rut",
        consentimiento: "checkout-consentimiento",
      }
      if (primero) document.getElementById(ids[primero])?.focus()
      return
    }
    if (rutFormateado) setRut(rutFormateado)

    const limpio = email.trim()
    try {
      window.localStorage.setItem(
        LEGAL_CONSENT_STORAGE_KEY,
        JSON.stringify({
          accepted_at: new Date().toISOString(),
          documents: { terminos: "v1.0", privacidad: "v3.0", aviso_datos_sensibles: "v1.0" },
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        })
      )
      // Para ofrecer "intentar de nuevo" sin volver a escribir si Mercado Pago
      // rechaza. El RUT no se guarda: es un dato de identidad y es opcional.
      window.localStorage.setItem(CLAVE_DATOS, JSON.stringify({ nombre: nombre.trim(), email: limpio }))
    } catch {
      /* almacenamiento no disponible: la aceptación queda por el click */
    }

    const eventId = nuevoEventId()
    setCargando(true)
    try {
      const res = await fetch(`${APP_URL}/api/programa/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: limpio,
          nombre: nombre.trim(),
          rut: rutFormateado,
          tracking: armarTracking(eventId),
        }),
      })
      const data: Record<string, unknown> = await res
        .json()
        .then((d: unknown) => (d && typeof d === "object" ? (d as Record<string, unknown>) : {}))
        .catch(() => ({}))

      if (res.status === 409) {
        setCargando(false)
        if (Object.prototype.hasOwnProperty.call(data, "venta_abre")) {
          cerrarVenta({
            slug: typeof data.cohorte_slug === "string" ? data.cohorte_slug : null,
            ventaAbre: typeof data.venta_abre === "string" ? data.venta_abre : null,
          })
        } else {
          setYaInscrita(true)
        }
        return
      }

      const url = typeof data.url === "string" ? data.url : ""
      if (!res.ok || !/^https:\/\//.test(url)) {
        if (res.status === 400 && data.error === "Email inválido") {
          setErrores({ email: PORTADA.checkout.errorEmail })
          setCargando(false)
          return
        }
        throw new Error(String(res.status))
      }

      if (!sinEventos) iniciarCheckout(cohorte.slug, cohorte.precio, eventId)
      // Un respiro para que el píxel alcance a salir antes de dejar la página:
      // redirigir en el mismo tick puede cancelar la petición del evento.
      window.setTimeout(() => window.location.assign(url), 150)
    } catch {
      setErrorEnvio(true)
      setCargando(false)
    }
  }

  const alClickFondo = (e: React.MouseEvent<HTMLDialogElement>) => {
    const el = dialogo.current
    if (!el || e.target !== el) return
    const r = el.getBoundingClientRect()
    const fuera =
      e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom
    if (fuera) cerrarCheckout()
  }

  return (
    <dialog
      ref={dialogo}
      id="checkout-dialog"
      aria-labelledby="checkout-title"
      tabIndex={-1}
      onClose={cerrarCheckout}
      onCancel={cerrarCheckout}
      onClick={alClickFondo}
    >
      <button className="dialog-close" type="button" aria-label="Cerrar" onClick={cerrarCheckout}>
        <span aria-hidden="true">×</span>
      </button>
      <p className="eyebrow">{PORTADA.checkout.eyebrow}</p>

      {cerro ? (
        <>
          <h2 id="checkout-title">
            {PORTADA.checkout.cerroTitulo}
            <br />
            <em>{PORTADA.checkout.cerroTituloEm}</em>
          </h2>
          <p>
            {ventaAbreSiguiente
              ? `El próximo grupo abre el ${diaSemanaYFecha(ventaAbreSiguiente)}. `
              : ""}
            {PROGRAMA.listaEspera.body}
          </p>
          <FormListaEspera idCampo="checkout-espera-email" />
        </>
      ) : (
        cohorte && (
          <>
            <h2 id="checkout-title">
              {PORTADA.checkout.h2}
              <br />
              <em>{PORTADA.checkout.h2em}</em>
            </h2>
            <p>
              3 meses · {formatCLP(cohorte.precio)} CLP · un solo pago
              <br />
              {diaMesCorto(cohorte.fecha_inicio)} al {ultimoDiaDelPrograma(cohorte.fecha_fin)}
            </p>

            <form onSubmit={enviar} noValidate>
              <div className="campo">
                <label htmlFor="checkout-nombre">{PORTADA.checkout.nombre}</label>
                <input
                  ref={campoNombre}
                  id="checkout-nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  autoCapitalize="words"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value)
                    if (errores.nombre) setErrores((x) => ({ ...x, nombre: undefined }))
                  }}
                  aria-invalid={Boolean(errores.nombre)}
                  aria-describedby={errores.nombre ? "checkout-nombre-error" : undefined}
                />
                {errores.nombre && (
                  <p id="checkout-nombre-error" className="campo-error">
                    {errores.nombre}
                  </p>
                )}
              </div>

              <div className="campo">
                <label htmlFor="checkout-email">{PORTADA.checkout.email}</label>
                <input
                  id="checkout-email"
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
                  aria-describedby={errores.email ? "checkout-email-error" : undefined}
                />
                {errores.email && (
                  <p id="checkout-email-error" className="campo-error">
                    {errores.email}
                  </p>
                )}
              </div>

              <div className="campo">
                <label htmlFor="checkout-rut">{PORTADA.checkout.rut}</label>
                <input
                  id="checkout-rut"
                  name="rut"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  placeholder="12345678-9"
                  value={rut}
                  onChange={(e) => {
                    setRut(e.target.value)
                    if (errores.rut) setErrores((x) => ({ ...x, rut: undefined }))
                  }}
                  // Al salir del campo solo se formatea el RUT válido. El error se
                  // muestra al enviar: si apareciera acá, la línea nueva empuja el
                  // checkbox de abajo entre que se aprieta y se suelta el click, y
                  // el click no marca nada (lo encontró la prueba del formulario).
                  onBlur={() => {
                    const formateado = rut.trim() ? formatearRut(rut) : null
                    if (formateado) setRut(formateado)
                  }}
                  aria-invalid={Boolean(errores.rut)}
                  aria-describedby={`checkout-rut-ayuda${errores.rut ? " checkout-rut-error" : ""}`}
                />
                <p id="checkout-rut-ayuda" className="campo-ayuda">
                  {PORTADA.checkout.rutAyuda}
                </p>
                {errores.rut && (
                  <p id="checkout-rut-error" className="campo-error">
                    {errores.rut}
                  </p>
                )}
              </div>

              <label className={`consent${tiembla ? " tiembla" : ""}`}>
                <input
                  id="checkout-consentimiento"
                  type="checkbox"
                  checked={acepta}
                  onChange={(e) => {
                    setAcepta(e.target.checked)
                    if (e.target.checked) setErrores((x) => ({ ...x, consentimiento: undefined }))
                  }}
                  aria-invalid={Boolean(errores.consentimiento)}
                  aria-describedby={errores.consentimiento ? "checkout-consentimiento-error" : undefined}
                />
                <span>
                  Acepto los{" "}
                  <a href={`${APP_URL}/terminos`} target="_blank" rel="noopener noreferrer">
                    términos
                  </a>
                  , la{" "}
                  <a href={`${APP_URL}/privacidad`} target="_blank" rel="noopener noreferrer">
                    política de privacidad
                  </a>{" "}
                  y el{" "}
                  <a
                    href={`${APP_URL}/aviso-datos-sensibles`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aviso de datos sensibles de salud
                  </a>
                  .
                </span>
              </label>
              {errores.consentimiento && (
                <p id="checkout-consentimiento-error" className="campo-error campo-error-consent">
                  {errores.consentimiento}
                </p>
              )}

              <button type="submit" className="button primary" disabled={cargando} aria-busy={cargando}>
                {cargando
                  ? PROGRAMA.precio.ctaCargando
                  : errorEnvio
                    ? PORTADA.checkout.reintentar
                    : PROGRAMA.precio.cta}{" "}
                {!cargando && <span aria-hidden="true">↗</span>}
              </button>

              {errorEnvio && (
                <p role="alert" className="aviso-form">
                  {PORTADA.checkout.errorEnvio}
                </p>
              )}
              {yaInscrita && (
                <p role="alert" className="aviso-form">
                  {PORTADA.checkout.inscrita}{" "}
                  <a href={contacto.href} target="_blank" rel="noopener noreferrer">
                    escríbenos
                  </a>
                  .
                </p>
              )}
            </form>

            {/* El checkout rechaza casi la mitad de las tarjetas por antifraude y
                el saldo de Mercado Pago no rechazó ninguno de 49 intentos. Decirlo
                ANTES del pago cuesta una línea y evita una venta perdida. */}
            <p className="aviso-tarjeta">
              <span aria-hidden="true">i</span>
              {PORTADA.checkout.avisoTarjeta}
            </p>
            <p className="dialog-note">{PORTADA.checkout.nota}</p>
          </>
        )
      )}
    </dialog>
  )
}

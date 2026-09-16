"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { verOferta } from "@/lib/pixel"
import { guardarPrimeraVisita } from "@/lib/tracking"
import type { CohorteAbierta, CohorteProxima, EstadoVenta } from "@/lib/programa"
import { DialogoCheckout } from "@/components/v2/DialogoCheckout"

/**
 * Lo que la portada sabe de la venta en el navegador.
 *
 * El servidor decide el estado al renderizar, pero la venta puede cerrar con la
 * página abierta: la cuenta regresiva llega a cero, o `/inscribir` responde 409
 * con `venta_abre`. En los dos casos toda la página pasa a lista de espera sin
 * recargar y sin perder el correo que la persona ya escribió. Por eso ese
 * estado vive acá y no en cada sección.
 */

export type EstadoVisible = "abierta" | "proxima" | "cerro" | "ninguna" | "error"

interface ContextoVenta {
  venta: EstadoVenta
  estado: EstadoVisible
  cohorte: CohorteAbierta | CohorteProxima | null
  /** Slug al que se anota la lista de espera. Null en `ninguna`/`error`. */
  slugListaEspera: string | null
  /** Cuándo abre el próximo grupo, si la app lo dijo al cerrar en vivo. */
  ventaAbreSiguiente: string | null
  cerrarVenta: (info?: { slug?: string | null; ventaAbre?: string | null }) => void
  checkoutAbierto: boolean
  abrirCheckout: () => void
  cerrarCheckout: () => void
  /** El correo escrito en el checkout o en la lista, para no pedirlo dos veces. */
  email: string
  setEmail: (valor: string) => void
  /** Volvió de Mercado Pago con el pago rechazado: no se mandan eventos a Meta. */
  sinEventos: boolean
  pagoRechazado: boolean
  /** ViewContent, una sola vez por carga. */
  registrarVistaOferta: () => void
}

const Contexto = createContext<ContextoVenta | null>(null)

export function useVenta(): ContextoVenta {
  const valor = useContext(Contexto)
  if (!valor) throw new Error("useVenta fuera de VentaProvider")
  return valor
}

const CLAVE_DATOS = "nutrico_checkout_datos"

export function VentaProvider({
  venta,
  pagoRechazado,
  children,
}: {
  venta: EstadoVenta
  pagoRechazado: boolean
  children: ReactNode
}) {
  const [cerro, setCerro] = useState<{ slug: string | null; ventaAbre: string | null } | null>(
    null
  )
  const [checkoutAbierto, setCheckoutAbierto] = useState(false)
  const [email, setEmail] = useState("")
  const vistaRegistrada = useRef(false)

  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null

  useEffect(() => {
    guardarPrimeraVisita()
    // Quien vuelve de un pago rechazado ya escribió su correo una vez.
    try {
      const guardado = window.localStorage.getItem(CLAVE_DATOS)
      if (guardado) {
        const datos = JSON.parse(guardado) as { email?: string }
        if (typeof datos.email === "string") setEmail((actual) => actual || datos.email || "")
      }
    } catch {
      /* sin almacenamiento, se escribe de nuevo */
    }
  }, [])

  const estado: EstadoVisible =
    venta.estado === "abierta" ? (cerro ? "cerro" : "abierta") : venta.estado

  const cerrarVenta = useCallback(
    (info?: { slug?: string | null; ventaAbre?: string | null }) => {
      setCerro({ slug: info?.slug ?? null, ventaAbre: info?.ventaAbre ?? null })
    },
    []
  )

  const registrarVistaOferta = useCallback(() => {
    if (vistaRegistrada.current || !cohorte || pagoRechazado) return
    vistaRegistrada.current = true
    verOferta(cohorte.slug, cohorte.precio)
  }, [cohorte, pagoRechazado])

  const valor = useMemo<ContextoVenta>(
    () => ({
      venta,
      estado,
      cohorte,
      // Al cerrar en vivo, la app dice a qué cohorte anotar; si no lo dice (no
      // hay próxima), se anota a la que acaba de cerrar, como hacía el PR.
      slugListaEspera: cerro?.slug ?? cohorte?.slug ?? null,
      ventaAbreSiguiente:
        cerro?.ventaAbre ?? (venta.estado === "proxima" ? venta.cohorte.venta_abre : null),
      cerrarVenta,
      checkoutAbierto,
      abrirCheckout: () => setCheckoutAbierto(true),
      cerrarCheckout: () => setCheckoutAbierto(false),
      email,
      setEmail,
      sinEventos: pagoRechazado,
      pagoRechazado,
      registrarVistaOferta,
    }),
    [venta, estado, cohorte, cerro, cerrarVenta, checkoutAbierto, email, pagoRechazado, registrarVistaOferta]
  )

  return (
    <Contexto.Provider value={valor}>
      {children}
      <DialogoCheckout />
    </Contexto.Provider>
  )
}

export { CLAVE_DATOS }

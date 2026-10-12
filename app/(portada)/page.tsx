import { leerCohorteActual } from "@/lib/programa"
import { videoConstanzaVisible } from "@/lib/video-constanza"
import { VentaProvider } from "@/components/v2/VentaProvider"
import { Anuncio } from "@/components/v2/Anuncio"
import { AvisoPagoRechazado } from "@/components/v2/AvisoPagoRechazado"
import { Cabecera } from "@/components/v2/Cabecera"
import { Hero } from "@/components/v2/Hero"
import { Franja } from "@/components/v2/Franja"
import { ParaTi } from "@/components/v2/ParaTi"
import { RecorridoApp } from "@/components/v2/RecorridoApp"
import { Acompanamiento } from "@/components/v2/Acompanamiento"
import { Constanza } from "@/components/v2/Constanza"
import { Testimonios } from "@/components/v2/Testimonios"
import { Oferta } from "@/components/v2/Oferta"
import { Dudas } from "@/components/v2/Dudas"
import { CierreFinal } from "@/components/v2/CierreFinal"
import { Pie } from "@/components/v2/Pie"
import { CtaMovil } from "@/components/v2/CtaMovil"
import { Movimiento } from "@/components/v2/Movimiento"

// El estado de venta cambia a medianoche de un lunes y otra vez el domingo a
// medianoche. Cacheado, la página seguiría vendiendo con la venta cerrada o
// mostrando la lista de espera con la venta abierta. Se lee en cada request.
export const dynamic = "force-dynamic"

/**
 * Portada: el programa "Prepara tu Verano" con el diseño de la v2 ("Este
 * verano, empieza por ti"). Fechas, precio y estado salen de la cohorte; ver
 * `lib/programa.ts`. En local y en previews, `COHORTE_MOCK` simula el estado.
 */
export default async function Portada({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const venta = await leerCohorteActual()
  // Mercado Pago devuelve acá con `?pago=rechazado` cuando la tarjeta no pasa.
  const pagoRechazado = searchParams.pago === "rechazado"
  // El video de prueba no se muestra en el dominio (ver `lib/entorno.ts`).
  const video = videoConstanzaVisible()

  return (
    <VentaProvider venta={venta} pagoRechazado={pagoRechazado}>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Anuncio venta={venta} />
      {pagoRechazado && <AvisoPagoRechazado />}
      <Cabecera />
      <main id="contenido">
        <Hero venta={venta} />
        <Franja />
        <Constanza video={video} />
        <ParaTi />
        <RecorridoApp />
        <Acompanamiento venta={venta} />
        <Testimonios />
        <Oferta />
        <Dudas venta={venta} />
        <CierreFinal />
      </main>
      <Pie />
      <CtaMovil />
      <Movimiento />
    </VentaProvider>
  )
}

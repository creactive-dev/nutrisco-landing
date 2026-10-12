import { garantiaActiva } from "@/lib/constants-programa"
import { leerCohorteActual } from "@/lib/programa"
import { testimoniosVisibles } from "@/lib/testimonios-grupo"
import { videoConstanzaVisible } from "@/lib/video-constanza"
import { VentaProvider } from "@/components/v2/VentaProvider"
import { Anuncio } from "@/components/v2/Anuncio"
import { AvisoPagoRechazado } from "@/components/v2/AvisoPagoRechazado"
import { Cabecera } from "@/components/v2/Cabecera"
import { Hero } from "@/components/v2/Hero"
import { Fiestas } from "@/components/v2/Fiestas"
import { Franja } from "@/components/v2/Franja"
import { TestimoniosGrupo } from "@/components/v2/TestimoniosGrupo"
import { Constanza } from "@/components/v2/Constanza"
import { ParaTi } from "@/components/v2/ParaTi"
import { Oferta } from "@/components/v2/Oferta"
import { RecorridoApp } from "@/components/v2/RecorridoApp"
import { Acompanamiento } from "@/components/v2/Acompanamiento"
import { Testimonios } from "@/components/v2/Testimonios"
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
 *
 * Orden de la C2 (diseño §9.6, auditoría §5.7): primero quién es ella y para
 * quién es, después las fiestas con su calendario y el precio, que tiene que
 * quedar antes de la pantalla 8 en celular. La app, el recorrido completo y
 * los testimonios de pacientes van después del precio.
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
  // La garantía está apagada hasta que Constanza diga que sí (ver `GARANTIA`).
  const garantia = garantiaActiva()
  // Los del grupo de octubre, solo con permiso escrito y sin peso (diseño §10).
  const testimonios = testimoniosVisibles()

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
        <Fiestas venta={venta} />
        <TestimoniosGrupo testimonios={testimonios} />
        <Oferta garantia={garantia} />
        <RecorridoApp />
        <Acompanamiento venta={venta} />
        <Testimonios />
        <Dudas venta={venta} garantia={garantia} />
        <CierreFinal />
      </main>
      <Pie />
      <CtaMovil />
      <Movimiento />
    </VentaProvider>
  )
}

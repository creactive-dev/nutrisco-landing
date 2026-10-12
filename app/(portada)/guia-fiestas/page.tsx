import type { Metadata } from "next"
import Image from "next/image"
import { leerCohorteActual, type EstadoVenta } from "@/lib/programa"
import { REGALO_FIESTAS, TOPE_COHORTE_MS, conTope, invitacionAlGrupo, notaCorreos } from "@/lib/regalo"
import { SITE_CONFIG } from "@/lib/constants"
import { Logo } from "@/components/v2/Logo"
import { Pie } from "@/components/v2/Pie"
import { FormRegalo } from "@/components/v2/FormRegalo"
import "./guia-fiestas.css"

// La invitación al grupo cambia con la cohorte (próxima, abierta, cerrada).
export const dynamic = "force-dynamic"

/**
 * /guia-fiestas (diseño C2 §8): la puerta del regalo para quien llega por el
 * reel con "comenta FIESTAS" (DM de OpenReply) o por la pantalla final del
 * formulario de Meta (`?ok=1`). Fuera de los buscadores: es de temporada.
 */
const TITULO = `${REGALO_FIESTAS.titulo} · Un regalo de Constanza Jiménez`

// Propio: sin esto el enlace del DM hereda el de la venta del programa. Sin
// condiciones de salud, porque viaja con el link.
export const metadata: Metadata = {
  title: TITULO,
  description: REGALO_FIESTAS.bajada,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITULO,
    description: REGALO_FIESTAS.bajada,
    url: "/guia-fiestas",
    siteName: SITE_CONFIG.name,
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: REGALO_FIESTAS.portada.src,
        width: REGALO_FIESTAS.portada.width,
        height: REGALO_FIESTAS.portada.height,
        alt: REGALO_FIESTAS.portada.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: REGALO_FIESTAS.bajada,
    images: [REGALO_FIESTAS.portada.src],
  },
}

export default async function GuiaFiestasPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  // La guía se entrega aunque la app tarde: sin la cohorte no hay invitación.
  const venta = await conTope<EstadoVenta>(leerCohorteActual(), TOPE_COHORTE_MS, { estado: "error" })
  const invitacion = invitacionAlGrupo(venta)
  const { portada } = REGALO_FIESTAS

  return (
    <>
      <header className="wrap header">
        <Logo href="/" />
      </header>
      <main className="wrap regalo" id="contenido">
        <div className="regalo-copy">
          <p className="eyebrow">{REGALO_FIESTAS.eyebrow}</p>
          <h1>{REGALO_FIESTAS.titulo}</h1>
          <p className="regalo-bajada">{REGALO_FIESTAS.bajada}</p>
          <ul className="regalo-puntos">
            {REGALO_FIESTAS.puntos.map((punto) => (
              <li key={punto}>{punto}</li>
            ))}
          </ul>
          <FormRegalo yaLaPidio={searchParams.ok === "1"} nota={notaCorreos(venta)} />
          {invitacion && (
            <p className="regalo-invitacion">
              {invitacion}{" "}
              <a className="text-link" href="/">
                {REGALO_FIESTAS.verPrograma} <span aria-hidden="true">↗</span>
              </a>
            </p>
          )}
          <p className="regalo-persona">
            <Image src={SITE_CONFIG.brand.constanzaThumb} alt="" width={36} height={36} sizes="36px" />
            {REGALO_FIESTAS.persona}
          </p>
        </div>
        <div className="regalo-portada">
          <Image
            src={portada.src}
            alt={portada.alt}
            width={portada.width}
            height={portada.height}
            priority
            sizes="(max-width: 760px) 60vw, 380px"
          />
        </div>
      </main>
      <Pie />
    </>
  )
}

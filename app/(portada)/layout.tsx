import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import "./portada.css"
import { SITE_CONFIG } from "@/lib/constants"
import { ROBOTS } from "@/lib/robots"

/**
 * Layout de la portada v2. La fuente es la Inter variable que trae la v2,
 * recortada a latín (de 352 KB a 102 KB: el archivo original trae cirílico,
 * griego y vietnamita, que esta página no usa). Mantiene los ejes de peso y de
 * tamaño óptico, que la v2 usa con pesos intermedios (550, 610, 650, 720).
 */
const inter = localFont({
  src: "./fonts/inter-v2-latin.woff2",
  variable: "--font-v2",
  weight: "100 900",
  display: "swap",
})

// Sin fechas ni precio: esto es lo que se ve en Google y en la vista previa de
// WhatsApp, y un metadato con fecha se pudre solo.
const TITULO = "Prepara tu Verano · Programa de 3 meses con Constanza Jiménez"
const TITULO_SOCIAL = "Este verano, empieza por ti · Prepara tu Verano"
const DESCRIPCION =
  "Tres meses con tu pauta antiinflamatoria personalizada, ajustada cada quince días por Constanza. Un grupo con fecha de inicio y de término. Un solo pago, boleta exenta para tu isapre."
const OG = {
  url: "/og-prepara-tu-verano.jpg",
  width: 1200,
  height: 630,
  alt: "Este verano, empieza por ti. Prepara tu Verano, programa de 3 meses con Constanza Jiménez Paschold",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: TITULO,
  description: DESCRIPCION,
  keywords: [
    "programa antiinflamatorio",
    "hinchazón abdominal",
    "nutrición antiinflamatoria",
    "plan alimentario personalizado",
    "Constanza Jiménez Paschold nutricionista",
    "Nutrico",
    "alimentación antiinflamatoria Chile",
    "reembolso isapre nutricionista",
    "boleta exenta IVA nutrición",
  ],
  openGraph: {
    title: TITULO_SOCIAL,
    description: DESCRIPCION,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "es_CL",
    type: "website",
    images: [OG],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO_SOCIAL,
    description: DESCRIPCION,
    images: [OG.url],
  },
  robots: ROBOTS,
}

export const viewport: Viewport = {
  themeColor: "#4b1729",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function PortadaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${inter.variable} v2`}>{children}</div>
}

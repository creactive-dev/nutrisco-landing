import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "../globals.css"
import { SITE_CONFIG } from "@/lib/constants"

/**
 * El layout que antes era el de TODO el sitio y ahora es solo de /suscripcion.
 *
 * La portada pasó a la v2 ("Este verano, empieza por ti"), con otra fuente y
 * otra hoja de estilos. Si Playfair, Inter de Google y globals.css siguieran en
 * el layout raíz, la portada los descargaría sin usarlos: globals.css además
 * importa la hoja de Google Fonts, que bloquea el render. Acá quedan tal cual
 * estaban, para que /suscripcion se vea igual que antes.
 */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const TITULO = "Prepara tu Verano · Programa de 3 meses con Constanza Jiménez"
const DESCRIPCION =
  "Tres meses con tu pauta antiinflamatoria personalizada, ajustada cada quince días por Constanza. Un grupo con fecha de inicio y de término. Un solo pago, boleta exenta para tu isapre."

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
    title: TITULO,
    description: DESCRIPCION,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/og-constanza-las-50.jpg",
        width: 1200,
        height: 630,
        alt: "Prepara tu Verano · Programa de 3 meses con Constanza Jiménez Paschold",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/og-constanza-las-50.jpg"],
  },
}

export default function SuscripcionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${inter.variable} bg-crema font-sans antialiased`}>
      {children}
    </div>
  )
}

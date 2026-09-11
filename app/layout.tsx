import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { SITE_CONFIG } from "@/lib/constants"
import { MetaPixel } from "@/components/MetaPixel"

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

// El título y la descripción ya no nombran una fecha ("Apertura viernes 5 de
// junio") ni un cupo ("50 cupos fundadoras"). Un metadato con fecha se pudre
// solo y es lo que se ve en Google y en el preview de WhatsApp, que es por
// donde se comparte esto.
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
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-crema font-sans antialiased">
        {children}
        <MetaPixel />
      </body>
    </html>
  )
}

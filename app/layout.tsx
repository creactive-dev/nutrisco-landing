import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { SITE_CONFIG } from "@/lib/constants"

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "Nutrico · Las 50 Primeras · Tu cuerpo sin inflamación en 60 días",
  description:
    "El plan antiinflamatorio chileno que se ajusta a quién eres tú. Diseñado por Constanza Jiménez Paschold, Nutricionista. Apertura viernes 5 de junio · 50 cupos fundadoras.",
  keywords: [
    "nutrición antiinflamatoria",
    "plan alimentario personalizado",
    "Constanza Jiménez Paschold nutricionista",
    "Nutrico",
    "Las 50 Primeras",
    "alimentación antiinflamatoria Chile",
    "reembolso isapre nutricionista",
    "boleta exenta IVA nutrición",
  ],
  openGraph: {
    title: "Nutrico · Las 50 Primeras · Tu cuerpo sin inflamación en 60 días",
    description:
      "El plan antiinflamatorio chileno que se ajusta a quién eres tú. Diseñado por Constanza Jiménez Paschold, Nutricionista. Apertura viernes 5 de junio · 50 cupos fundadoras.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "es_CL",
    type: "website",
    images: [
      {
        // TODO: replace with /og-constanza-las-50.jpg (1200x630)
        url: "/og-constanza-las-50.jpg",
        width: 1200,
        height: 630,
        alt: "Constanza Jiménez Paschold · Nutrico · Las 50 Primeras",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutrico · Las 50 Primeras · Tu cuerpo sin inflamación en 60 días",
    description:
      "El plan antiinflamatorio chileno que se ajusta a quién eres tú. Apertura viernes 5 de junio · 50 cupos fundadoras.",
    images: ["/og-constanza-las-50.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </body>
    </html>
  )
}

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
  title: `${SITE_CONFIG.name} — Plan alimentario antiinflamatorio personalizado`,
  description:
    "Tu plan alimentario antiinflamatorio diseñado por Constanza y su equipo. Personalizado para tus síntomas, ajustado cada 15 días. Precio fundador $19.990/mes.",
  keywords: [
    "nutrición antiinflamatoria",
    "plan alimentario personalizado",
    "Constanza nutricionista",
    "Nutrisco",
    "alimentación antiinflamatoria Chile",
  ],
  openGraph: {
    title: "Nutrisco — Tu plan antiinflamatorio personalizado",
    description:
      "El plan que continúa después del Reto. Diseñado por Constanza, ajustado cada 15 días.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutrisco — Tu plan antiinflamatorio personalizado",
    description: "El plan que continúa después del Reto.",
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

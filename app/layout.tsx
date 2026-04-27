import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'
import { BannerCookies } from '@/components/ui/BannerCookies'
import { SITE } from '@/lib/constants'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nutrisco — Tu plan antiinflamatorio personalizado, mes a mes',
  description:
    'La metodología antiinflamatoria de Constanza Jiménez en formato digital. Plan mensual personalizado, ajuste quincenal con IA, soporte 24/7. Precio fundador $19.990/mes.',
  keywords: [
    'nutrición antiinflamatoria',
    'plan nutricional personalizado',
    'Constanza Jiménez nutricionista',
    'Nutrisco',
    'antiinflamatorio Chile',
  ],
  openGraph: {
    title: 'Nutrisco — Tu plan antiinflamatorio personalizado',
    description:
      'Deja de empezar de cero cada vez. Tu plan se ajusta cada quincena con la metodología de Constanza Jiménez. Precio fundador: $19.990/mes.',
    url: SITE.url,
    siteName: 'Nutrisco',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nutrisco — Tu plan antiinflamatorio personalizado',
    description: 'Precio fundador $19.990/mes. Solo 100 cupos.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="grain">
        {children}
        <BannerCookies />
      </body>
    </html>
  )
}

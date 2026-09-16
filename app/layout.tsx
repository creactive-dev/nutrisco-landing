import type { Metadata } from "next"
import { SITE_CONFIG } from "@/lib/constants"
import { MetaPixel } from "@/components/MetaPixel"
import { ROBOTS } from "@/lib/robots"

/**
 * Layout raíz, mínimo a propósito: el <html>, el píxel y lo común de los
 * metadatos. Las fuentes y los estilos viven en el layout de cada página
 * (`app/(portada)/layout.tsx` y `app/suscripcion/layout.tsx`), porque son dos
 * diseños distintos y ninguno debería descargar lo del otro.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  robots: ROBOTS,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  )
}

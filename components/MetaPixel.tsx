import Script from "next/script"
import { PIXEL_PRODUCCION } from "@/lib/pixel"

/**
 * Carga el píxel de Meta y dispara el PageView. Va en el layout, una sola vez.
 *
 * Componente de SERVIDOR a propósito: así puede leer `VERCEL_ENV`, que la
 * plataforma expone sola y no viaja al navegador.
 *
 * Qué píxel se usa:
 * - `NEXT_PUBLIC_META_PIXEL_ID` si está definida, para poder cambiarlo o
 *   apagarlo sin un deploy;
 * - si no, el de producción, pero SOLO en el despliegue de producción;
 * - en desarrollo y en previews no renderiza nada, para no ensuciar los datos
 *   de la cuenta con tráfico nuestro.
 *
 * El `<noscript>` cubre a quien navega con JavaScript apagado y, sobre todo, al
 * navegador dentro de Instagram cuando bloquea scripts de terceros, que es por
 * donde llega buena parte del tráfico de esta campaña.
 */
export function MetaPixel() {
  const explicito = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const esProduccion = process.env.VERCEL_ENV === "production"
  const pixelId = explicito || (esProduccion ? PIXEL_PRODUCCION : "")

  if (!pixelId) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}

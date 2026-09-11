import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import { TrustBar } from "@/components/sections/TrustBar"
import { ProblemAgitation } from "@/components/sections/ProblemAgitation"
import { ProductDemo } from "@/components/sections/ProductDemo"
import { BentoBeneficios } from "@/components/sections/BentoBeneficios"
import { ResultadosStats } from "@/components/sections/ResultadosStats"
import { Nutricionista } from "@/components/sections/Nutricionista"
import { TestimoniosMixto } from "@/components/sections/TestimoniosMixto"
import { PrecioLas50 } from "@/components/sections/PrecioLas50"
import { FAQ } from "@/components/sections/FAQ"
import { CTAFinalScarcity } from "@/components/sections/CTAFinalScarcity"
import { Footer } from "@/components/layout/Footer"

/**
 * La suscripción mensual, que hasta el 11-sep-2026 era la home.
 *
 * Se conserva entera y en su propia ruta porque sigue habiendo gente pagándola
 * y porque su checkout funciona. Deja de ser la portada porque la oferta que se
 * pauta desde el 14 de septiembre es el programa de tres meses.
 *
 * Sale la barra de "Apertura vie 5 jun · 9 AM · Solo 50 cupos fundadoras": esa
 * fecha pasó hace tres meses y una página que anuncia algo que ya ocurrió
 * resta credibilidad en vez de apurar a nadie.
 *
 * No se indexa: dos páginas del mismo sitio compitiendo por las mismas
 * búsquedas se quitan posiciones entre ellas, y la que tiene que ganar es el
 * programa.
 */
export const metadata: Metadata = {
  title: "Nutrico · Suscripción mensual · Tu plan antiinflamatorio personalizado",
  description:
    "El plan antiinflamatorio chileno que se ajusta a quién eres tú. Diseñado por Constanza Jiménez Paschold, Nutricionista.",
  robots: { index: false, follow: true },
}

export default function Suscripcion() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <ProblemAgitation />
      <ProductDemo />
      <BentoBeneficios />
      <ResultadosStats />
      <Nutricionista />
      <TestimoniosMixto />
      <PrecioLas50 />
      <FAQ />
      <CTAFinalScarcity />
      <Footer />
    </main>
  )
}

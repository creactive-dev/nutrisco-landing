import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { TrustBar } from "@/components/sections/TrustBar"
import { ProblemAgitation } from "@/components/sections/ProblemAgitation"
import { ProductDemo } from "@/components/sections/ProductDemo"
import { Nutricionista } from "@/components/sections/Nutricionista"
import { TestimoniosMixto } from "@/components/sections/TestimoniosMixto"
import { TopBarPrograma } from "@/components/programa/TopBarPrograma"
import { HeroPrograma } from "@/components/programa/HeroPrograma"
import { QueIncluyePrograma } from "@/components/programa/QueIncluyePrograma"
import { PrecioPrograma } from "@/components/programa/PrecioPrograma"
import { FAQPrograma } from "@/components/programa/FAQPrograma"
import { CTAFinalPrograma } from "@/components/programa/CTAFinalPrograma"
import { leerCohorteActual } from "@/lib/programa"

// El estado de venta cambia a medianoche de un lunes y otra vez el domingo a
// medianoche. Cacheado, la página seguiría vendiendo con la venta cerrada o
// mostrando la lista de espera con la venta abierta. Se lee en cada request.
export const dynamic = "force-dynamic"

export default async function Home() {
  const venta = await leerCohorteActual()

  return (
    <main>
      <TopBarPrograma venta={venta} />
      <Navbar cta="Quiero entrar →" ctaMobile="Entrar" />
      <HeroPrograma venta={venta} />
      <TrustBar />
      <ProblemAgitation />
      {/* La app va temprano y grande: es lo que se compra, y en la página
          anterior estaba enterrada al fondo. */}
      <ProductDemo />
      <QueIncluyePrograma venta={venta} />
      <Nutricionista />
      <TestimoniosMixto />
      <PrecioPrograma venta={venta} />
      <FAQPrograma />
      <CTAFinalPrograma venta={venta} />
      <Footer />
    </main>
  )
}

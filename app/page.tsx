import { TopBarScarcity } from "@/components/layout/TopBarScarcity"
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

export default function Home() {
  return (
    <main>
      <TopBarScarcity />
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

import { Navbar } from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import ElPuente from "@/components/sections/ElPuente"
import QueIncluye from "@/components/sections/QueIncluye"
import { Nutricionista } from "@/components/sections/Nutricionista"
import { ComoFunciona } from "@/components/sections/ComoFunciona"
import { Testimonios } from "@/components/sections/Testimonios"
import { PrecioFundador } from "@/components/sections/PrecioFundador"
import { FAQ } from "@/components/sections/FAQ"
import { CTAFinal } from "@/components/sections/CTAFinal"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <ElPuente />
      <div id="que-incluye">
        <QueIncluye />
      </div>
      <Nutricionista />
      <ComoFunciona />
      <Testimonios />
      {/* id="precio" está declarado dentro del componente PrecioFundador */}
      <PrecioFundador />
      {/* id="faq" está declarado dentro del componente FAQ */}
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  )
}

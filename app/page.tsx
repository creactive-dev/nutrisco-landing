import { getLaunchMode } from '@/lib/mode'
import { BarraUrgencia } from '@/components/layout/BarraUrgencia'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { BarraConfianza } from '@/components/sections/BarraConfianza'
import { Problema } from '@/components/sections/Problema'
import { PuenteReto } from '@/components/sections/PuenteReto'
import { QueEsNutrisco } from '@/components/sections/QueEsNutrisco'
import { ComoFunciona } from '@/components/sections/ComoFunciona'
import { ProductPreview } from '@/components/sections/ProductPreview'
import { QueIncluye } from '@/components/sections/QueIncluye'
import { SobreConstanza } from '@/components/sections/SobreConstanza'
import { Testimonios } from '@/components/sections/Testimonios'
import { Pricing } from '@/components/sections/Pricing'
import { Garantia } from '@/components/sections/Garantia'
import { FAQ } from '@/components/sections/FAQ'
import { CTAFinal } from '@/components/sections/CTAFinal'

export const dynamic = 'force-dynamic'

export default function Page() {
  const mode = getLaunchMode()

  return (
    <>
      {/* Header sticky: urgency bar + navbar como una unidad */}
      <header className="sticky top-0 z-50">
        <BarraUrgencia mode={mode} />
        <Navbar />
      </header>
      <main>
        <Hero mode={mode} />
        <BarraConfianza />
        <Problema />
        <PuenteReto />
        <QueEsNutrisco />
        <ComoFunciona />
        <ProductPreview />
        <QueIncluye />
        <SobreConstanza />
        <Testimonios />
        <Pricing mode={mode} />
        <Garantia />
        <FAQ />
        <CTAFinal mode={mode} />
      </main>
      <Footer />
    </>
  )
}

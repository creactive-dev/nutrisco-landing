import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FAQItem } from '@/components/ui/FAQItem'
import { FAQS } from '@/lib/constants'

export function FAQ() {
  return (
    <SectionWrapper bg="bg-white" id="faq">
      <div className="container-landing max-w-2xl mx-auto">
        <h2 className="font-display font-bold text-display-sm text-carbon text-center">
          Preguntas frecuentes
        </h2>

        <div className="mt-10 divide-y divide-surface-high">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

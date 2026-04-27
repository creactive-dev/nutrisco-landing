import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Pill } from '@/components/ui/Pill'
import { TESTIMONIALS_PLACEHOLDER, SHOW_TESTIMONIALS } from '@/lib/constants'
import type { Testimonial } from '@/types'

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} estrellas`}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 10 10" fill="#FBBF24" aria-hidden="true">
          <path d="M5 0.833L6.175 3.508L9.167 3.817L7.083 5.8L7.592 8.833L5 7.292L2.408 8.833L2.917 5.8L0.833 3.817L3.825 3.508L5 0.833Z"/>
        </svg>
      ))}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase()
  return (
    <div className="w-9 h-9 rounded-full bg-sandia/10 text-sandia font-display font-bold flex items-center justify-center text-sm flex-shrink-0">
      {initial}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-card p-6 flex flex-col gap-4 shadow-card ghost-border relative">
      {testimonial.is_placeholder && (
        <div className="absolute top-4 right-4">
          <Pill variant="glass-light">BETA</Pill>
        </div>
      )}

      <StarRating count={testimonial.stars} />

      <p className="font-body text-carbon text-[14px] leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-2.5 pt-2 border-t border-black/[0.05]">
        <Avatar name={testimonial.name} />
        <div>
          <p className="font-display font-bold text-carbon text-[13px] leading-none">
            {testimonial.name}
          </p>
          {testimonial.city && (
            <p className="font-body text-gray-mid text-[12px] mt-0.5">{testimonial.city}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export function Testimonios() {
  if (!SHOW_TESTIMONIALS) return null

  return (
    <SectionWrapper bg="bg-crema" id="testimonios">
      <div className="container-landing">
        {/* Eyebrow */}
        <div className="flex justify-center mb-4">
          <Pill variant="outline-coral">
            <span className="flex gap-0.5 mr-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="9" height="9" viewBox="0 0 10 10" fill="#FBBF24" aria-hidden="true">
                  <path d="M5 0.833L6.175 3.508L9.167 3.817L7.083 5.8L7.592 8.833L5 7.292L2.408 8.833L2.917 5.8L0.833 3.817L3.825 3.508L5 0.833Z"/>
                </svg>
              ))}
            </span>
            5.0 · Google Reviews
          </Pill>
        </div>

        <h2 className="font-display font-black text-display-sm text-carbon text-center tracking-tight">
          Lo que dicen las primeras en probarlo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {TESTIMONIALS_PLACEHOLDER.map((testimonial: Testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

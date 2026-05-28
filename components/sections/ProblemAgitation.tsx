import { PROBLEM_AGITATION } from "@/lib/constants"

export function ProblemAgitation() {
  return (
    <section
      aria-label="El problema"
      className="bg-crema py-20 px-5 md:py-32 md:px-8"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif font-bold text-text-dark text-[1.875rem] md:text-[3rem] leading-[1.1] tracking-[-0.025em]">
          {PROBLEM_AGITATION.h2}
        </h2>
        <p className="text-[1.0625rem] md:text-[1.25rem] text-text-muted leading-[1.6] mt-6 max-w-2xl mx-auto">
          {PROBLEM_AGITATION.body}
        </p>
      </div>
    </section>
  )
}

type EyebrowProps = {
  children: React.ReactNode
  tone?: "celeste" | "sandia" | "dark"
  className?: string
}

const toneClasses: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  celeste: "text-celeste-600 ring-celeste-200/60",
  sandia: "text-sandia-600 ring-sandia-200/60",
  dark: "text-white/80 ring-white/20",
}

const toneDotClasses: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  celeste: "bg-celeste",
  sandia: "bg-sandia",
  dark: "bg-white/80",
}

export function Eyebrow({ children, tone = "celeste", className = "" }: EyebrowProps) {
  const isDark = tone === "dark"
  const baseGlass = isDark ? "glass-pill-dark" : "glass-pill"
  return (
    <span
      className={[
        baseGlass,
        toneClasses[tone],
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] md:text-[12px] font-medium uppercase tracking-[0.12em] ring-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          toneDotClasses[tone],
          "w-1.5 h-1.5 rounded-full animate-pulse-soft",
        ].join(" ")}
      />
      {children}
    </span>
  )
}

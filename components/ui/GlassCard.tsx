import type { HTMLAttributes, ReactNode } from "react"

type Variant = "default" | "strong" | "soft" | "dark"

type GlassCardProps = {
  children: ReactNode
  variant?: Variant
  hover?: boolean
  className?: string
} & HTMLAttributes<HTMLDivElement>

const variantClass: Record<Variant, string> = {
  default: "glass",
  strong: "glass-strong",
  soft: "glass-soft",
  dark: "glass-dark",
}

export function GlassCard({
  children,
  variant = "default",
  hover = false,
  className = "",
  ...rest
}: GlassCardProps) {
  const classes = [
    variantClass[variant],
    hover ? "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-glass-hover" : "",
    "rounded-3xl",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

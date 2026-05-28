"use client"

import { motion } from "framer-motion"
import type { ComponentPropsWithoutRef } from "react"

type ButtonVariant = "primary" | "secondary" | "ghost"

type BaseProps = {
  variant?: ButtonVariant
  children: React.ReactNode
  className?: string
  /** Añade animación breathe al botón (solo variant primary) */
  pulse?: boolean
}

type ButtonAsAnchor = BaseProps & {
  href: string
  onClick?: never
} & Omit<ComponentPropsWithoutRef<"a">, keyof BaseProps | "href">

type ButtonAsButton = BaseProps & {
  href?: never
  onClick?: () => void
} & Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps | "onClick">

type ButtonProps = ButtonAsAnchor | ButtonAsButton

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "relative overflow-hidden bg-gradient-warm text-white rounded-full px-5 py-2.5 text-sm font-semibold shadow-glow-sandia hover:shadow-[0_0_0_1px_rgba(233,69,85,0.24),0_12px_36px_-4px_rgba(233,69,85,0.40)] transition-all duration-250",
  secondary:
    "glass-pill text-text-dark rounded-full px-5 py-2.5 text-sm font-semibold hover:shadow-glass transition-all duration-250",
  ghost:
    "text-text-dark rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-text-dark/5 transition-colors duration-200",
}

export function Button({
  variant = "primary",
  children,
  className = "",
  pulse = false,
  ...rest
}: ButtonProps) {
  const classes = [
    variantClasses[variant],
    variant === "primary" && pulse ? "animate-breathe" : "",
    "inline-flex items-center justify-center gap-1.5 cursor-pointer select-none",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.18, ease: "easeOut" },
  }

  // Shimmer inner para primary
  const shimmer =
    variant === "primary" ? (
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
    ) : null

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <motion.a
        href={href}
        className={`${classes} group`}
        {...motionProps}
        {...(anchorRest as Record<string, unknown>)}
      >
        {shimmer}
        <span className="relative z-10 inline-flex items-center gap-1.5">
          {children}
        </span>
      </motion.a>
    )
  }

  const { onClick, ...buttonRest } = rest as ButtonAsButton
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${classes} group`}
      {...motionProps}
      {...(buttonRest as Record<string, unknown>)}
    >
      {shimmer}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
      </span>
    </motion.button>
  )
}

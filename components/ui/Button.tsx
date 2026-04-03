"use client"

import { motion } from "framer-motion"
import type { ComponentPropsWithoutRef } from "react"

type ButtonVariant = "primary" | "secondary"

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
    "bg-sandia text-white rounded-xl px-5 py-2.5 text-sm font-semibold shadow-card-sm hover:bg-[#d63a4a] transition-colors duration-150",
  secondary:
    "border border-sandia/30 text-sandia bg-transparent rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-sandia/5 transition-colors duration-150",
}

export function Button({ variant = "primary", children, className = "", pulse = false, ...rest }: ButtonProps) {
  const classes = [
    variantClasses[variant],
    variant === "primary" && pulse ? "animate-breathe" : "",
    "inline-flex items-center justify-center gap-1.5 cursor-pointer select-none",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const motionProps = {
    whileHover: { scale: 1.01 },
    whileTap: { scale: 0.99 },
    transition: { duration: 0.15, ease: "easeOut" },
  }

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
        {...(anchorRest as Record<string, unknown>)}
      >
        {children}
      </motion.a>
    )
  }

  const { onClick, ...buttonRest } = rest as ButtonAsButton
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      {...motionProps}
      {...(buttonRest as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  )
}

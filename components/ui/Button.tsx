'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'invert' | 'ghost'
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  target?: '_blank' | '_self'
  disabled?: boolean
  type?: 'button' | 'submit'
  fullWidth?: boolean
}

const variantClasses = {
  primary: 'btn-primary',
  invert: 'btn-invert',
  ghost: 'btn-ghost',
}

const sizeClasses = {
  sm: 'text-sm px-5 py-2.5',
  md: '',
  lg: 'text-base px-9 py-4',
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  size = 'md',
  target = '_self',
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const classes = [
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const motionProps = {
    whileTap: disabled ? {} : { scale: 0.97 },
    whileHover: disabled ? {} : { y: -2 },
    transition: { duration: 0.15 },
  }

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto')) {
      return (
        <motion.a href={href} target={target} className={classes} {...motionProps}>
          {children}
        </motion.a>
      )
    }
    return (
      <motion.div {...motionProps} className={fullWidth ? 'w-full' : 'inline-block'}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}

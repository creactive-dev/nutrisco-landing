"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { NAVBAR, SITE_CONFIG } from "@/lib/constants"
import { Button } from "@/components/ui/Button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)

      // Auto-hide on scroll down past 200px, show on scroll up
      // Only applies on mobile (< 768px) — desktop always visible
      const isMobile = window.innerWidth < 768
      if (isMobile && y > 200) {
        const goingDown = y > lastY.current + 4
        const goingUp = y < lastY.current - 4
        if (goingDown) setHidden(true)
        else if (goingUp) setHidden(false)
      } else {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? -80 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-10 left-0 right-0 z-50 px-3 md:px-6 pt-2 md:pt-3"
    >
      <div
        className={[
          "mx-auto max-w-5xl rounded-full transition-all duration-300",
          scrolled ? "glass-strong shadow-glass" : "glass",
        ].join(" ")}
      >
        <div className="px-4 md:px-6 h-12 md:h-14 flex items-center justify-between gap-3">
          {/* Logo tipográfico */}
          <a
            href="#"
            aria-label={`${SITE_CONFIG.name} — Inicio`}
            className="flex-shrink-0 group"
          >
            <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-text-dark transition-colors group-hover:text-sandia">
              nutri
            </span>
            <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-gradient-warm">
              co
            </span>
          </a>

          {/* Links de navegación — solo desktop */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Navegación principal"
          >
            {NAVBAR.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-text-muted hover:text-text-dark transition-colors duration-200 group"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-warm scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                />
              </a>
            ))}
          </nav>

          {/* CTA — siempre visible. Apunta a #precio donde está el form
              de suscripción con switcher mensual/trimestral/anual + email. */}
          <div className="flex-shrink-0">
            {/* Desktop */}
            <span className="hidden md:block">
              <Button variant="primary" href="#precio">
                {NAVBAR.cta}
              </Button>
            </span>
            {/* Mobile — más compacto */}
            <span className="block md:hidden">
              <a
                href="#precio"
                className="inline-flex items-center justify-center bg-gradient-warm text-white font-semibold rounded-full px-4 py-2 text-[13px] shadow-glow-sandia transition-all duration-200 active:scale-95"
              >
                {NAVBAR.ctaMobile}
              </a>
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

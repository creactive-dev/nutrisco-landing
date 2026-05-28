"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { NAVBAR, SITE_CONFIG } from "@/lib/constants"
import { Button } from "@/components/ui/Button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-10 left-0 right-0 z-50 px-4 md:px-6 pt-3"
    >
      <div
        className={[
          "mx-auto max-w-5xl rounded-full transition-all duration-300",
          scrolled ? "glass-strong shadow-glass" : "glass",
        ].join(" ")}
      >
        <div className="px-5 md:px-6 h-14 flex items-center justify-between">
          {/* Logo tipográfico */}
          <a
            href="#"
            aria-label={`${SITE_CONFIG.name} — Inicio`}
            className="flex-shrink-0 group"
          >
            <span className="font-serif text-xl font-bold tracking-tight text-text-dark transition-colors group-hover:text-sandia">
              nutri
            </span>
            <span className="font-serif text-xl font-bold tracking-tight text-gradient-warm">
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

          {/* CTA — siempre visible */}
          <div className="flex-shrink-0">
            {/* Desktop */}
            <span className="hidden md:block">
              <Button variant="primary" href={SITE_CONFIG.mpPaymentUrl}>
                {NAVBAR.cta}
              </Button>
            </span>
            {/* Mobile */}
            <span className="block md:hidden">
              <Button variant="primary" href={SITE_CONFIG.mpPaymentUrl}>
                {NAVBAR.ctaMobile}
              </Button>
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

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
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-shadow duration-300",
        "bg-white/80 backdrop-blur-[12px]",
        scrolled ? "shadow-ambient" : "shadow-none",
      ].join(" ")}
    >
      <div className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between">
        {/* Logo tipográfico */}
        <a href="#" aria-label={`${SITE_CONFIG.name} — Inicio`} className="flex-shrink-0">
          <span className="font-serif text-xl font-bold tracking-tight text-text-dark">
            nutri
          </span>
          <span className="font-serif text-xl font-bold tracking-tight text-sandia">
            sco
          </span>
        </a>

        {/* Links de navegación — solo desktop */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
          {NAVBAR.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-text-dark transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA — siempre visible */}
        <div className="flex-shrink-0">
          {/* Desktop */}
          <span className="hidden md:block">
            <Button
              variant="primary"
              href={SITE_CONFIG.mpPaymentUrl}
            >
              {NAVBAR.cta}
            </Button>
          </span>
          {/* Mobile */}
          <span className="block md:hidden">
            <Button
              variant="primary"
              href={SITE_CONFIG.mpPaymentUrl}
            >
              {NAVBAR.ctaMobile}
            </Button>
          </span>
        </div>
      </div>
    </motion.header>
  )
}

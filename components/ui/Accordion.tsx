"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

type AccordionItem = {
  q: string
  a: string
}

type AccordionProps = {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  // Primer item abierto por defecto
  const [openIndex, setOpenIndex] = useState<number>(0)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index))
  }

  return (
    <div className="w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const isLast = index === items.length - 1

        return (
          <div key={index}>
            {/* Item del acordeón */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-start justify-between gap-4 text-left group"
              >
                <span className="text-sm font-semibold text-text-dark group-hover:text-sandia transition-colors duration-150 leading-snug">
                  {item.q}
                </span>

                {/* Chevron con rotación animada */}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="flex-shrink-0 mt-0.5 text-text-muted"
                  aria-hidden="true"
                >
                  <ChevronDown size={16} strokeWidth={2} />
                </motion.span>
              </button>

              {/* Contenido animado con unmount limpio */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-2.5 text-sm text-text-muted leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Separador tonal — NO usar <hr> */}
            {!isLast && (
              <div className="h-px w-full bg-surface-high" aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}

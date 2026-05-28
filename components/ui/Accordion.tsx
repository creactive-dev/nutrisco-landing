"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

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
            <div className="px-4 py-4">
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-start justify-between gap-4 text-left group"
              >
                <span
                  className={[
                    "text-[15px] font-semibold leading-snug transition-colors duration-200",
                    isOpen
                      ? "text-text-dark"
                      : "text-text-dark group-hover:text-sandia",
                  ].join(" ")}
                >
                  {item.q}
                </span>

                {/* Plus rotating to X */}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className={[
                    "flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200",
                    isOpen
                      ? "bg-sandia text-white"
                      : "bg-surface-high text-text-muted group-hover:bg-sandia/10 group-hover:text-sandia",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <Plus size={14} strokeWidth={2.5} />
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
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 pr-8 text-[14px] text-text-muted leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Separador tonal sutil */}
            {!isLast && (
              <div
                className="h-px w-full bg-text-dark/8 mx-auto"
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

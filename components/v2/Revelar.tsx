"use client"

import { createElement, useEffect, useRef, useState, type ReactNode } from "react"

/**
 * Entrada suave al hacer scroll, como la v2 (`.reveal` → `.is-visible`).
 *
 * Un solo IntersectionObserver para toda la página. La visibilidad vive en el
 * estado de React y no en `classList`: si se pusiera la clase a mano, el
 * primer re-render de la sección (por ejemplo, cuando la venta cierra en vivo)
 * la borraría y el bloque volvería a quedar invisible.
 *
 * Sin JavaScript no se oculta nada: la clase `js-motion` que activa el
 * ocultamiento la pone `Movimiento` al montar.
 */

type Aviso = () => void
const avisos = new Map<Element, Aviso>()
let observador: IntersectionObserver | null = null

function observar(elemento: Element, aviso: Aviso): () => void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    aviso()
    return () => {}
  }
  if (!observador) {
    observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue
          avisos.get(entrada.target)?.()
          avisos.delete(entrada.target)
          observador?.unobserve(entrada.target)
        }
      },
      { threshold: 0.08 }
    )
  }
  avisos.set(elemento, aviso)
  observador.observe(elemento)
  return () => {
    avisos.delete(elemento)
    observador?.unobserve(elemento)
  }
}

export function Revelar({
  as = "div",
  className = "",
  id,
  children,
}: {
  as?: "div" | "article" | "section"
  className?: string
  id?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return
    return observar(elemento, () => setVisible(true))
  }, [])

  return createElement(
    as,
    { ref, id, className: `${className} reveal${visible ? " is-visible" : ""}`.trim() },
    children
  )
}

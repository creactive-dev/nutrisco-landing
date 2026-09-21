import { Sandia } from "@/components/v2/Sandia"

/**
 * "nutrico" con la sandía de Constanza, que reemplaza al asterisco de la v2.
 * En la portada el logo no lleva a ninguna parte (ya estás ahí); en las páginas
 * de confirmación sí, y por eso `href` es una prop.
 */
export function Logo({ className = "logo", href = "#" }: { className?: string; href?: string }) {
  return (
    <a className={className} href={href} aria-label="Nutrico, inicio">
      nutrico
      <Sandia className="logo-sandia" />
    </a>
  )
}

import { Sandia } from "@/components/v2/Sandia"

/** "nutrico" con la sandía de Constanza, que reemplaza al asterisco de la v2. */
export function Logo({ className = "logo" }: { className?: string }) {
  return (
    <a className={className} href="#" aria-label="Nutrico, inicio">
      nutrico
      <Sandia className="logo-sandia" />
    </a>
  )
}

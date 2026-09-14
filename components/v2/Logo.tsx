/** "nutrico✳", el logo tipográfico de la v2. */
export function Logo({ className = "logo" }: { className?: string }) {
  return (
    <a className={className} href="#" aria-label="Nutrico, inicio">
      nutrico
      <span className="logo-flower" aria-hidden="true">
        ✳
      </span>
    </a>
  )
}

import { Logo } from "@/components/v2/Logo"
import { Pie } from "@/components/v2/Pie"

/**
 * Esqueleto de las páginas de confirmación a las que aterrizan los trigger
 * links de los correos (`/lista-espera`, `/no-es-para-mi`).
 *
 * Es un componente y no una copia por página porque las dos dicen lo mismo con
 * distinto texto, y el andamiaje duplicado es justo la deuda que dejaron los
 * HTML de los correos: un cambio de marca hay que hacerlo en cada archivo.
 */
export function Confirmacion({
  titulo,
  texto,
  nota,
  enlace,
}: {
  titulo: string
  texto: string
  nota: string
  enlace?: { href: string; etiqueta: string }
}) {
  return (
    <>
      <header className="wrap header">
        <Logo href="/" />
      </header>

      <main className="wrap confirma">
        <span className="confirma-marca" aria-hidden="true">✓</span>
        <h1>{titulo}</h1>
        <p className="confirma-texto">{texto}</p>
        <p className="confirma-nota">{nota}</p>
        {enlace && (
          <a className="text-link" href={enlace.href} target="_blank" rel="noopener noreferrer">
            {enlace.etiqueta} <span aria-hidden="true">↗</span>
          </a>
        )}
      </main>

      <Pie />
    </>
  )
}

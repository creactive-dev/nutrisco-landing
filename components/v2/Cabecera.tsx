import { Logo } from "@/components/v2/Logo"
import { BotonPrograma } from "@/components/v2/BotonPrograma"

export function Cabecera() {
  return (
    <header className="header wrap">
      <Logo />
      <nav aria-label="Principal">
        <a href="#programa">El programa</a>
        <a href="#constanza">Tu nutricionista</a>
        <a href="#preguntas">Preguntas</a>
      </nav>
      <BotonPrograma className="button small button-outline" corto />
    </header>
  )
}

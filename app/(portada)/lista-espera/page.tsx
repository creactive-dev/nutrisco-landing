import type { Metadata } from "next"
import { Confirmacion } from "@/components/v2/Confirmacion"
import { SITE_CONFIG } from "@/lib/constants"
import { PROGRAMA } from "@/lib/constants-programa"

/**
 * Aterrizaje del trigger link "Lista de espera noviembre" de los correos.
 *
 * No pide el correo: quien llega acá apretó un enlace desde su correo y el CRM
 * ya lo anotó con la etiqueta al pasar por el redirector. Pedírselo de nuevo
 * sería fricción sobre alguien que ya dijo que sí, y perdería gente en el paso.
 * Por eso tampoco vende: acaba de decir "no es mi momento".
 *
 * Sin fecha en el texto. La página sirve para cualquier cohorte y una fecha
 * escrita acá se pudre sola, igual que en los metadatos de la portada.
 */
export const metadata: Metadata = {
  title: "Listo, quedaste anotada · Nutrico",
  description: "Te escribimos apenas abran las inscripciones del próximo grupo.",
  // Es una página de confirmación, no una de entrada: no va a buscadores.
  robots: { index: false, follow: false },
}

export default function ListaEsperaPage() {
  return (
    <Confirmacion
      titulo="Listo, quedaste anotada."
      texto={PROGRAMA.listaEspera.exito}
      nota="Te escribimos una vez, cuando abra. Nada más."
      enlace={{ href: SITE_CONFIG.consultaWeb, etiqueta: "Mientras tanto, conoce a Constanza" }}
    />
  )
}

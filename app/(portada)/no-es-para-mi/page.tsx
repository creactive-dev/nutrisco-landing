import type { Metadata } from "next"
import { Confirmacion } from "@/components/v2/Confirmacion"
import { SITE_CONFIG } from "@/lib/constants"

/**
 * Aterrizaje del trigger link "No es para mi (salida suave)" de los correos.
 *
 * Antes caía en el sitio de Constanza sin ninguna señal de que el clic hubiera
 * servido, y quien no ve respuesta vuelve a apretar o marca spam. Esta página
 * existe para cerrar ese lazo.
 *
 * Dice explícitamente que NO es una baja, porque no lo es: la etiqueta saca a
 * la persona de esta campaña y la deja en la base para todo lo demás. Confundir
 * las dos cosas costaría una baja real que nadie pidió.
 */
export const metadata: Metadata = {
  title: "Listo, no te escribimos más de esto · Nutrico",
  description: "Te sacamos de los avisos de Prepara tu Verano.",
  robots: { index: false, follow: false },
}

export default function NoEsParaMiPage() {
  return (
    <Confirmacion
      titulo="Listo, no te escribimos más de esto."
      texto="Te sacamos de los avisos de Prepara tu Verano. Sigues en la lista para lo demás: recetas, consejos y lo que vayamos publicando."
      nota="Si tampoco quieres eso, en cualquiera de nuestros correos está el enlace para darte de baja."
      enlace={{ href: SITE_CONFIG.consultaWeb, etiqueta: "Conoce a Constanza" }}
    />
  )
}

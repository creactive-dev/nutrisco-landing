import Image from "next/image"
import type { ResenaGoogle } from "@/lib/resenas-google"

/**
 * El avatar de quien escribió una reseña de Google: su foto de perfil si tiene
 * una en Google, o su inicial en un círculo de color, que es exactamente lo que
 * Google muestra para quien no subió foto. Nunca una foto de stock.
 *
 * Los colores imitan la paleta de avatares de Google (tonos oscuros, para que
 * la letra blanca se lea) y salen del nombre, así cada persona tiene siempre el
 * mismo. Decorativo: el nombre va escrito al lado.
 */
const COLORES = ["#5E35B1", "#00796B", "#D84315", "#1E88E5", "#6D4C41", "#C2185B", "#3949AB"]

function colorDe(nombre: string): string {
  let suma = 0
  for (const letra of nombre) suma += letra.codePointAt(0) ?? 0
  return COLORES[suma % COLORES.length]
}

export function AvatarResena({
  resena,
  tamano = 40,
  className = "avatar-resena",
}: {
  resena: Pick<ResenaGoogle, "nombre" | "foto">
  tamano?: number
  className?: string
}) {
  if (resena.foto) {
    return (
      <Image
        className={className}
        src={resena.foto}
        alt=""
        width={tamano}
        height={tamano}
        sizes={`${tamano}px`}
      />
    )
  }
  return (
    <span
      className={`${className} avatar-inicial`}
      aria-hidden="true"
      style={{ background: colorDe(resena.nombre), width: tamano, height: tamano }}
    >
      {resena.nombre.charAt(0)}
    </span>
  )
}

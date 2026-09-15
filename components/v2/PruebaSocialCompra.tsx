import Image from "next/image"
import { PORTADA } from "@/lib/constants-programa"
import { RESENAS_GOOGLE } from "@/lib/resenas-google"
import { AvatarResena } from "@/components/v2/AvatarResena"

/**
 * Prueba social y confianza de la zona de precio (15-sep). Dos piezas:
 *
 * - `CalificacionGoogle`: la fila corta que va pegada al botón de compra
 *   (5,0 en Google, total de reseñas y fotos de perfil reales).
 * - `PruebaSocialCompra`: el bloque que acompaña a la tarjeta del precio: dos
 *   citas cortas de Google, las cifras de Constanza y qué pasa después de
 *   pagar, en tres pasos.
 *
 * Solo datos que existen. Sin cupos, sin garantía y sin descuentos: el
 * programa no tiene ninguno de los tres.
 */
export function CalificacionGoogle() {
  const conFoto = RESENAS_GOOGLE.citas.filter((r) => r.foto).slice(0, 4)
  return (
    <div className="calificacion-google">
      <Image src="/v2/logos/google.svg" alt="Google" width={20} height={20} unoptimized />
      <p>
        <b>{RESENAS_GOOGLE.promedio}</b>
        <span className="estrellas-mini" role="img" aria-label="5 de 5 estrellas">
          ★★★★★
        </span>
        <span className="calificacion-total">
          {RESENAS_GOOGLE.total} {PORTADA.testimonios.resenas}
        </span>
      </p>
      <span className="avatares-pila" aria-hidden="true">
        {conFoto.map((r) => (
          <AvatarResena key={r.id} resena={r} tamano={28} />
        ))}
      </span>
    </div>
  )
}

export function PruebaSocialCompra({ inicio }: { inicio: string | null }) {
  const citas = RESENAS_GOOGLE.citas.filter((r) => r.corta).slice(0, 2)
  const { trayectoria } = PORTADA.constanza
  const { reto } = PORTADA.oferta

  return (
    <div className="prueba-compra">
      <ul className="prueba-citas" aria-label="Reseñas en Google">
        {citas.map((r) => (
          <li key={r.id}>
            <span className="estrellas-mini" role="img" aria-label="5 estrellas">
              ★★★★★
            </span>
            <blockquote>{r.cita}</blockquote>
            <p className="prueba-autora">
              <AvatarResena resena={r} tamano={30} />
              <span>
                {r.nombre}
                <small>{PORTADA.testimonios.rotuloResena}</small>
              </span>
            </p>
          </li>
        ))}
      </ul>

      <div className="prueba-cifras">
        <p>
          <b>{trayectoria.numero}</b>
          <span>{trayectoria.numeroTexto}</span>
        </p>
        <p>
          <b>{reto.numero}</b>
          <span>{reto.texto}</span>
        </p>
      </div>

      <div className="despues-pago">
        <p className="eyebrow">{PORTADA.oferta.despuesTitulo}</p>
        <ol>
          {PORTADA.oferta.despues.map((paso, i) => (
            <li key={paso.titulo}>
              <span className="despues-num" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{paso.titulo}</b>
                <small>
                  {i === PORTADA.oferta.despues.length - 1 && inicio
                    ? `Y el ${inicio} parte el grupo.`
                    : paso.detalle}
                </small>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

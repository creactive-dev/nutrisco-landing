import { diaMesNumerico, mesDe, type EstadoVenta } from "@/lib/programa"

/**
 * La franja vino de arriba. Dice el estado real de la venta, leído de la fila:
 * la barra anterior pasó tres meses anunciando una apertura que ya había
 * ocurrido porque el texto estaba escrito a mano. Sin cohorte no inventa una
 * fecha: nombra el programa.
 */
export function Anuncio({ venta }: { venta: EstadoVenta }) {
  let texto: string
  if (venta.estado === "abierta") {
    texto = `GRUPO ${mesDe(venta.cohorte.fecha_inicio).toUpperCase()} · INSCRIPCIONES HASTA EL ${diaMesNumerico(venta.cohorte.venta_cierra)}`
  } else if (venta.estado === "proxima") {
    texto = `GRUPO ${mesDe(venta.cohorte.fecha_inicio).toUpperCase()} · INSCRIPCIONES DESDE EL ${diaMesNumerico(venta.cohorte.venta_abre)}`
  } else {
    texto = "PREPARA TU VERANO · PROGRAMA DE 3 MESES CON CONSTANZA JIMÉNEZ"
  }

  return (
    <div className="announcement" role="region" aria-label="Estado de las inscripciones">
      {venta.estado === "abierta" && <span className="live-dot" aria-hidden="true" />}
      <span>{texto}</span>
      <a href="#precio">
        Empieza aquí <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}

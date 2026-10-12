import { esProduccionPublica } from "@/lib/entorno"

export interface VideoConstanza {
  src: string
  poster: string
  /** Archivo de prueba: se ve en local y en la URL de revisión, nunca en el dominio. */
  esPrueba: boolean
  /** Lo que dice el video, para lectores de pantalla. */
  descripcion: string
}

/**
 * Constanza a cámara en su sección (diseño C2 §9.3): pieza 1 o 2 de la
 * grabación, con el cierre de pauta (nunca "comenta GRUPO"), subtítulos
 * quemados, H.264 y bajo 5 MB. Mientras no llegue el editado no hay video y la
 * sección muestra la foto; la tarea 14 del plan lo agrega.
 */
export const VIDEO_CONSTANZA: VideoConstanza | null = null

/** El video que se puede mostrar en este despliegue, o null. */
export function videoVisible(
  video: VideoConstanza | null,
  vercelEnv: string | undefined,
  noindex: string | undefined
): VideoConstanza | null {
  if (!video) return null
  if (video.esPrueba && esProduccionPublica(vercelEnv, noindex)) return null
  return video
}

export function videoConstanzaVisible(
  vercelEnv: string | undefined = process.env.VERCEL_ENV,
  noindex: string | undefined = process.env.NEXT_PUBLIC_NOINDEX
): VideoConstanza | null {
  return videoVisible(VIDEO_CONSTANZA, vercelEnv, noindex)
}

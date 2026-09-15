"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"

export interface VideoPaciente {
  id: string
  name: string
  src: string
  poster: string
}

/**
 * Los videos de pacientes, con autoplay silenciado (decisión de Oscar del
 * 15-sep). Los navegadores no dejan partir un video con sonido sin un toque,
 * así que:
 *
 * - Cada video parte solo y sin sonido cuando entra en pantalla, y se pausa al
 *   salir. En bucle y en línea (sin pantalla completa en iPhone).
 * - Nada se descarga al cargar la página: `preload="none"` y el póster. Recién
 *   cuando el video está cerca de la pantalla pasa a `preload="metadata"`, y el
 *   archivo se baja cuando de verdad se reproduce.
 * - "Activar sonido" por video. Al activarlo, el video vuelve al inicio (el
 *   testimonio se entiende desde el principio) y silencia a los otros dos: dos
 *   voces a la vez no se entienden.
 * - Pausa por video. Si alguien lo pausó, no vuelve a partir solo.
 * - Con `prefers-reduced-motion` o con el movimiento pausado desde el botón de
 *   la página, no hay autoplay: se ve el póster con un botón para verlo con
 *   sonido.
 */
export function VideosTestimonio({ videos, rotulo }: { videos: VideoPaciente[]; rotulo: string }) {
  const [conSonido, setConSonido] = useState<string | null>(null)
  const movimientoPausado = useMovimientoPausado()

  return (
    <div className="video-grid">
      {videos.map((v) => (
        <VideoTestimonio
          key={v.id}
          video={v}
          rotulo={rotulo}
          conSonido={conSonido === v.id}
          sinAutoplay={movimientoPausado}
          pedirSonido={(activar) => setConSonido(activar ? v.id : null)}
        />
      ))}
    </div>
  )
}

function VideoTestimonio({
  video,
  rotulo,
  conSonido,
  sinAutoplay,
  pedirSonido,
}: {
  video: VideoPaciente
  rotulo: string
  conSonido: boolean
  sinAutoplay: boolean
  pedirSonido: (activar: boolean) => void
}) {
  const tarjeta = useRef<HTMLElement>(null)
  const el = useRef<HTMLVideoElement>(null)
  const enPantalla = useRef(false)
  const pausaManual = useRef(false)
  const [cerca, setCerca] = useState(false)
  const [reproduciendo, setReproduciendo] = useState(false)

  const reproducir = useCallback(() => {
    const v = el.current
    if (!v) return
    v.play().catch(() => {
      // Autoplay bloqueado (modo ahorro de batería, por ejemplo): queda el
      // póster y el botón de reproducir.
    })
  }, [])

  // React no siempre deja el atributo `muted` en el HTML del servidor, y iOS lo
  // exige para reproducir sin un toque. Se fija también como propiedad.
  useEffect(() => {
    const v = el.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
  }, [])

  // Cerca de la pantalla: pasa a precargar los metadatos. Una sola vez.
  useEffect(() => {
    const t = tarjeta.current
    if (!t || !("IntersectionObserver" in window)) {
      setCerca(true)
      return
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setCerca(true)
          obs.disconnect()
        }
      },
      { rootMargin: "600px 0px" }
    )
    obs.observe(t)
    return () => obs.disconnect()
  }, [])

  // En pantalla: play; fuera: pause.
  useEffect(() => {
    const v = el.current
    if (!v || !("IntersectionObserver" in window)) return
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          enPantalla.current = e.isIntersecting
          if (e.isIntersecting) {
            const puedeSolo = !sinAutoplay && !pausaManual.current
            if (puedeSolo || (conSonido && !pausaManual.current)) reproducir()
          } else if (!v.paused) {
            v.pause()
          }
        }
      },
      { threshold: 0.55 }
    )
    obs.observe(v)
    return () => obs.disconnect()
  }, [sinAutoplay, conSonido, reproducir])

  // El movimiento se pausó (preferencia del sistema o botón): se detienen los
  // videos que corrían solos, no el que alguien puso con sonido.
  useEffect(() => {
    const v = el.current
    if (v && sinAutoplay && !conSonido && !v.paused) v.pause()
  }, [sinAutoplay, conSonido])

  // Sonido: solo el video elegido suena.
  useEffect(() => {
    const v = el.current
    if (!v) return
    if (conSonido) {
      v.muted = false
      v.currentTime = 0
      pausaManual.current = false
      reproducir()
    } else {
      v.muted = true
    }
  }, [conSonido, reproducir])

  const alternarPausa = () => {
    const v = el.current
    if (!v) return
    if (v.paused) {
      pausaManual.current = false
      reproducir()
    } else {
      pausaManual.current = true
      v.pause()
    }
  }

  const etiquetaSonido = conSonido ? "Silenciar" : "Activar sonido"

  return (
    <article className="video-card" ref={tarjeta}>
      <div className="video-marco">
        <video
          ref={el}
          muted
          loop
          playsInline
          preload={cerca ? "metadata" : "none"}
          poster={video.poster}
          aria-label={`Testimonio de ${video.name}, ${rotulo.toLowerCase()}`}
          onPlay={() => setReproduciendo(true)}
          onPause={() => setReproduciendo(false)}
        >
          <source src={video.src} type="video/mp4" />
        </video>

        {sinAutoplay && !reproduciendo && !conSonido && (
          <button
            type="button"
            className="video-play-grande"
            onClick={() => pedirSonido(true)}
            aria-label={`Ver el testimonio de ${video.name} con sonido`}
          >
            <Play aria-hidden="true" size={26} fill="currentColor" strokeWidth={0} />
          </button>
        )}

        <div className="video-controles">
          <button
            type="button"
            className="video-sonido"
            aria-pressed={conSonido}
            onClick={() => pedirSonido(!conSonido)}
          >
            {conSonido ? (
              <Volume2 aria-hidden="true" size={16} />
            ) : (
              <VolumeX aria-hidden="true" size={16} />
            )}
            {etiquetaSonido}
          </button>
          <button
            type="button"
            className="video-pausa"
            onClick={alternarPausa}
            aria-label={reproduciendo ? `Pausar el video de ${video.name}` : `Reproducir el video de ${video.name}`}
          >
            {reproduciendo ? (
              <Pause aria-hidden="true" size={15} fill="currentColor" strokeWidth={0} />
            ) : (
              <Play aria-hidden="true" size={15} fill="currentColor" strokeWidth={0} />
            )}
          </button>
        </div>
      </div>
      <div>
        <h3>{video.name}</h3>
        <span>{rotulo}</span>
      </div>
    </article>
  )
}

/**
 * Si el movimiento está pausado: por `prefers-reduced-motion` o por el botón
 * de la página (`Movimiento`, que pone la clase `paused-motion` en <html>).
 */
function useMovimientoPausado(): boolean {
  const [pausado, setPausado] = useState(false)
  useEffect(() => {
    const raiz = document.documentElement
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)")
    const leer = () => setPausado(consulta.matches || raiz.classList.contains("paused-motion"))
    leer()
    consulta.addEventListener?.("change", leer)
    const obs = new MutationObserver(leer)
    obs.observe(raiz, { attributes: true, attributeFilter: ["class"] })
    return () => {
      consulta.removeEventListener?.("change", leer)
      obs.disconnect()
    }
  }, [])
  return pausado
}

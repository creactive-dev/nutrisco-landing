"use client"

import { useState } from "react"
import type { VideoConstanza as Video } from "@/lib/video-constanza"
import { VideoTestimonio, useMovimientoPausado } from "@/components/v2/VideosTestimonio"

/**
 * Constanza a cámara en su sección (diseño C2 §9.3). Mismo reproductor que los
 * videos de pacientes: parte sola y sin sonido al entrar en pantalla, con
 * "Activar sonido" y pausa; con el movimiento pausado se ve el póster.
 */
export function VideoConstanza({ video }: { video: Video }) {
  const [conSonido, setConSonido] = useState(false)
  const sinAutoplay = useMovimientoPausado()
  return (
    <div className="video-constanza">
      <VideoTestimonio
        video={{ id: "constanza", name: "Constanza Jiménez Paschold", src: video.src, poster: video.poster }}
        rotulo="Nutricionista clínica"
        ariaLabel={video.descripcion}
        sinPie
        conSonido={conSonido}
        sinAutoplay={sinAutoplay}
        pedirSonido={setConSonido}
      />
    </div>
  )
}

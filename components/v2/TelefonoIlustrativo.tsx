import Image from "next/image"
import { SITE_CONFIG } from "@/lib/constants"
import { semanaDe } from "@/lib/programa"
import { Sandia } from "@/components/v2/Sandia"

/**
 * El teléfono del hero. Es HTML y no una captura: una vista ilustrativa armada
 * con el lenguaje de los mockups, rotulada como tal, sin datos de una cuenta
 * real. La tira de días es la semana en que arranca el grupo (o la semana
 * actual si no hay cohorte), no una semana escrita a mano.
 */
export function TelefonoIlustrativo({ semanaDesde }: { semanaDesde: string }) {
  const semana = semanaDe(semanaDesde)

  return (
    <div className="phone hero-phone">
      <div className="phone-status">
        <span>9:41</span>
        <span className="island" />
        <span aria-hidden="true">▮▮▮ ▰</span>
      </div>
      <div className="phone-content">
        <div className="app-top">
          <span className="app-brand">
            nutrico
            <Sandia />
          </span>
          <span className="app-avatar">TÚ</span>
        </div>
        <p className="app-eyebrow">UN DÍA A LA VEZ</p>
        <h2>
          Hoy te eliges <span>♡</span>
        </h2>
        <p className="app-subtitle">Tu plan, tus recetas, tu espacio.</p>
        <div className="week" aria-hidden="true">
          {semana.map((d) => (
            <span key={`${d.inicial}-${d.dia}`} className={d.esElDia ? "selected" : undefined}>
              {d.inicial}
              <b>{d.dia}</b>
            </span>
          ))}
        </div>
        <div className="app-meal">
          <Image
            src="/v2/r008.jpg"
            alt="Panqueques del recetario de Nutrico"
            width={1100}
            height={458}
            sizes="(max-width: 760px) 200px, 240px"
            priority
          />
          <span className="meal-tag">EN TU RECETARIO</span>
          <div>
            <small>IDEAS PARA TU MAÑANA</small>
            <h3>Rico. Simple. Para ti.</h3>
            <span>
              Descubre tus recetas <b aria-hidden="true">↗</b>
            </span>
          </div>
        </div>
        <div className="app-message">
          <Image src={SITE_CONFIG.brand.constanzaThumb} alt="" width={34} height={34} sizes="34px" />
          <div>
            <b>Constanza te acompaña</b>
            <p>En cada control, Constanza te arma tu pauta nueva.</p>
          </div>
        </div>
        <div className="app-bottom" aria-hidden="true">
          <span className="active">
            ⌂<small>Mi día</small>
          </span>
          <span>
            ▤<small>Mi plan</small>
          </span>
          <span>
            ↗<small>Progreso</small>
          </span>
          <span>
            ♡<small>Comunidad</small>
          </span>
        </div>
      </div>
    </div>
  )
}

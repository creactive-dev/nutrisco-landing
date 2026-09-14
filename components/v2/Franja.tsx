import { Fragment } from "react"
import { PORTADA } from "@/lib/constants-programa"

export function Franja() {
  return (
    <div className="program-strip">
      <div className="wrap">
        {PORTADA.franja.map((item, i) => (
          <Fragment key={item.numero + item.texto}>
            {i > 0 && (
              <span className="strip-star" aria-hidden="true">
                ✳
              </span>
            )}
            <span>
              <b>{item.numero}</b> {item.texto}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

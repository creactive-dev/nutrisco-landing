import { Fragment } from "react"
import { PORTADA } from "@/lib/constants-programa"
import { Sandia } from "@/components/v2/Sandia"

export function Franja() {
  return (
    <div className="program-strip">
      <div className="wrap">
        {PORTADA.franja.map((item, i) => (
          <Fragment key={item.numero + item.texto}>
            {i > 0 && (
              <Sandia className="strip-star" />
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

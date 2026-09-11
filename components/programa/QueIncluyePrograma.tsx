"use client"

import { motion } from "framer-motion"
import {
  CalendarCheck,
  ClipboardList,
  MessagesSquare,
  Receipt,
  RefreshCw,
  UtensilsCrossed,
  Video,
} from "lucide-react"
import { PROGRAMA } from "@/lib/constants-programa"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { diaSemanaYFecha, type EstadoVenta } from "@/lib/programa"

const iconos = [ClipboardList, UtensilsCrossed, RefreshCw, MessagesSquare, Video, Receipt]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
}

export function QueIncluyePrograma({ venta }: { venta: EstadoVenta }) {
  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null

  // Las sesiones se cargan a mano con un UPDATE, así que una fecha mal escrita
  // es cuestión de tiempo. `diaSemanaYFecha` devuelve "" cuando no la puede
  // leer: esas filas se descartan acá en vez de mostrar una viñeta en blanco
  // que parece un error de la página.
  const sesiones =
    cohorte?.sesiones?.filter((s) => diaSemanaYFecha(s.fecha) !== "") ?? null

  return (
    <section id="que-incluye" className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Eyebrow tone="celeste">Qué te llevas</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-section-mobile text-text-dark md:text-section">
            Tres meses de acompañamiento, no un PDF.
          </h2>
        </div>

        <motion.div
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PROGRAMA.incluye.map((linea, i) => {
            const Icono = iconos[i] ?? ClipboardList
            return (
              <motion.div
                key={linea.titulo}
                variants={item}
                className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-hover"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-celeste-50">
                  <Icono className="h-5 w-5 text-celeste-600" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-text-dark">{linea.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{linea.detalle}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Las tres sesiones en vivo. Si Constanza todavía no mandó las fechas,
            la sección no desaparece ni inventa una: dice que se confirman. Una
            fecha inventada acá es una promesa que alguien compra. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass-strong mt-6 rounded-4xl p-6 md:p-10"
        >
          <div className="md:flex md:items-start md:justify-between md:gap-10">
            <div className="md:max-w-sm">
              <Eyebrow tone="sandia">{PROGRAMA.sesiones.eyebrow}</Eyebrow>
              <h3 className="mt-4 font-serif text-2xl font-bold text-text-dark md:text-3xl">
                {PROGRAMA.sesiones.h2}
              </h3>
            </div>

            <div className="mt-6 flex-1 md:mt-0">
              {sesiones && sesiones.length > 0 ? (
                <ul className="space-y-3">
                  {sesiones.map((sesion, i) => (
                    <li
                      key={`${sesion.fecha}-${i}`}
                      className="flex items-start gap-3 rounded-2xl bg-white/60 p-4"
                    >
                      <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-sandia-600" />
                      <div>
                        <p className="text-sm font-medium capitalize text-text-dark">
                          {diaSemanaYFecha(sesion.fecha)}
                        </p>
                        {sesion.tema && (
                          <p className="mt-0.5 text-[13px] text-text-muted">{sesion.tema}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-text-muted">
                  {PROGRAMA.sesiones.sinFechas}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Por qué hay fecha de cierre. Reemplaza al contador de cupos. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-10 max-w-2xl text-center"
        >
          <h3 className="font-serif text-2xl font-bold text-text-dark md:text-3xl">
            {PROGRAMA.porQueFecha.h2}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            {PROGRAMA.porQueFecha.body}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

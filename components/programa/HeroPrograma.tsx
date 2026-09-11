"use client"

import Image from "next/image"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CalendarDays, Receipt, Star, Wallet } from "lucide-react"
import { PROGRAMA } from "@/lib/constants-programa"
import { SITE_CONFIG } from "@/lib/constants"
import { MeshAurora } from "@/components/ui/MeshAurora"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { CuentaRegresiva } from "@/components/programa/CuentaRegresiva"
import { verOferta } from "@/lib/pixel"
import {
  diaMesCorto,
  diaSemanaYFecha,
  formatCLP,
  ultimoDiaDelPrograma,
  type EstadoVenta,
} from "@/lib/programa"

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

export function HeroPrograma({ venta }: { venta: EstadoVenta }) {
  const cohorte = venta.estado === "abierta" || venta.estado === "proxima" ? venta.cohorte : null

  // Un ViewContent por carga, con el precio real de la fila. Sin esto Meta
  // optimiza a ciegas, que es exactamente lo que pasó en la campaña del Reto.
  useEffect(() => {
    if (cohorte) verOferta(cohorte.slug, cohorte.precio)
  }, [cohorte])

  const abierta = venta.estado === "abierta"

  return (
    <section id="hero" className="relative overflow-hidden px-5 pt-28 pb-14 md:px-8 md:pt-40 md:pb-24">
      <MeshAurora variant="light" blobs grain />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12">
          {/* Columna de copy */}
          <motion.div
            className="text-center md:text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item} className="mb-4 inline-flex w-full justify-center md:w-auto md:justify-start">
              <a
                href={SITE_CONFIG.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-transform hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-sandia text-sandia" />
                  ))}
                </span>
                <span className="text-[11px] font-medium text-text-muted">
                  5.0 en Google · +2.500 pacientes
                </span>
              </a>
            </motion.div>

            <motion.div variants={item}>
              <Eyebrow tone="celeste">{PROGRAMA.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-5 font-serif text-hero-mobile text-text-dark md:text-hero"
            >
              {PROGRAMA.hero.h1[0]}
              <br />
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                {PROGRAMA.hero.h1[1]}
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-5 max-w-md text-base leading-relaxed text-text-muted md:mx-0 md:text-lg"
            >
              {PROGRAMA.hero.subtitle}
            </motion.p>

            {/* Las fechas del programa, que son la oferta. Salen de la fila. */}
            {cohorte && (
              <motion.div
                variants={item}
                className="mt-6 inline-flex items-center gap-2.5 rounded-2xl glass px-4 py-2.5"
              >
                <CalendarDays className="h-4 w-4 shrink-0 text-celeste-600" />
                <span className="text-sm font-medium text-text-dark">
                  {diaMesCorto(cohorte.fecha_inicio)} al {ultimoDiaDelPrograma(cohorte.fecha_fin)}
                </span>
                <span className="text-sm text-text-muted">· 3 meses</span>
              </motion.div>
            )}

            <motion.div variants={item} className="mt-7">
              <a
                href="#precio"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-warm px-6 py-3.5 text-sm font-semibold text-white shadow-glow-sandia transition-all duration-250 hover:shadow-[0_0_0_1px_rgba(233,69,85,0.24),0_12px_36px_-4px_rgba(233,69,85,0.40)] md:text-base"
              >
                {abierta ? PROGRAMA.hero.ctaAbierta : PROGRAMA.hero.ctaProxima}
                <ArrowRight className="h-4 w-4" />
              </a>
              {cohorte && abierta && (
                <p className="mt-3 font-serif text-lg font-semibold text-text-dark">
                  {formatCLP(cohorte.precio)}{" "}
                  <span className="font-sans text-sm font-normal text-text-muted">
                    pago único
                  </span>
                </p>
              )}
            </motion.div>

            <motion.div
              variants={item}
              className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-text-muted md:justify-start"
            >
              <span className="inline-flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5 text-celeste-600" /> Un solo pago
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Receipt className="h-3.5 w-3.5 text-celeste-600" /> Boleta exenta para tu isapre
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-celeste-600" /> Sin mensualidad
              </span>
            </motion.div>

            {/* Reloj solo cuando de verdad se puede comprar. Una cuenta
                regresiva sobre una venta cerrada no apura, confunde. */}
            {abierta && cohorte && (
              <motion.div variants={item} className="mt-8 flex justify-center md:justify-start">
                <CuentaRegresiva
                  hasta={cohorte.venta_cierra}
                  etiqueta="para que cierren las inscripciones"
                />
              </motion.div>
            )}

            {venta.estado === "proxima" && (
              <motion.p variants={item} className="mt-7 text-sm text-text-muted">
                Las inscripciones abren el{" "}
                <span className="font-semibold text-text-dark">
                  {diaSemanaYFecha(venta.cohorte.venta_abre)}
                </span>
                .
              </motion.p>
            )}
          </motion.div>

          {/* La app, arriba y grande. Estaba enterrada al fondo de la página
              vieja y en la reunión ella pidió justamente esto. */}
          <motion.div
            className="relative mt-12 md:mt-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Se usa `m-recetas` y NO `dashboard-home`: esa captura es de una
                cuenta de prueba y sale "Hola, QA" con la racha en 0 y el plan
                vacío. Un producto vacío en la portada de la página que lo vende
                es el peor argumento posible. Esta muestra el recetario lleno,
                que además es lo que más se entiende de un vistazo. */}
            <div className="relative mx-auto w-full max-w-[290px] md:max-w-[360px]">
              <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-warm-cool opacity-[0.13] blur-3xl" />
              <Image
                src="/mockups/m-recetas.png"
                alt="El recetario de Nutrico con las recetas filtradas para tu pauta"
                width={701}
                height={1443}
                priority
                sizes="(max-width: 768px) 290px, 360px"
                className="h-auto w-full drop-shadow-[0_24px_48px_rgba(26,28,27,0.14)]"
              />
            </div>
            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.12em] text-text-muted">
              Pantalla real de la aplicación
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

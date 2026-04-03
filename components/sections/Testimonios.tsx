"use client"

import { motion } from "framer-motion"
import { TESTIMONIOS } from "@/lib/constants"

/* TODO: Reemplazar con testimonios reales de Constanza */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const headerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function Testimonios() {
  return (
    <section className="bg-surface-low py-16 px-4 md:py-24 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.p
            variants={headerItem}
            className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4"
          >
            {TESTIMONIOS.eyebrow}
          </motion.p>
          <motion.h2
            variants={headerItem}
            className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]"
          >
            {TESTIMONIOS.h2}
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {TESTIMONIOS.items.map((testimonio, index) => (
            <motion.div
              key={index}
              variants={cardItem}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-surface-lowest rounded-4xl p-6 shadow-card flex flex-col gap-3"
            >
              {/* Badge síntoma */}
              <span className="self-start bg-celeste/15 text-celeste rounded-full px-3 py-1 text-[12px] font-medium">
                {testimonio.badge}
              </span>

              {/* Comilla decorativa */}
              <p
                aria-hidden="true"
                className="text-[3rem] font-serif text-sandia/20 leading-none select-none -mb-2"
              >
                &ldquo;
              </p>

              {/* Testimonio */}
              <p className="text-[1rem] leading-[1.6] text-text-dark -mt-3">
                {testimonio.quote}
              </p>

              {/* Nombre + detalle */}
              <div className="mt-auto pt-2">
                <p className="text-[14px] font-medium text-text-dark">
                  {testimonio.name}
                </p>
                <p className="text-[13px] text-text-muted">
                  {testimonio.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

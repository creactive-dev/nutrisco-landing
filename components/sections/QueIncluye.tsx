"use client"

import { motion } from "framer-motion"
import {
  ClipboardList,
  Utensils,
  ShoppingCart,
  BarChart2,
  MessageCircle,
  Video,
  RefreshCw,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { QUE_INCLUYE } from "@/lib/constants"

const iconMap: Record<string, LucideIcon> = {
  "clipboard-list": ClipboardList,
  utensils: Utensils,
  "shopping-cart": ShoppingCart,
  "bar-chart-2": BarChart2,
  "message-circle": MessageCircle,
  video: Video,
  "refresh-cw": RefreshCw,
}

const desktopColSpan: Record<string, string> = {
  plan: "md:col-span-7 md:row-span-2",
  recetario: "md:col-span-5",
  lista: "md:col-span-5",
  checkin: "md:col-span-4",
  soporte: "md:col-span-4",
  sesion: "md:col-span-4",
  ajuste: "md:col-span-12",
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
}

interface Feature {
  id: string
  icon: string
  title: string
  description: string
  featured?: boolean
  fullWidth?: boolean
  badge?: string
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = iconMap[feature.icon] ?? ClipboardList
  const colClass = desktopColSpan[feature.id] ?? "md:col-span-4"

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`${colClass} bg-surface-lowest rounded-4xl p-6 shadow-card`}
    >
      <div className="w-10 h-10 rounded-xl bg-celeste/10 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-celeste" />
      </div>

      <div className="flex items-center gap-2 mt-3">
        <h3 className="font-serif font-semibold text-[1.125rem] text-text-dark">
          {feature.title}
        </h3>
        {feature.badge && (
          <span className="bg-celeste/15 text-celeste rounded-full px-2 py-0.5 text-[11px] font-medium">
            {feature.badge}
          </span>
        )}
      </div>

      <p className="text-[0.9375rem] text-text-muted leading-[1.6] mt-2">
        {feature.description}
      </p>
    </motion.div>
  )
}

export default function QueIncluye() {
  return (
    <section id="que-incluye" className="bg-surface-low py-16 px-4 md:py-24 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[13px] font-medium text-celeste uppercase tracking-[0.08em] mb-4">
            {QUE_INCLUYE.eyebrow}
          </p>
          <h2 className="font-serif font-bold text-text-dark text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.025em]">
            {QUE_INCLUYE.h2[0]}
            <br />
            {QUE_INCLUYE.h2[1]}
          </h2>
        </div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {QUE_INCLUYE.features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

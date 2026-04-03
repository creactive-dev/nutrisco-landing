import {
  ShieldCheck,
  Receipt,
  Lock,
  XCircle,
  ClipboardList,
  Utensils,
  ShoppingCart,
  BarChart2,
  MessageCircle,
  Video,
  RefreshCw,
  type LucideProps,
} from "lucide-react"
import type { FC } from "react"

// Mapa de nombres de icono (snake_case) → componente Lucide
const ICON_MAP: Record<string, FC<LucideProps>> = {
  "shield-check": ShieldCheck,
  receipt: Receipt,
  lock: Lock,
  "x-circle": XCircle,
  "clipboard-list": ClipboardList,
  utensils: Utensils,
  "shopping-cart": ShoppingCart,
  "bar-chart-2": BarChart2,
  "message-circle": MessageCircle,
  video: Video,
  "refresh-cw": RefreshCw,
}

type BadgeVariant = "founder" | "trust" | "symptom" | "feature"

type BadgeProps = {
  variant: BadgeVariant
  children: React.ReactNode
  /** Nombre del icono (clave del ICON_MAP). Requerido para variant "trust". */
  icon?: string
  /** Muestra punto pulsante a la izquierda (usado en variant "founder"). */
  pulse?: boolean
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  founder:
    "bg-sandia/10 text-sandia text-xs font-semibold rounded-full px-3 py-1 inline-flex items-center gap-1.5",
  trust:
    "bg-surface-lowest text-text-muted shadow-card text-xs font-medium rounded-full px-3 py-1 inline-flex items-center gap-1.5",
  symptom:
    "bg-celeste/15 text-celeste text-xs font-semibold rounded-full px-3 py-1 inline-flex items-center gap-1",
  feature:
    "bg-celeste/15 text-celeste text-xs font-semibold rounded-full px-2.5 py-0.5 inline-flex items-center gap-1",
}

export function Badge({ variant, children, icon, pulse = false, className = "" }: BadgeProps) {
  const IconComponent = icon ? ICON_MAP[icon] : undefined

  return (
    <span className={[variantClasses[variant], className].filter(Boolean).join(" ")}>
      {/* Punto pulsante para variant "founder" */}
      {variant === "founder" && (
        <span
          className={[
            "inline-block w-1.5 h-1.5 rounded-full bg-sandia flex-shrink-0",
            pulse ? "animate-breathe" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        />
      )}

      {/* Icono para las variantes que lo usan */}
      {IconComponent && (
        <IconComponent
          size={12}
          strokeWidth={2}
          className="flex-shrink-0"
          aria-hidden="true"
        />
      )}

      {children}
    </span>
  )
}

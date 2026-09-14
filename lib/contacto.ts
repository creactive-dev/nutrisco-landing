import { SITE_CONFIG } from "@/lib/constants"

// ============================================================
// CONTACTO — a dónde mandar a alguien que no puede comprar ahora
//
// `SITE_CONFIG.whatsappNumber` cae a "56900000000" cuando no está definida
// `NEXT_PUBLIC_WHATSAPP_NUMBER`, y hoy no está en `.env.example` ni hay un
// número documentado de Constanza. Un botón de WhatsApp a un número de relleno
// es peor que no tenerlo: la persona escribe a nadie y cree que la ignoraron.
// Sin número real, el contacto es el correo que ya usa la app con sus clientas.
// ============================================================

export interface Canal {
  tipo: "whatsapp" | "correo"
  href: string
  etiqueta: string
}

const RELLENO = "56900000000"

export function canalDeContacto(mensaje: string): Canal {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (numero && /^\d{10,15}$/.test(numero) && numero !== RELLENO) {
    return {
      tipo: "whatsapp",
      href: `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`,
      etiqueta: "Escríbenos por WhatsApp",
    }
  }
  return {
    tipo: "correo",
    href: `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(mensaje)}`,
    etiqueta: `Escríbenos a ${SITE_CONFIG.email}`,
  }
}

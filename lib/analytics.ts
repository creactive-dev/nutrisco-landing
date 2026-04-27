import { SITE } from '@/lib/constants'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', event, params)
}

export function trackPixelEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.fbq?.('track', event, params)
}

export function trackCheckoutBegin() {
  trackEvent('begin_checkout', { currency: 'CLP', value: 19990 })
  trackPixelEvent('InitiateCheckout', { currency: 'CLP', value: 19990 })
}

export function trackPreregistro(email: string) {
  trackEvent('generate_lead', { source: 'pre-registro', email })
  trackPixelEvent('Lead', { source: 'pre-registro' })
}

export const GA4_ID = SITE.ga4Id
export const PIXEL_ID = SITE.metaPixelId

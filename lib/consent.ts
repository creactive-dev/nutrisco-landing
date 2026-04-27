'use client'

export interface ConsentState {
  essential: boolean
  analytics: boolean
  marketing: boolean
  ts: number
}

const COOKIE_NAME = 'cn-consent'

export function getConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const raw = document.cookie
    .split('; ')
    .find((r) => r.startsWith(COOKIE_NAME + '='))
    ?.split('=')[1]
  if (!raw) return null
  try {
    return JSON.parse(decodeURIComponent(raw))
  } catch {
    return null
  }
}

export function saveConsent(state: Omit<ConsentState, 'ts'>) {
  const value: ConsentState = { ...state, ts: Date.now() }
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/; SameSite=Lax`
  window.dispatchEvent(new CustomEvent('consent-updated', { detail: value }))
}

export function acceptAll() {
  saveConsent({ essential: true, analytics: true, marketing: true })
}

export function acceptEssentialOnly() {
  saveConsent({ essential: true, analytics: false, marketing: false })
}

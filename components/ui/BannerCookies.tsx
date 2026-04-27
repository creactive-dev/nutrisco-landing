'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getConsent, acceptAll, acceptEssentialOnly, saveConsent } from '@/lib/consent'
import Link from 'next/link'

export function BannerCookies() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  useEffect(() => {
    const consent = getConsent()
    if (!consent) setVisible(true)
  }, [])

  const handleAcceptAll = () => {
    acceptAll()
    setVisible(false)
  }

  const handleEssentialOnly = () => {
    acceptEssentialOnly()
    setVisible(false)
  }

  const handleSavePreferences = () => {
    saveConsent({ essential: true, analytics, marketing })
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          role="dialog"
          aria-label="Preferencias de cookies"
        >
          <div className="max-w-3xl mx-auto bg-carbon border border-white/10 rounded-card p-5 shadow-[0_-8px_40px_rgba(0,0,0,0.3)]">
            <p className="text-[13px] text-white/80 font-body leading-relaxed mb-4">
              Usamos cookies para mejorar tu experiencia y analizar el tráfico.{' '}
              <Link href="/politica-privacidad" className="underline text-celeste">
                Política de privacidad
              </Link>
            </p>

            {expanded && (
              <div className="mb-4 space-y-2 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-white/70 font-body">Esenciales</span>
                  <span className="text-[12px] text-white/40 font-body">Siempre activas</span>
                </div>
                <Toggle label="Analíticas" checked={analytics} onChange={setAnalytics} />
                <Toggle label="Marketing" checked={marketing} onChange={setMarketing} />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-sandia text-white text-[13px] font-medium font-body rounded-btn"
              >
                Aceptar todas
              </button>
              <button
                onClick={handleEssentialOnly}
                className="px-4 py-2 bg-white/10 text-white text-[13px] font-medium font-body rounded-btn"
              >
                Solo esenciales
              </button>
              {expanded ? (
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-white/60 text-[13px] font-body rounded-btn border border-white/10"
                >
                  Guardar preferencias
                </button>
              ) : (
                <button
                  onClick={() => setExpanded(true)}
                  className="px-4 py-2 text-white/60 text-[13px] font-body rounded-btn border border-white/10"
                >
                  Preferencias
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-white/70 font-body">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${checked ? 'bg-celeste' : 'bg-white/20'}`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-1'}`}
        />
      </button>
    </div>
  )
}

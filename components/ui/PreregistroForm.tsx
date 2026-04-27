'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { trackPreregistro } from '@/lib/analytics'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface PreregistroFormProps {
  darkBg?: boolean
}

export function PreregistroForm({ darkBg = false }: PreregistroFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const honeyRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (honeyRef.current?.value) return // honeypot

    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string

    if (!name.trim() || !email.trim()) {
      setErrorMsg('Por favor completa todos los campos.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Por favor ingresa un email válido.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/preregistro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      if (res.ok) {
        setStatus('success')
        trackPreregistro(email)
      } else {
        const body = await res.json().catch(() => ({}))
        setErrorMsg(body.error ?? 'Algo salió mal. Por favor inténtalo de nuevo.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Sin conexión. Por favor inténtalo de nuevo.')
      setStatus('error')
    }
  }

  const inputBase = `w-full px-4 py-3 rounded-btn font-body text-[14px] outline-none transition-all duration-200 focus:ring-2 focus:ring-celeste ${
    darkBg
      ? 'bg-white/10 text-white placeholder:text-white/40 border border-white/10'
      : 'bg-surface-low text-carbon placeholder:text-gray-mid border border-surface-high'
  }`

  if (status === 'success') {
    return (
      <div className="rounded-card p-6 bg-isapre-bg border border-isapre-border/30 text-center">
        <p className="text-2xl mb-2">✅</p>
        <p className={`font-body font-medium text-[15px] ${darkBg ? 'text-white' : 'text-carbon'}`}>
          ¡Listo! Estás en la lista.
        </p>
        <p className="text-[13px] text-gray-mid mt-1 font-body">
          Te enviamos el link el {new Date('2026-05-03').toLocaleDateString('es-CL', { day: 'numeric', month: 'long' })} a las 9 AM.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      {/* Honeypot */}
      <input ref={honeyRef} name="company" type="text" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          name="name"
          type="text"
          placeholder="Tu nombre"
          autoComplete="given-name"
          className={inputBase}
          disabled={status === 'loading'}
        />
        <input
          name="email"
          type="email"
          placeholder="Tu correo"
          autoComplete="email"
          className={inputBase}
          disabled={status === 'loading'}
        />
      </div>

      {errorMsg && (
        <p className="text-[13px] text-sandia font-body" role="alert">{errorMsg}</p>
      )}

      <Button
        variant={darkBg ? 'primary' : 'primary'}
        type="submit"
        disabled={status === 'loading'}
        fullWidth
        size="lg"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Guardando tu lugar...
          </span>
        ) : (
          '→ Reservar mi lugar al precio fundador'
        )}
      </Button>

      <p className="text-[12px] text-center text-gray-mid font-body">
        Recibirás el link el 3 de mayo a las 9 AM. Sin spam.
      </p>
    </form>
  )
}

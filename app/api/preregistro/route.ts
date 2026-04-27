import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company } = body as {
      name?: string
      email?: string
      company?: string
    }

    // Honeypot check
    if (company) {
      return NextResponse.json({ ok: true })
    }

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Nombre y email son requeridos.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 })
    }

    const webhookUrl = process.env.GHL_PREREG_WEBHOOK
    if (!webhookUrl) {
      console.error('GHL_PREREG_WEBHOOK not configured')
      return NextResponse.json({ error: 'Servicio temporalmente no disponible.' }, { status: 503 })
    }

    const ghlPayload = {
      firstName: name.trim().split(' ')[0],
      lastName: name.trim().split(' ').slice(1).join(' ') || '',
      email: email.trim().toLowerCase(),
      tags: ['pre-registro-fundadores'],
      source: 'landing-fundadores',
      customField: { landing_source: 'nutrisco-fundadores-2026' },
    }

    const ghlRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ghlPayload),
    })

    if (!ghlRes.ok) {
      console.error('GHL webhook failed:', ghlRes.status, await ghlRes.text())
      return NextResponse.json({ error: 'No pudimos procesar tu registro. Intenta de nuevo.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Preregistro error:', err)
    return NextResponse.json({ error: 'Error interno. Por favor intenta más tarde.' }, { status: 500 })
  }
}

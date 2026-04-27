import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nutrisco — Tu plan antiinflamatorio personalizado, mes a mes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1A1A1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Background mesh */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(233,69,85,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(115,195,228,0.08) 0%, transparent 60%)',
          }}
        />
        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              background: '#E94555',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
          >
            🍉
          </div>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, fontFamily: 'Georgia, serif' }}>
            Constanza Jiménez · Nutricionista Clínica
          </span>
        </div>
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 1 }}>
          <div
            style={{
              background: 'rgba(233,69,85,0.15)',
              border: '1px solid rgba(233,69,85,0.3)',
              borderRadius: 999,
              padding: '6px 20px',
              color: '#E94555',
              fontSize: 14,
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.05em',
            }}
          >
            ✦ Oferta Fundadora · Solo 100 cupos
          </div>
          <h1
            style={{
              color: 'white',
              fontSize: 56,
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              textAlign: 'center',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Nutrisco
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 24,
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: 700,
              margin: 0,
              fontFamily: 'Georgia, serif',
            }}
          >
            Tu plan antiinflamatorio personalizado, ajustado contigo cada quincena.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 8 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 20, textDecoration: 'line-through' }}>
              $27.990/mes
            </span>
            <span style={{ color: '#E94555', fontSize: 48, fontWeight: 700 }}>$19.990/mes</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

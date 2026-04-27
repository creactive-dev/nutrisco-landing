import Link from 'next/link'
import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Nutrisco',
  robots: { index: false },
}

export default function PoliticaPrivacidad() {
  let content = ''
  try {
    const mdPath = join(
      process.cwd(),
      '..',
      'lanzamiento',
      'politica-privacidad-v2.md'
    )
    content = readFileSync(mdPath, 'utf-8')
  } catch {
    content = 'Política de privacidad — documento en preparación.'
  }

  const paragraphs = content.split('\n').filter(Boolean)

  return (
    <div className="min-h-screen bg-crema">
      <header className="bg-carbon px-5 py-4 flex items-center gap-4">
        <Link href="/" className="text-[#9CA3AF] hover:text-white font-body text-sm transition-colors">
          ← Volver
        </Link>
        <span className="text-white/20">|</span>
        <span className="font-display text-white font-bold">Nutrisco</span>
      </header>
      <main className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="font-display font-bold text-display-sm text-carbon mb-10">
          Política de Privacidad
        </h1>
        <div className="space-y-4 font-body text-[14px] text-carbon/80 leading-relaxed">
          {paragraphs.map((p, i) => {
            if (p.startsWith('# ')) {
              return <h2 key={i} className="font-display font-bold text-xl text-carbon mt-8 mb-2">{p.replace('# ', '')}</h2>
            }
            if (p.startsWith('## ')) {
              return <h3 key={i} className="font-body font-semibold text-base text-carbon mt-6 mb-1">{p.replace('## ', '')}</h3>
            }
            if (p.startsWith('### ')) {
              return <h4 key={i} className="font-body font-medium text-[15px] text-carbon mt-4 mb-1">{p.replace('### ', '')}</h4>
            }
            if (p.startsWith('- ')) {
              return <li key={i} className="list-disc list-inside text-carbon/70">{p.replace('- ', '')}</li>
            }
            return <p key={i}>{p}</p>
          })}
        </div>
      </main>
    </div>
  )
}

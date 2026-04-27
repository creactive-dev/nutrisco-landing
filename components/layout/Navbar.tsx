import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-black/[0.05]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-10 h-16">
        <Image
          src="/logo-navbar.png"
          alt="Constanza Jiménez Paschold — Nutrición & Salud"
          width={220}
          height={60}
          className="h-10 w-auto object-contain"
          priority
        />

        <a
          href="#precio"
          className="inline-flex items-center gap-1.5 bg-sandia text-white font-body font-semibold text-[13px] px-5 py-2.5 rounded-btn shadow-btn hover:shadow-[0_6px_20px_rgba(233,69,85,0.45)] hover:-translate-y-0.5 transition-all duration-200"
        >
          Acceso fundador
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  )
}

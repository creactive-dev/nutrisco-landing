interface LogoConstanzaProps {
  className?: string
  dark?: boolean
}

export function LogoConstanza({ className = '', dark = false }: LogoConstanzaProps) {
  const textColor = dark ? 'text-white' : 'text-carbon'
  const subColor = dark ? 'text-white/50' : 'text-gray-mid'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Botanical leaf SVG — vectorial, matches Constanza brand */}
      <svg
        width="26"
        height="32"
        viewBox="0 0 26 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Leaf body */}
        <path
          d="M13 26C13 26 2 19 2 11C2 5.477 7.477 1 13 1C18.523 1 24 5.477 24 11C24 19 13 26 13 26Z"
          fill="#E94555"
        />
        {/* Center vein */}
        <path
          d="M13 4.5L13 24"
          stroke="white"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* Left side vein */}
        <path
          d="M13 10Q9.5 12.5 8.5 16"
          stroke="white"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Right side vein */}
        <path
          d="M13 15Q16.5 17.5 17.5 21"
          stroke="white"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Stem */}
        <path
          d="M13 26L13 31"
          stroke="#E94555"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div>
        <p className={`font-display font-bold text-[17px] leading-none tracking-tight ${textColor}`}>
          Constanza Jiménez
        </p>
        <p className={`font-body text-[9px] uppercase tracking-[0.15em] leading-none mt-[4px] ${subColor}`}>
          Nutrición Clínica &amp; Metabólica
        </p>
      </div>
    </div>
  )
}

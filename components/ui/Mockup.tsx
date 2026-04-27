import Image from 'next/image'

interface MockupProps {
  src: string
  alt: string
  label?: string
  priority?: boolean
  className?: string
}

export function Mockup({ src, alt, label, priority = false, className = '' }: MockupProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* iPhone frame */}
      <div className="relative">
        <div
          className="relative rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.4)] bg-carbon"
          style={{ width: 220, height: 476 }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-24 h-6 bg-carbon rounded-b-2xl" />
          {/* Screen */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              priority={priority}
              sizes="220px"
            />
          </div>
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        </div>
        {/* Phone body frame border */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none" />
        {/* Side buttons */}
        <div className="absolute left-[-3px] top-24 w-1 h-8 bg-white/20 rounded-l-full" />
        <div className="absolute left-[-3px] top-36 w-1 h-14 bg-white/20 rounded-l-full" />
        <div className="absolute left-[-3px] top-52 w-1 h-14 bg-white/20 rounded-l-full" />
        <div className="absolute right-[-3px] top-32 w-1 h-20 bg-white/20 rounded-r-full" />
      </div>
      {/* Label */}
      {label && (
        <p className="text-center text-sm text-gray-mid font-body max-w-[200px] leading-snug">
          {label}
        </p>
      )}
    </div>
  )
}

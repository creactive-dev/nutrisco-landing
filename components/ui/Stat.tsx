interface StatProps {
  value: string
  label: string
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4">
      <span className="font-body font-bold text-xl text-white">{value}</span>
      <span className="font-body text-sm text-gray-mid text-center leading-tight">{label}</span>
    </div>
  )
}

/**
 * La sandía de Constanza: el mismo dibujo del ícono de la app
 * (nutrisco/app/public/icon.svg), que también es el favicon (`app/icon.svg`).
 * Reemplaza al asterisco de la v2 en el logo y en los adornos.
 *
 * El viewBox va recortado a la tajada (el ícono original es un cuadrado con
 * aire alrededor), para que se alinee con el texto sin márgenes fantasma.
 * Siempre decorativa: quien la acompaña ya dice lo que hay que decir.
 */
export function Sandia({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="20 66 160 86"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100 104) scale(1.2) translate(-100 -104)">
        <path d="M36,76 A64,64 0 0 0 164,76Z" fill="#AFD84A" />
        <path
          d="M40.5,76 A59.5,59.5 0 0 0 159.5,76"
          fill="none"
          stroke="#2E7D43"
          strokeWidth="9"
          strokeLinecap="butt"
          strokeDasharray="9.5 6.5"
          strokeDashoffset="3"
        />
        <path
          d="M45,76 A55,55 0 0 0 155,76"
          fill="none"
          stroke="#FAFAF8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M46.5,76 A53.5,53.5 0 0 0 153.5,76Z" fill="#E94555" />
        {PEPAS.map(([cx, cy, giro]) => (
          <ellipse
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            rx="2.5"
            ry="4.1"
            fill="#241F1D"
            transform={`rotate(${giro} ${cx} ${cy})`}
          />
        ))}
      </g>
    </svg>
  )
}

const PEPAS: [number, number, number][] = [
  [137.08, 95.72, -62],
  [125.39, 109.45, -37.2],
  [109.02, 117.02, -12.4],
  [90.98, 117.02, 12.4],
  [74.61, 109.45, 37.2],
  [62.92, 95.72, 62],
  [116.71, 95.92, -40],
  [106, 101.3, -13.3],
  [94, 101.3, 13.3],
  [83.29, 95.92, 40],
]

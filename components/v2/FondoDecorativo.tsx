/**
 * Fondo de baja opacidad con dibujos propios de la marca: la tajada de sandía
 * de Constanza en línea, sus pepas, el arco punteado de la cáscara y líneas
 * orgánicas (decisión de Oscar del 15-sep para "¿Te suena familiar?" y "Tu plan,
 * en el bolsillo").
 *
 * - Siempre detrás del contenido y decorativo (`aria-hidden`): la sección que lo
 *   usa lleva `position: relative` y su contenido va por encima.
 * - Opacidad entre 0,06 y 0,12 por pieza, así el texto conserva su contraste.
 * - Cada pieza se ubica por CSS en porcentajes del alto y ancho de la sección,
 *   con un tamaño fijo: el mismo fondo sirve para una sección ancha de
 *   escritorio y para una larga de celular sin deformar los dibujos.
 * - Deriva lenta opcional (CSS). Se detiene con `prefers-reduced-motion` y con
 *   el botón de pausa de la página.
 */
export function FondoDecorativo({ variante }: { variante: "familiar" | "bolsillo" }) {
  return (
    <div className={`fondo-decorativo fondo-${variante}`} aria-hidden="true">
      <Tajada className="fd fd-tajada-a" />
      <Tajada className="fd fd-tajada-b" />
      <Cascara className="fd fd-cascara-a" />
      <Cascara className="fd fd-cascara-b" />
      <Pepas className="fd fd-pepas-a" />
      <Pepas className="fd fd-pepas-b" />
      <Linea className="fd fd-linea-a" />
      <Linea className="fd fd-linea-b" />
    </div>
  )
}

const SVG = { xmlns: "http://www.w3.org/2000/svg", focusable: "false" as const }

/** La tajada en línea: cáscara punteada, borde y pepas, como el logo. */
function Tajada({ className }: { className: string }) {
  return (
    <svg {...SVG} className={className} viewBox="0 0 200 116" fill="none">
      <path d="M8 8 A92 92 0 0 0 192 8" stroke="#2E7D43" strokeWidth="9" strokeDasharray="13 9" />
      <path d="M22 8 A78 78 0 0 0 178 8" stroke="#E94555" strokeWidth="3" />
      <path d="M8 8 H192" stroke="#E94555" strokeWidth="3" strokeLinecap="round" />
      {[
        [100, 60, 0],
        [70, 52, 24],
        [130, 52, -24],
        [48, 34, 48],
        [152, 34, -48],
        [85, 82, 12],
        [115, 82, -12],
      ].map(([cx, cy, giro]) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx="3.6"
          ry="6"
          fill="#241F1D"
          transform={`rotate(${giro} ${cx} ${cy})`}
        />
      ))}
    </svg>
  )
}

/** Solo el arco punteado de la cáscara, grande. */
function Cascara({ className }: { className: string }) {
  return (
    <svg {...SVG} className={className} viewBox="0 0 400 210" fill="none">
      <path d="M10 10 A190 190 0 0 0 390 10" stroke="#2E7D43" strokeWidth="10" strokeDasharray="18 13" />
      <path d="M34 10 A166 166 0 0 0 366 10" stroke="#E94555" strokeWidth="2.5" />
    </svg>
  )
}

/** Un puñado de pepas sueltas, cada una con su giro. */
function Pepas({ className }: { className: string }) {
  return (
    <svg {...SVG} className={className} viewBox="0 0 160 140">
      {[
        [20, 30, -30],
        [70, 14, 20],
        [128, 40, 55],
        [46, 84, 10],
        [104, 96, -40],
        [148, 118, 25],
        [14, 124, 70],
      ].map(([cx, cy, giro]) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx="4.5"
          ry="7.5"
          fill="#241F1D"
          transform={`rotate(${giro} ${cx} ${cy})`}
        />
      ))}
    </svg>
  )
}

/** Línea orgánica, como un trazo a mano alzada. */
function Linea({ className }: { className: string }) {
  return (
    <svg {...SVG} className={className} viewBox="0 0 640 140" fill="none" preserveAspectRatio="none">
      <path
        d="M4 96 C 90 20, 170 132, 262 70 S 430 8, 512 64 S 612 110, 636 40"
        stroke="#3985A6"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M4 118 C 104 52, 190 150, 284 96 S 452 38, 540 90"
        stroke="#73C3E4"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Verificación de la lógica pura de la landing (no hay tests unitarios en este
// repo). Corre con el tsx de la app:
//   /Users/oz/Dev/nutrisco/app/node_modules/.bin/tsx scripts/verificar-logica.mts
// Cada tarea del plan de la C2 suma su bloque antes de la última línea.
import assert from "node:assert/strict"
// Los .ts de lib/ se cargan como CommonJS (el package.json no declara "type"),
// así que Node no les ve los exports con nombre: se importa el módulo entero.
import programa from "../lib/programa"
import entorno from "../lib/entorno"
import videoConstanza from "../lib/video-constanza"

const { controlesDeFiestas, diaYMesCivil, estadoSimulado, fechasControles, sesionEnDiciembre, textoPorMes } = programa
const { esProduccionPublica } = entorno
const { videoVisible } = videoConstanza

// Cuotas (tarea 3): el precio dividido en tres, redondeado al mil hacia arriba.
assert.equal(textoPorMes(59990), "Son menos de $20.000 al mes por 3 meses de acompañamiento.")
assert.equal(textoPorMes(45000), "Son $15.000 al mes por 3 meses de acompañamiento.")
assert.equal(textoPorMes(0), "")
assert.equal(textoPorMes(Number.NaN), "")

// Calendario de controles (tarea 4). Misma regla que la app:
// app/src/lib/programa/control-programa.ts (fechasControles).
const c2 = fechasControles("2026-11-05T03:00:00+00:00") // la fila real de la C2 al 7-oct
assert.deepEqual(c2, ["2026-11-20", "2026-12-05", "2026-12-20", "2027-01-04", "2027-01-19", "2027-02-03"])
assert.deepEqual(controlesDeFiestas(c2), { antesDeNavidad: "2026-12-20", despuesDeAnoNuevo: "2027-01-04" })
// La C1 partió el 5-oct: son las fechas que da por buenas el CLAUDE.md de la cuenta.
assert.deepEqual(fechasControles("2026-10-05T03:00:00+00:00"), ["2026-10-20", "2026-11-04", "2026-11-19", "2026-12-04", "2026-12-19", "2027-01-03"])
// Un grupo que parte en enero no pasa las fiestas: no se habla de ellas (Review Focus 2).
assert.equal(controlesDeFiestas(fechasControles("2027-01-05T03:00:00+00:00")), null)
// Uno que tiene el control en Navidad misma tampoco: "justo antes" es del 15 al 24.
assert.equal(controlesDeFiestas(fechasControles("2026-11-10T03:00:00+00:00")), null)
// Basura: lista vacía y null, nunca una excepción.
assert.deepEqual(fechasControles("no-es-fecha"), [])
assert.equal(controlesDeFiestas([]), null)
assert.equal(diaYMesCivil("2026-12-20"), "20 de diciembre")
assert.equal(diaYMesCivil("2027-01-04", "short"), "4 ene")
assert.equal(diaYMesCivil("basura"), "")
// La sesión de diciembre, venga con hora o solo con fecha.
assert.equal(
  sesionEnDiciembre([
    { fecha: "2026-11-15", tema: "Primera" },
    { fecha: "2026-12-10T19:00:00-03:00", tema: "Cómo pasar las fiestas" },
  ])?.tema,
  "Cómo pasar las fiestas"
)
assert.equal(sesionEnDiciembre([{ fecha: "2026-12-10", tema: "Fiestas" }])?.hora, null)
assert.equal(sesionEnDiciembre([{ fecha: "2026-11-15", tema: "x" }]), null)
assert.equal(sesionEnDiciembre(null), null)
// Simulador con inicio fijo: las fechas de la C2 real.
const sim = estadoSimulado(
  { COHORTE_MOCK: "abierta", COHORTE_MOCK_INICIO: "2026-11-05", COHORTE_MOCK_SLUG: "2026-10", COHORTE_MOCK_SESIONES: "1" },
  Date.parse("2026-10-08T15:00:00Z")
)
assert.equal(sim?.estado, "abierta")
if (sim?.estado === "abierta") {
  assert.equal(sim.cohorte.slug, "2026-10")
  assert.equal(sim.cohorte.fecha_inicio, "2026-11-05T03:00:00.000Z")
  assert.equal(sim.cohorte.venta_cierra, "2026-10-31T02:59:59.000Z")
  // 92 días desde el inicio, como la C1 real (21 sep -> fecha_fin 22 dic): el último día es el 4 de feb.
  assert.equal(sim.cohorte.fecha_fin, "2027-02-05T03:00:00.000Z")
  assert.deepEqual(sim.cohorte.sesiones?.map((s) => s.fecha.slice(0, 10)), ["2026-11-15", "2026-12-10", "2027-01-14"])
}
// En producción el simulador no existe.
assert.equal(estadoSimulado({ VERCEL_ENV: "production", COHORTE_MOCK: "abierta", COHORTE_MOCK_INICIO: "2026-11-05" }), null)

// Dominio público y video de prueba (tarea 6, Review Focus 1).
assert.equal(esProduccionPublica("production", undefined), true)
assert.equal(esProduccionPublica("production", "1"), false) // URL de revisión
assert.equal(esProduccionPublica("preview", undefined), false)
assert.equal(esProduccionPublica(undefined, undefined), false) // local
const deprueba = { src: "/video/x-prueba.mp4", poster: "/video/x.jpg", esPrueba: true, descripcion: "x" }
const real = { ...deprueba, esPrueba: false }
assert.equal(videoVisible(deprueba, "production", undefined), null)
assert.equal(videoVisible(deprueba, "production", "1"), deprueba)
assert.equal(videoVisible(deprueba, undefined, undefined), deprueba)
assert.equal(videoVisible(real, "production", undefined), real)
assert.equal(videoVisible(null, undefined, undefined), null)

console.log("lógica OK")

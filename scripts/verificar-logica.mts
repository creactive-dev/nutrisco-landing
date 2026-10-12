// Verificación de la lógica pura de la landing (no hay tests unitarios en este
// repo). Corre con el tsx de la app:
//   /Users/oz/Dev/nutrisco/app/node_modules/.bin/tsx scripts/verificar-logica.mts
// Cada tarea del plan de la C2 suma su bloque antes de la última línea.
import assert from "node:assert/strict"
// Los .ts de lib/ se cargan como CommonJS (el package.json no declara "type"),
// así que Node no les ve los exports con nombre: se importa el módulo entero.
import programa from "../lib/programa"

const { textoPorMes } = programa

// Cuotas (tarea 3): el precio dividido en tres, redondeado al mil hacia arriba.
assert.equal(textoPorMes(59990), "Son menos de $20.000 al mes por 3 meses de acompañamiento.")
assert.equal(textoPorMes(45000), "Son $15.000 al mes por 3 meses de acompañamiento.")
assert.equal(textoPorMes(0), "")
assert.equal(textoPorMes(Number.NaN), "")

console.log("lógica OK")

// Revisa que la guía de fiestas que se va a publicar sea la real.
// Corre: node scripts/verificar-regalo.mjs   (sale con código 1 si algo falla)
import { existsSync, readFileSync } from "node:fs"

const PDF = new URL("../public/regalo/guia-fiestas.pdf", import.meta.url)
const PORTADA = new URL("../public/regalo/guia-fiestas-portada.jpg", import.meta.url)
const fallas = []

if (!existsSync(PDF)) {
  fallas.push("falta public/regalo/guia-fiestas.pdf")
} else {
  const pdf = readFileSync(PDF)
  const kb = Math.round(pdf.length / 1024)
  if (pdf.subarray(0, 5).toString("latin1") !== "%PDF-") fallas.push("el archivo no es un PDF")
  if (pdf.includes("ARCHIVO DE PRUEBA")) fallas.push("es el PDF de prueba, no la guía")
  if (kb < 50) fallas.push(`pesa ${kb} KB: muy poco para ser la guía`)
  if (kb > 5 * 1024) fallas.push(`pesa ${kb} KB: pasa de 5 MB`)
}
if (!existsSync(PORTADA)) fallas.push("falta public/regalo/guia-fiestas-portada.jpg")

for (const falla of fallas) console.error(`FALLA ${falla}`)
if (fallas.length > 0) process.exit(1)
console.log("La guía está lista para publicar.")

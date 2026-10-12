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
import constantsPrograma from "../lib/constants-programa"
import medicion from "../lib/medicion"
import testimoniosGrupo from "../lib/testimonios-grupo"
import legal from "../lib/legal"

const { controlesDeFiestas, diaYMesCivil, estadoSimulado, fechasControles, sesionEnDiciembre, textoPorMes } = programa
const { esProduccionPublica } = entorno
const { videoVisible } = videoConstanza
const { urlSinDatosPersonales } = medicion
const { TESTIMONIOS_GRUPO, testimonioPublicable, testimoniosVisibles } = testimoniosGrupo
const { DOCUMENTOS_ACEPTADOS } = legal
const { bonoDeLaCohorte, garantiaActiva, GARANTIA, preguntasPortada, textoFiestas, textoGarantia } = constantsPrograma

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

// Fiestas, bono y garantía (tarea 8).
assert.equal(
  textoFiestas({ antesDeNavidad: "2026-12-20", despuesDeAnoNuevo: "2027-01-04" }),
  "El grupo pasa las fiestas con Constanza: un control el 20 de diciembre, justo antes de Navidad, y otro el 4 de enero, justo después de Año Nuevo. Así no llegas a enero a empezar de cero."
)
const bono = bonoDeLaCohorte({ slug: "2026-10", fecha_inicio: "2026-11-05T03:00:00+00:00" })
assert.equal(bono?.titulo, "Bono del grupo de noviembre: recetario de fiestas y verano")
assert.ok(bono?.detalle.includes("5 de noviembre"))
assert.equal(bonoDeLaCohorte({ slug: "2026-11", fecha_inicio: "2026-12-05T03:00:00+00:00" }), null)
assert.equal(bonoDeLaCohorte(null), null)
assert.equal(GARANTIA.activa, false) // apagada hasta que Constanza diga que sí (D3)
assert.equal(garantiaActiva("production", "1"), false) // el simulador no existe en producción
assert.equal(garantiaActiva(undefined, "1"), true)
assert.equal(garantiaActiva(undefined, undefined), false)
assert.ok(textoGarantia("2026-11-20").includes("20 de noviembre"))
assert.ok(!textoGarantia(null).includes("undefined"))
// La duda de la garantía entra solo si se pide, y nunca dice "undefined" sin cohorte (Review Focus 2).
const ventaAbierta = sim?.estado === "abierta" ? sim : null
assert.ok(ventaAbierta)
const dudas = (garantia: boolean) => preguntasPortada(ventaAbierta!, { garantia }).map((p) => p.q)
assert.ok(!dudas(false).includes("¿Y si no es para mí?"))
// Va justo después de "¿Me cobrarán de nuevo el próximo mes?", donde se pregunta por la plata.
const conGarantia = dudas(true)
assert.equal(conGarantia[conGarantia.findIndex((q) => q.startsWith("¿Me cobrarán")) + 1], "¿Y si no es para mí?")
assert.equal(conGarantia.length, dudas(false).length + 1)
// Dudas de la C2 (tarea 9): las tres objeciones de la clienta van arriba.
const sinGarantia = dudas(false)
assert.ok(sinGarantia[0].startsWith("¿Me sirve si tengo resistencia"))
assert.ok(sinGarantia[1].startsWith("Ya probé dietas"))
assert.ok(sinGarantia[2].startsWith("¿Y las fiestas"))
assert.ok(sinGarantia.some((q) => q.startsWith("¿Voy a pasar hambre")))
assert.ok(sinGarantia.some((q) => q.startsWith("¿Tengo que hacer ejercicio")))
const respuestaFiestas = preguntasPortada(ventaAbierta!).find((p) => p.q.startsWith("¿Y las fiestas"))!.a
assert.ok(respuestaFiestas.includes("20 de diciembre") && respuestaFiestas.includes("4 de enero"))
assert.ok(respuestaFiestas.includes("jueves 10 de diciembre")) // la sesión en vivo de la C2 simulada
assert.ok(respuestaFiestas.includes("recetario de fiestas y verano")) // la C2 (slug 2026-10) lleva el bono
// Un grupo que no pasa las fiestas (parte el 5-ene) no tiene la duda de las fiestas (Review Focus 2).
const simEnero = estadoSimulado(
  { COHORTE_MOCK: "abierta", COHORTE_MOCK_INICIO: "2027-01-05", COHORTE_MOCK_SLUG: "2027-01" },
  Date.parse("2026-12-10T15:00:00Z")
)
assert.equal(simEnero?.estado, "abierta")
assert.ok(preguntasPortada(simEnero!).every((p) => !/fiestas|Navidad|Año Nuevo/i.test(p.q + p.a)))
assert.ok(preguntasPortada(simEnero!).length === sinGarantia.length - 1)
for (const venta of [{ estado: "ninguna" }, { estado: "error" }] as const) {
  const sinCohorte = preguntasPortada(venta, { garantia: true })
  assert.ok(sinCohorte.every((p) => !/undefined|NaN/.test(p.a)))
}

// Medición (tarea 11): la URL que viaja a Vercel no lleva datos de la persona.
assert.equal(
  urlSinDatosPersonales("https://nutrico.constanzanutricion.cl/?utm_source=crm&utm_content=01a&email=a%40b.cl&contact_id=123"),
  "https://nutrico.constanzanutricion.cl/?utm_source=crm&utm_content=01a"
)
assert.equal(urlSinDatosPersonales("https://nutrico.constanzanutricion.cl/?ok=1"), "https://nutrico.constanzanutricion.cl/")
assert.equal(urlSinDatosPersonales("no es url"), "no es url")

// Testimonios del grupo de octubre (tarea 12): con permiso y sin peso.
const permiso = { fecha: "2026-10-21", archivo: "testimonios/ejemplo.md" }
assert.equal(testimonioPublicable({ id: "a", nombre: "Ana P.", cita: "Me siento con más energía y sin culpa.", permiso }), true)
assert.equal(testimonioPublicable({ id: "b", nombre: "Ana P.", cita: "Bajé 3 kilos en el primer control.", permiso }), false)
assert.equal(testimonioPublicable({ id: "c", nombre: "Ana P.", cita: "Bajé una talla.", permiso }), false)
assert.equal(testimonioPublicable({ id: "d", nombre: "Ana P.", cita: "Me deshinché.", permiso: { fecha: "", archivo: "" } }), false)
// La guarda de peso va por raíces y no deja pasar cifras ni plazos (Global: sin resultados).
for (const cita of [
  "Bajaste y se nota.",
  "He bajado de a poco.",
  "Estoy bajando sin pasar hambre.",
  "Ahora quiero adelgazar con calma.",
  "Perdí 4 kilitos.",
  "Me pesé y estoy feliz.",
  "Mi balanza dice que pesó menos.",
  "Perdí 8% de grasa.",
  "En 2 semanas me sentí mejor.",
]) {
  assert.equal(testimonioPublicable({ id: "x", nombre: "Ana P.", cita, permiso }), false, cita)
}
// Una cita sana, sin números, sigue pasando; una de más de 140 caracteres no (el precio queda a 27 px de la pantalla 8).
assert.equal(testimonioPublicable({ id: "e", nombre: "Ana P.", cita: "Por fin sé qué cocinar cada semana y llego a la noche con ganas de comer rico.", permiso }), true)
assert.equal(testimonioPublicable({ id: "f", nombre: "Ana P.", cita: "a".repeat(140), permiso }), true)
assert.equal(testimonioPublicable({ id: "g", nombre: "Ana P.", cita: "a".repeat(141), permiso }), false)
// Texto pegado desde un PDF o desde un Mac puede venir descompuesto (e + tilde
// suelta): la guarda lo normaliza antes de revisar. "Bajé" con la é descompuesta
// no es publicable; una cita sana de 140 caracteres con tildes descompuestas sí.
assert.equal(testimonioPublicable({ id: "nfd", nombre: "Ana P.", cita: "Baje\u0301 mucho".normalize("NFD"), permiso }), false)
assert.equal(testimonioPublicable({ id: "nfd2", nombre: "Ana P.", cita: "Me pese\u0301 y estoy feliz".normalize("NFD"), permiso }), false)
assert.equal(testimonioPublicable({ id: "nfd3", nombre: "Ana P.", cita: "é".repeat(140).normalize("NFD"), permiso }), true)
assert.equal(testimonioPublicable({ id: "nfd4", nombre: "Ana P.", cita: "é".repeat(141).normalize("NFD"), permiso }), false)
// En producción los de prueba no existen, aunque alguien deje TESTIMONIOS_MOCK=1 (Review Focus 1).
assert.ok(testimoniosVisibles("production", "1").every((t) => !t.id.startsWith("prueba")))
assert.equal(testimoniosVisibles("production", "1").length, TESTIMONIOS_GRUPO.filter(testimonioPublicable).length)
assert.equal(testimoniosVisibles("development", "1").length, 3) // los de prueba, sin el que habla de peso
assert.ok(testimoniosVisibles("development", undefined).every((t) => !t.id.startsWith("prueba")))

// Versiones legales que acepta el checkout (contrato con la app: /^v\d{1,3}\.\d{1,3}$/;
// la política vigente es la v4.0).
assert.deepEqual(Object.keys(DOCUMENTOS_ACEPTADOS).sort(), ["aviso_datos_sensibles", "privacidad", "terminos"])
assert.ok(Object.values(DOCUMENTOS_ACEPTADOS).every((v) => /^v\d{1,3}\.\d{1,3}$/.test(v)))
assert.equal(DOCUMENTOS_ACEPTADOS.privacidad, "v4.0")

console.log("lógica OK")

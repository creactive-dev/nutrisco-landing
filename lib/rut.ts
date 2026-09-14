// ============================================================
// RUT — validación y formato para la boleta
//
// El RUT es opcional en el checkout: sirve para que la boleta salga a nombre de
// la persona y pueda pedir el reembolso a su isapre. Opcional no significa que
// cualquier cosa pase: un RUT con el dígito verificador mal escrito produce una
// boleta que la isapre rechaza, y eso se descubre semanas después. Si se
// escribió algo, tiene que calzar.
// ============================================================

/** El dígito verificador por módulo 11. "K" cuando el resto da 10. */
export function digitoVerificador(cuerpo: string): string {
  let suma = 0
  let factor = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor
    factor = factor === 7 ? 2 : factor + 1
  }
  const resto = 11 - (suma % 11)
  if (resto === 11) return "0"
  if (resto === 10) return "K"
  return String(resto)
}

/**
 * Devuelve el RUT como `12345678-9` (sin puntos, K mayúscula) o null si no es
 * válido. Acepta lo que la gente escribe de verdad: con puntos, sin guion, con
 * espacios, con k minúscula.
 */
export function formatearRut(entrada: string): string | null {
  const texto = entrada.trim()
  // Solo dígitos, puntos, espacios, un guion opcional y el verificador al final.
  if (!/^[\d.\s]+-?\s*[\dkK]$/.test(texto)) return null
  const limpio = texto.replace(/[^\dkK]/g, "").toUpperCase()
  const cuerpo = limpio.slice(0, -1).replace(/^0+/, "")
  const dv = limpio.slice(-1)
  // Los RUN de personas vivas tienen 7 u 8 dígitos; se deja pasar 6 por los
  // muy antiguos. Menos que eso es un número mal copiado.
  if (!/^\d{6,8}$/.test(cuerpo)) return null
  if (digitoVerificador(cuerpo) !== dv) return null
  return `${cuerpo}-${dv}`
}

/**
 * Mismo criterio que la app (`src/lib/perfil/validacion-contacto.ts`): dígitos
 * E.164 sin "+", listo para `https://wa.me/<numero>`. Un celular chileno de 9
 * dígitos que empieza en 9 recibe el 56 adelante.
 */
export function validarTelefono(input: string): { valido: boolean; formateado?: string } {
  let digitos = input.replace(/\D/g, "")
  if (digitos.length === 9 && digitos.startsWith("9")) digitos = "56" + digitos
  if (digitos.length < 8 || digitos.length > 15) return { valido: false }
  return { valido: true, formateado: digitos }
}

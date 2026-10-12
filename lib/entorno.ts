/**
 * El dominio de verdad: el despliegue de producción del proyecto de la
 * landing. La URL de revisión que ve Constanza también se construye con
 * `VERCEL_ENV=production` (se despliega con `--prod`), pero lleva
 * `NEXT_PUBLIC_NOINDEX=1`: ahí sí se pueden ver los archivos de prueba.
 *
 * `NEXT_PUBLIC_NOINDEX` se lee con su nombre literal a propósito: Next la
 * escribe en el código al construir, y en la URL de revisión solo existe en la
 * build (`--build-env`). Leída como `entorno[clave]` en tiempo de ejecución,
 * llegaría vacía.
 */
export function esProduccionPublica(
  vercelEnv: string | undefined = process.env.VERCEL_ENV,
  noindex: string | undefined = process.env.NEXT_PUBLIC_NOINDEX
): boolean {
  return vercelEnv === "production" && noindex !== "1"
}

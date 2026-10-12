/**
 * Versiones de los documentos legales que acepta quien marca la casilla del
 * checkout. La política de privacidad vigente es la v4.0 de la app
 * (https://app.constanzanutricion.cl/privacidad). Se guardan en el navegador y
 * viajan en el body de POST /api/programa/inscribir como `documentos_aceptados`
 * (la hora de aceptación la pone el servidor). Si cambia la versión de uno de
 * los documentos, se cambia acá y en ninguna otra parte.
 * El aviso de datos sensibles pasó a v1.1 con la política v4.0 (su texto cambió el 12-oct-2026).
 */
export const DOCUMENTOS_ACEPTADOS = {
  terminos: "v1.0",
  privacidad: "v4.0",
  aviso_datos_sensibles: "v1.1",
} as const

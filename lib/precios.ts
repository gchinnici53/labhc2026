// Precios temporales (ver CLAUDE.md seccion 4): en el futuro deberian vivir
// en Configuracion con un editor en el panel admin, pero mientras tanto esta
// es la UNICA fuente que /competicion, el formulario de inscripcion y el
// calculo de recaudado del dashboard deben usar, para no repetir el numero
// en varios archivos y que se desincronicen (paso el 2026-08-31: el precio
// de banquete cambio y quedo un lugar sin actualizar).
export const PRECIO_INSCRIPCION_TEMPRANA_USD = 150;
export const PRECIO_INSCRIPCION_TARDIA_USD = 175;
export const FECHA_CORTE_INSCRIPCION_TEXTO = "05/10/2026";
// Corte a las 00:00 en el huso horario del evento (America/Argentina/Buenos_Aires).
const FECHA_CORTE_INSCRIPCION = new Date("2026-10-05T00:00:00-03:00");

export const PRECIO_BANQUETE_USD = 35;
// Un equipo de 3 arqueros inscriptos en el mismo estilo puede anotarse a
// competir contra otros equipos (ademas de la inscripcion individual de
// cada integrante).
export const PRECIO_EQUIPO_ESTILO_USD = 30;

export function calcularPrecioInscripcion(fecha: Date = new Date()): number {
  return fecha < FECHA_CORTE_INSCRIPCION
    ? PRECIO_INSCRIPCION_TEMPRANA_USD
    : PRECIO_INSCRIPCION_TARDIA_USD;
}

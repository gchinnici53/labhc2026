import { z } from "zod";
import type { Division, Estilo, Genero } from "@prisma/client";

// Solo tipos de @prisma/client (se borran en compilacion): este archivo se
// importa tambien desde un componente de cliente (para calcular la
// categoria en vivo) y @prisma/client no es seguro para el navegador.
export const GENEROS = ["MASCULINO", "FEMENINO"] as const satisfies readonly Genero[];

// Orden pedido por la organizacion para el desplegable.
export const DIVISIONES_ORDENADAS = [
  "CUB",
  "JUNIOR",
  "ADULT",
  "VETERAN",
  "SENIOR",
] as const satisfies readonly Division[];

export const ESTILOS_ORDENADOS = [
  "HB",
  "LB",
  "TR",
  "BB_R",
  "BH_R",
  "FS_R",
  "BB_C",
  "BH_C",
  "BL",
  "BU",
  "FS_C",
  "FU",
] as const satisfies readonly Estilo[];

// Mismo instante que la cuenta regresiva (components/publico/cuenta-regresiva.tsx).
const INICIO_TORNEO = new Date("2026-12-05T08:00:00-03:00");

// Cada opcion es un pais/federacion: la lista la confirmo la organizacion.
export const FEDERACIONES = [
  { valor: "AATA", etiqueta: "AATA - Argentina", pais: "AR" },
  { valor: "AFB", etiqueta: "AFB - Brasil", pais: "BR" },
  { valor: "Chile", etiqueta: "Chile", pais: "CL" },
  { valor: "Colombia", etiqueta: "Colombia", pais: "CO" },
  { valor: "Guyana", etiqueta: "Guyana", pais: "GY" },
  { valor: "México", etiqueta: "México", pais: "MX" },
  { valor: "Trinidad and Tobago", etiqueta: "Trinidad and Tobago", pais: "TT" },
  { valor: "FUTARCO", etiqueta: "FUTARCO - Uruguay", pais: "UY" },
  { valor: "Islas Vírgenes", etiqueta: "Islas Vírgenes", pais: "VG" },
] as const;

type ValorFederacion = (typeof FEDERACIONES)[number]["valor"];

const VALORES_FEDERACION = FEDERACIONES.map((f) => f.valor) as [
  ValorFederacion,
  ...ValorFederacion[],
];

export function calcularEdadAlTorneo(fechaNacimiento: Date): number {
  let edad = INICIO_TORNEO.getUTCFullYear() - fechaNacimiento.getUTCFullYear();
  const yaCumplioEseAnio =
    INICIO_TORNEO.getUTCMonth() > fechaNacimiento.getUTCMonth() ||
    (INICIO_TORNEO.getUTCMonth() === fechaNacimiento.getUTCMonth() &&
      INICIO_TORNEO.getUTCDate() >= fechaNacimiento.getUTCDate());
  if (!yaCumplioEseAnio) edad -= 1;
  return edad;
}

// Cub 8-12, Junior 13-17, Adult 18-54, Veteran 55-64, Senior 65+
// (confirmado por la organizacion, ver docs/04-PENDIENTES.md).
export function calcularDivisionPorEdad(fechaNacimiento: Date): Division {
  const edad = calcularEdadAlTorneo(fechaNacimiento);
  if (edad <= 12) return "CUB";
  if (edad <= 17) return "JUNIOR";
  if (edad <= 54) return "ADULT";
  if (edad <= 64) return "VETERAN";
  return "SENIOR";
}

// Los "message" son codigos cortos, no texto final: el formulario los
// traduce via messages/es.json y messages/en.json (inscripcion.errores.*).
export const esquemaInscripcion = z
  .object({
    nombre: z.string().trim().min(1, "requerido"),
    apellido: z.string().trim().min(1, "requerido"),
    email: z.string().trim().min(1, "requerido").email("email_invalido"),
    telefono: z.string().trim().optional(),
    federacion: z.enum(VALORES_FEDERACION, { message: "requerido" }),
    fechaNacimiento: z
      .string()
      .min(1, "requerido")
      .refine((valor) => !Number.isNaN(Date.parse(valor)), "requerido"),
    genero: z.enum(GENEROS, { message: "requerido" }),
    division: z.enum(DIVISIONES_ORDENADAS, { message: "requerido" }),
    estilo: z.enum(ESTILOS_ORDENADOS, { message: "requerido" }),
    banquete: z.boolean(),
    aceptaReglamento: z.literal(true, { message: "debe_aceptar" }),
    // honeypot: un bot que complete este campo se descarta en la Server Action.
    sitioWeb: z.string().max(0).optional().or(z.literal("")),
  })
  .refine(
    (datos) => {
      const fecha = new Date(datos.fechaNacimiento);
      if (Number.isNaN(fecha.getTime())) return true; // ya lo marca el campo de fecha
      return calcularDivisionPorEdad(fecha) === datos.division;
    },
    { message: "division_no_coincide", path: ["division"] }
  );

export type DatosInscripcion = z.infer<typeof esquemaInscripcion>;

import { z } from "zod";
import {
  DIVISIONES_ORDENADAS,
  ESTILOS_ORDENADOS,
  GENEROS,
} from "@/lib/validaciones/inscripcion";

// Igual que esquemaInscripcion, pero sin honeypot ni aceptacion de
// reglamento (no aplican en el panel) y sin exigir que la categoria
// coincida con la edad: el admin puede corregir datos a mano. La federacion
// es texto libre (ver prisma/schema.prisma): el desplegable fijo de
// FEDERACIONES es una ayuda solo para el formulario publico de inscripcion,
// no una restriccion del modelo, asi que aca no se valida contra esa lista.
export const esquemaEdicionArquero = z.object({
  nombre: z.string().trim().min(1, "requerido"),
  apellido: z.string().trim().min(1, "requerido"),
  email: z.string().trim().min(1, "requerido").email("email_invalido"),
  telefono: z.string().trim().optional(),
  federacion: z.string().trim().min(1, "requerido"),
  fechaNacimiento: z
    .string()
    .min(1, "requerido")
    .refine((valor) => !Number.isNaN(Date.parse(valor)), "requerido"),
  genero: z.enum(GENEROS, { message: "requerido" }),
  division: z.enum(DIVISIONES_ORDENADAS, { message: "requerido" }),
  estilo: z.enum(ESTILOS_ORDENADOS, { message: "requerido" }),
  banquete: z.boolean(),
  notas: z.string().trim().optional(),
});

export type DatosEdicionArquero = z.infer<typeof esquemaEdicionArquero>;

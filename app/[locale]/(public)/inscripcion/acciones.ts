"use server";

import { prisma } from "@/lib/prisma";
import { esquemaInscripcion, FEDERACIONES } from "@/lib/validaciones/inscripcion";

export type ResultadoInscripcion =
  | { ok: true }
  | { ok: false; errores: Partial<Record<string, string>> };

export async function inscribirArquero(
  _estadoPrevio: ResultadoInscripcion | undefined,
  formData: FormData
): Promise<ResultadoInscripcion> {
  // Honeypot: un bot que complete este campo oculto recibe una respuesta de
  // "exito" sin que se guarde nada, para no delatar el filtro.
  if (formData.get("sitioWeb")) {
    return { ok: true };
  }

  const datos = esquemaInscripcion.safeParse({
    nombre: formData.get("nombre"),
    apellido: formData.get("apellido"),
    email: formData.get("email"),
    telefono: formData.get("telefono") ?? "",
    federacion: formData.get("federacion"),
    fechaNacimiento: formData.get("fechaNacimiento"),
    genero: formData.get("genero"),
    division: formData.get("division"),
    estilo: formData.get("estilo"),
    banquete: formData.get("banquete") === "on",
    aceptaReglamento: formData.get("aceptaReglamento") === "on",
  });

  if (!datos.success) {
    const errores: Partial<Record<string, string>> = {};
    for (const issue of datos.error.issues) {
      const campo = issue.path[0];
      if (typeof campo === "string" && !errores[campo]) {
        errores[campo] = issue.message;
      }
    }
    return { ok: false, errores };
  }

  const federacionInfo = FEDERACIONES.find((f) => f.valor === datos.data.federacion);
  if (!federacionInfo) {
    return { ok: false, errores: { federacion: "requerido" } };
  }

  await prisma.arquero.create({
    data: {
      nombre: datos.data.nombre,
      apellido: datos.data.apellido,
      email: datos.data.email,
      telefono: datos.data.telefono || null,
      federacion: federacionInfo.valor,
      pais: federacionInfo.pais,
      fechaNacimiento: new Date(datos.data.fechaNacimiento),
      genero: datos.data.genero,
      division: datos.data.division,
      estilo: datos.data.estilo,
      banquete: datos.data.banquete,
    },
  });

  return { ok: true };
}

"use server";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { esquemaInscripcion, FEDERACIONES } from "@/lib/validaciones/inscripcion";

export type ResultadoInscripcion =
  | { ok: true }
  | { ok: false; errores: Partial<Record<string, string>>; errorGeneral?: string };

// Correlativo atomico: INSERT ... ON CONFLICT se auto-inicializa si la clave
// todavia no existe en Configuracion (por ejemplo, en un ambiente que nunca
// corrio el seed), y de lo contrario incrementa en la misma sentencia. Al
// estar dentro del mismo UPDATE no hay ventana para que dos inscripciones
// simultaneas reciban el mismo numero.
async function generarNumeroRegistro(tx: Prisma.TransactionClient): Promise<string> {
  const filas = await tx.$queryRaw<{ valor: string }[]>`
    INSERT INTO "Configuracion" (clave, valor)
    VALUES ('ultimo_numero_registro', '1')
    ON CONFLICT (clave) DO UPDATE
    SET valor = (CAST("Configuracion".valor AS integer) + 1)::text
    RETURNING valor
  `;
  const numero = filas[0]?.valor ?? "1";
  return `LABHC-2026-${numero.padStart(4, "0")}`;
}

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

  const fechaNacimiento = new Date(datos.data.fechaNacimiento);

  // Misma persona ya inscripta: mismo nombre + apellido + fecha de
  // nacimiento (evita choques entre personas distintas con el mismo nombre).
  const yaInscripto = await prisma.arquero.findFirst({
    where: {
      nombre: { equals: datos.data.nombre, mode: "insensitive" },
      apellido: { equals: datos.data.apellido, mode: "insensitive" },
      fechaNacimiento,
    },
  });
  if (yaInscripto) {
    return { ok: false, errores: {}, errorGeneral: "ya_inscripto" };
  }

  await prisma.$transaction(async (tx) => {
    const numeroRegistro = await generarNumeroRegistro(tx);
    await tx.arquero.create({
      data: {
        numeroRegistro,
        nombre: datos.data.nombre,
        apellido: datos.data.apellido,
        email: datos.data.email,
        telefono: datos.data.telefono || null,
        federacion: federacionInfo.valor,
        pais: federacionInfo.pais,
        fechaNacimiento,
        genero: datos.data.genero,
        division: datos.data.division,
        estilo: datos.data.estilo,
        banquete: datos.data.banquete,
      },
    });
  });

  return { ok: true };
}

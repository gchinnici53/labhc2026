"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requiereRol } from "@/lib/permisos";
import { esquemaEdicionArquero } from "@/lib/validaciones/arquero-admin";

const esquemaId = z.string().min(1);

export type ResultadoEdicionArquero =
  | { ok: true }
  | { ok: false; errores: Partial<Record<string, string>> };

export async function eliminarArquero(id: string) {
  await requiereRol("ADMIN");

  const idValido = esquemaId.parse(id);
  await prisma.arquero.delete({ where: { id: idValido } });

  revalidatePath("/admin/arqueros");
  revalidatePath("/admin");
}

export async function marcarPagado(id: string, pagado: boolean) {
  await requiereRol("CARGA");

  const idValido = esquemaId.parse(id);
  await prisma.arquero.update({ where: { id: idValido }, data: { pagado } });

  revalidatePath("/admin/arqueros");
  revalidatePath("/admin");
}

export async function marcarBanquetePagado(id: string, banquetePagado: boolean) {
  await requiereRol("CARGA");

  const idValido = esquemaId.parse(id);
  await prisma.arquero.update({ where: { id: idValido }, data: { banquetePagado } });

  revalidatePath("/admin/arqueros");
  revalidatePath("/admin");
}

export async function actualizarArquero(
  id: string,
  _estadoPrevio: ResultadoEdicionArquero | undefined,
  formData: FormData
): Promise<ResultadoEdicionArquero> {
  await requiereRol("CARGA");
  const idValido = esquemaId.parse(id);

  const datos = esquemaEdicionArquero.safeParse({
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
    notas: formData.get("notas") ?? "",
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

  await prisma.arquero.update({
    where: { id: idValido },
    data: {
      nombre: datos.data.nombre,
      apellido: datos.data.apellido,
      email: datos.data.email,
      telefono: datos.data.telefono || null,
      federacion: datos.data.federacion,
      fechaNacimiento: new Date(datos.data.fechaNacimiento),
      genero: datos.data.genero,
      division: datos.data.division,
      estilo: datos.data.estilo,
      banquete: datos.data.banquete,
      notas: datos.data.notas || null,
    },
  });

  revalidatePath("/admin/arqueros");
  revalidatePath("/admin");
  redirect("/admin/arqueros");
}

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requiereRol } from "@/lib/permisos";

const esquemaId = z.string().min(1);

export async function eliminarArquero(id: string) {
  await requiereRol("ADMIN");

  const idValido = esquemaId.parse(id);
  await prisma.arquero.delete({ where: { id: idValido } });

  revalidatePath("/admin/arqueros");
  revalidatePath("/admin");
}

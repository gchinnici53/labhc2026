import type { Rol } from "@prisma/client";
import { auth } from "@/lib/auth";

const JERARQUIA: Record<Rol, number> = {
  INVITADO: 0,
  CARGA: 1,
  ADMIN: 2,
};

// Usar al principio de cada Server Action que mute datos. Tira si no hay
// sesion o si el rol no alcanza el minimo pedido.
export async function requiereRol(rolMinimo: Rol) {
  const sesion = await auth();
  if (!sesion?.user) {
    throw new Error("No autenticado");
  }
  if (JERARQUIA[sesion.user.rol] < JERARQUIA[rolMinimo]) {
    throw new Error("No autorizado");
  }
  return sesion.user;
}

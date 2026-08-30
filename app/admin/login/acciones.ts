"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "@/lib/auth";

const esquemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function iniciarSesion(
  _estadoPrevio: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const datos = esquemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!datos.success) {
    return "Email o contraseña inválidos.";
  }

  try {
    await signIn("credentials", {
      email: datos.data.email,
      password: datos.data.password,
      redirectTo: "/admin",
    });
    return undefined;
  } catch (error) {
    if (error instanceof AuthError) {
      return "Email o contraseña incorrectos.";
    }
    throw error;
  }
}

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";

const esquemaCredenciales = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credenciales) => {
        const datos = esquemaCredenciales.safeParse(credenciales);
        if (!datos.success) return null;

        const usuario = await prisma.usuario.findUnique({
          where: { email: datos.data.email },
        });
        if (!usuario || !usuario.activo) return null;

        const passwordValida = await bcrypt.compare(
          datos.data.password,
          usuario.passwordHash
        );
        if (!passwordValida) return null;

        return {
          id: usuario.id,
          email: usuario.email,
          name: usuario.nombre,
          rol: usuario.rol,
        };
      },
    }),
  ],
});

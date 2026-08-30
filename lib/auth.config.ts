import type { NextAuthConfig } from "next-auth";
import type { Rol } from "@prisma/client";

// Config "edge-safe": sin providers ni imports de Prisma/bcrypt, para poder
// usarse en el middleware. La config completa (con el provider de
// Credentials) vive en lib/auth.ts.
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.rol = token.rol as Rol;
      return session;
    },
  },
} satisfies NextAuthConfig;

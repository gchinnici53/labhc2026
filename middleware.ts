import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import type { NextMiddleware } from "next/server";
import { routing } from "./i18n/routing";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

// El wrapper auth(...) de NextAuth solo debe intervenir en /admin: cuando
// tambien envuelve las paginas publicas, su manejo de host/protocolo detras
// del proxy de nginx (AUTH_TRUST_HOST) choca con el middleware de next-intl
// y genera un loop de redirects infinito en cualquier ruta con pathname
// traducido (ej. /en/registered). Detectado en produccion el 2026-08-31.
const proteccionAdmin = auth((request) => {
  const { pathname } = request.nextUrl;
  const estaLogueado = !!request.auth?.user;
  const esLogin = pathname === "/admin/login";

  if (!estaLogueado && !esLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (estaLogueado && esLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}) as unknown as NextMiddleware; // auth() tipa esto como handler de ruta; en uso real es middleware.

const middleware: NextMiddleware = (request, event) => {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return proteccionAdmin(request, event);
  }
  return intlMiddleware(request);
};

export default middleware;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import type { NextMiddleware, NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

const RUTA_EN_CONSTRUCCION = "/en-construccion";
const COOKIE_ACCESO = "labhc_acceso";

// Gate temporal del sitio publico (no afecta /admin). Se activa con
// MODO_MANTENIMIENTO=true en el .env; MANTENIMIENTO_TOKEN es el secreto
// que hay que pasar como ?acceso=... una vez para desbloquear el sitio en
// ese navegador (queda una cookie por 90 dias, no hace falta repetirlo).
function resolverGateMantenimiento(request: NextRequest): NextResponse | null {
  if (process.env.MODO_MANTENIMIENTO !== "true") return null;
  if (request.nextUrl.pathname === RUTA_EN_CONSTRUCCION) return null;

  const token = request.nextUrl.searchParams.get("acceso");
  const tokenValido = process.env.MANTENIMIENTO_TOKEN;
  if (token && tokenValido && token === tokenValido) {
    const destino = new URL(request.nextUrl.pathname, request.url);
    request.nextUrl.searchParams.forEach((valor, clave) => {
      if (clave !== "acceso") destino.searchParams.set(clave, valor);
    });
    const respuesta = NextResponse.redirect(destino);
    respuesta.cookies.set(COOKIE_ACCESO, "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
    });
    return respuesta;
  }

  const tieneAcceso = request.cookies.get(COOKIE_ACCESO)?.value === "1";
  if (!tieneAcceso) {
    return NextResponse.rewrite(new URL(RUTA_EN_CONSTRUCCION, request.url));
  }

  return null;
}

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

  const bloqueo = resolverGateMantenimiento(request);
  if (bloqueo) return bloqueo;

  return intlMiddleware(request);
};

export default middleware;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

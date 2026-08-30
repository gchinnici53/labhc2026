import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const estaLogueado = !!request.auth?.user;
    const esLogin = pathname === "/admin/login";

    if (!estaLogueado && !esLogin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (estaLogueado && esLogin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

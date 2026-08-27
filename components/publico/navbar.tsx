"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";
import { Logo } from "@/components/ui/logo";
import { Boton } from "@/components/ui/boton";
import { SelectorIdioma } from "@/components/publico/selector-idioma";

const ENLACES: { href: Pathname; clave: string }[] = [
  { href: "/", clave: "inicio" },
  { href: "/acerca", clave: "acerca" },
  { href: "/competicion", clave: "competicion" },
  { href: "/resultados", clave: "resultados" },
  { href: "/registrados", clave: "registrados" },
  { href: "/alojamiento", clave: "alojamiento" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primario-oscuro/10 bg-fondo/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0">
          <Logo className="h-32 w-32" />
        </Link>

        <nav className="hidden items-center gap-6 font-sans text-sm font-semibold uppercase tracking-wide lg:flex">
          {ENLACES.map((enlace) => {
            const activo = pathname === enlace.href;
            return (
              <Link
                key={enlace.href}
                href={enlace.href}
                aria-current={activo ? "page" : undefined}
                className={
                  activo
                    ? "text-acento"
                    : "text-primario transition-colors hover:text-acento"
                }
              >
                {t(enlace.clave)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <SelectorIdioma />
          <Boton href="/inscripcion">{t("inscripcion")}</Boton>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Boton href="/inscripcion" className="px-4 py-2 text-xs">
            {t("inscripcion")}
          </Boton>
          <button
            type="button"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? t("cerrarMenu") : t("abrirMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-md text-primario"
          >
            <span className="sr-only">
              {menuAbierto ? t("cerrarMenu") : t("abrirMenu")}
            </span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              {menuAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav className="flex flex-col gap-1 border-t border-primario-oscuro/10 bg-fondo px-4 py-4 font-sans text-sm font-semibold uppercase tracking-wide lg:hidden">
          {ENLACES.map((enlace) => {
            const activo = pathname === enlace.href;
            return (
              <Link
                key={enlace.href}
                href={enlace.href}
                aria-current={activo ? "page" : undefined}
                onClick={() => setMenuAbierto(false)}
                className={
                  activo
                    ? "rounded-md px-3 py-2 text-acento"
                    : "rounded-md px-3 py-2 text-primario hover:bg-primario/5"
                }
              >
                {t(enlace.clave)}
              </Link>
            );
          })}
          <div className="mt-2 px-3">
            <SelectorIdioma />
          </div>
        </nav>
      )}
    </header>
  );
}

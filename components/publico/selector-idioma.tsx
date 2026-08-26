"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function SelectorIdioma() {
  const pathname = usePathname();
  const localeActual = useLocale();

  return (
    <div className="flex items-center gap-1 font-sans text-sm font-semibold">
      {routing.locales.map((locale, indice) => (
        <span key={locale} className="flex items-center gap-1">
          {indice > 0 && <span className="text-primario-claro">|</span>}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === localeActual ? "page" : undefined}
            className={
              locale === localeActual
                ? "text-acento"
                : "text-primario hover:text-acento"
            }
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}

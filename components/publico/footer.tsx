import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";
import { Logo } from "@/components/ui/logo";

const ENLACES: { href: Pathname; clave: string }[] = [
  { href: "/", clave: "inicio" },
  { href: "/acerca", clave: "acerca" },
  { href: "/competicion", clave: "competicion" },
  { href: "/resultados", clave: "resultados" },
  { href: "/registrados", clave: "registrados" },
  { href: "/alojamiento", clave: "alojamiento" },
  { href: "/inscripcion", clave: "inscripcion" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-primario-oscuro/10 bg-primario text-fondo">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Logo className="h-32 w-32" />
          <p className="text-sm text-fondo/80">{t("descripcion")}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-display text-lg uppercase tracking-wide text-acento">
            {t("columnaSitio")}
          </h2>
          <ul className="flex flex-col gap-1 text-sm text-fondo/80">
            {ENLACES.map((enlace) => (
              <li key={enlace.href}>
                <Link href={enlace.href} className="hover:text-fondo">
                  {tNav(enlace.clave)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-display text-lg uppercase tracking-wide text-acento">
            {t("columnaContacto")}
          </h2>
          <ul className="flex flex-col gap-1 text-sm text-fondo/80">
            <li className="italic">{t("emailPlaceholder")}</li>
            <li className="italic">{t("redesPlaceholder")}</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-display text-lg uppercase tracking-wide text-acento">
            {t("columnaSede")}
          </h2>
          <ul className="flex flex-col gap-1 text-sm text-fondo/80">
            <li>{t("sede")}</li>
            <li>{t("fechas")}</li>
            <li>{t("organizadores")}</li>
            <li>{t("avalan")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-fondo/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-fondo/60">
          © {anioActual} {t("copyright")}
        </p>
      </div>
    </footer>
  );
}

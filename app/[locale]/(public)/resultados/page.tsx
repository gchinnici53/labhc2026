import { useTranslations } from "next-intl";
import { CuentaRegresiva } from "@/components/publico/cuenta-regresiva";
import { Boton } from "@/components/ui/boton";

export default function PaginaResultados() {
  const tPagina = useTranslations("paginas.resultados");
  const t = useTranslations("resultados");
  const tNav = useTranslations("nav");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-4xl uppercase tracking-wide text-primario sm:text-5xl">
        {tPagina("titulo")}
      </h1>
      <p className="mt-4 text-texto/70">{t("enConstruccion")}</p>

      <CuentaRegresiva />

      <Boton href="/inscripcion">{tNav("inscripcion")}</Boton>
    </div>
  );
}

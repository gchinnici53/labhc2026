import { useTranslations } from "next-intl";

export default function PaginaReglamento() {
  const tPagina = useTranslations("paginas.reglamento");
  const t = useTranslations("reglamento");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-4xl uppercase tracking-wide text-primario sm:text-5xl">
        {tPagina("titulo")}
      </h1>
      <p className="mt-4 italic text-texto/70">{t("texto")}</p>
    </div>
  );
}

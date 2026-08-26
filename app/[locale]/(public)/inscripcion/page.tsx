import { useTranslations } from "next-intl";

export default function PaginaInscripcion() {
  const t = useTranslations("paginas.inscripcion");

  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="font-display text-4xl uppercase tracking-wide text-primario sm:text-6xl">
        {t("titulo")}
      </h1>
    </div>
  );
}

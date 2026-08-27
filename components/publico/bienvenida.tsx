import { useTranslations } from "next-intl";

export function Bienvenida() {
  const t = useTranslations("home.bienvenida");

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="font-display text-3xl uppercase tracking-wide text-primario">
        {t("titulo")}
      </h2>
      <p className="mt-4 italic text-texto/70">{t("texto")}</p>
    </section>
  );
}

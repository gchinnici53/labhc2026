import { useTranslations } from "next-intl";

export function Bienvenida() {
  const t = useTranslations("home.bienvenida");
  const parrafos = t.raw("parrafos") as string[];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-center font-display text-3xl uppercase tracking-wide text-primario">
        {t("titulo")}
      </h2>
      <div className="mt-6 flex flex-col gap-4 text-texto/80">
        {parrafos.map((parrafo) => (
          <p key={parrafo.slice(0, 40)}>{parrafo}</p>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PaginaAcerca() {
  const tPagina = useTranslations("paginas.acerca");
  const t = useTranslations("acerca");

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-center font-display text-4xl uppercase tracking-wide text-primario sm:text-5xl">
        {tPagina("titulo")}
      </h1>

      <section className="mt-16 grid items-center gap-8 sm:grid-cols-2">
        <div className="flex items-center justify-center gap-4 rounded-lg border border-primario/10 bg-white p-8">
          <Image src="/logos/flechar.png" alt="Flechar" width={120} height={157} className="h-32 w-auto object-contain" />
          <Image src="/logos/liga3d.png" alt="Liga 3D Metropolitana" width={140} height={140} className="h-32 w-auto object-contain" />
        </div>
        <div>
          <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
            {t("bloque1.titulo")}
          </h2>
          <p className="mt-3 italic text-texto/70">{t("bloque1.texto")}</p>
        </div>
      </section>

      <section className="mt-16 grid items-center gap-8 sm:grid-cols-2">
        <div className="order-last sm:order-first">
          <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
            {t("bloque2.titulo")}
          </h2>
          <p className="mt-3 italic text-texto/70">{t("bloque2.texto")}</p>
        </div>
        <div className="flex items-center justify-center rounded-lg border border-primario/10 bg-white p-8">
          <Image src="/logos/ifaa.png" alt="IFAA" width={140} height={222} className="h-32 w-auto object-contain" />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-2xl text-center">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {t("bloque3.titulo")}
        </h2>
        <p className="mt-3 italic text-texto/70">{t("bloque3.texto")}</p>
      </section>
    </div>
  );
}

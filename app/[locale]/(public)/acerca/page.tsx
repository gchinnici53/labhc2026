import Image from "next/image";
import { useTranslations } from "next-intl";

type Organizador = { nombre: string; bio: string };

export default function PaginaAcerca() {
  const tPagina = useTranslations("paginas.acerca");
  const t = useTranslations("acerca");
  const parrafosBloque1 = t.raw("bloque1.parrafos") as string[];
  const parrafosBloque2 = t.raw("bloque2.parrafos") as string[];
  const comite = t.raw("bloque3.comite") as Organizador[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-center font-display text-4xl uppercase tracking-wide text-primario sm:text-5xl">
        {tPagina("titulo")}
      </h1>

      <section className="mt-16">
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg border border-primario/10 bg-white p-6">
          <Image src="/logos/flechar.png" alt="Flechar" width={120} height={157} className="h-20 w-auto object-contain" />
          <Image src="/logos/liga3d.png" alt="Liga 3D Metropolitana" width={140} height={140} className="h-20 w-auto object-contain" />
        </div>
        <h2 className="mt-8 text-center font-display text-2xl uppercase tracking-wide text-primario">
          {t("bloque1.titulo")}
        </h2>
        <div className="mx-auto mt-4 flex max-w-2xl flex-col gap-4 text-texto/80">
          {parrafosBloque1.map((parrafo) => (
            <p key={parrafo.slice(0, 40)}>{parrafo}</p>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-center rounded-lg border border-primario/10 bg-white p-6">
          <Image src="/logos/ifaa.png" alt="IFAA" width={140} height={222} className="h-20 w-auto object-contain" />
        </div>
        <h2 className="mt-8 text-center font-display text-2xl uppercase tracking-wide text-primario">
          {t("bloque2.titulo")}
        </h2>
        <div className="mx-auto mt-4 flex max-w-2xl flex-col gap-4 text-texto/80">
          {parrafosBloque2.map((parrafo) => (
            <p key={parrafo.slice(0, 40)}>{parrafo}</p>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center font-display text-2xl uppercase tracking-wide text-primario">
          {t("bloque3.titulo")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-texto/80">
          {t("bloque3.intro")}
        </p>
        <div className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-2">
          {comite.map((persona) => (
            <div
              key={persona.nombre}
              className="rounded-lg border border-primario/10 p-6"
            >
              <h3 className="font-display text-lg uppercase tracking-wide text-primario">
                {persona.nombre}
              </h3>
              <p className="mt-2 text-sm text-texto/80">{persona.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

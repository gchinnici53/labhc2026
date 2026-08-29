import Image from "next/image";
import { useTranslations } from "next-intl";

// Arrays temporales: en la Etapa 5 esto pasa a la tabla Sponsor (ordenada por
// nivel y orden).
const PARTNERS = [
  { nombre: "AATA", archivo: "AATA.png" },
  { nombre: "IFAA Family of Archers", archivo: "family.png" },
  { nombre: "IFAA", archivo: "ifaa.png" },
  { nombre: "TAFISA", archivo: "tafisa.png" },
  { nombre: "Flechar", archivo: "flechar.png" },
  { nombre: "Liga 3D Metropolitana", archivo: "liga3d.png" },
];

const AUSPICIANTES = [
  { nombre: "Zona Vital", archivo: "zonavital.png" },
  { nombre: "Panda Troupe", archivo: "panda.png" },
];

function GrillaLogos({ items }: { items: { nombre: string; archivo: string }[] }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
      {items.map((item) => (
        <div
          key={item.nombre}
          className="flex h-28 w-40 items-center justify-center rounded-md border border-primario/10 bg-white p-4 grayscale transition hover:grayscale-0"
        >
          <Image
            src={`/logos/${item.archivo}`}
            alt={item.nombre}
            width={200}
            height={200}
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function Partners() {
  const t = useTranslations("home.partners");

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-center font-display text-3xl uppercase tracking-wide text-primario">
        {t("tituloPartners")}
      </h2>
      <GrillaLogos items={PARTNERS} />

      <h2 className="mt-16 text-center font-display text-3xl uppercase tracking-wide text-primario">
        {t("tituloAuspiciantes")}
      </h2>
      <GrillaLogos items={AUSPICIANTES} />
    </section>
  );
}

import Image from "next/image";
import { useTranslations } from "next-intl";

// Array temporal: en la Etapa 5 esto pasa a la tabla Sponsor (ordenada por
// nivel y orden).
const PARTNERS = [
  { nombre: "IFAA", archivo: "ifaa.png" },
  { nombre: "TAFISA", archivo: "tafisa.png" },
  { nombre: "Zona Vital", archivo: "zonavital.png" },
];

export function Partners() {
  const t = useTranslations("home.partners");

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-center font-display text-3xl uppercase tracking-wide text-primario">
        {t("titulo")}
      </h2>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        {PARTNERS.map((partner) => (
          <div
            key={partner.nombre}
            className="flex h-28 w-40 items-center justify-center rounded-md border border-primario/10 bg-white p-4 grayscale transition hover:grayscale-0"
          >
            <Image
              src={`/logos/${partner.archivo}`}
              alt={partner.nombre}
              width={200}
              height={200}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

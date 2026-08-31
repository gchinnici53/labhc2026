import Image from "next/image";
import { useTranslations } from "next-intl";

// Arrays temporales: en la Etapa 5 esto pasa a la tabla Sponsor (ordenada por
// nivel y orden).
// Orden pedido por la organizacion: fila 1 IFAA/Family/TAFISA, fila 2
// AATA/Flechar/CAI (ver GrillaLogos, que fuerza 3 columnas desde sm).
const PARTNERS = [
  { nombre: "IFAA", archivo: "ifaa.png" },
  { nombre: "IFAA Family of Archers", archivo: "family.png" },
  { nombre: "TAFISA", archivo: "tafisa.png" },
  { nombre: "AATA", archivo: "AATA.png" },
  { nombre: "Flechar", archivo: "flechar.png" },
  { nombre: "Club Atlético Independiente", archivo: "cai.png" },
];

const AUSPICIANTES = [
  { nombre: "Liga 3D Metropolitana", archivo: "liga3d.png" },
  { nombre: "Zona Vital", archivo: "zonavital.png" },
  { nombre: "Panda Troupe", archivo: "panda.png" },
];

function GrillaLogos({ items }: { items: { nombre: string; archivo: string }[] }) {
  return (
    <div className="mt-8 grid grid-cols-2 place-items-center gap-8 sm:grid-cols-3">
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

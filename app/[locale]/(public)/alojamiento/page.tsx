import { useTranslations } from "next-intl";
import { TarjetaAlojamiento } from "@/components/publico/tarjeta-alojamiento";

type OpcionAlojamiento = { nombre: string; descripcion: string };

export default function PaginaAlojamiento() {
  const tPagina = useTranslations("paginas.alojamiento");
  const t = useTranslations("alojamiento");
  const opciones = t.raw("opciones") as OpcionAlojamiento[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-center font-display text-4xl uppercase tracking-wide text-primario sm:text-5xl">
        {tPagina("titulo")}
      </h1>
      <p className="mt-3 text-center text-sm italic text-texto/60">
        {t("avisoEjemplo")}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {opciones.map((opcion) => (
          <TarjetaAlojamiento
            key={opcion.nombre}
            nombre={opcion.nombre}
            descripcion={opcion.descripcion}
          />
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {t("transfer.titulo")}
        </h2>
        <p className="mt-3 italic text-texto/70">{t("transfer.texto")}</p>
      </section>
    </div>
  );
}

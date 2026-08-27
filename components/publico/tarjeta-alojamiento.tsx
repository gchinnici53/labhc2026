import { useTranslations } from "next-intl";

export function TarjetaAlojamiento({
  nombre,
  descripcion,
}: {
  nombre: string;
  descripcion: string;
}) {
  const t = useTranslations("alojamiento");

  return (
    <article className="overflow-hidden rounded-lg border border-primario/10 bg-white shadow-sm">
      <div className="flex h-40 items-center justify-center bg-primario-oscuro text-sm italic text-fondo/50">
        {t("imagenPlaceholder")}
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-display text-xl uppercase tracking-wide text-primario">
          {nombre}
        </h3>
        <p className="text-sm text-texto/80">{descripcion}</p>
        <div className="mt-2 flex flex-col gap-1 text-sm text-texto/60">
          <span>{t("precioPlaceholder")}</span>
          <span>{t("distanciaPlaceholder")}</span>
        </div>
      </div>
    </article>
  );
}

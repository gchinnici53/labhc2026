import { getTranslations } from "next-intl/server";
import { FormularioInscripcion } from "@/components/publico/formulario-inscripcion";
import { prisma } from "@/lib/prisma";

// Lee Configuracion en cada request: si quedara estatica, el toggle de
// inscripcion_abierta se congelaria en el momento del build.
export const dynamic = "force-dynamic";

export default async function PaginaInscripcion() {
  const tPagina = await getTranslations("paginas.inscripcion");
  const t = await getTranslations("inscripcion");

  const config = await prisma.configuracion.findUnique({
    where: { clave: "inscripcion_abierta" },
  });
  const abierta = config?.valor !== "false";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-center font-display text-4xl uppercase tracking-wide text-primario sm:text-5xl">
        {tPagina("titulo")}
      </h1>

      <div className="mt-12">
        {abierta ? (
          <FormularioInscripcion />
        ) : (
          <p className="text-center text-texto/80">{t("cerrada")}</p>
        )}
      </div>
    </div>
  );
}

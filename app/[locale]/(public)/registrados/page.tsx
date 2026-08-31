import { getTranslations } from "next-intl/server";
import { TablaRegistrados } from "@/components/publico/tabla-registrados";
import { prisma } from "@/lib/prisma";
import { calcularCodigoArquero } from "@/lib/etiquetas";

// Pagina "en vivo": se lee directo de la base en cada request, sin cache
// estatica (ver notas de /inscripcion sobre por que hace falta esto).
export const dynamic = "force-dynamic";

export default async function PaginaRegistrados() {
  const t = await getTranslations("paginas.registrados");

  const arqueros = await prisma.arquero.findMany({
    where: { publicado: true },
    orderBy: { apellido: "asc" },
    select: {
      id: true,
      numeroRegistro: true,
      nombre: true,
      apellido: true,
      federacion: true,
      genero: true,
      estilo: true,
      division: true,
      pagado: true,
    },
  });

  const filas = arqueros.map((arquero) => ({
    id: arquero.id,
    numeroRegistro: arquero.numeroRegistro,
    nombre: arquero.nombre,
    apellido: arquero.apellido,
    federacion: arquero.federacion,
    genero: arquero.genero,
    estilo: arquero.estilo,
    codigoDivision: calcularCodigoArquero(arquero),
    pagado: arquero.pagado,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-center font-display text-4xl uppercase tracking-wide text-primario sm:text-5xl">
        {t("titulo")}
      </h1>

      <div className="mt-10">
        <TablaRegistrados filas={filas} />
      </div>
    </div>
  );
}

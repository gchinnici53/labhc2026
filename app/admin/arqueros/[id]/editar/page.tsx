import { notFound } from "next/navigation";
import { PanelAdmin } from "@/components/admin/panel-admin";
import { FormularioEdicionArquero } from "@/components/admin/formulario-edicion-arquero";
import { prisma } from "@/lib/prisma";

export default async function PaginaEditarArquero({
  params,
}: {
  params: { id: string };
}) {
  const arquero = await prisma.arquero.findUnique({ where: { id: params.id } });

  if (!arquero) {
    notFound();
  }

  return (
    <PanelAdmin>
      <h1 className="font-display text-2xl uppercase tracking-wide text-primario">
        Editar arquero
      </h1>
      <p className="mt-1 text-sm text-texto/60">
        N° de registro: {arquero.numeroRegistro ?? "—"}
      </p>

      <div className="mt-6 max-w-2xl">
        <FormularioEdicionArquero arquero={arquero} />
      </div>
    </PanelAdmin>
  );
}

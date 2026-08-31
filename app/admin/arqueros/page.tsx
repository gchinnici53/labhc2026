import Link from "next/link";
import { PanelAdmin } from "@/components/admin/panel-admin";
import { BotonEliminarArquero } from "@/components/admin/boton-eliminar-arquero";
import { CheckboxEditable } from "@/components/admin/checkbox-editable";
import { marcarBanquetePagado, marcarPagado } from "@/app/admin/arqueros/acciones";
import { prisma } from "@/lib/prisma";
import {
  calcularCodigoArquero,
  ETIQUETAS_DIVISION,
  ETIQUETAS_ESTILO,
  ETIQUETAS_GENERO,
} from "@/lib/etiquetas";

const ORDENES = ["apellido", "numeroRegistro"] as const;
type Orden = (typeof ORDENES)[number];

function esOrdenValido(valor: string | undefined): valor is Orden {
  return ORDENES.includes(valor as Orden);
}

export default async function PaginaArqueros({
  searchParams,
}: {
  searchParams: { orden?: string };
}) {
  const orden: Orden = esOrdenValido(searchParams.orden) ? searchParams.orden : "apellido";

  const arqueros = await prisma.arquero.findMany({
    orderBy:
      orden === "apellido" ? { apellido: "asc" } : { numeroRegistro: "asc" },
  });

  return (
    <PanelAdmin>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl uppercase tracking-wide text-primario">
          Inscriptos
        </h1>
        <div className="flex gap-4 text-sm font-semibold uppercase tracking-wide">
          <Link
            href="/admin/arqueros?orden=apellido"
            className={
              orden === "apellido" ? "text-acento" : "text-primario hover:text-acento"
            }
          >
            Ordenar por apellido
          </Link>
          <Link
            href="/admin/arqueros?orden=numeroRegistro"
            className={
              orden === "numeroRegistro"
                ? "text-acento"
                : "text-primario hover:text-acento"
            }
          >
            Ordenar por N° de registro
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-primario/10">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="bg-primario/5">
            <tr>
              <th className="px-3 py-2 font-semibold text-primario">N° Registro</th>
              <th className="px-3 py-2 font-semibold text-primario">Apellido</th>
              <th className="px-3 py-2 font-semibold text-primario">Nombre</th>
              <th className="px-3 py-2 font-semibold text-primario">Federación</th>
              <th className="px-3 py-2 font-semibold text-primario">Email</th>
              <th className="px-3 py-2 font-semibold text-primario">Género</th>
              <th className="px-3 py-2 font-semibold text-primario">Categoría</th>
              <th className="px-3 py-2 font-semibold text-primario">Estilo</th>
              <th className="px-3 py-2 font-semibold text-primario">División</th>
              <th className="px-3 py-2 font-semibold text-primario">Nac.</th>
              <th className="px-3 py-2 font-semibold text-primario">Pago</th>
              <th className="px-3 py-2 font-semibold text-primario">Pidió banquete</th>
              <th className="px-3 py-2 font-semibold text-primario">Banquete pagado</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {arqueros.map((arquero) => (
              <tr key={arquero.id} className="border-t border-primario/10">
                <td className="px-3 py-2 text-texto/80">
                  {arquero.numeroRegistro ?? "—"}
                </td>
                <td className="px-3 py-2 text-texto/80">{arquero.apellido}</td>
                <td className="px-3 py-2 text-texto/80">{arquero.nombre}</td>
                <td className="px-3 py-2 text-texto/80">{arquero.federacion}</td>
                <td className="px-3 py-2 text-texto/80">{arquero.email}</td>
                <td className="px-3 py-2 text-texto/80">
                  {ETIQUETAS_GENERO[arquero.genero]}
                </td>
                <td className="px-3 py-2 text-texto/80">
                  {ETIQUETAS_DIVISION[arquero.division]}
                </td>
                <td className="px-3 py-2 text-texto/80">
                  {ETIQUETAS_ESTILO[arquero.estilo]}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-semibold text-primario">
                  {calcularCodigoArquero(arquero)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-texto/80">
                  {arquero.fechaNacimiento.toLocaleDateString("es-AR", {
                    timeZone: "UTC",
                  })}
                </td>
                <td className="px-3 py-2">
                  <CheckboxEditable
                    id={arquero.id}
                    marcadoInicial={arquero.pagado}
                    accion={marcarPagado}
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  {arquero.banquete ? "✔" : "—"}
                </td>
                <td className="px-3 py-2">
                  <CheckboxEditable
                    id={arquero.id}
                    marcadoInicial={arquero.banquetePagado}
                    accion={marcarBanquetePagado}
                    deshabilitado={!arquero.banquete}
                  />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/arqueros/${arquero.id}/editar`}
                      title={`Editar a ${arquero.nombre} ${arquero.apellido}`}
                      aria-label={`Editar a ${arquero.nombre} ${arquero.apellido}`}
                      className="flex h-6 w-6 items-center justify-center rounded text-primario hover:bg-primario/10"
                    >
                      ✎
                    </Link>
                    <BotonEliminarArquero
                      id={arquero.id}
                      nombreCompleto={`${arquero.nombre} ${arquero.apellido}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {arqueros.length === 0 && (
              <tr>
                <td colSpan={14} className="px-3 py-6 text-center text-texto/60">
                  Todavía no hay arqueros inscriptos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PanelAdmin>
  );
}

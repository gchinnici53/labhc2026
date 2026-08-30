import { PanelAdmin } from "@/components/admin/panel-admin";
import { prisma } from "@/lib/prisma";

function Tarjeta({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div className="rounded-lg border border-primario/10 bg-white p-6">
      <p className="text-sm text-texto/60">{titulo}</p>
      <p className="mt-2 font-display text-3xl text-primario">{valor}</p>
    </div>
  );
}

export default async function PaginaDashboard() {
  const [totalArqueros, pagados, banquetesConfirmados, configs] = await Promise.all([
    prisma.arquero.count(),
    prisma.arquero.count({ where: { pagado: true } }),
    prisma.arquero.count({ where: { banquetePagado: true } }),
    prisma.configuracion.findMany({
      where: { clave: { in: ["precio_inscripcion", "precio_banquete"] } },
    }),
  ]);

  const precioInscripcion = Number(
    configs.find((c) => c.clave === "precio_inscripcion")?.valor ?? 0
  );
  const precioBanquete = Number(
    configs.find((c) => c.clave === "precio_banquete")?.valor ?? 0
  );

  const noPagados = totalArqueros - pagados;
  const recaudadoInscripcion = pagados * precioInscripcion;
  const faltaCobrarInscripcion = noPagados * precioInscripcion;
  const recaudadoBanquete = banquetesConfirmados * precioBanquete;

  const formatoUSD = (monto: number) =>
    monto.toLocaleString("es-AR", { style: "currency", currency: "USD" });

  return (
    <PanelAdmin>
      <h1 className="font-display text-2xl uppercase tracking-wide text-primario">
        Dashboard
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Tarjeta titulo="Arqueros inscriptos" valor={String(totalArqueros)} />
        <Tarjeta titulo="Inscripciones pagadas" valor={String(pagados)} />
        <Tarjeta titulo="Inscripciones sin pagar" valor={String(noPagados)} />
        <Tarjeta
          titulo="Recaudado por inscripción"
          valor={formatoUSD(recaudadoInscripcion)}
        />
        <Tarjeta
          titulo="Falta cobrar de inscripción"
          valor={formatoUSD(faltaCobrarInscripcion)}
        />
        <Tarjeta titulo="Banquetes confirmados" valor={String(banquetesConfirmados)} />
        <Tarjeta titulo="Recaudado por banquete" valor={formatoUSD(recaudadoBanquete)} />
      </div>
    </PanelAdmin>
  );
}

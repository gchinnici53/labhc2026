import { useTranslations } from "next-intl";
import { ProgramaCompeticion } from "@/components/publico/programa-competicion";

// Precios temporales: pasan a la tabla Configuracion en la Etapa 4/5.
const PRECIO_INSCRIPCION_USD = 150;
const PRECIO_BANQUETE_USD = 40;

export default function PaginaCompeticion() {
  const tPagina = useTranslations("paginas.competicion");
  const tDatos = useTranslations("competicion.datos");
  const tPrograma = useTranslations("competicion.programa");
  const tUbicacion = useTranslations("competicion.ubicacion");
  const tPrecios = useTranslations("competicion.precios");
  const tPago = useTranslations("competicion.formasDePago");
  const tFooter = useTranslations("footer");

  // Sin direccion postal exacta todavia (ver docs/04-PENDIENTES.md): se usa
  // el nombre del predio (ya cargado en footer.sede) como consulta del mapa,
  // sin inventar una direccion.
  const sede = tFooter("sede");
  const urlMapa = `https://www.google.com/maps?q=${encodeURIComponent(sede)}&output=embed`;
  const urlComoLlegar = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(sede)}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-center font-display text-4xl uppercase tracking-wide text-primario sm:text-5xl">
        {tPagina("titulo")}
      </h1>

      {/* Datos del torneo */}
      <section className="mt-16">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {tDatos("titulo")}
        </h2>
        <dl className="mt-4 divide-y divide-primario/10 rounded-lg border border-primario/10">
          <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4 sm:gap-y-0">
            <dt className="font-semibold text-primario">{tDatos("nombre")}</dt>
            <dd className="sm:col-span-2 text-texto/80">{tDatos("nombreValor")}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4 sm:gap-y-0">
            <dt className="font-semibold text-primario">{tDatos("fecha")}</dt>
            <dd className="sm:col-span-2 text-texto/80">{tDatos("fechaValor")}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4 sm:gap-y-0">
            <dt className="font-semibold text-primario">{tDatos("lugar")}</dt>
            <dd className="sm:col-span-2 text-texto/80">{sede}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4 sm:gap-y-0">
            <dt className="font-semibold text-primario">{tDatos("organizacion")}</dt>
            <dd className="sm:col-span-2 italic text-texto/70">{tDatos("organizacionValor")}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4 sm:gap-y-0">
            <dt className="font-semibold text-primario">{tDatos("reglamento")}</dt>
            <dd className="sm:col-span-2 text-texto/80">{tDatos("reglamentoValor")}</dd>
          </div>
        </dl>
      </section>

      {/* Programa */}
      <section className="mt-16">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {tPrograma("titulo")}
        </h2>
        <ProgramaCompeticion />
      </section>

      {/* Ubicación */}
      <section className="mt-16">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {tUbicacion("titulo")}
        </h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-primario/10">
          <iframe
            src={urlMapa}
            loading="lazy"
            title={tUbicacion("titulo")}
            className="h-80 w-full"
          />
        </div>
        <a
          href={urlComoLlegar}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-acento px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-acento-oscuro"
        >
          {tUbicacion("comoLlegar")}
        </a>
      </section>

      {/* Precios */}
      <section className="mt-16">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {tPrecios("titulo")}
        </h2>
        <dl className="mt-4 divide-y divide-primario/10 rounded-lg border border-primario/10">
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-texto/80">{tPrecios("inscripcion")}</dt>
            <dd className="font-display text-lg text-primario">USD {PRECIO_INSCRIPCION_USD}</dd>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-texto/80">{tPrecios("banquete")}</dt>
            <dd className="font-display text-lg text-primario">USD {PRECIO_BANQUETE_USD}</dd>
          </div>
        </dl>
      </section>

      {/* Formas de pago */}
      <section className="mt-16">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {tPago("titulo")}
        </h2>
        <p className="mt-3 italic text-texto/70">{tPago("texto")}</p>
      </section>
    </div>
  );
}

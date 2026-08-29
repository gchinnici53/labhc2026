import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TablaReglamento } from "@/components/publico/tabla-reglamento";

type Tabla = { encabezados: string[]; filas: string[][] };
type SubRonda = { titulo: string; texto: string };
type EstiloItem = { sigla: string; nombre: string; texto: string };
type Grupo = { titulo: string; items: string[] };
type LinkInfo = { texto: string; url?: string };

type Secciones = {
  s1: { titulo: string; intro: string; tabla: Tabla; resumen: string };
  s2: { titulo: string; intro: string; rondas: string[]; sub: SubRonda[]; cierre: string };
  s3: { titulo: string; intro: string; intro2: string; tabla: Tabla; notas: string[] };
  s4: {
    titulo: string;
    intro: string;
    intro2: string;
    standardHunter: { titulo: string; texto: string; tabla: Tabla; cierre: string };
    animalRound: { titulo: string; texto: string; tabla: Tabla; cierre: string };
    reglasGenerales: { titulo: string; items: string[] };
  };
  s5: {
    titulo: string;
    intro: string;
    sinVisor: { titulo: string; items: EstiloItem[] };
    conVisor: { titulo: string; items: EstiloItem[] };
    cierre: string;
  };
  s6: { titulo: string; intro: string; items: string[] };
  s7: { titulo: string; intro: string; items: string[] };
  s8: { titulo: string; intro: string; grupos: Grupo[]; cierre: string };
  s9: { titulo: string; intro: string; grupos: Grupo[] };
  s10: { titulo: string; intro: string; items: string[]; cierre: string };
  s11: {
    titulo: string;
    intro: string;
    links: { bookOfRules: LinkInfo; sitioOficial: LinkInfo; competicion: LinkInfo };
  };
};

function ListaEstilos({ items }: { items: EstiloItem[] }) {
  return (
    <ul className="mt-3 flex flex-col gap-2 text-texto/80">
      {items.map((item) => (
        <li key={item.sigla}>
          <span className="font-semibold text-primario">
            {item.nombre} ({item.sigla}):
          </span>{" "}
          {item.texto}
        </li>
      ))}
    </ul>
  );
}

function ListaGrupos({ grupos }: { grupos: Grupo[] }) {
  return (
    <div className="mt-4 flex flex-col gap-6">
      {grupos.map((grupo) => (
        <div key={grupo.titulo}>
          <h3 className="font-display text-lg uppercase tracking-wide text-primario">
            {grupo.titulo}
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-texto/80">
            {grupo.items.map((item) => (
              <li key={item.slice(0, 40)}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function PaginaReglamento() {
  const tPagina = useTranslations("paginas.reglamento");
  const t = useTranslations("reglamento");
  const intro = t.raw("intro") as string[];
  const indice = t.raw("indice") as string[];
  const s = t.raw("secciones") as Secciones;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-center font-display text-4xl uppercase tracking-wide text-primario sm:text-5xl">
        {tPagina("titulo")}
      </h1>

      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 text-texto/80">
        {intro.map((parrafo) => (
          <p key={parrafo.slice(0, 40)}>{parrafo}</p>
        ))}
      </div>

      <nav className="mx-auto mt-8 max-w-2xl rounded-lg border border-primario/10 bg-primario/5 p-6">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-primario">
          {indice.map((item, indiceItem) => (
            <li key={item}>
              <a href={`#seccion-${indiceItem + 1}`} className="hover:text-acento">
                {item}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="seccion-1" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s1.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s1.intro}</p>
        <TablaReglamento encabezados={s.s1.tabla.encabezados} filas={s.s1.tabla.filas} />
        <p className="mt-4 text-texto/80">{s.s1.resumen}</p>
      </section>

      <section id="seccion-2" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s2.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s2.intro}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-texto/80">
          {s.s2.rondas.map((ronda) => (
            <li key={ronda}>{ronda}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-6">
          {s.s2.sub.map((sub) => (
            <div key={sub.titulo}>
              <h3 className="font-display text-lg uppercase tracking-wide text-primario">
                {sub.titulo}
              </h3>
              <p className="mt-2 text-texto/80">{sub.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-texto/80">{s.s2.cierre}</p>
      </section>

      <section id="seccion-3" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s3.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s3.intro}</p>
        <p className="mt-3 text-texto/80">{s.s3.intro2}</p>
        <TablaReglamento encabezados={s.s3.tabla.encabezados} filas={s.s3.tabla.filas} />
        <ul className="mt-4 list-disc space-y-1 pl-5 text-texto/80">
          {s.s3.notas.map((nota) => (
            <li key={nota.slice(0, 40)}>{nota}</li>
          ))}
        </ul>
      </section>

      <section id="seccion-4" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s4.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s4.intro}</p>
        <p className="mt-3 text-texto/80">{s.s4.intro2}</p>

        <h3 className="mt-6 font-display text-lg uppercase tracking-wide text-primario">
          {s.s4.standardHunter.titulo}
        </h3>
        <p className="mt-2 text-texto/80">{s.s4.standardHunter.texto}</p>
        <TablaReglamento
          encabezados={s.s4.standardHunter.tabla.encabezados}
          filas={s.s4.standardHunter.tabla.filas}
        />
        <p className="mt-3 text-texto/80">{s.s4.standardHunter.cierre}</p>

        <h3 className="mt-8 font-display text-lg uppercase tracking-wide text-primario">
          {s.s4.animalRound.titulo}
        </h3>
        <p className="mt-2 text-texto/80">{s.s4.animalRound.texto}</p>
        <TablaReglamento
          encabezados={s.s4.animalRound.tabla.encabezados}
          filas={s.s4.animalRound.tabla.filas}
        />
        <p className="mt-3 text-texto/80">{s.s4.animalRound.cierre}</p>

        <h3 className="mt-8 font-display text-lg uppercase tracking-wide text-primario">
          {s.s4.reglasGenerales.titulo}
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-texto/80">
          {s.s4.reglasGenerales.items.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="seccion-5" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s5.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s5.intro}</p>

        <h3 className="mt-6 font-display text-lg uppercase tracking-wide text-primario">
          {s.s5.sinVisor.titulo}
        </h3>
        <ListaEstilos items={s.s5.sinVisor.items} />

        <h3 className="mt-6 font-display text-lg uppercase tracking-wide text-primario">
          {s.s5.conVisor.titulo}
        </h3>
        <ListaEstilos items={s.s5.conVisor.items} />

        <p className="mt-4 text-texto/80">{s.s5.cierre}</p>
      </section>

      <section id="seccion-6" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s6.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s6.intro}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-texto/80">
          {s.s6.items.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="seccion-7" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s7.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s7.intro}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-texto/80">
          {s.s7.items.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="seccion-8" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s8.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s8.intro}</p>
        <ListaGrupos grupos={s.s8.grupos} />
        <p className="mt-4 text-texto/80">{s.s8.cierre}</p>
      </section>

      <section id="seccion-9" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s9.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s9.intro}</p>
        <ListaGrupos grupos={s.s9.grupos} />
      </section>

      <section id="seccion-10" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s10.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s10.intro}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-texto/80">
          {s.s10.items.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-texto/80">{s.s10.cierre}</p>
      </section>

      <section id="seccion-11" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {s.s11.titulo}
        </h2>
        <p className="mt-3 text-texto/80">{s.s11.intro}</p>
        <ul className="mt-4 flex flex-col gap-2">
          <li>
            <a
              href={s.s11.links.bookOfRules.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-acento hover:underline"
            >
              {s.s11.links.bookOfRules.texto}
            </a>
          </li>
          <li>
            <a
              href={s.s11.links.sitioOficial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-acento hover:underline"
            >
              {s.s11.links.sitioOficial.texto}
            </a>
          </li>
          <li>
            <Link href="/competicion" className="font-semibold text-acento hover:underline">
              {s.s11.links.competicion.texto}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

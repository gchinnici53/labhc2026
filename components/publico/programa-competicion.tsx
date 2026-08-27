"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Evento = { hora: string; actividad: string };
type DiaPrograma = { titulo: string; eventos: Evento[] };

export function ProgramaCompeticion() {
  const t = useTranslations("competicion.programa");
  const dias = t.raw("dias") as DiaPrograma[];
  const [diaAbierto, setDiaAbierto] = useState(0);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {dias.map((dia, indice) => {
        const abierto = indice === diaAbierto;
        return (
          <div
            key={dia.titulo}
            className="overflow-hidden rounded-lg border border-primario/10"
          >
            <button
              type="button"
              onClick={() => setDiaAbierto(abierto ? -1 : indice)}
              aria-expanded={abierto}
              className="flex w-full items-center justify-between bg-primario/5 px-4 py-3 text-left font-sans text-sm font-semibold uppercase tracking-wide text-primario"
            >
              {dia.titulo}
              <span aria-hidden className={`transition-transform ${abierto ? "rotate-180" : ""}`}>
                ▾
              </span>
            </button>

            {abierto && (
              <table className="w-full text-left text-sm">
                <tbody>
                  {dia.eventos.map((evento) => (
                    <tr key={evento.hora + evento.actividad} className="border-t border-primario/10">
                      <td className="whitespace-nowrap px-4 py-2 font-semibold text-primario">
                        {evento.hora}
                      </td>
                      <td className="px-4 py-2 text-texto/80">{evento.actividad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}

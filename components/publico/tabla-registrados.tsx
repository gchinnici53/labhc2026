"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Estilo, Genero } from "@prisma/client";

type FilaRegistrado = {
  id: string;
  numeroRegistro: string | null;
  nombre: string;
  apellido: string;
  federacion: string;
  genero: Genero;
  estilo: Estilo;
  codigoDivision: string;
  pagado: boolean;
};

const CLASE_SELECT =
  "rounded-md border border-primario/20 bg-white px-3 py-2 text-sm text-texto";

function valoresUnicos<T extends string>(valores: T[]): T[] {
  return Array.from(new Set(valores)).sort((a, b) => a.localeCompare(b));
}

export function TablaRegistrados({ filas }: { filas: FilaRegistrado[] }) {
  const t = useTranslations("registrados");
  const tInscripcion = useTranslations("inscripcion");

  const [busqueda, setBusqueda] = useState("");
  const [federacion, setFederacion] = useState("");
  const [genero, setGenero] = useState("");
  const [estilo, setEstilo] = useState("");
  const [division, setDivision] = useState("");

  const federaciones = useMemo(() => valoresUnicos(filas.map((f) => f.federacion)), [filas]);
  const generos = useMemo(() => valoresUnicos(filas.map((f) => f.genero)), [filas]);
  const estilos = useMemo(() => valoresUnicos(filas.map((f) => f.estilo)), [filas]);
  const divisiones = useMemo(
    () => valoresUnicos(filas.map((f) => f.codigoDivision)),
    [filas]
  );

  const filasFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return filas.filter((fila) => {
      if (federacion && fila.federacion !== federacion) return false;
      if (genero && fila.genero !== genero) return false;
      if (estilo && fila.estilo !== estilo) return false;
      if (division && fila.codigoDivision !== division) return false;
      if (!termino) return true;
      const nombreCompleto = `${fila.nombre} ${fila.apellido}`.toLowerCase();
      return (
        nombreCompleto.includes(termino) ||
        (fila.numeroRegistro?.toLowerCase().includes(termino) ?? false)
      );
    });
  }, [filas, busqueda, federacion, genero, estilo, division]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <input
          type="search"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          placeholder={t("buscador")}
          className="w-full rounded-md border border-primario/20 px-3 py-2 text-sm"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={federacion}
            onChange={(evento) => setFederacion(evento.target.value)}
            className={CLASE_SELECT}
          >
            <option value="">{t("filtros.federacion")}: {t("filtros.todos")}</option>
            {federaciones.map((valor) => (
              <option key={valor} value={valor}>
                {valor}
              </option>
            ))}
          </select>

          <select
            value={genero}
            onChange={(evento) => setGenero(evento.target.value)}
            className={CLASE_SELECT}
          >
            <option value="">{t("filtros.genero")}: {t("filtros.todos")}</option>
            {generos.map((valor) => (
              <option key={valor} value={valor}>
                {tInscripcion(`generoOpciones.${valor}`)}
              </option>
            ))}
          </select>

          <select
            value={estilo}
            onChange={(evento) => setEstilo(evento.target.value)}
            className={CLASE_SELECT}
          >
            <option value="">{t("filtros.estilo")}: {t("filtros.todos")}</option>
            {estilos.map((valor) => (
              <option key={valor} value={valor}>
                {tInscripcion(`estiloOpciones.${valor}`)}
              </option>
            ))}
          </select>

          <select
            value={division}
            onChange={(evento) => setDivision(evento.target.value)}
            className={CLASE_SELECT}
          >
            <option value="">{t("filtros.division")}: {t("filtros.todos")}</option>
            {divisiones.map((valor) => (
              <option key={valor} value={valor}>
                {valor}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-primario/10">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-primario/5">
            <tr>
              <th className="px-3 py-2 font-semibold text-primario">
                {t("columnas.numeroRegistro")}
              </th>
              <th className="px-3 py-2 font-semibold text-primario">
                {t("columnas.apellido")}
              </th>
              <th className="px-3 py-2 font-semibold text-primario">
                {t("columnas.nombre")}
              </th>
              <th className="px-3 py-2 font-semibold text-primario">
                {t("columnas.federacion")}
              </th>
              <th className="px-3 py-2 font-semibold text-primario">
                {t("columnas.genero")}
              </th>
              <th className="px-3 py-2 font-semibold text-primario">
                {t("columnas.estilo")}
              </th>
              <th className="px-3 py-2 font-semibold text-primario">
                {t("columnas.division")}
              </th>
              <th className="px-3 py-2 font-semibold text-primario">
                {t("columnas.confirmado")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filasFiltradas.map((fila) => (
              <tr key={fila.id} className="border-t border-primario/10">
                <td className="px-3 py-2 text-texto/80">{fila.numeroRegistro ?? "—"}</td>
                <td className="px-3 py-2 text-texto/80">{fila.apellido}</td>
                <td className="px-3 py-2 text-texto/80">{fila.nombre}</td>
                <td className="px-3 py-2 text-texto/80">{fila.federacion}</td>
                <td className="px-3 py-2 text-texto/80">
                  {tInscripcion(`generoOpciones.${fila.genero}`)}
                </td>
                <td className="px-3 py-2 text-texto/80">
                  {tInscripcion(`estiloOpciones.${fila.estilo}`)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-semibold text-primario">
                  {fila.codigoDivision}
                </td>
                <td className="px-3 py-2 text-texto/80">
                  {fila.pagado ? t("si") : t("no")}
                </td>
              </tr>
            ))}
            {filasFiltradas.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-texto/60">
                  {filas.length === 0 ? t("sinInscriptos") : t("sinResultados")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

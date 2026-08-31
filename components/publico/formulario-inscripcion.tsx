"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { inscribirArquero } from "@/app/[locale]/(public)/inscripcion/acciones";
import {
  calcularDivisionPorEdad,
  DIVISIONES_ORDENADAS,
  ESTILOS_ORDENADOS,
  FEDERACIONES,
} from "@/lib/validaciones/inscripcion";
import { PRECIO_BANQUETE_USD } from "@/lib/precios";

const CLASE_INPUT =
  "mt-1 w-full rounded-md border border-primario/20 px-3 py-2 text-sm";
const CLASE_LABEL = "block text-sm font-semibold text-primario";
const CLASE_ERROR = "mt-1 text-xs text-acento";

function BotonEnviar() {
  const t = useTranslations("inscripcion");
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-acento px-4 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-acento-oscuro disabled:opacity-60 sm:w-auto"
    >
      {pending ? t("enviando") : t("enviar")}
    </button>
  );
}

export function FormularioInscripcion() {
  const t = useTranslations("inscripcion");
  const [estado, accion] = useFormState(inscribirArquero, undefined);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [division, setDivision] = useState("");

  const errores = estado && !estado.ok ? estado.errores : {};
  const traducirError = (codigo?: string) => (codigo ? t(`errores.${codigo}`) : undefined);

  const fechaValida = fechaNacimiento && !Number.isNaN(new Date(fechaNacimiento).getTime());
  const divisionSugerida = fechaValida
    ? calcularDivisionPorEdad(new Date(fechaNacimiento))
    : undefined;

  function manejarCambioFecha(valor: string) {
    setFechaNacimiento(valor);
    const fecha = new Date(valor);
    if (!Number.isNaN(fecha.getTime())) {
      setDivision(calcularDivisionPorEdad(fecha));
    }
  }

  if (estado?.ok) {
    return (
      <div className="mx-auto max-w-xl rounded-lg border border-primario/10 bg-white p-8 text-center">
        <h2 className="font-display text-2xl uppercase tracking-wide text-primario">
          {t("gracias.titulo")}
        </h2>
        <p className="mt-3 text-texto/80">{t("gracias.texto")}</p>
      </div>
    );
  }

  return (
    <form action={accion} className="mx-auto max-w-2xl">
      <p className="mb-6 text-sm italic text-texto/60">{t("camposObligatorios")}</p>

      {estado && !estado.ok && estado.errorGeneral && (
        <p className="mb-6 rounded-md border border-acento/30 bg-acento/5 px-4 py-3 text-sm font-semibold text-acento">
          {t(`errores.${estado.errorGeneral}`)}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={CLASE_LABEL}>
            {t("campos.nombre")}
          </label>
          <input id="nombre" name="nombre" type="text" required className={CLASE_INPUT} />
          {traducirError(errores.nombre) && (
            <p className={CLASE_ERROR}>{traducirError(errores.nombre)}</p>
          )}
        </div>

        <div>
          <label htmlFor="apellido" className={CLASE_LABEL}>
            {t("campos.apellido")}
          </label>
          <input id="apellido" name="apellido" type="text" required className={CLASE_INPUT} />
          {traducirError(errores.apellido) && (
            <p className={CLASE_ERROR}>{traducirError(errores.apellido)}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={CLASE_LABEL}>
            {t("campos.email")}
          </label>
          <input id="email" name="email" type="email" required className={CLASE_INPUT} />
          {traducirError(errores.email) && (
            <p className={CLASE_ERROR}>{traducirError(errores.email)}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className={CLASE_LABEL}>
            {t("campos.telefono")}
          </label>
          <input id="telefono" name="telefono" type="tel" className={CLASE_INPUT} />
        </div>

        <div>
          <label htmlFor="federacion" className={CLASE_LABEL}>
            {t("campos.federacion")}
          </label>
          <select id="federacion" name="federacion" required defaultValue="" className={CLASE_INPUT}>
            <option value="" disabled>
              {t("seleccionar")}
            </option>
            {FEDERACIONES.map((federacion) => (
              <option key={federacion.valor} value={federacion.valor}>
                {t(`federacionOpciones.${federacion.valor}`)}
              </option>
            ))}
          </select>
          {traducirError(errores.federacion) && (
            <p className={CLASE_ERROR}>{traducirError(errores.federacion)}</p>
          )}
        </div>

        <div>
          <label htmlFor="fechaNacimiento" className={CLASE_LABEL}>
            {t("campos.fechaNacimiento")}
          </label>
          <input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            required
            value={fechaNacimiento}
            onChange={(evento) => manejarCambioFecha(evento.target.value)}
            className={CLASE_INPUT}
          />
          {traducirError(errores.fechaNacimiento) && (
            <p className={CLASE_ERROR}>{traducirError(errores.fechaNacimiento)}</p>
          )}
        </div>

        <div>
          <span className={CLASE_LABEL}>{t("campos.genero")}</span>
          <div className="mt-2 flex gap-6">
            <label className="flex items-center gap-2 text-sm text-texto/80">
              <input type="radio" name="genero" value="MASCULINO" required />
              {t("generoOpciones.MASCULINO")}
            </label>
            <label className="flex items-center gap-2 text-sm text-texto/80">
              <input type="radio" name="genero" value="FEMENINO" required />
              {t("generoOpciones.FEMENINO")}
            </label>
          </div>
          {traducirError(errores.genero) && (
            <p className={CLASE_ERROR}>{traducirError(errores.genero)}</p>
          )}
        </div>

        <div>
          <label htmlFor="division" className={CLASE_LABEL}>
            {t("campos.division")}
          </label>
          <select
            id="division"
            name="division"
            required
            value={division}
            onChange={(evento) => setDivision(evento.target.value)}
            className={CLASE_INPUT}
          >
            <option value="" disabled>
              {t("seleccionar")}
            </option>
            {DIVISIONES_ORDENADAS.map((valor) => (
              <option key={valor} value={valor}>
                {t(`divisionOpciones.${valor}`)}
              </option>
            ))}
          </select>
          {divisionSugerida && (
            <p className="mt-1 text-xs text-texto/60">
              {t("divisionAyuda", { division: t(`divisionOpciones.${divisionSugerida}`) })}
            </p>
          )}
          {traducirError(errores.division) && (
            <p className={CLASE_ERROR}>{traducirError(errores.division)}</p>
          )}
        </div>

        <div>
          <label htmlFor="estilo" className={CLASE_LABEL}>
            {t("campos.estilo")}
          </label>
          <select id="estilo" name="estilo" required defaultValue="" className={CLASE_INPUT}>
            <option value="" disabled>
              {t("seleccionar")}
            </option>
            {ESTILOS_ORDENADOS.map((valor) => (
              <option key={valor} value={valor}>
                {t(`estiloOpciones.${valor}`)}
              </option>
            ))}
          </select>
          {traducirError(errores.estilo) && (
            <p className={CLASE_ERROR}>{traducirError(errores.estilo)}</p>
          )}
        </div>
      </div>

      <label className="mt-6 flex items-center gap-2 text-sm text-texto/80">
        <input type="checkbox" name="banquete" />
        {t("campos.banquete", { precio: PRECIO_BANQUETE_USD })}
      </label>

      <label className="mt-4 flex items-start gap-2 text-sm text-texto/80">
        <input type="checkbox" name="aceptaReglamento" required className="mt-0.5" />
        {t("campos.aceptaReglamento")}
      </label>
      {traducirError(errores.aceptaReglamento) && (
        <p className={CLASE_ERROR}>{traducirError(errores.aceptaReglamento)}</p>
      )}

      {/* Honeypot: invisible para personas, un bot que lo complete se descarta en la Server Action. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="sitioWeb">Sitio web</label>
        <input id="sitioWeb" name="sitioWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8">
        <BotonEnviar />
      </div>
    </form>
  );
}

"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { Arquero } from "@prisma/client";
import { actualizarArquero } from "@/app/admin/arqueros/acciones";
import { DIVISIONES_ORDENADAS, ESTILOS_ORDENADOS } from "@/lib/validaciones/inscripcion";
import { ETIQUETAS_DIVISION, ETIQUETAS_ESTILO, ETIQUETAS_GENERO } from "@/lib/etiquetas";

const CLASE_INPUT =
  "mt-1 w-full rounded-md border border-primario/20 px-3 py-2 text-sm";
const CLASE_LABEL = "block text-sm font-semibold text-primario";
const CLASE_ERROR = "mt-1 text-xs text-acento";

const MENSAJES_ERROR: Record<string, string> = {
  requerido: "Este campo es obligatorio.",
  email_invalido: "El email no es válido.",
};

function traducirError(codigo?: string) {
  return codigo ? MENSAJES_ERROR[codigo] ?? codigo : undefined;
}

function BotonGuardar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-acento px-4 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-acento-oscuro disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Guardando..." : "Guardar cambios"}
    </button>
  );
}

export function FormularioEdicionArquero({ arquero }: { arquero: Arquero }) {
  const accionConId = actualizarArquero.bind(null, arquero.id);
  const [estado, accion] = useFormState(accionConId, undefined);

  const errores = estado && !estado.ok ? estado.errores : {};

  return (
    <form action={accion} className="rounded-lg border border-primario/10 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={CLASE_LABEL}>
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            defaultValue={arquero.nombre}
            className={CLASE_INPUT}
          />
          {traducirError(errores.nombre) && (
            <p className={CLASE_ERROR}>{traducirError(errores.nombre)}</p>
          )}
        </div>

        <div>
          <label htmlFor="apellido" className={CLASE_LABEL}>
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            required
            defaultValue={arquero.apellido}
            className={CLASE_INPUT}
          />
          {traducirError(errores.apellido) && (
            <p className={CLASE_ERROR}>{traducirError(errores.apellido)}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={CLASE_LABEL}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={arquero.email}
            className={CLASE_INPUT}
          />
          {traducirError(errores.email) && (
            <p className={CLASE_ERROR}>{traducirError(errores.email)}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className={CLASE_LABEL}>
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            defaultValue={arquero.telefono ?? ""}
            className={CLASE_INPUT}
          />
        </div>

        <div>
          <label htmlFor="federacion" className={CLASE_LABEL}>
            Federación / club
          </label>
          <input
            id="federacion"
            name="federacion"
            type="text"
            required
            defaultValue={arquero.federacion}
            className={CLASE_INPUT}
          />
          {traducirError(errores.federacion) && (
            <p className={CLASE_ERROR}>{traducirError(errores.federacion)}</p>
          )}
        </div>

        <div>
          <label htmlFor="fechaNacimiento" className={CLASE_LABEL}>
            Fecha de nacimiento
          </label>
          <input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            required
            defaultValue={arquero.fechaNacimiento.toISOString().slice(0, 10)}
            className={CLASE_INPUT}
          />
          {traducirError(errores.fechaNacimiento) && (
            <p className={CLASE_ERROR}>{traducirError(errores.fechaNacimiento)}</p>
          )}
        </div>

        <div>
          <span className={CLASE_LABEL}>Género</span>
          <div className="mt-2 flex gap-6">
            <label className="flex items-center gap-2 text-sm text-texto/80">
              <input
                type="radio"
                name="genero"
                value="MASCULINO"
                required
                defaultChecked={arquero.genero === "MASCULINO"}
              />
              {ETIQUETAS_GENERO.MASCULINO}
            </label>
            <label className="flex items-center gap-2 text-sm text-texto/80">
              <input
                type="radio"
                name="genero"
                value="FEMENINO"
                required
                defaultChecked={arquero.genero === "FEMENINO"}
              />
              {ETIQUETAS_GENERO.FEMENINO}
            </label>
          </div>
          {traducirError(errores.genero) && (
            <p className={CLASE_ERROR}>{traducirError(errores.genero)}</p>
          )}
        </div>

        <div>
          <label htmlFor="division" className={CLASE_LABEL}>
            Categoría
          </label>
          <select
            id="division"
            name="division"
            required
            defaultValue={arquero.division}
            className={CLASE_INPUT}
          >
            {DIVISIONES_ORDENADAS.map((valor) => (
              <option key={valor} value={valor}>
                {ETIQUETAS_DIVISION[valor]}
              </option>
            ))}
          </select>
          {traducirError(errores.division) && (
            <p className={CLASE_ERROR}>{traducirError(errores.division)}</p>
          )}
        </div>

        <div>
          <label htmlFor="estilo" className={CLASE_LABEL}>
            Estilo
          </label>
          <select
            id="estilo"
            name="estilo"
            required
            defaultValue={arquero.estilo}
            className={CLASE_INPUT}
          >
            {ESTILOS_ORDENADOS.map((valor) => (
              <option key={valor} value={valor}>
                {ETIQUETAS_ESTILO[valor]}
              </option>
            ))}
          </select>
          {traducirError(errores.estilo) && (
            <p className={CLASE_ERROR}>{traducirError(errores.estilo)}</p>
          )}
        </div>
      </div>

      <label className="mt-6 flex items-center gap-2 text-sm text-texto/80">
        <input type="checkbox" name="banquete" defaultChecked={arquero.banquete} />
        Quiere banquete (USD 40)
      </label>

      <div className="mt-5">
        <label htmlFor="notas" className={CLASE_LABEL}>
          Notas internas
        </label>
        <textarea
          id="notas"
          name="notas"
          rows={3}
          defaultValue={arquero.notas ?? ""}
          className={CLASE_INPUT}
        />
      </div>

      <div className="mt-8">
        <BotonGuardar />
      </div>
    </form>
  );
}

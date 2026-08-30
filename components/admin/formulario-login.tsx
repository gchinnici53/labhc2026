"use client";

import { useFormState, useFormStatus } from "react-dom";
import { iniciarSesion } from "@/app/admin/login/acciones";

function BotonIngresar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-primario px-4 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primario-oscuro disabled:opacity-60"
    >
      {pending ? "Ingresando…" : "Ingresar"}
    </button>
  );
}

export function FormularioLogin() {
  const [error, accion] = useFormState(iniciarSesion, undefined);

  return (
    <form action={accion} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-primario">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1 w-full rounded-md border border-primario/20 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-primario">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-md border border-primario/20 px-3 py-2 text-sm"
        />
      </div>
      {error && <p className="text-sm text-acento">{error}</p>}
      <BotonIngresar />
    </form>
  );
}

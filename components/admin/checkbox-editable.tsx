"use client";

import { useState, useTransition } from "react";

export function CheckboxEditable({
  id,
  marcadoInicial,
  accion,
  deshabilitado,
}: {
  id: string;
  marcadoInicial: boolean;
  accion: (id: string, valor: boolean) => Promise<void>;
  deshabilitado?: boolean;
}) {
  const [marcado, setMarcado] = useState(marcadoInicial);
  const [, startTransition] = useTransition();

  return (
    <input
      type="checkbox"
      checked={marcado}
      disabled={deshabilitado}
      onChange={(evento) => {
        const nuevo = evento.target.checked;
        setMarcado(nuevo);
        startTransition(() => {
          accion(id, nuevo);
        });
      }}
      className="h-5 w-5 accent-primario disabled:opacity-20"
    />
  );
}

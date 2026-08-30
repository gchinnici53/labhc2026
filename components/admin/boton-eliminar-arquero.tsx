"use client";

import { eliminarArquero } from "@/app/admin/arqueros/acciones";

export function BotonEliminarArquero({
  id,
  nombreCompleto,
}: {
  id: string;
  nombreCompleto: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (window.confirm(`¿Eliminar a ${nombreCompleto}? Esta acción no se puede deshacer.`)) {
          eliminarArquero(id);
        }
      }}
      className="text-sm font-semibold text-acento hover:underline"
    >
      Eliminar
    </button>
  );
}

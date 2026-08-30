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
      title={`Eliminar a ${nombreCompleto}`}
      aria-label={`Eliminar a ${nombreCompleto}`}
      onClick={() => {
        if (window.confirm(`¿Eliminar a ${nombreCompleto}? Esta acción no se puede deshacer.`)) {
          eliminarArquero(id);
        }
      }}
      className="flex h-6 w-6 items-center justify-center rounded font-bold text-acento hover:bg-acento/10"
    >
      ×
    </button>
  );
}

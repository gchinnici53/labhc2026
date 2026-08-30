import { FormularioLogin } from "@/components/admin/formulario-login";

export default function PaginaLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-fondo px-4">
      <div className="w-full max-w-sm rounded-lg border border-primario/10 p-8 shadow-sm">
        <h1 className="text-center font-display text-2xl uppercase tracking-wide text-primario">
          Panel LABHC 2026
        </h1>
        <div className="mt-6">
          <FormularioLogin />
        </div>
      </div>
    </div>
  );
}

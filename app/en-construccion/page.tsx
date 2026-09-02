import { Logo } from "@/components/ui/logo";

export default function PaginaEnConstruccion() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-primario px-4 text-center text-fondo">
      <Logo className="h-28 w-28" />
      <div>
        <h1 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
          Sitio en construcción
        </h1>
        <p className="mt-3 text-fondo/80">
          Estamos preparando el sitio del LABHC 2026. Volvé a visitarnos pronto.
        </p>
        <p className="mt-1 text-sm text-fondo/60">
          Site under construction. Please check back soon.
        </p>
      </div>
    </div>
  );
}

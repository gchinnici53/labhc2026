import Link from "next/link";
import { auth } from "@/lib/auth";
import { cerrarSesion } from "@/app/admin/acciones";

export async function PanelAdmin({ children }: { children: React.ReactNode }) {
  const sesion = await auth();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col gap-8 bg-primario p-6 text-fondo">
        <p className="font-display text-lg uppercase tracking-wide">LABHC Admin</p>

        <nav className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-wide">
          <Link href="/admin" className="hover:text-acento">
            Dashboard
          </Link>
          <Link href="/admin/arqueros" className="hover:text-acento">
            Inscriptos
          </Link>
        </nav>

        <div className="mt-auto text-xs text-fondo/70">
          <p className="text-fondo">{sesion?.user?.name}</p>
          <p className="uppercase">{sesion?.user?.rol}</p>
          <form action={cerrarSesion}>
            <button type="submit" className="mt-2 underline hover:text-acento">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 bg-fondo p-8 text-texto">{children}</main>
    </div>
  );
}

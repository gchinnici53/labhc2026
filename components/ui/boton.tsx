import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type PropiedadesBoton = ComponentProps<typeof Link> & {
  variante?: "acento" | "contorno";
};

export function Boton({
  variante = "acento",
  className = "",
  ...props
}: PropiedadesBoton) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide transition-colors";

  const estilos =
    variante === "acento"
      ? "bg-acento text-white hover:bg-acento-oscuro"
      : "border border-current text-primario hover:bg-primario hover:text-white";

  return <Link className={`${base} ${estilos} ${className}`} {...props} />;
}

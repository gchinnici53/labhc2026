import Image from "next/image";

// El archivo tiene fondo gris claro (foto de estudio) alrededor de la
// medalla circular: overflow-hidden + rounded-full la recorta prolijo.
export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ${className}`}
    >
      <Image
        src="/logos/labhc2026.png"
        alt="LABHC 2026"
        fill
        sizes="40px"
        className="object-cover"
        priority
      />
    </span>
  );
}

// Placeholder del logo: reemplazar por el SVG oficial cuando esté disponible
// (ver docs/04-PENDIENTES.md).
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 40"
      role="img"
      aria-label="LABHC 2026"
      className={className}
    >
      <text
        x="0"
        y="28"
        fontFamily="var(--font-titulos)"
        fontSize="28"
        fill="currentColor"
      >
        LABHC <tspan fill="#E8622C">2026</tspan>
      </text>
    </svg>
  );
}

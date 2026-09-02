import type { Metadata } from "next";
import { Anton, Nunito_Sans } from "next/font/google";
import "../globals.css";

// Pagina de gate de mantenimiento, sin i18n: layout raiz propio, separado
// del de app/[locale]/ (ver middleware.ts, resolverGateMantenimiento).
const fuenteTitulos = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-titulos",
});

const fuenteCuerpo = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-cuerpo",
});

export const metadata: Metadata = {
  title: "LABHC 2026",
  robots: { index: false, follow: false },
};

export default function LayoutEnConstruccion({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fuenteTitulos.variable} ${fuenteCuerpo.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Anton, Nunito_Sans } from "next/font/google";
import "../globals.css";

// Panel privado, sin i18n (ver docs/02-SITEMAP.md): layout raiz propio,
// separado del de app/[locale]/.
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
  title: "Admin · LABHC 2026",
  robots: { index: false, follow: false },
};

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fuenteTitulos.variable} ${fuenteCuerpo.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

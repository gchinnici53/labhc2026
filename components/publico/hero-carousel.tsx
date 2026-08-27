"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// Sin fotos reales todavía (ver docs/04-PENDIENTES.md): cada slide es un
// degradé con la paleta del sitio en vez de una imagen inventada.
const CANTIDAD_SLIDES = 4;
const INTERVALO_MS = 6000;

const DEGRADES = [
  "linear-gradient(135deg, #1C2E20 0%, #3F6349 60%, #E8622C33 100%)",
  "linear-gradient(135deg, #2B4632 0%, #3F6349 55%, #C94E1D33 100%)",
  "linear-gradient(135deg, #1C2E20 0%, #2B4632 50%, #E8622C33 100%)",
  "linear-gradient(135deg, #3F6349 0%, #1C2E20 60%, #C94E1D33 100%)",
];

export function HeroCarousel() {
  const t = useTranslations("home.hero");
  const tPagina = useTranslations("paginas.inicio");
  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((actual) => (actual + 1) % CANTIDAD_SLIDES);
    }, INTERVALO_MS);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-primario-oscuro text-fondo">
      {DEGRADES.map((degrade, indice) => (
        <div
          key={indice}
          aria-hidden={indice !== slideActual}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            indice === slideActual ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: degrade }}
        >
          <span className="absolute bottom-4 right-4 text-xs italic text-fondo/50">
            {t("imagenPlaceholder")}
          </span>
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl uppercase tracking-wide sm:text-6xl">
          {tPagina("titulo")}
        </h1>
        <p className="mt-4 text-lg font-semibold text-acento">{t("fechas")}</p>
        <p className="mt-1 text-base text-fondo/90">{t("sede")}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <span className="rounded-md border border-dashed border-fondo/50 px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-fondo/70">
            {t("cta1")}
          </span>
          <span className="rounded-md border border-dashed border-fondo/50 px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-fondo/70">
            {t("cta2")}
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {DEGRADES.map((_, indice) => (
          <button
            key={indice}
            type="button"
            onClick={() => setSlideActual(indice)}
            aria-label={`Slide ${indice + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              indice === slideActual ? "bg-acento" : "bg-fondo/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

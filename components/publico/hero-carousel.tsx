"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const INTERVALO_MS = 6000;

const IMAGENES = [
  "/banner/banner-1.jpg",
  "/banner/banner-2.jpg",
  "/banner/banner-3.jpg",
  "/banner/banner-4.jpg",
];

export function HeroCarousel() {
  const t = useTranslations("home.hero");
  const tPagina = useTranslations("paginas.inicio");
  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((actual) => (actual + 1) % IMAGENES.length);
    }, INTERVALO_MS);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-primario-oscuro text-fondo">
      {IMAGENES.map((imagen, indice) => (
        <div
          key={imagen}
          aria-hidden={indice !== slideActual}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            indice === slideActual ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={imagen}
            alt=""
            fill
            priority={indice === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primario-oscuro/80 via-primario-oscuro/30 to-primario-oscuro/50" />
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
        {IMAGENES.map((imagen, indice) => (
          <button
            key={imagen}
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

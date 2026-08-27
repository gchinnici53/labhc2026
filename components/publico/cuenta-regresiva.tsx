"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// Instante fijo en UTC-3: no depende de la zona horaria del visitante.
const FECHA_TORNEO = "2026-12-05T08:00:00-03:00";

type TiempoRestante = {
  diferencia: number;
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

function calcularTiempoRestante(): TiempoRestante {
  const objetivo = new Date(FECHA_TORNEO).getTime();
  const diferencia = Math.max(0, objetivo - Date.now());

  return {
    diferencia,
    dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferencia / (1000 * 60)) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
}

function UnidadTiempo({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-primario px-4 py-6 text-fondo sm:px-6">
      <span className="font-display text-4xl sm:text-5xl">
        {String(valor).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wide text-fondo/80">
        {etiqueta}
      </span>
    </div>
  );
}

export function CuentaRegresiva() {
  const t = useTranslations("home.cuentaRegresiva");
  const [tiempo, setTiempo] = useState<TiempoRestante | null>(null);

  useEffect(() => {
    setTiempo(calcularTiempoRestante());
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempoRestante());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="font-display text-3xl uppercase tracking-wide text-primario">
        {t("titulo")}
      </h2>

      <div className="mt-8 min-h-[104px]">
        {tiempo && tiempo.diferencia <= 0 ? (
          <p className="font-display text-2xl uppercase tracking-wide text-acento">
            {t("comenzo")}
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            <UnidadTiempo valor={tiempo?.dias ?? 0} etiqueta={t("dias")} />
            <UnidadTiempo valor={tiempo?.horas ?? 0} etiqueta={t("horas")} />
            <UnidadTiempo valor={tiempo?.minutos ?? 0} etiqueta={t("minutos")} />
            <UnidadTiempo valor={tiempo?.segundos ?? 0} etiqueta={t("segundos")} />
          </div>
        )}
      </div>
    </section>
  );
}

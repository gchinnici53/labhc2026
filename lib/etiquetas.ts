import type { Division, Estilo, Genero } from "@prisma/client";

export const ETIQUETAS_GENERO: Record<Genero, string> = {
  MASCULINO: "Masculino",
  FEMENINO: "Femenino",
};

// Categorias confirmadas por la organizacion: CUB 8-12, JUNIOR 13-17,
// ADULT 18-54, VETERAN 55-64, SENIOR 65+
export const ETIQUETAS_DIVISION: Record<Division, string> = {
  CUB: "Cub",
  JUNIOR: "Junior",
  ADULT: "Adulto",
  VETERAN: "Veterano",
  SENIOR: "Senior",
};

// Nombre + sigla, igual que en el reglamento (docs/02-SITEMAP.md / /reglamento)
export const ETIQUETAS_ESTILO: Record<Estilo, string> = {
  BB_R: "Barebow Recurvo (BBR)",
  BB_C: "Barebow Compuesto (BBC)",
  BH_R: "Bowhunter Recurvo (BHR)",
  BH_C: "Bowhunter Compuesto (BHC)",
  LB: "Longbow (LB)",
  TR: "Recurvo Tradicional (TR)",
  HB: "Arco Histórico (HB)",
  FS_R: "Freestyle Limited Recurvo (FSR)",
  FS_C: "Freestyle Limited Compuesto (FSC)",
  FU: "Freestyle Unlimited (FU)",
  BL: "Bowhunter Limited (BL)",
  BU: "Bowhunter Unlimited (BU)",
};

const INICIAL_DIVISION: Record<Division, string> = {
  CUB: "C",
  JUNIOR: "J",
  ADULT: "A",
  VETERAN: "V",
  SENIOR: "S",
};

const INICIAL_GENERO: Record<Genero, string> = {
  MASCULINO: "M",
  FEMENINO: "F",
};

// Codigo de tarjeta: division + genero + estilo (sin guion bajo).
// Ejemplo: Adulto, Masculino, Longbow (LB) -> "AMLB"
export function calcularCodigoArquero({
  division,
  genero,
  estilo,
}: {
  division: Division;
  genero: Genero;
  estilo: Estilo;
}): string {
  return `${INICIAL_DIVISION[division]}${INICIAL_GENERO[genero]}${estilo.replace("_", "")}`;
}

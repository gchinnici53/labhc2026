import type { Division, Estilo, Genero } from "@prisma/client";

export const ETIQUETAS_GENERO: Record<Genero, string> = {
  MASCULINO: "Masculino",
  FEMENINO: "Femenino",
};

export const ETIQUETAS_DIVISION: Record<Division, string> = {
  CUB: "Cub",
  JUNIOR: "Junior",
  YOUNG_ADULT: "Young Adult",
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

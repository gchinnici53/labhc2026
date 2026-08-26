import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/acerca": {
      es: "/acerca",
      en: "/about",
    },
    "/competicion": {
      es: "/competicion",
      en: "/competition",
    },
    "/resultados": {
      es: "/resultados",
      en: "/results",
    },
    "/registrados": {
      es: "/registrados",
      en: "/registered",
    },
    "/alojamiento": {
      es: "/alojamiento",
      en: "/accommodations",
    },
    "/inscripcion": {
      es: "/inscripcion",
      en: "/registration",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;

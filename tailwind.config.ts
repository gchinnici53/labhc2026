import type { Config } from "tailwindcss";

// Paleta ajustada a pedido: azul + rojo en vez del verde/naranja original.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primario: {
          DEFAULT: "#364156",
          claro: "#4E5E7D",
          oscuro: "#232A38",
        },
        acento: {
          DEFAULT: "#E33131",
          oscuro: "#C12A2A",
        },
        fondo: "#FAFAF7",
        texto: "#1A1A18",
      },
      fontFamily: {
        display: ["var(--font-titulos)", "sans-serif"],
        sans: ["var(--font-cuerpo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

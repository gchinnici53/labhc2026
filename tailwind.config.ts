import type { Config } from "tailwindcss";

// Paleta "Verde Caza y Blaze": verde bosque + naranja blaze (color de
// seguridad asociado al bowhunting), pensada para un torneo de tiro con
// arco 3D al aire libre.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primario: {
          DEFAULT: "#2B4632",
          claro: "#3F6349",
          oscuro: "#1C2E20",
        },
        acento: {
          DEFAULT: "#E8622C",
          oscuro: "#C94E1D",
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

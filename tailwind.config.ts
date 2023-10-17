import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        "gold-dark": "#eec643",
        "black-dark": "#141414",
        "gray-dark": "#eef0f2",
        "blue-dark-50": "#0d21a1",
        "blue-dark-100": "#011638",
        "gray-light": "#30343f",
        "white-light": "#fafaff",
        "violet-light": "#e4d9ff",
        "blue-light-50": "#273469",
        "blue-light-100": "#1e2749",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;

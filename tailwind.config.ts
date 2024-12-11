import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0F0F0F",
        primary: "#FC5120",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

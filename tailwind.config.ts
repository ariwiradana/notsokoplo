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
        italianno: ["Italianno", "serif"],
        "tan-pearl": ["TanPearl", "sans-serif"],
        "high-summit": ["HighSummit", "sans-serif"],
        edensor: ["Edensor", "sans-serif"],
        bigilla: ["Bigilla", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin-slow 4s linear infinite",
      },
      keyframes: {
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

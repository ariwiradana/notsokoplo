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
        dark: "#171717",
        primary: "#FC5120",
      },
      fontSize: {
        responsive: "clamp(1rem, 5vw, 3rem)", // Add your custom clamp
      },
    },
  },
  plugins: [],
} satisfies Config;

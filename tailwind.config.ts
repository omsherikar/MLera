import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#16002C",
          "bg-range": "#30004A",
          card: "#2B0B4B",
          text: "#E9C3FF",
        },
        light: {
          bg: "#E8FFEF",
          card: "#FFFFFF",
          text: "#4A3566",
        },
        accent: {
          pink: "#FF8FB0",
          purple: "#A66BFF",
        },
      },
      fontFamily: {
        heading: ["Poppins", "Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(90deg, #FF8FB0 0%, #A66BFF 100%)",
      },
    },
  },
  plugins: [],
};
export default config;


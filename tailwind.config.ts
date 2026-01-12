import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neon: {
          blue: "#00f3ff",
          pink: "#ff00ff",
          green: "#00ff9f",
          purple: "#bc13fe",
        },
        dark: {
          bg: "#050511",
          card: "rgba(255, 255, 255, 0.05)",
        }
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f3ff, 0 0 20px #00f3ff',
        'neon-pink': '0 0 10px #ff00ff, 0 0 20px #ff00ff',
      }
    },
  },
  plugins: [],
};
export default config;

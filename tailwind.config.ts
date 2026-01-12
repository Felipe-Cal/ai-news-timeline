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
        gemini: {
          blue: "#4285F4",
          purple: "#A50E8E", // Adjusted purple
          orange: "#F9AB00", // Adjusted orange
          light: "#F0F4F9", // Light background similar to Gemini chat
        },
      },
      backgroundImage: {
        'gemini-gradient': 'linear-gradient(90deg, #4285F4, #9B72CB, #D96570)',
        'gemini-shine': 'linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0))',
      },
    },
  },
  plugins: [],
};
export default config;

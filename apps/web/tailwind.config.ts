import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spray: {
          bg: "#000000",
          surface: "#141414",
          elevated: "#1a1a1a",
          border: "#2a2a2a",
          orange: "#ff6600",
          "orange-dim": "#cc5200",
          blue: "#00b4d8",
          muted: "#9ca3af",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Hiragino Sans",
          "Hiragino Kaku Gothic ProN",
          "Meiryo",
          "sans-serif",
        ],
        display: ["var(--font-display)", "Arial Black", "Impact", "sans-serif"],
      },
      maxWidth: {
        site: "1400px",
      },
    },
  },
  plugins: [],
};

export default config;

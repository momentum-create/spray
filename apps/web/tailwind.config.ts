import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spray: {
          bg: "var(--spray-bg)",
          surface: "var(--spray-surface)",
          elevated: "var(--spray-surface-elevated)",
          border: "var(--spray-border)",
          text: "var(--spray-text)",
          orange: "var(--spray-orange)",
          "orange-dim": "var(--spray-orange-dim)",
          blue: "var(--spray-blue)",
          muted: "var(--spray-muted)",
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

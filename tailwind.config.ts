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
        ink: "#1C1F2E",
        paper: "#FAF8F5",
        "blue-lt": "#00C4F9",
        blue: "#005BE8",
        orange: "#F63600",
        coral: "#FF6B35",
        amber: "#E8702A",
        "warm-navy": "#0F1E3C",
        sand: "#F0EBE3",
        stone: "#E8E2D9",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "-apple-system", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "aurora-1": "auroraShift 14s ease-in-out infinite",
        "aurora-2": "auroraShift2 18s ease-in-out infinite",
        "aurora-3": "auroraShift 22s ease-in-out reverse infinite",
        "badge-pulse": "badgePulse 3s ease-in-out infinite",
        ticker: "ticker 54s linear infinite",
        "border-flow": "borderFlow 5s ease infinite",
      },
      keyframes: {
        auroraShift: {
          "0%": { transform: "translate(0%,0%) scale(1) rotate(0deg)" },
          "25%": { transform: "translate(3%,-4%) scale(1.06) rotate(2deg)" },
          "50%": { transform: "translate(-2%,3%) scale(1.03) rotate(-1deg)" },
          "75%": { transform: "translate(-4%,-2%) scale(1.07) rotate(3deg)" },
          "100%": { transform: "translate(0%,0%) scale(1) rotate(0deg)" },
        },
        auroraShift2: {
          "0%": { transform: "translate(0%,0%) scale(1.05) rotate(0deg)" },
          "33%": { transform: "translate(5%,3%) scale(1) rotate(-3deg)" },
          "66%": { transform: "translate(-3%,-5%) scale(1.08) rotate(2deg)" },
          "100%": { transform: "translate(0%,0%) scale(1.05) rotate(0deg)" },
        },
        badgePulse: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(255,107,53,.18)" },
          "60%": { boxShadow: "0 0 0 6px rgba(255,107,53,0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        borderFlow: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

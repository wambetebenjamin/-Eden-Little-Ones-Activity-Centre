import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        ink: "var(--color-body)",
        cream: "var(--color-cream)",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "sans-serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
      fontSize: {
        meta: ["11px", { lineHeight: "16px" }],
        nav: ["13px", { lineHeight: "20px" }],
        btn: ["12px", { lineHeight: "16px" }],
        body: ["15px", { lineHeight: "26px" }],
      },
      borderRadius: {
        blob: "50% 20% / 10% 40%",
        pill: "25% 10%",
        chip: "10% 30%",
        eden: "10px",
      },
      boxShadow: {
        eden: "0 0 45px rgba(57, 61, 114, 0.12)",
        "eden-sm": "0 8px 24px rgba(57, 61, 114, 0.1)",
      },
      keyframes: {
        "bounce-in": {
          "0%": { transform: "translateY(-120%)", opacity: "0" },
          "60%": { transform: "translateY(8%)", opacity: "1" },
          "80%": { transform: "translateY(-4%)" },
          "100%": { transform: "translateY(0)" },
        },
        "dot-pulse": {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
        "wa-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "bounce-in": "bounce-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "dot-pulse": "dot-pulse 1.1s ease-in-out infinite",
        "wa-bounce": "wa-bounce 1.6s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
export default config;

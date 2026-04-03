import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sandia: "#E94555",
        celeste: "#73C3E4",
        crema: "#FAFAF8",
        "text-dark": "#1A1A1A",
        "text-muted": "#6B7280",
        surface: {
          DEFAULT: "#f9f9f7",
          low: "#f4f4f2",
          lowest: "#ffffff",
          high: "#e8e8e6",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero": ["4.5rem", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "700" }],
        "hero-mobile": ["2.75rem", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "700" }],
        "section": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        "section-mobile": ["2rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        "subhead": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
      },
      boxShadow: {
        card: "0 8px 30px rgb(0,0,0,0.04)",
        "card-sm": "0 4px 20px rgb(0,0,0,0.03)",
        ambient: "0 12px 32px -4px rgba(26,28,27,0.06)",
        "ambient-sm": "0 8px 20px -4px rgba(26,28,27,0.04)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(233,69,85,0)" },
          "50%": { boxShadow: "0 0 0 8px rgba(233,69,85,0.15)" },
        },
        "grain-drift": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-20px, -20px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        breathe: "breathe 3s ease-in-out infinite",
        "grain-drift": "grain-drift 8s linear infinite",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

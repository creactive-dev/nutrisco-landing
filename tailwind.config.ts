import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sandia: {
          DEFAULT: "#E94555",
          50: "#FFF5F6",
          100: "#FFE3E6",
          200: "#FFC2C8",
          300: "#FF8E99",
          400: "#FF6371",
          500: "#E94555",
          600: "#D63B4A",
          700: "#B02D3B",
        },
        celeste: {
          DEFAULT: "#73C3E4",
          50: "#F0F8FC",
          100: "#DCEEF7",
          200: "#BADDED",
          300: "#92CCE2",
          400: "#73C3E4",
          500: "#5BB1DA",
          600: "#3D94BF",
          700: "#2A6F92",
        },
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
        // Soft-UI Evolution multi-layer (modern wellness)
        glass:
          "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 -1px 0 0 rgba(255,255,255,0.2) inset, 0 1px 2px rgba(16,24,40,0.04), 0 8px 24px -6px rgba(16,24,40,0.08), 0 24px 48px -12px rgba(16,24,40,0.10)",
        "glass-hover":
          "0 1px 0 0 rgba(255,255,255,0.7) inset, 0 -1px 0 0 rgba(255,255,255,0.25) inset, 0 2px 4px rgba(16,24,40,0.05), 0 12px 32px -6px rgba(16,24,40,0.10), 0 32px 64px -12px rgba(16,24,40,0.14)",
        "glow-sandia": "0 0 0 1px rgba(233,69,85,0.18), 0 8px 32px -4px rgba(233,69,85,0.28)",
        "glow-celeste": "0 0 0 1px rgba(115,195,228,0.18), 0 8px 32px -4px rgba(115,195,228,0.25)",
        // Inner ring for glass borders
        ring: "0 0 0 1px rgba(255,255,255,0.4) inset",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-warm": "linear-gradient(135deg, #E94555 0%, #FF7560 100%)",
        "gradient-cool": "linear-gradient(135deg, #73C3E4 0%, #5BB1DA 100%)",
        "gradient-warm-cool": "linear-gradient(135deg, #E94555 0%, #73C3E4 100%)",
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
        "aurora-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, -3%) scale(1.05)" },
          "66%": { transform: "translate(-3%, 4%) scale(0.97)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        breathe: "breathe 3s ease-in-out infinite",
        "grain-drift": "grain-drift 8s linear infinite",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "aurora-drift": "aurora-drift 18s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

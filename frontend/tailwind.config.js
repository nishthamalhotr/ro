/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* -------------------- COLORS -------------------- */
      colors: {
        brand: {
          DEFAULT: "#0ea5e9",
          blue: "#0ea5e9",
          dark: "#0284c7",
          light: "#38bdf8",
          glow: "#7dd3fc",
        },

        /* Premium SaaS neutrals */
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },

        /* Overlay helpers */
        overlay: {
          dark: "rgba(2, 6, 23, 0.65)",
          soft: "rgba(2, 6, 23, 0.45)",
        },
      },

      /* -------------------- FONTS -------------------- */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },

      /* -------------------- TYPOGRAPHY POLISH -------------------- */
      letterSpacing: {
        tightest: "-0.025em",
        hero: "-0.02em",
      },

      lineHeight: {
        hero: "1.05",
      },

      /* -------------------- SHADOWS -------------------- */
      boxShadow: {
        soft: "0 10px 25px -5px rgba(0,0,0,0.08)",
        mdSoft: "0 8px 20px rgba(0,0,0,0.12)",
        glow: "0 10px 30px rgba(14,165,233,0.25)",
        glowLg: "0 20px 60px rgba(14,165,233,0.35)",
        card: "0 20px 40px -10px rgba(2,6,23,0.15)",
        glass: "0 8px 32px rgba(2,6,23,0.25)",
      },

      /* -------------------- RADIUS -------------------- */
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },

      /* -------------------- BACKDROP BLUR -------------------- */
      backdropBlur: {
        xs: "2px",
      },

      /* -------------------- GRADIENTS -------------------- */
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, rgba(2,6,23,0.75), rgba(2,6,23,0.55), rgba(2,6,23,0.75))",
        "brand-gradient":
          "linear-gradient(135deg, #0ea5e9, #38bdf8)",
        "brand-glow":
          "radial-gradient(circle at center, rgba(14,165,233,0.35), transparent 70%)",
      },

      /* -------------------- TRANSITIONS -------------------- */
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },
    },
  },

  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // Primary - Sage Green
        primary: {
          DEFAULT: "#6B8E6B",
          50: "#F2F5F2",
          100: "#E8F0E8",
          200: "#D1E0D1",
          300: "#B3CBB3",
          400: "#8FAA8F",
          500: "#6B8E6B",
          600: "#567256",
          700: "#4A6B4A",
          800: "#3D5A3D",
          900: "#2F462F",
          950: "#1F2F1F",
        },
        // Accent - Warm Gold
        accent: {
          DEFAULT: "#D4A853",
          50: "#FBF7EF",
          100: "#F5ECD9",
          200: "#EBD9B3",
          300: "#E0C183",
          400: "#D4A853",
          500: "#C49332",
          600: "#A67A28",
          700: "#876322",
          800: "#6B4F1C",
          900: "#503C15",
          950: "#352810",
        },
        // Background colors
        background: "#FAFAF8",
        surface: "#FFFFFF",
        // Text colors
        foreground: {
          DEFAULT: "#1F2937",
          muted: "#6B7280",
        },
        // Border
        border: "#E5E7EB",
        // Semantic colors
        success: {
          DEFAULT: "#22C55E",
          50: "#F0FDF4",
          500: "#22C55E",
          600: "#16A34A",
        },
        warning: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          500: "#F59E0B",
          600: "#D97706",
        },
        error: {
          DEFAULT: "#EF4444",
          50: "#FEF2F2",
          500: "#EF4444",
          600: "#DC2626",
        },
        info: {
          DEFAULT: "#3B82F6",
          50: "#EFF6FF",
          500: "#3B82F6",
          600: "#2563EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)",
        "soft-md": "0 4px 12px -4px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 8px 24px -8px rgba(0, 0, 0, 0.1), 0 8px 16px -8px rgba(0, 0, 0, 0.05)",
        "soft-xl": "0 16px 40px -12px rgba(0, 0, 0, 0.12), 0 12px 24px -8px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(to bottom, rgba(107, 142, 107, 0.9), rgba(74, 107, 74, 0.95))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;

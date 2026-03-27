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
        background: "#0a0a0a",
        surface: "#111111",
        "surface-2": "#1a1a1a",
        border: "#222222",
        "accent-red": "#dc2626",
        "accent-red-dark": "#991b1b",
        "accent-purple": "#7c3aed",
        "accent-purple-dark": "#4f46e5",
        "accent-gold": "#f59e0b",
        "accent-gold-dark": "#d97706",
        "text-primary": "#ffffff",
        "text-muted": "#a1a1aa",
        "text-subtle": "#71717a",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "gradient-shift": "gradientShift 12s ease infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-med": "float 4s ease-in-out infinite",
        "pulse-ring": "pulseRing 2s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        "whatsapp-pulse": "whatsappPulse 2s infinite",
      },
      keyframes: {
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.3" },
          "50%": { transform: "translateY(-20px)", opacity: "0.6" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.1)", opacity: "0.4" },
          "100%": { transform: "scale(1)", opacity: "0.8" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        whatsappPulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.7)" },
          "70%": { boxShadow: "0 0 0 12px rgba(37, 211, 102, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0)" },
        },
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [],
};

export default config;

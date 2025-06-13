import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        secondary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
          DEFAULT: "#a855f7",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-in": "bounceIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "glow": "0 0 20px rgba(59, 130, 246, 0.15)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#ffffff",
            foreground: "#11181c",
            primary: {
              50: "#eff6ff",
              100: "#dbeafe",
              200: "#bfdbfe",
              300: "#93c5fd",
              400: "#60a5fa",
              500: "#3b82f6",
              600: "#2563eb",
              700: "#1d4ed8",
              800: "#1e40af",
              900: "#1e3a8a",
              DEFAULT: "#3b82f6",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#faf5ff",
              100: "#f3e8ff",
              200: "#e9d5ff",
              300: "#d8b4fe",
              400: "#c084fc",
              500: "#a855f7",
              600: "#9333ea",
              700: "#7c3aed",
              800: "#6b21a8",
              900: "#581c87",
              DEFAULT: "#a855f7",
              foreground: "#ffffff",
            },
            focus: "#3b82f6",
          },
        },
        dark: {
          colors: {
            background: "#0d1117",
            foreground: "#f0f6fc",
            primary: {
              50: "#0d1117",
              100: "#21262d",
              200: "#30363d",
              300: "#484f58",
              400: "#656c76",
              500: "#8b949e",
              600: "#b1bac4",
              700: "#c9d1d9",
              800: "#f0f6fc",
              900: "#ffffff",
              DEFAULT: "#58a6ff",
              foreground: "#0d1117",
            },
            secondary: {
              50: "#0d1117",
              100: "#21262d",
              200: "#30363d",
              300: "#484f58",
              400: "#656c76",
              500: "#8b949e",
              600: "#b1bac4",
              700: "#c9d1d9",
              800: "#f0f6fc",
              900: "#ffffff",
              DEFAULT: "#bc8cff",
              foreground: "#0d1117",
            },
            focus: "#58a6ff",
          },
        },
      },
    }),
  ],
};

export default config; 
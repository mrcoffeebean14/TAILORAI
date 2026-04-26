import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B132B",
        ember: "#F46036",
        cloud: "#F7F4EA",
        tide: "#2E5EAA",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        serif: ["var(--font-bitter)", "serif"],
      },
      boxShadow: {
        card: "0 16px 40px rgba(11, 19, 43, 0.12)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.6s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;

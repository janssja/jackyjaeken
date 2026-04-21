import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1440px",
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F5EFE6",
          deep: "#EDE4D3",
          light: "#FAF6EE",
        },
        charcoal: {
          DEFAULT: "#1F1B17",
          soft: "#3A352F",
        },
        gold: {
          DEFAULT: "#D9A441",
          soft: "#F0C87B",
          muted: "#B6893A",
        },
        muted: "#8A8178",
        line: "rgba(31,27,23,0.12)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.75rem, 2.8vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h3: ["1.375rem", { lineHeight: "1.25" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      spacing: {
        section: "clamp(4rem, 10vw, 10rem)",
        gutter: "clamp(1.25rem, 4vw, 3rem)",
      },
      maxWidth: {
        prose: "65ch",
        content: "1200px",
        narrow: "720px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

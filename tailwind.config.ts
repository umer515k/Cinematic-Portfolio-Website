import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0B08",
        foreground: "#E8E0D0",
        accent: {
          primary: "var(--accent-primary)",
          amber: "#C8963E",
          burgundy: "#6B2737",
          forest: "#3D4F3C",
          coolAmber: "#A87C3E",
          coldWhite: "#C8D0D8",
          deepBurgundy: "#4A1525",
        },
        light: {
          background: "#F2EDE4",
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)"],
        mono: ["var(--font-jetbrains)"],
      },
    },
  },
  plugins: [],
};
export default config;

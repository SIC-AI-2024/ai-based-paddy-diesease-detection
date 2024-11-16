import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent1: "var(--accent1)",
        accent2: "var(--accent2)",
        accent3: "var(--accent3)",
        accent4: "var(--accent4)",
        text: "var(--text)",
      },
    },
  },
  plugins: [],
} satisfies Config;

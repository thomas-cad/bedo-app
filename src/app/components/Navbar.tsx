import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@brainhubeu/react-carousel/lib/style.css",
    "./node_modules/react-toastify/dist/*.css",
  ],
  theme: {
    extend: {
      maskImage: {
        gradient: "linear-gradient(to bottom, black 70%, transparent 100%)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Add paths to third-party library CSS files here (optional)
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

  // Add purge configuration to control CSS purging
  purge: {
    enabled: process.env.NODE_ENV === "production", // Enable purging only in production
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

      // Add paths to third-party library CSS files here (optional)
      "./node_modules/@brainhubeu/react-carousel/lib/style.css",
      "./node_modules/react-toastify/dist/*.css",
    ],
    options: {
      safelist: [
        // Whitelist specific classes if needed
        "whitelist-class",
        "another-whitelisted-class",
      ],
    },
  },
} satisfies Config;
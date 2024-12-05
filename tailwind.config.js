/** @type {import('tailwindcss').Config} */
module.exports = {
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
        ksebgreen:"#059669",
        ksebgreenonhover:"#10b981",
        kseblightgreen:"#bbf7d0",
        ksebgrey:"#f3f4f6",
      },
    },
  },
  plugins: [],
};

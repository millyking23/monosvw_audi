/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0b0b0b",
        charcoal: "#1a1a1a",
        "charcoal-2": "#141414",
        red: {
          DEFAULT: "#d5001c",
        },
        silver: "#b9bec6",
        "silver-dim": "#7d828a",
        offwhite: "#f5f5f7",
        diag: "#00c2ff",
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "20px",
      },
      maxWidth: {
        wrap: "1280px",
      },
      boxShadow: {
        premium: "0 24px 50px -20px rgba(0,0,0,.6)",
      },
    },
  },
  plugins: [],
};

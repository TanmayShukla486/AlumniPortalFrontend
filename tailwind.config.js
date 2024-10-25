/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-grad-start": "#fefae0",
        "bg-grad-end": "#faedcd",
        "bg-primary": "#d4a373",
        "primary-dark": "#b55e19",
        "shadow-primary": "#ccd5ae",
        "shadow-secondary": "#e9edc9",
        "gradient-alt": "#ffb173",
      },
      boxShadow: {
        sidebar: "0 12px 10px #e9edc9",
        neomorph: "10px 10px 20px #4ca29a, -10px -10px 20px #8ae8d8",
        "inner-neomorph":
          "inset 10px 10px 15px rgba(0, 0, 0, 0.1), inset -10px -10px 15px rgba(255, 255, 255, 0.7)",
      },
    },
  },
  plugins: [],
}

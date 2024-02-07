/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#62E7AD",
        "weather-secondary": "#1AC379",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      courier: ["Courier Prime", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "primary-background": "#20062E",
        "blue-top": "#18B2DE",
        secondary: "#00ff00",
        "primary-text-color": "#fff",
      },
      screens: {
        xxs: "500px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

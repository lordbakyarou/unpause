/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        "primary-background": "#20062E",
        "blue-top": "#18B2DE",
        secondary: "#00ff00",
        "primary-text-color": "#fff",
        "text-color": "#DCEDC2",
      },
      screens: {
        xxs: "500px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a237e",
        "blue-dark": "#0d1b4a",
        purple: "#7c3aed",
      },
    },
  },
  plugins: [],
};

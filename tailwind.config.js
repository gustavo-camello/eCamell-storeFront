const colors = require("tailwindcss/colors");

module.exports = {
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "main-color": "F4EEFF",
        secondaryColor: "DCD6F7",
        thirdColor: "A6B1E1",
        fourthColor: "424874",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

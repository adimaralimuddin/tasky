/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        text: {
          light: "#d2bab0",
        },
        accent: {
          light: "#5D7EA4",
          dark: "#9CB0E3",
        },
        primary: {
          light: "#3D6E92",
          dark: "#7a54a9",
        },
        layer: {
          sec: "#4A577E",
          50: "#2D3442",
          100: "#394463",
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out normal ",
        pop: "pop 0.2s ease-in-out 0s 1 normal",
      },

      keyframes: {
        pop: {
          "0%": { scale: "0.9", opacity: "50%" },
          "70%": { scale: "1.02", opacity: "100%" },
          "100%": { scale: "1" },
          // "100%":{}
        },
        wiggle: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
    },
  },
  plugins: [],
};

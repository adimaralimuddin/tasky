/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{svg}",
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
        pop2: "pop2  0.2s ease-in-out 0s 1 normal",
        fadein: "fadein  0.2s ease-in-out 0s 1 normal",
      },

      keyframes: {
        fadein: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
        pop: {
          "0%": { transform: "scale(0.7,0.7)", opacity: "0%" },
          "70%": { transform: "scale(1.02,1.01)", opacity: "100%" },
          "100%": { transform: "scale(1,1)" },
        },
        pop2: {
          "0%": { transform: "scale(0.78,0.78)", opacity: "30%" },
          "100%": { transform: "scale(1,1)", opacity: "100%" },
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

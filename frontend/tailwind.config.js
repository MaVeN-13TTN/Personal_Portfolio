/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pumpkin: "#ff6d00",
        safetyOrange: "#ff7900",
        utOrange: "#ff8500",
        princetonOrange: "#ff9100",
        orangePeel: "#ff9e00",
        russianViolet: "#240046",
        persianIndigo: "#3c096c",
        tekhelet: "#5a189a",
        frenchViolet: "#7b2cbf",
        amethyst: "#9d4edd",
      },
    },
  },
  plugins: [],
};

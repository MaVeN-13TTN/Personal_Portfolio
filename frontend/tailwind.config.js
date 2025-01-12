/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pumpkin: "#ff6d00",
        "safety-orange": "#ff7900",
        "ut-orange": "#ff8500",
        "princeton-orange": "#ff9100",
        "orange-peel": "#ff9e00",
        "russian-violet": "#240046",
        "persian-indigo": "#3c096c",
        tekhelet: "#5a189a",
        "french-violet": "#7b2cbf",
        amethyst: "#9d4edd",
      },
      fontFamily: {
        titan: ["Titan One", "cursive"],
        maven: ["Maven Pro", "sans-serif"],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'engagement': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-in-out',
        'engagement': 'engagement 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};

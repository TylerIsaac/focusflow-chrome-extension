// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        // set font-sans to [Nunito, Montserrat, ...default sans]
        sans: ['Montserrat', 'Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

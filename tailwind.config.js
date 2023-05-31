/** @type {import('tailwindcss').Config} */

const { generatePalette } = require('palette-by-numbers');

// tailwind.config.js
module.exports = {
  content: ["./pages/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend:{
        colors: {
          transparent: 'transparent',
          primc: '#41808B',
          back: "#1f1f1f",
          backL: "#303030",
          backScheme: generatePalette('#1f1f1f')
        },
      }
    },
  }

// module.exports = {
//   content: [],
//
//   plugins: [],
// }

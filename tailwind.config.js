/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./pages/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend:{
        colors: {
          transparent: 'transparent',
          primc: '#41808B',
          back: "#1f1f1f",
          backL: "#292929"
        },
      }
    },
  }

// module.exports = {
//   content: [],
//
//   plugins: [],
// }

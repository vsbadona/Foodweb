/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width:{
        "400":"400px"},
      flex:{
        '1/4' : '1 1 25%',
        '1/2' : '1 1 50%'
      }
    },
      screens: {
        'tablet': '750px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
  },
  plugins: [],
}
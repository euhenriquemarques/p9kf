/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bungee: ['Bungee Hairline', 'sans-serif'], // Define Anton como a fonte display
      },
    },
  },
  plugins: [],
}

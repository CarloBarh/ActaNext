/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    legacyColors: true, // 👈 esto desactiva el uso de `oklch`
    extend: {
      colors: {
        primary: '#E63946',
        secondary: '#F4A261',
      },
    },
  },
  plugins: [],
}

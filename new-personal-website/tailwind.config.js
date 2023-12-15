/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#013220',
        'neon-green': '#00E591',
        'dark-gray': '#1A1A1A',
        'gray': '#242424',
      }
    },
  },
  plugins: [],
}


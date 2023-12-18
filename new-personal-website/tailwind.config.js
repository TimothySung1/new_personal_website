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
        'mid-dark-green': '#007047',
        'neon-green': '#00E591',
        'light-neon-green': '#00FFA1',
        'dark-gray': '#1A1A1A',
        'gray': '#242424',
      },
      rotate: {
        '35': '35deg',
      },
      margin: {
        '.5': '0.125rem',
        '1.5': '0.375rem',
      }
    },
  },
  plugins: [],
}


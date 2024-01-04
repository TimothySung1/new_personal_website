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
      },
      height: {
        '98vh': '98vh',
        '100vh': '100vh',
      },
      width: {
        '100vw': '100vw',
        '45%': '45%',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
      animation: {
        ballbounce: 'ballbounce 1.5s ease-in-out infinite',
        fadeout: 'fadeout 1s ease-out 0.8s 1 forwards',
        loadingball: 'ballbounce 1.5s ease-in-out infinite, fadeout 1.5s ease-out 1 forwards'
      },
      keyframes: {
        ballbounce: {
          // '0%': { transform: 'translate(-20px)'},
          '20%': { transform: 'translate(0, -30px)' },
          '40%': { transform: 'translate(0, 0)' },
        },
        fadeout: {
          '100%': { opacity: '0' },
        }
      },
    },
  },
  plugins: [],
}


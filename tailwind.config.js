/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
     fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    screens: {
      'sm': '375px',
      // => @media (min-width: 375px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1366px',
      // => @media (min-width: 1024px) { ... }

      'xl': '2500px',
      // => @media (min-width: 1366px) { ... }
    }
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d9488',
          dark: '#0f766e',
          light: '#5eead4'
        },
        accent: '#f97316',
        ink: '#0f172a'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 20px 45px -20px rgba(15, 23, 42, 0.3)'
      }
    }
  },
  plugins: []
};




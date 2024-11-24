/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f9faf5',
          100: '#f1f4e8',
          200: '#e0e7cc',
          300: '#c5d3a3',
          400: '#a7bc77',
          500: '#8ba354',
          600: '#708542',
          700: '#576735',
          800: '#48532d',
          900: '#3d4527',
        },
      },
      fontFamily: {     
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
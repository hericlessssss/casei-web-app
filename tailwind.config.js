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
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.813rem', { lineHeight: '1.25rem' }],
        'base': ['0.875rem', { lineHeight: '1.5rem' }],
        'lg': ['1rem', { lineHeight: '1.75rem' }],
        'xl': ['1.125rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.25rem', { lineHeight: '2rem' }],
        '3xl': ['1.5rem', { lineHeight: '2rem' }],
        '4xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '5xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '6xl': ['2.75rem', { lineHeight: '1' }],
        '7xl': ['3.25rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
};
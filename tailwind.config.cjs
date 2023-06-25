/* eslint-disable node/no-unpublished-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        heliotrope: {
          DEFAULT: '#F484FA',
          50: '#FCDAFD',
          100: '#FBCEFD',
          200: '#F8B5FC',
          300: '#F69DFB',
          400: '#F484FA',
          500: '#F058F8',
          600: '#EC2CF6',
          700: '#DF0AEB',
          800: '#B508BF',
          900: '#8B0693',
          950: '#76057C',
        },
        spray: {
          DEFAULT: '#5EEAF4',
          50: '#E4FBFD',
          100: '#D1F9FC',
          200: '#AAF4F9',
          300: '#84EFF7',
          400: '#5EEAF4',
          500: '#2EE4F1',
          600: '#0FCFDD',
          700: '#0CA2AD',
          800: '#09767D',
          900: '#05494E',
          950: '#043236',
        },
        'electric-violet': {
          DEFAULT: '#5840FF',
          10: '#c6c0f1',
          50: '#BCB3FF',
          100: '#B1A6FF',
          200: '#9B8DFF',
          300: '#8573FF',
          400: '#6E5AFF',
          500: '#5840FF',
          600: '#4632D5',
          700: '#311FB0',
          800: '#281D7A',
          900: '#1B154A',
          950: '#140F34',
        },
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
};

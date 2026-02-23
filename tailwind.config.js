/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        interTight: ['"Inter Tight"', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        cabin: ['Cabin', 'sans-serif'],
        instrumentSerif: ['"Instrument Serif"', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#11173b',
          light: '#1e285d',
          dark: '#0a0d24',
        },
        secondary: {
          DEFAULT: '#7a553a',
          light: '#9d6d4a',
          dark: '#583e29',
        },
        dark: '#050714',
      },
      boxShadow: {
        glow: '0 0 40px rgba(122, 85, 58, 0.3)',
      },
    },
  },
  plugins: [],
};

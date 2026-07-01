/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        space: {
          bg: '#03050a',
          surface: 'rgba(255,255,255,0.04)',
          border: 'rgba(255,255,255,0.08)',
        },
        accent: {
          DEFAULT: '#4f8ef7',
          2: '#a78bfa',
        },
        gold: '#f0c060',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

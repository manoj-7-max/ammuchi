/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amuchi: {
          green: '#4CAF50',
          darkgreen: '#2E7D32',
          brown: '#795548',
          beige: '#F5F5DC',
          darkbrown: '#4E342E'
        }
      },
      fontFamily: {
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

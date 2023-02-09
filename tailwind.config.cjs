/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
        "shimmer": "shimmer 1.5s infinite"
      }
    },
  },
  plugins: [],
}

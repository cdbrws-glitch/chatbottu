/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        dark: '#1a1a1a',
        darkcard: '#2d2d2d',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // or "./app/**/*.{js,ts,jsx,tsx}" for Next.js App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

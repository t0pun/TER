/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   // "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  styles: [
    "src/styles.css",
    "./node_modules/tailwindcss/base.css",
    "./node_modules/tailwindcss/components.css",
    "./node_modules/tailwindcss/utilities.css"
  ],
}


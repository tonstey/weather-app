/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        barColor: '#24343d',
        buttonColor: '#406b82',
        descColor: '#a6e0ff',
        cityColor: '#24353e',
      },
      spacing: {
        '128': '32rem',
        '160': '40rem',
        '200': '50rem',
      }
    },
  },
  plugins: [],
}


const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#318AE4',
        'black-primary': '#041C32',
        'black-secondary': '#04293A',
        'white-primary': '#F9FAFB',
        'blue-gradient-1': '#36b7b7',
        'blue-gradient-2': '#3081ed',
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        heading: ['Montserrat', ...defaultTheme.fontFamily.sans],
        logo: ['Lato', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

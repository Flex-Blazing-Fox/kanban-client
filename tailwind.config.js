const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./**/*.html', './**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif"
      },
      colors: {
        teal: colors.teal
      },
      gridTemplateRows: {
        'layout': '80px 80px 75%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

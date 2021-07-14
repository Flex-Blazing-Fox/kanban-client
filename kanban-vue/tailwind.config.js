const colors = require('tailwindcss/colors')

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal
      },
      gridTemplateRows: {
        'layout': '80px 80px 75%'
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif"
      },
      width: {
        '280': '280px'
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

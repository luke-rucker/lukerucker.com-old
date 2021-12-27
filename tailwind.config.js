const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Source Code Pro', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}

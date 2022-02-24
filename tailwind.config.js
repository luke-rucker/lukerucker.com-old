module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {},
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['garden'],
  },
}

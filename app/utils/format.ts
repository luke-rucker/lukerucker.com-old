// Thank you https://github.com/joakimbeng/kebab-case/blob/master/index.js
const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g
const REVERSE_REGEX = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g

export const toKebabCase = (str: string) =>
  str.replace(KEBAB_REGEX, match => `-${match.toLowerCase()}`)

export const fromKebabCase = (str: string) =>
  str.replace(REVERSE_REGEX, match => match.slice(1))

export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`

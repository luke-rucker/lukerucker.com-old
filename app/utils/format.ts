// Thank you https://github.com/joakimbeng/kebab-case/blob/master/index.js
const REVERSE_REGEX = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g

export const fromKebabCase = (str: string) =>
  str.replace(REVERSE_REGEX, match => match.replace('-', ' '))

export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`

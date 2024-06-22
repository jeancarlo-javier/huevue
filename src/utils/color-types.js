import { rgbRegex, hslRegex, hslPatternSpaceSeparated, hslaPattern } from './regexColors.js'

function getColorType(color) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

  if (hexRegex.test(color)) {
    return 'hex'
  } else if (rgbRegex.test(color)) {
    return 'rgb'
  } else if (hslRegex.test(color) || hslPatternSpaceSeparated.test(color) || hslaPattern.test(color)) {
    return 'hsl'
  } else {
    return null
  }
}

export default getColorType

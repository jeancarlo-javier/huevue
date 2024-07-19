import { rgbRegex, hslRegex, hslPatternSpaceSeparated, hslaPattern, hexRegex } from './regexColors.js'

function getColorType(color) {
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

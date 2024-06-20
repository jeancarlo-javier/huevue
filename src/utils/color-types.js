import { rgbRegex } from './regexColors.js'

function getColorType (color) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  const hslRegex = /^hsla?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})%\s*,\s*([0-9]{1,3})%\s*(?:,\s*(0|1|0?\.\d+))?\)$/

  if (hexRegex.test(color)) {
    return 'hex'
  } else if (rgbRegex.test(color)) {
    return 'rgb'
  } else if (hslRegex.test(color)) {
    return 'hsl'
  } else {
    return null
  }
}

export default getColorType

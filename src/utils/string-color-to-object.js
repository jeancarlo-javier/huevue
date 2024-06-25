import { rgbRegex, hslRegex, hslPatternSpaceSeparated, hslaPattern } from './regexColors.js'

/**
 * Convert RGBA color string To Object
 * @param {String} color - Rgba String Color
 * @returns {Object}
 */
export function rgbaStringToObject(color) {
  const match = color.match(rgbRegex)

  if (!match) {
    return null
  }

  const result = {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: 1
  }

  // Handle the alpha value
  const alphaValue = match[4] || match[5]
  if (alphaValue) {
    if (alphaValue.includes('%')) {
      result.a = parseFloat(alphaValue) / 100
    } else {
      result.a = parseFloat(alphaValue)
    }
  }

  // Validate RGB values are in the range 0-255
  if (result.r > 255 || result.g > 255 || result.b > 255) {
    return null
  }

  // Validate alpha value is in the range 0-1
  if (result.a > 1) {
    return null
  }

  return result
}

/**
 * Converts an HSL or HSLA string to an object with hue, saturation, lightness, and optional alpha properties.
 * @param {string} hslColor - The HSL or HSLA string to convert.
 * @returns {Object|null} An object with hue, saturation, lightness, and optional alpha properties, or null if the input is invalid.
 */
export function hslStringToObject(hslColor) {
  const match = hslColor.match(hslRegex) || hslColor.match(hslPatternSpaceSeparated) || hslColor.match(hslaPattern)

  if (!match) return null

  const h = parseInt(match[1])
  const s = parseInt(match[3])
  const l = parseInt(match[4])
  // const a = match[5] ? parseFloat(match[5]) : undefined

  // Normalize hue to be between 0 and 360, where 360 is considered as 0
  // h = h % 360
  if (h < 0 || h > 360) return null

  // Check if saturation and lightness are between 0 and 100
  if (s < 0 || s > 100 || l < 0 || l > 100) return null

  const result = { h, s, l }
  // if (a !== undefined) {
  //   result.a = a
  // }

  return result
}

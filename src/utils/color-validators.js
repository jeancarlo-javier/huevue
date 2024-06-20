import { rgbRegex, hslRegex, hslPatternSpaceSeparated, hslaPattern } from './regexColors.js'

/**
 * Validates a hexadecimal color string.
 * @param {string} hexColor
 * @returns {boolean}
 */
export function isHexValid (hexColor) {
  // Verify that the string starts with #
  if (!hexColor.startsWith('#')) {
    return false
  }

  // Remove the # symbol
  hexColor = hexColor.slice(1)

  // Verify that the string has a length of 6 characters
  if (hexColor.length !== 6) {
    return false
  }

  // Verify that all characters are valid in Hexadecimal
  const hexPattern = /^[0-9A-Fa-f]{6}$/
  return hexPattern.test(hexColor)
}

/**
 * Validate an RGBA color string
 * @param {String} rgbaColor - Rgba String Color
 * @returns {Boolean}
 */
export function isRgbaValid (rgbaColor) {
  if (rgbRegex.test(rgbaColor)) {
    return true
  }

  return false
}

/**
 * Validates if the given HSL or HSLA color string is valid.
 * @param {string} hslColor - The HSL or HSLA color string in the format "hsl(H, S%, L%)" or "hsla(H, S%, L%, A)".
 * @returns {boolean} - Returns true if the HSL or HSLA color is valid, false otherwise.
 */
export function isHslValid (hslColor) {
  const match = hslColor.match(hslRegex) || hslColor.match(hslPatternSpaceSeparated) || hslColor.match(hslaPattern)

  if (!match) return false

  const hue = parseInt(match[1])
  const saturation = parseInt(match[3])
  const lightness = parseInt(match[4])

  if (hue < 0 || hue > 360) return false
  if (saturation < 0 || saturation > 100) return false
  if (lightness < 0 || lightness > 100) return false

  if (match[5]) {
    const alpha = parseFloat(match[5])
    if (alpha < 0 || alpha > 1) return false
  }

  return true
}

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
 * @param {String} color - Rgba String Color
 * @returns {Boolean}
 */
export function isRgbaValid (color) {
  // Regular expressions for RGB and RGBA formats
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
  const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/
  const rgbPercentRegex = /^rgb\(\s*(\d{1,3})\s*(\s)\s*(\d{1,3})\s*(\s)\s*(\d{1,3})\s*\/\s*([\d.]+)%\s*\)$/

  if (rgbRegex.test(color) || rgbaRegex.test(color) || rgbPercentRegex.test(color)) {
    return true
  }

  return false
}

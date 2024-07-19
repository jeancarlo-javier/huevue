/**
 * Converts a transparency (alpha) value to its hexadecimal representation.
 * @param {number} alpha - The transparency value, in the range [0, 1].
 * @returns {string} The hexadecimal representation of the transparency value, e.g., '80' for 0.5 transparency.
 */
export function transparencyToHex(alpha) {
  if (alpha === 1) return 'ff'

  // Convert alpha to a two-character hexadecimal value
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0')

  return alphaHex
}

/**
 * Extracts the alpha transparency level from a hex color code.
 * @param {string} hexColor - The hex color code in the format #RRGGBBAA, #RGBA, #RRGGBB, or #RGB.
 * @returns {number} - The transparency level as a percentage (0-100).
 */
export function getHexTransparency(hexColor) {
  // Extract the alpha component based on the length of the hex color code
  let alphaHex
  if (hexColor.length === 9) {
    // Format #RRGGBBAA
    alphaHex = hexColor.slice(7, 9)
  } else if (hexColor.length === 5) {
    // Format #RGBA
    alphaHex = hexColor.slice(4, 5).repeat(2) // Repeat the character to make it equivalent to AA
  } else if (hexColor.length === 7 || hexColor.length === 4) {
    // Format #RRGGBB or #RGB (no transparency)
    return 100 // Fully opaque
  } else {
    throw new Error('Invalid hex color length. Must be #RRGGBBAA, #RGBA, #RRGGBB, or #RGB')
  }

  // Convert the alpha hex value to a decimal (0-255)
  const alphaDecimal = parseInt(alphaHex, 16)

  // Calculate the transparency percentage
  const transparencyPercentage = (alphaDecimal / 255) * 100

  return Math.round(transparencyPercentage)
}

/**
 * Removes the alpha transparency component from a hex color code.
 * @param {string} hexColor - The hex color code in the format #RRGGBBAA, #RGBA, #RRGGBB, or #RGB.
 * @returns {string} - The hex color code without the alpha transparency component.
 */
export function removeHexTransparency(hexColor) {
  // Remove the alpha component based on the length of the hex color code
  if (hexColor.length === 9) {
    // Format #RRGGBBAA -> Return #RRGGBB
    return hexColor.slice(0, 7)
  } else if (hexColor.length === 5) {
    // Format #RGBA -> Return #RGB
    return hexColor.slice(0, 4)
  } else if (hexColor.length === 7 || hexColor.length === 4) {
    // Format #RRGGBB or #RGB (no transparency)
    return hexColor // Return as is
  } else {
    return hexColor // Return as is if the format is invalid
  }
}

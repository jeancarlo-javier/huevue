/**
 * Converts a transparency (alpha) value to its hexadecimal representation.
 * @param {number} alpha - The transparency value, in the range [0, 1].
 * @returns {string} The hexadecimal representation of the transparency value, e.g., '80' for 0.5 transparency.
 */
export function transparencyToHex (alpha) {
  if (alpha === 1) return 'ff'

  // Convert alpha to a two-character hexadecimal value
  const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0')

  return alphaHex
}

export function rgbaStringToObject (color) {
  // Combined regular expression for RGB, RGBA, and RGB percentage formats
  const combinedRegex = /^rgba?\(\s*(\d{1,3})\s*(?:,\s*|\s+)(\d{1,3})\s*(?:,\s*|\s+)(\d{1,3})(?:\s*\/\s*([\d.]+%?)|\s*,\s*([\d.]+%?))?\s*\)$/

  const match = color.match(combinedRegex)

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

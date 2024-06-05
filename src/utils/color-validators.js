export function isHexValid (hexColor) {
  // Expresión regular que valida colores hexadecimales de 6 o 8 dígitos con o sin '#'
  const regex = /^#?([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/

  return regex.test(hexColor)
}

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

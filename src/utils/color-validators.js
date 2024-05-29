export function validateHexColor (hexColor) {
  // Expresión regular que valida colores hexadecimales de 6 o 8 dígitos con o sin '#'
  const regex = /^#?([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/

  return regex.test(hexColor)
}

export function validateRgbaAndConvertToObject (color) {
  // Regular expressions for RGB and RGBA formats
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
  const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/
  const rgbPercentRegex = /^rgb\(\s*(\d{1,3})\s*(\s)\s*(\d{1,3})\s*(\s)\s*(\d{1,3})\s*\/\s*([\d.]+)%\s*\)$/

  let match
  const result = { r: null, g: null, b: null, a: 1 }

  if (rgbRegex.test(color)) {
    match = color.match(rgbRegex)
    result.r = parseInt(match[1], 10)
    result.g = parseInt(match[2], 10)
    result.b = parseInt(match[3], 10)
  } else if (rgbaRegex.test(color)) {
    match = color.match(rgbaRegex)
    result.r = parseInt(match[1], 10)
    result.g = parseInt(match[2], 10)
    result.b = parseInt(match[3], 10)
    result.a = parseFloat(match[4])
  } else if (rgbPercentRegex.test(color)) {
    match = color.match(rgbPercentRegex)
    result.r = parseInt(match[1], 10)
    result.g = parseInt(match[3], 10)
    result.b = parseInt(match[5], 10)
    result.a = parseFloat(match[6]) / 100
  } else {
    return [false, {}]
  }

  // Validate RGB values are in the range 0-255
  if (result.r < 0 || result.r > 255 || result.g < 0 || result.g > 255 || result.b < 0 || result.b > 255) {
    return [false, {}]
  }

  // Validate alpha value is in the range 0-1
  if (result.a < 0 || result.a > 1) {
    return [false, {}]
  }

  return [true, result]
}

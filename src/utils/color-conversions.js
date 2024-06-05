import { isRgbaValid, isHexValid } from './color-validators'

export function hsbToHsl (h, s, b) {
  const lightness = (2 - s / 100) * b / 2
  let saturation

  if (lightness !== 0) {
    if (lightness === 100) {
      saturation = 0
    } else if (lightness <= 50) {
      // Calcula la saturación y luego normaliza al rango 0-100
      saturation = (s * b / 100) / (lightness * 2)
    } else {
      // Calcula la saturación y luego normaliza al rango 0-100
      saturation = (s * b / 100) / (200 - lightness * 2)
    }
    // Normalizar saturación para garantizar que siempre esté entre 0 y 100
    saturation = Math.min(100, Math.max(0, saturation * 100))
  } else {
    saturation = 0
  }

  return { h, s: Math.round(saturation), l: Math.round(lightness) }
}

export function hslToHsb (h, s, l) {
  // Convert saturation and lightness from percentage to a 0-1 scale
  s /= 100
  l /= 100

  let brightness = l + s * Math.min(l, 1 - l)
  let saturation
  if (brightness === 0) {
    saturation = 0
  } else {
    saturation = 2 * (brightness - l) / brightness
  }

  // Convert results back to percentage
  brightness *= 100
  saturation *= 100

  // Hue remains unchanged
  return { h, s: Math.round(saturation), b: Math.round(brightness) }
}

export function hslToRgb (h, s, l) {
  if (h === 360) h = 0 // Normalize h to 0 if it's 360

  s /= 100 // Convert saturation from percentage to a 0-1 scale
  l /= 100 // Convert lightness from percentage to a 0-1 scale

  const c = (1 - Math.abs(2 * l - 1)) * s // Calculate chroma based on lightness and saturation
  const x = c * (1 - Math.abs((h / 60) % 2 - 1)) // Calculate second largest component of color
  const m = l - c / 2 // Calculate the middle point of the color

  let r = 0; let g = 0; let b = 0

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return { r, g, b }
}

export function hslToHex (h, s, l, a) {
  const { r, g, b } = hslToRgb(h, s, l)
  const toHex = x => x.toString(16).padStart(2, '0')

  let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`

  if (a !== null && a !== undefined && a >= 0 && a < 100) {
    const alpha = Math.round(a * 2.55).toString(16).padStart(2, '0')
    hex += alpha
  }

  return hex.toUpperCase()
}

export function hexToRgb (hexColor) {
  if (!isHexValid(hexColor)) {
    throw new Error('Invalid hex color format')
  }

  // Remove the hash at the start if it's there
  hexColor = hexColor.replace(/^#/, '')

  // If it's a shorthand hex color, convert to full form
  if (hexColor.length === 3) {
    hexColor = hexColor.split('').map(char => char + char).join('')
  }

  // Parse the r, g, b values
  const bigint = parseInt(hexColor, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

export function hexToHsl (hexColor) {
  let { r, g, b } = hexToRgb(hexColor)

  // Convertir RGB a valores de 0 a 1
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h; let s; let l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  // Convertir h, s, l a valores entre 0-360 para h, y 0-100% para s y l
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return { h, s, l }
}

export function rgbToHsl (r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h; let s; const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

export function convertToHsl (value, colorType) {
  try {
    if (colorType === 'hex') {
      return hexToHsl(value)
    }

    if (colorType === 'rgb') {
      const [isValid, rgbaColor] = isRgbaValid(value)

      if (isValid) {
        const hslColor = rgbToHsl(rgbaColor.r, rgbaColor.g, rgbaColor.b)
        console.log(hslColor)

        return hslColor
      }

      return { h: 0, s: 0, l: 0 }
    }
  } catch (e) {
    console.error(e.message)
    return { h: 0, s: 0, l: 0 }
  }
}

// New Functions
/**
 * Convert HSB (Hue, Saturation, Brightness) to RGB (Red, Green, Blue).
 * @param {number} h - Hue value in the range [0, 360)
 * @param {number} s - Saturation value in the range [0, 100]
 * @param {number} b - Brightness value in the range [0, 100]
 * @returns {Object} An object containing the RGB values {r, g, b} each in the range [0, 255]
 */
export function hsbToRgb (h, s, b) {
  // Ensure the input values are within the expected ranges
  if (h < 0 || h > 360) throw new RangeError('Hue (h) must be in the range [0, 360)')
  if (s < 0 || s > 100) throw new RangeError('Saturation (s) must be in the range [0, 100]')
  if (b < 0 || b > 100) throw new RangeError('Brightness (b) must be in the range [0, 100]')

  // Convert saturation and brightness from percentages to the range [0, 1]
  s /= 100
  b /= 100

  const k = (n) => (n + h / 60) % 6
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)))

  // Calculate the RGB values
  const r = Math.round(f(5) * 255)
  const g = Math.round(f(3) * 255)
  const bValue = Math.round(f(1) * 255)

  return { r: Math.round(r), g: Math.round(g), b: Math.round(bValue) }
}

/**
 * Converts an RGB color value to HSB.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h in the range [0, 360], s and b in the range [0, 100].
 *
 * @param {number} r - The red color value
 * @param {number} g - The green color value
 * @param {number} b - The blue color value
 * @returns {Object} An object with properties h, s, and b
 */
export function rgbToHsb (r, g, b) {
  // Ensure r, g, and b are within the range [0, 255]
  r = Math.min(255, Math.max(0, r))
  g = Math.min(255, Math.max(0, g))
  b = Math.min(255, Math.max(0, b))

  // Convert r, g, b from [0, 255] to [0, 1]
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  // Find the minimum and maximum values of r, g, b
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)

  // Calculate the brightness (b)
  const brightness = max

  // Calculate the saturation (s)
  const saturation = max === 0 ? 0 : (max - min) / max

  // Calculate the hue (h)
  let hue = 0
  if (max === min) {
    hue = 0 // If max and min are equal, hue is 0
  } else if (max === rNorm) {
    hue = (60 * ((gNorm - bNorm) / (max - min)) + 360) % 360
  } else if (max === gNorm) {
    hue = (60 * ((bNorm - rNorm) / (max - min)) + 120) % 360
  } else if (max === bNorm) {
    hue = (60 * ((rNorm - gNorm) / (max - min)) + 240) % 360
  }

  // Convert saturation and brightness to percentage
  const saturationPercent = saturation * 100
  const brightnessPercent = brightness * 100

  // Return the HSB values as an object
  return {
    h: Math.round(hue),
    s: Math.round(saturationPercent),
    b: Math.round(brightnessPercent)
  }
}

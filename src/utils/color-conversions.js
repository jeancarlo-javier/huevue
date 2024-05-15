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
  if (h === 360) h = 0 // Nomalize h to 0 if it's 360

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
  // Eliminar el "#" si está presente
  hexColor = hexColor.replace(/^#/, '')

  // Convertir los valores hexadecimales a RGB
  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)

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
  let h; let s; let l = (max + min) / 2

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

  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return { h, s, l }
}

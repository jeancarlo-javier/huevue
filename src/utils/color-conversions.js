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

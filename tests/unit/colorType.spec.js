import getColorType from '@/utils/color-types.js'
import { validHexColors, validHslColors, validRgbColors } from './utils/colorSets.js'
import { expect, it } from 'vitest'

describe('Color Type', () => {
  it('should return "hex" for a valid hex color', () => {
    validHexColors.forEach((color) => {
      const colorType = getColorType(color)
      expect(colorType).toBe('hex')
    })
  })

  it('should return "rgb" for a valid rgb color', () => {
    validRgbColors.forEach((color) => {
      const colorType = getColorType(color)
      expect(colorType).toBe('rgb')
    })
  })

  it('returns "hsl" for a valid hsl color', () => {
    validHslColors.forEach((color) => {
      const colorType = getColorType(color)
      console.log(color, colorType)
      expect(colorType).toBe('hsl')
    })
  })
})

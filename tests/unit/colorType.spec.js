import getColorType from '@/utils/color-types.js'
import { validHexColors, validRgbColors } from './utils/colorSets.js'

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
})

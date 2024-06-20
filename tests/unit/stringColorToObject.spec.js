import { rgbaStringToObject, hslStringToObject } from '@/utils/string-color-to-object.js'
import { invalidRgbColors, invalidHslColors, rgbStringMap, hslStringMap } from './utils/colorSets'

describe('String Color to Object', () => {
  describe('rgbaStringToObject', () => {
    it('returns null for invalid color strings', () => {
      invalidRgbColors.forEach((color) => {
        const rgbaObject = rgbaStringToObject(color)
        expect(rgbaObject).toBe(null)
      })
    })

    it('returns an object for valid color strings', () => {
      Object.entries(rgbStringMap).forEach(([color, expectedObject]) => {
        const rgbaObject = rgbaStringToObject(color)
        expect(rgbaObject).toEqual(expectedObject)
      })
    })
  })

  describe('hslStringToObject', () => {
    it('returns null for invalid color strings', () => {
      invalidHslColors.forEach((color) => {
        const hslObject = hslStringToObject(color)
        expect(hslObject).toBe(null)
      })
    })

    it('returns an object for valid color strings', () => {
      Object.entries(hslStringMap).forEach(([color, expectedObject]) => {
        const hslObject = hslStringToObject(color)
        expect(hslObject).toEqual(expectedObject)
      })
    })
  })
})

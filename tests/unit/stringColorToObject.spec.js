import { rgbaStringToObject } from '@/utils/string-color-to-object.js'

describe('String Color to Object', () => {
  describe('rgbaStringToObject', () => {
    it('returns null for invalid color strings', () => {
      const invalidColors = [
        'rgb(255 0 0 / 39)',
        'rgba(0,0,0,10)',
        'rgba(0,0,0,-10)',
        'rgba(256,0,0,1.5)',
        'rgba(0,256,0,-1)',
        'rgba(0,0,256,2)',
        'rgb(255,255,255,2)',
        'rgba(255,255,255,1.2)',
        'rgb(-10,255,0)',
        'rgba(255,-10,0,1)',
        'rgba(0,0,0,1,1)',
        'rgb(0,0)',
        'rgb(255,255,255,255)',
        'rgba(255,255,255,255)',
        'rgb(a,b,c)',
        'rgba(a,b,c,d)',
        'rgb(0,0,0'
      ]

      invalidColors.forEach((color) => {
        const rgbaObject = rgbaStringToObject(color)
        expect(rgbaObject).toBe(null)
      })
    })

    it('returns an object for valid color strings', () => {
      const validColors = {
        'rgba(0,0,255,0.5)': { r: 0, g: 0, b: 255, a: 0.5 },
        'rgb(255 0 0 / 39%)': { r: 255, g: 0, b: 0, a: 0.39 },
        'rgb(255,0,0)': { r: 255, g: 0, b: 0, a: 1 },
        'rgba(255,0,0,1)': { r: 255, g: 0, b: 0, a: 1 },
        'rgb(0,255,0)': { r: 0, g: 255, b: 0, a: 1 },
        'rgba(0,255,0,1)': { r: 0, g: 255, b: 0, a: 1 },
        'rgb(0,0,255)': { r: 0, g: 0, b: 255, a: 1 },
        'rgba(0,0,255,1)': { r: 0, g: 0, b: 255, a: 1 },
        'rgb(255,255,255)': { r: 255, g: 255, b: 255, a: 1 },
        'rgba(255,255,255,1)': { r: 255, g: 255, b: 255, a: 1 },
        'rgb(0,0,0)': { r: 0, g: 0, b: 0, a: 1 },
        'rgba(0,0,0,1)': { r: 0, g: 0, b: 0, a: 1 },
        'rgb(255,255,0)': { r: 255, g: 255, b: 0, a: 1 },
        'rgba(255,255,0,1)': { r: 255, g: 255, b: 0, a: 1 },
        'rgb(0,255,255)': { r: 0, g: 255, b: 255, a: 1 },
        'rgba(0,255,255,1)': { r: 0, g: 255, b: 255, a: 1 },
        'rgb(255,0,255)': { r: 255, g: 0, b: 255, a: 1 },
        'rgba(255,0,255,1)': { r: 255, g: 0, b: 255, a: 1 },
        'rgb(128,128,128)': { r: 128, g: 128, b: 128, a: 1 },
        'rgba(128,128,128,1)': { r: 128, g: 128, b: 128, a: 1 },
        'rgba(255,0,0,0.5)': { r: 255, g: 0, b: 0, a: 0.5 },
        'rgba(0,255,0,0.5)': { r: 0, g: 255, b: 0, a: 0.5 },
        'rgba(0,0,0,0)': { r: 0, g: 0, b: 0, a: 0 }
      }

      Object.entries(validColors).forEach(([color, expectedObject]) => {
        const rgbaObject = rgbaStringToObject(color)
        expect(rgbaObject).toEqual(expectedObject)
      })
    })
  })
})

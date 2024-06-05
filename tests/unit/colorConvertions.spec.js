import { rgbToHsb, hsbToRgb } from '@/utils/color-conversions.js'

describe('Color Convertions', () => {
  const rgbHslColors = [
    { rgb: { r: 0, g: 0, b: 0 }, hsb: { h: 0, s: 0, b: 0 } },
    { rgb: { r: 255, g: 0, b: 0 }, hsb: { h: 0, s: 100, b: 100 } },
    { rgb: { r: 0, g: 255, b: 0 }, hsb: { h: 120, s: 100, b: 100 } },
    { rgb: { r: 0, g: 0, b: 255 }, hsb: { h: 240, s: 100, b: 100 } },
    { rgb: { r: 255, g: 255, b: 255 }, hsb: { h: 0, s: 0, b: 100 } },
    { rgb: { r: 54, g: 69, b: 186 }, hsb: { h: 233, s: 71, b: 73 } },
    { rgb: { r: 59, g: 54, b: 0 }, hsb: { h: 55, s: 100, b: 23 } },
    { rgb: { r: 69, g: 69, b: 69 }, hsb: { h: 0, s: 0, b: 27 } },
    { rgb: { r: 107, g: 0, b: 87 }, hsb: { h: 311, s: 100, b: 42 } },
    { rgb: { r: 128, g: 128, b: 128 }, hsb: { h: 0, s: 0, b: 50 } },
    { rgb: { r: 0, g: 38, b: 255 }, hsb: { h: 231, s: 100, b: 100 } },
    { rgb: { r: 128, g: 190, b: 143 }, hsb: { h: 135, s: 33, b: 75 } }
  ]

  it('converts rgb to hsb', () => {
    rgbHslColors.forEach(({ rgb, hsb }) => {
      const hsbResult = rgbToHsb(rgb.r, rgb.g, rgb.b)
      expect(hsbResult).toEqual(hsb)

      expect(hsbResult.h).toBe(Math.round(hsbResult.h))
      expect(hsbResult.s).toBe(Math.round(hsbResult.s))
      expect(hsbResult.b).toBe(Math.round(hsbResult.b))
    })
  })

  it('converts hsb to rgb', () => {
    rgbHslColors.forEach(({ hsb, rgb }) => {
      const rgbResult = hsbToRgb(hsb.h, hsb.s, hsb.b)
      expect(rgbResult).toEqual(rgb)

      expect(rgbResult.r).toBe(Math.round(rgbResult.r))
      expect(rgbResult.g).toBe(Math.round(rgbResult.g))
      expect(rgbResult.b).toBe(Math.round(rgbResult.b))
    })
  })
})

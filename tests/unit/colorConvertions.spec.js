import { rgbToHsb, hsbToRgb, hsbToHex } from '@/utils/color-conversions.js'
import { rgbHslColors, hsbHexColors } from './utils/colorConvertions.js'

describe('Color Convertions', () => {
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

  it('converts hsb to hex', () => {
    hsbHexColors.forEach(({ hsb, hex }) => {
      const hexResult = hsbToHex(hsb.h, hsb.s, hsb.b)
      expect(hexResult).toEqual(hex)
    })
  })
})

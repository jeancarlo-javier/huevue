import { describe, expect, it } from 'vitest'
import { isRgbaValid, isHexValid, isHslValid } from '@/utils/color-validators.js'
import {
  validHslColors,
  invalidHslColors,
  validHexColors,
  invalidHexColors,
  validRgbColors,
  invalidRgbColors
} from './utils/colorSets.js'

describe('Color Validator', () => {
  describe('isRgbaValid', () => {
    it('returns true if rgba color is valid', () => {
      validRgbColors.forEach((color) => {
        const isValid = isRgbaValid(color)

        expect(isValid).toBe(true)
      })
    })

    it('returns false for invalid RGB colors', () => {
      invalidRgbColors.forEach((color) => {
        const isValid = isRgbaValid(color)

        expect(isValid).toBe(false)
      })
    })
  })

  describe('isHexValid', () => {
    it('returns true if hex color is valid', () => {
      validHexColors.forEach((color) => {
        const isValid = isHexValid(color)

        expect(isValid).toBe(true)
      })
    })

    it('returns false for invalid hex colors', () => {
      invalidHexColors.forEach((color) => {
        const isValid = isHexValid(color)
        expect(isValid).toBe(false)
      })
    })
  })

  describe('isHslValid', () => {
    it('returns true if HSL color is valid', () => {
      validHslColors.forEach((color) => {
        const isValid = isHslValid(color)
        expect(isValid).toBe(true)
      })
    })

    it('returns false for invalid HSL colors', () => {
      invalidHslColors.forEach((color) => {
        const isValid = isHslValid(color)
        expect(isValid).toBe(false)
      })
    })
  })
})

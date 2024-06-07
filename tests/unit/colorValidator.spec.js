import { describe, expect, it } from 'vitest'
import { isRgbaValid, isHexValid } from '@/utils/color-validators.js'

describe('Color Validator', () => {
  describe('isRgbaValid', () => {
    it('returns true if rgba color is valid', () => {
      const validColors = [
        'rgba(0,0,255,0.5)',
        'rgb(255 0 0 / 39%)',
        'rgb(255,0,0)',
        'rgba(255,0,0,1)',
        'rgb(0,255,0)',
        'rgba(0,255,0,1)',
        'rgb(0,0,255)',
        'rgba(0,0,255,1)',
        'rgb(255,255,255)',
        'rgba(255,255,255,1)',
        'rgb(0,0,0)',
        'rgba(0,0,0,1)',
        'rgb(255,255,0)',
        'rgba(255,255,0,1)',
        'rgb(0,255,255)',
        'rgba(0,255,255,1)',
        'rgb(255,0,255)',
        'rgba(255,0,255,1)',
        'rgb(128,128,128)',
        'rgba(128,128,128,1)',
        'rgba(255,0,0,0.5)',
        'rgba(0,255,0,0.5)'
      ]

      validColors.forEach((color) => {
        const isValid = isRgbaValid(color)

        expect(isValid).toBe(true)
      })
    })

    it('should return false for invalid RGB colors', () => {
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
        'rgb(0,0,0,0)',
        'rgba(0,0,0,1,1)',
        'rgb(0,0)',
        'rgba(0,0,0)',
        'rgb(255,255,255,255)',
        'rgba(255,255,255,255)',
        'rgb(a,b,c)',
        'rgba(a,b,c,d)',
        'rgb(0,0,0'
      ]

      invalidColors.forEach((color) => {
        const isValid = isRgbaValid(color)

        expect(isValid).toBe(false)
      })
    })
  })

  describe('isHexValid', () => {
    it('returns true if hex color is valid', () => {
      const validHexColors = [
        '#FF5733', // Red-Orange
        '#33FF57', // Green
        '#3357FF', // Blue
        '#FF33A1', // Pink
        '#33FFF5', // Aqua
        '#F5FF33', // Yellow
        '#FF5733', // Coral
        '#5733FF', // Violet
        '#33FF83', // Light Green
        '#FF3380', // Deep Pink
        '#33FFAC', // Spring Green
        '#3380FF', // Sky Blue
        '#FFA733', // Orange
        '#A733FF', // Purple
        '#FF33C1', // Magenta
        '#33FFC1', // Turquoise
        '#FFC133', // Gold
        '#C133FF', // Plum
        '#FF33E0', // Fuchsia
        '#33FFE0' // Aquamarine
      ]

      validHexColors.forEach((color) => {
        const isValid = isHexValid(color)

        expect(isValid).toBe(true)
      })
    })

    it('returns false for invalid hex colors', () => {
      const invalidHexColors = [
        '#GG5733', // Invalid Hex character
        '#33FF5Z', // Invalid Hex character
        '#3357FG', // Invalid Hex character
        'FF33A1', // Missing #
        '#33FF', // Incomplete Hex code
        '#FF57339', // Too many characters
        '#F5FF33G', // Invalid Hex character
        '5733FF', // Missing #
        '#33FG83', // Invalid Hex character
        '#FF338', // Incomplete Hex code
        '#33FFFG', // Invalid Hex character
        '#3380FFG', // Too many characters
        '#FFA7G3', // Invalid Hex character
        'A733FF', // Missing #
        '#FF33', // Incomplete Hex code
        '#33FFC1G', // Too many characters
        '#FF33E', // Incomplete Hex code
        '33FFE0', // Missing #
        '#33FFZ0', // Invalid Hex character
        '#FF573' // Incomplete Hex code
      ]

      invalidHexColors.forEach((color) => {
        const isValid = isHexValid(color)

        expect(isValid).toBe(false)
      })
    })
  })
})

import { describe, expect, it } from 'vitest'
import { isRgbaValid } from '@/utils/color-validators.js'

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
        console.log(color, isValid)

        expect(isValid).toBe(false)
      })
    })
  })
})

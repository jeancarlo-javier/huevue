import { getHexTransparency, removeHexTransparency } from '../../src/utils/transparency.js'
import { hexTransparencyMap, hexWithaAndWithoutTransparencyMap } from './utils/colorSets.js'

describe('getHexTransparency', () => {
  it('returns the transparency value of a hex color', () => {
    for (const [hexColor, transparency] of Object.entries(hexTransparencyMap)) {
      expect(getHexTransparency(hexColor)).toBe(transparency)
    }
  })

  it('throws an error if the hex color is not in the correct format', () => {
    expect(() => getHexTransparency('#FF5733Z')).toThrow(
      'Invalid hex color length. Must be #RRGGBBAA, #RGBA, #RRGGBB, or #RGB'
    )
    expect(() => getHexTransparency('#FF573')).toThrow(
      'Invalid hex color length. Must be #RRGGBBAA, #RGBA, #RRGGBB, or #RGB'
    )
  })
})

describe('removeHexTransparency', () => {
  it('returns the hex color without the transparency value', () => {
    for (const [hexColor, hexWithoutTransparency] of Object.entries(hexWithaAndWithoutTransparencyMap)) {
      expect(removeHexTransparency(hexColor)).toBe(hexWithoutTransparency)
    }
  })
})

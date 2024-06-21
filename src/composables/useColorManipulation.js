import { rgbToHsb, hexToHsb } from '../utils/color-conversions.js'
import { isRgbaValid, isHexValid, isHslValid } from '../utils/color-validators.js'
import { rgbaStringToObject, hslStringToObject } from '../utils/string-color-to-object.js'
import colorModes from '../config/colorModes'

const useColorManipulation = (store) => {
  const setHue = (value) => {
    store.hue.value = value
    console.log(value)
  }

  const setHex = (hexColor) => {
    store.hex.value = hexColor

    store.updatingFromHueVue.value = true
    const newHsbColor = hexToHsb(store.hex.value)
    setHsb(newHsbColor)
  }

  const setHsl = (hslColor) => {
    store.hsl.h = hslColor.h
    store.hsl.s = hslColor.s
    store.hsl.l = hslColor.l

    store.updatingFromHueVue.value = true
    // const newHsbColor = hslToHsb(store.hsl.h, store.hsl.s, store.hsl.l)
    // setHsb(newHsbColor)
  }

  const setRgb = (rgbColor) => {
    store.rgb.r = rgbColor.r
    store.rgb.g = rgbColor.g
    store.rgb.b = rgbColor.b

    store.updatingFromHueVue.value = true
    const newHsbColor = rgbToHsb(store.rgb.r, store.rgb.g, store.rgb.b)
    setHsb(newHsbColor)
  }

  const setHsb = (hsbColor) => {
    store.hsb.h = hsbColor.h
    store.hsb.s = hsbColor.s
    store.hsb.b = hsbColor.b
  }

  const setDefaultRgbaValue = (value) => {
    if (!isRgbaValid(value)) return

    const rgbaObject = rgbaStringToObject(value)

    store.rgb.r = rgbaObject.r
    store.rgb.g = rgbaObject.g
    store.rgb.b = rgbaObject.b

    store.transparency.value = rgbaObject.a * 100
    store.updatingFromHueVue.value = true

    setHsb(rgbToHsb(store.rgb.r, store.rgb.g, store.rgb.b))
  }

  const setDefaultHexValue = (value) => {
    if (!isHexValid(value)) return

    store.hex.value = value
    store.updatingFromHueVue.value = true

    setHsb(hexToHsb(store.hex.value))
  }

  const setDefaultHslValue = (value) => {
    if (!isHslValid(value)) return

    const hslObject = hslStringToObject(value)
    console.log(hslObject)
  }

  const setTransparency = (value) => {
    store.transparency.value = value
  }

  const setMode = (modeId) => {
    store.currentMode.value = colorModes.find((m) => m.id === modeId)
  }

  const handleOpen = () => {
    store.isOpen.value = !store.isOpen.value
  }

  return {
    setHue,
    setRgb,
    setHex,
    setHsl,
    setHsb,
    setDefaultRgbaValue,
    setDefaultHexValue,
    setDefaultHslValue,
    setTransparency,
    setMode,
    handleOpen
  }
}

export default useColorManipulation

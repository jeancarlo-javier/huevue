import { reactive, ref, provide } from 'vue'
import colorModes from '../config/colorModes'

const useColorStore = () => {
  const isOpen = ref(true)
  const updatingFromHueVue = ref(false)

  const hue = ref(0)
  const HSLColor = ref(null)
  const finalColor = ref(null)

  const hsb = reactive({ h: hue, s: 0, b: 0 })
  const hsl = reactive({ h: hue, s: 0, l: 0 })
  const rgb = reactive({ r: 0, g: 0, b: 0 })

  const hex = ref('')
  // const hexAlpha = ref('')

  const transparency = ref(100)
  const showTransparency = ref(true)

  const currentMode = ref(colorModes.find((m) => m.id === 'rgb'))

  provide('isOpen', isOpen)
  provide('hue', hue)
  provide('HSLColor', HSLColor)
  provide('finalColor', finalColor)
  provide('hsb', hsb)
  provide('hsl', hsl)
  provide('rgb', rgb)
  provide('hex', hex)
  provide('transparency', transparency)
  provide('showTransparency', showTransparency)
  provide('mode', currentMode)

  return {
    hue,
    HSLColor,
    finalColor,
    hsb,
    hsl,
    rgb,
    hex,
    transparency,
    showTransparency,
    currentMode,
    updatingFromHueVue
  }
}

export default useColorStore

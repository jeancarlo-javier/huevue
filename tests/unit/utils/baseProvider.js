import { reactive, ref } from 'vue'
import colorModes from '@/config/colorModes'

const baseProvider = ({
  showTransparency = false,
  hue = 0,
  saturation = 100,
  lightness = 50,
  transparency = 50,
  mode = colorModes[0],
  rgb = { r: 255, g: 0, b: 0 }
} = {}) => ({
  showTransparency: ref(showTransparency),
  hue: ref(hue),
  saturation: ref(saturation),
  lightness: ref(lightness),
  transparency: ref(transparency),
  mode: ref(mode),
  rgb: reactive(rgb)
})

export default baseProvider

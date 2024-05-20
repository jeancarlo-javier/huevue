import { ref } from 'vue'
import colorModes from '@/config/colorModes'

const baseProvider = ({
  showTransparency = false,
  hue = 0,
  saturation = 100,
  lightness = 50,
  transparency = 50,
  mode = colorModes[0]
} = {}) => ({
  showTransparency: ref(showTransparency),
  hue: ref(hue),
  saturation: ref(saturation),
  lightness: ref(lightness),
  transparency: ref(transparency),
  mode: ref(mode)
})

export default baseProvider

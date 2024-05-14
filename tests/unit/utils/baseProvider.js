import { ref } from 'vue'

const baseProvider = ({
  showTransparency = false,
  hue = 0,
  saturation = 100,
  lightness = 50,
  transparency = 50
} = {}) => ({
  showTransparency: ref(showTransparency),
  hue: ref(hue),
  saturation: ref(saturation),
  lightness: ref(lightness),
  transparency: ref(transparency)
})

export default baseProvider

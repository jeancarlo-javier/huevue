<template>
  <AppLayout>
    <template v-slot:colorDisplay>
      <ColorDisplay @handleOpen="this.handleOpen" />
    </template>
    <template v-slot:colorInput>
      <ColorInput
        @setLightness="setLightness"
        @setSaturation="setSaturation"
        @setHue="setHue"
        @setTransparency="setTransparency"
        @setMode="setMode"
      />
    </template>
    <template v-slot:pallete>
      <PalleteSelector @setLightness="setLightness" @setSaturation="setSaturation" />
    </template>
    <template v-slot:hueSlider>
      <HueSlider @setHue="setHue" />
    </template>
    <template v-slot:transparencySlider>
      <TransparencySlider @setTransparency="setTransparency" />
    </template>
  </AppLayout>
  <div :style="{ height: '200px' }" />
  <div>
    <h3>Props</h3>
  </div>
  <label>
    Show Transparency
    <input v-model="showTransparency" type="checkbox" />
  </label>
</template>

<script>
import { ref, provide, watch } from 'vue'
import AppLayout from './components/AppLayout.vue'
import ColorDisplay from './components/ColorDisplay.vue'
import PalleteSelector from './components/PalleteSelector.vue'
import HueSlider from './components/HueSlider.vue'
import TransparencySlider from './components/TransparencySlider.vue'
import ColorInput from './components/ColorInput.vue'
import colorModes from './config/colorModes'
import { hslToHex, hslToRgb } from './utils/color-conversions.js'

export default {
  props: {
    mode: {
      type: String,
      default: 'rgb'
    }
  },
  components: {
    AppLayout,
    ColorDisplay,
    PalleteSelector,
    HueSlider,
    TransparencySlider,
    ColorInput
  },
  setup (props) {
    const isOpen = ref(true)

    const HSLColor = ref(null)

    const hue = ref(0)
    const saturation = ref(100)
    const lightness = ref(50)
    const transparency = ref(50)

    const showTransparency = ref(true)

    const defaultMode = colorModes.find(mode => mode.id === props.mode)

    if (!defaultMode) throw new Error('Mode is not supported or is not valid')

    const mode = ref(defaultMode)

    const handleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const setHue = (value) => {
      hue.value = value
    }

    const setSaturation = (value) => {
      saturation.value = value
    }

    const setLightness = (value) => {
      lightness.value = value
    }

    const setTransparency = (value) => {
      transparency.value = value
    }

    const setMode = (modeId) => {
      mode.value = colorModes.find(m => m.id === modeId)
    }

    provide('isOpen', isOpen)
    provide('showTransparency', showTransparency)
    provide('HSLColor', HSLColor)

    provide('hue', hue)
    provide('saturation', saturation)
    provide('lightness', lightness)
    provide('transparency', transparency)
    provide('mode', mode)

    watch([mode, hue, saturation, lightness, transparency, showTransparency], () => {
      let hslColorContent = `${hue.value}deg ${saturation.value}% ${lightness.value}%`

      if (showTransparency.value) {
        hslColorContent = `${hslColorContent} / ${transparency.value}%`
      }

      HSLColor.value = `hsl(${hslColorContent})`

      if (mode.value.id === 'hex') {
        const hex = hslToHex(hue.value, saturation.value, lightness.value, showTransparency.value ? transparency.value : null)

        document.body.style.background = hex
      } else if (mode.value.id === 'hsl') {
        document.body.style.background = HSLColor.value
      } else if (mode.value.id === 'rgb') {
        const { r, g, b } = hslToRgb(hue.value, saturation.value, lightness.value)

        document.body.style.background = `rgb(${r}, ${g}, ${b}${showTransparency.value ? `, ${transparency.value / 100}` : ''})`
      }
    }, { immediate: true })

    return {
      handleOpen,
      setHue,
      setSaturation,
      setLightness,
      setTransparency,
      setMode,
      // ! Temporal
      showTransparency
    }
  }
}
</script>

<style scoped>
</style>

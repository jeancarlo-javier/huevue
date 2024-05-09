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

export default {
  props: {
    mode: {
      type: String,
      default: 'hsl'
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

    const defaultMode = colorModes.find(mode => mode.id === props.mode)

    if (!defaultMode) throw new Error('Mode is not supported or is no valid')

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

    provide('isOpen', isOpen)

    provide('HSLColor', HSLColor)

    provide('hue', hue)
    provide('saturation', saturation)
    provide('lightness', lightness)
    provide('transparency', transparency)
    provide('mode', mode)

    watch([hue, saturation, lightness, transparency], () => {
      HSLColor.value = `hsl(${hue.value}deg ${saturation.value}% ${lightness.value}% / ${transparency.value}%)`

      // ! Temporal
      document.body.style.background = HSLColor.value
      // ! Temporal
    }, { immediate: true })

    return {
      handleOpen,
      setHue,
      setSaturation,
      setLightness,
      setTransparency
    }
  }
}
</script>

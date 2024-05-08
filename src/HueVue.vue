<template>
  <AppLayout>
    <template v-slot:colorDisplay>
      <ColorDisplay :hue="hue" @handleOpen="this.handleOpen" />
    </template>
    <template v-slot:colorInput>
      <ColorInput>
        <template v-slot:input>
          <HSLInput
            @setLightness="setLightness"
            @setSaturation="setSaturation"
            @setHue="setHue"
            @setTransparency="setTransparency"
          />
        </template>
      </ColorInput>
    </template>
    <template v-slot:pallete>
      <PalleteSelector @setLightness="setLightness" @setSaturation="setSaturation" :hue="hue" />
    </template>
    <template v-slot:hueSelector>
      <HueSelector @setHue="setHue" :hue="hue" />
    </template>
    <template v-slot:transparencySlider>
      <TransparencySlider @setTransparency="setTransparency" />
    </template>
  </AppLayout>
  <div :style="{ height: '200px' }"></div>
  <div>
    <input v-model.number="hue" type="range" min="0" max="360" />
    <input v-model.number="saturation" type="range" min="0" max="100" />
    <input v-model.number="lightness" type="range" min="0" max="100" />
    <input v-model.number="transparency" type="range" min="0" max="100" />
  </div>
</template>

<script>
import { ref, provide, watch } from 'vue'
import AppLayout from './components/AppLayout.vue'
import ColorDisplay from './components/ColorDisplay.vue'
import PalleteSelector from './components/PalleteSelector.vue'
import HueSelector from './components/HueSlider.vue'
import TransparencySlider from './components/TransparencySlider.vue'
import ColorInput from './components/ColorInput.vue'
import HSLInput from './components/modeInputs/HSLInput.vue'
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
    HueSelector,
    TransparencySlider,
    ColorInput,
    HSLInput
  },
  setup (props) {
    const isOpen = ref(true)

    const HSLColor = ref(null)

    const hue = ref(0)
    const saturation = ref(100)
    const lightness = ref(50)
    const transparency = ref(100)

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
      hue,
      saturation,
      lightness,
      transparency,
      handleOpen,
      setHue,
      setSaturation,
      setLightness,
      setTransparency
    }
  }
}
</script>

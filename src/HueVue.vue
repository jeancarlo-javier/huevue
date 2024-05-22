<template>
  <AppLayout>
    <template v-slot:colorDisplay>
      <ColorDisplay @handleOpen="handleOpen" />
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

<script setup>
import { ref, provide, watch } from 'vue'
import AppLayout from './components/AppLayout.vue'
import ColorDisplay from './components/ColorDisplay.vue'
import PalleteSelector from './components/PalleteSelector.vue'
import HueSlider from './components/HueSlider.vue'
import TransparencySlider from './components/TransparencySlider.vue'
import ColorInput from './components/ColorInput.vue'
import colorModes from './config/colorModes'
import getColorType from './utils/color-types.js'
import { hslToHex, hslToRgb, convertToHsl } from './utils/color-conversions.js'

const props = defineProps({
  modes: {
    type: Array,
    default: () => colorModes
  },
  mode: {
    type: String,
    default: colorModes[0].id
  },
  value: {
    type: String,
    default: () => 'rgb(200,100,3)'
  }
})

const isOpen = ref(true)
const HSLColor = ref(null)
const hue = ref(0)
const saturation = ref(0)
const lightness = ref(0)
const transparency = ref(100)
const showTransparency = ref(true)

const defaultMode = colorModes.find(mode => mode.id === props.mode)
if (!defaultMode) throw new Error('Mode is not supported or is not valid')

const currentMode = ref(defaultMode)

watch(() => props.value, (value) => {
  const colorType = getColorType(value)

  currentMode.value = colorModes.find(m => m.id === colorType)

  const { h, s, l } = convertToHsl(value, colorType)

  console.log(h, s, l)

  hue.value = h
  saturation.value = s
  lightness.value = l
}, { immediate: true, once: true })

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
  currentMode.value = colorModes.find(m => m.id === modeId)
}

provide('isOpen', isOpen)
provide('showTransparency', showTransparency)
provide('HSLColor', HSLColor)
provide('hue', hue)
provide('saturation', saturation)
provide('lightness', lightness)
provide('transparency', transparency)
provide('mode', currentMode)

watch([currentMode, hue, saturation, lightness, transparency, showTransparency], () => {
  let hslColorContent = `${hue.value}deg ${saturation.value}% ${lightness.value}%`
  if (showTransparency.value) {
    hslColorContent = `${hslColorContent} / ${transparency.value}%`
  }
  HSLColor.value = `hsl(${hslColorContent})`

  if (currentMode.value.id === 'hex') {
    const hex = hslToHex(hue.value, saturation.value, lightness.value, showTransparency.value ? transparency.value : null)
    document.body.style.background = hex
  } else if (currentMode.value.id === 'hsl') {
    document.body.style.background = HSLColor.value
  } else if (currentMode.value.id === 'rgb') {
    const { r, g, b } = hslToRgb(hue.value, saturation.value, lightness.value)
    document.body.style.background = `rgb(${r}, ${g}, ${b}${showTransparency.value ? `, ${transparency.value / 100}` : ''})`
  }
}, { immediate: true })
</script>

<style scoped>
</style>

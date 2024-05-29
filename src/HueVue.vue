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

        @setRgb="setRgb"
        @setHex="setHex"
        />
    </template>
    <template v-slot:pallete>
      <PalleteSelector
        @setLightness="setLightness"
        @setSaturation="setSaturation"
        @setHsb="setHsb"
      />
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
  <div :style="{ display: 'flex' }">
    <div>
      <h2>RGBA</h2>
      <div>R: {{ rgb.r }}</div>
      <div><input v-model.number="rgb.r" type="range" min="0" max="255" /></div>
      <div>G: {{ rgb.g }}</div>
      <div><input v-model.number="rgb.g" type="range" min="0" max="255" /></div>
      <div>B: {{ rgb.b }}</div>
      <div><input v-model.number="rgb.b" type="range" min="0" max="255" /></div>
    </div>
    <div>
      <h2>HSB</h2>
      <div>H: {{ hsb.h }}</div>
      <div><input v-model.number="hsb.h" type="range" min="0" max="360" /></div>
      <div>S: {{ hsb.s }}</div>
      <div><input v-model.number="hsb.s" type="range" min="0" max="100" /></div>
      <div>B: {{ hsb.b }}</div>
      <div><input v-model.number="hsb.b" type="range" min="0" max="100" /></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, provide, watch } from 'vue'
import AppLayout from './components/AppLayout.vue'
import ColorDisplay from './components/ColorDisplay.vue'
import PalleteSelector from './components/PalleteSelector.vue'
import HueSlider from './components/HueSlider.vue'
import TransparencySlider from './components/TransparencySlider.vue'
import ColorInput from './components/ColorInput.vue'
import colorModes from './config/colorModes'
import getColorType from './utils/color-types.js'
import { hslToHex, hslToRgb } from './utils/color-conversions.js'
import { validateRgbaAndConvertToObject } from './utils/color-validators.js'

const props = defineProps({
  modes: {
    type: Array,
    default: colorModes.map(m => m.id)
  },
  value: {
    type: String,
    default: () => 'rgb(200,100,0)'
  }
})

const isOpen = ref(true)
const HSLColor = ref(null)
const hue = ref(0)
const saturation = ref(0)
const lightness = ref(0)
const transparency = ref(100)
const showTransparency = ref(true)

const hsb = reactive({ h: 0, s: 0, b: 0 })
const hsl = reactive({ h: 0, s: 0, l: 0 })
const rgb = reactive({ r: 0, g: 0, b: 0 })
const hex = ref('')

const defaultMode = ref(colorModes.find(m => m.id === 'rgb'))

const currentMode = ref(defaultMode)

const setDefaultRgbaValue = (value) => {
  const [isValid, rgbColor] = validateRgbaAndConvertToObject(value)

  if (isValid) {
    rgb.r = rgbColor.r
    rgb.g = rgbColor.g
    rgb.b = rgbColor.b
  } else {
    rgb.r = 0
    rgb.g = 0
    rgb.b = 0
  }
}

watch(() => props.value, (value) => {
  const colorType = getColorType(value)

  if (defaultMode.value.id === 'rgb' && colorType === 'rgb') setDefaultRgbaValue(value)
}, { immediate: true, once: true })

const setRgb = (rgbColor) => {
  rgb.r = rgbColor.r
  rgb.g = rgbColor.g
  rgb.b = rgbColor.b
}

const setHex = (hexColor) => {
  hex.value = hexColor
}

const setHsb = (hsbColor) => {
  hsb.h = hsbColor.h
  hsb.s = hsbColor.s
  hsb.b = hsbColor.b
}

const handleOpen = () => {
  isOpen.value = !isOpen.value
}

const setHue = (value) => {
  hue.value = value
  console.log(value)
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

provide('rgba', rgb)
provide('hsb', hsb)
provide('hex', hex)

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

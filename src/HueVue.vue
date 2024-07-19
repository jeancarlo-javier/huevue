<template>
  <AppLayout>
    <template v-slot:colorDisplay>
      <ColorDisplay @handleOpen="handleOpen" />
    </template>
    <template v-slot:colorInput>
      <ColorInput
        @setHue="setHue"
        @setTransparency="setTransparency"
        @setMode="setMode"
        @setRgb="setRgb"
        @setHex="setHex"
        @setHsl="setHsl"
      />
    </template>
    <template v-slot:pallete>
      <PalleteSelector @setHsb="setHsb" />
    </template>
    <template v-slot:hueSlider>
      <HueSlider @setHue="setHue" />
    </template>
    <template v-slot:transparencySlider>
      <TransparencySlider @setTransparency="setTransparency" />
    </template>
  </AppLayout>
</template>

<script setup>
import { watch, defineEmits } from 'vue'
import AppLayout from './components/AppLayout.vue'
import ColorDisplay from './components/ColorDisplay.vue'
import PalleteSelector from './components/PalleteSelector.vue'
import HueSlider from './components/HueSlider.vue'
import TransparencySlider from './components/TransparencySlider.vue'
import ColorInput from './components/ColorInput.vue'
import colorModes from './config/colorModes'
import getColorType from './utils/color-types.js'
import { hsbToRgb, hsbToHex, hsbToHsl } from './utils/color-conversions.js'
import { transparencyToHex } from './utils/transparency.js'
import useColorStore from './store/colorStore'
import useColorManipulation from './composables/useColorManipulation.js'

const props = defineProps({
  modes: {
    type: Array,
    default: colorModes.map((m) => m.id)
  },
  value: {
    type: String,
    default: () => ''
  },
  mode: {
    type: String,
    default: colorModes[0].id,
    validator: (value) => {
      return colorModes.find((m) => m.id === value)
    }
  }
})

const emit = defineEmits(['input'])

const store = useColorStore(props.mode)

const {
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
} = useColorManipulation(store)

// Watch for store.hsb changes and the current mode
watch(
  [store.hsb, store.currentMode],
  ([hsbCurrentValue, currentModeValue]) => {
    if (!store.updatingFromHueVue.value) {
      if (currentModeValue.id === 'rgb') {
        const { r, g, b } = hsbToRgb(hsbCurrentValue.h, hsbCurrentValue.s, hsbCurrentValue.b)

        store.rgb.r = r
        store.rgb.g = g
        store.rgb.b = b
      }

      if (currentModeValue.id === 'hex') {
        const hexColor = hsbToHex(hsbCurrentValue.h, hsbCurrentValue.s, hsbCurrentValue.b)

        store.hex.value = hexColor
      }

      if (currentModeValue.id === 'hsl') {
        const { h, s, l } = hsbToHsl(hsbCurrentValue.h, hsbCurrentValue.s, hsbCurrentValue.b)

        store.hsl.h = h
        store.hsl.s = s
        store.hsl.l = l
      }
    }

    store.updatingFromHueVue.value = false
  },
  {
    immediate: true
  }
)

// Watch for props.value
watch(
  () => props.value,
  (value) => {
    const colorType = getColorType(value)

    switch (colorType) {
      case 'hex':
        setDefaultHexValue(value)
        break
      case 'rgb':
        setDefaultRgbaValue(value)
        break
      case 'hsl':
        setDefaultHslValue(value)
        break
    }
  },
  {
    immediate: true
    // once: true
  }
)

const emitInputValue = (value) => {
  emit('input', value)
}

// RGB Watcher
watch(
  [store.currentMode, store.rgb, store.transparency, store.showTransparency],
  () => {
    if (store.currentMode.value.id === 'rgb') {
      store.finalColor.value = `rgb(${store.rgb.r}, ${store.rgb.g}, ${store.rgb.b}${
        store.showTransparency.value ? `, ${store.transparency.value / 100}` : ''
      })`

      emitInputValue(store.finalColor.value)
    }
  },
  { immediate: true }
)

// Hex Watcher
watch(
  [store.currentMode, store.hex, store.transparency, store.showTransparency],
  () => {
    if (store.currentMode.value.id === 'hex') {
      let hexColor = store.hex.value

      if (store.showTransparency.value && store.transparency.value !== 100) {
        const hexTransparency = transparencyToHex(store.transparency.value / 100)
        hexColor = `${hexColor}${hexTransparency}`
      }

      store.finalColor.value = hexColor

      emitInputValue(store.finalColor.value)
    }
  },
  { immediate: true }
)

// HSL Watcher
watch(
  [store.currentMode, store.hsl, store.transparency, store.showTransparency],
  () => {
    if (store.currentMode.value.id === 'hsl') {
      store.finalColor.value = `hsl(${store.hsl.h}, ${store.hsl.s}%, ${store.hsl.l}%${
        store.showTransparency.value ? `, ${store.transparency.value / 100}` : ''
      })`
    }

    emitInputValue(store.finalColor.value)
  },
  { immediate: true }
)
</script>

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
        @setHsl="setHsl"
      />
    </template>
    <template v-slot:pallete>
      <PalleteSelector @setLightness="setLightness" @setSaturation="setSaturation" @setHsb="setHsb" />
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
    <input v-model="store.showTransparency.value" type="checkbox" />
  </label>
  <div :style="{ display: 'flex', flexDirection: 'column' }">
    <div>
      <h2>
        HSL:
        {{ store.hsl }}
      </h2>
      <div>
        H:
        {{ store.hsl.h }}
      </div>
      <div>
        <input v-model.number="store.hsl.h" type="range" min="0" max="360" />
      </div>
      <div>
        S:
        {{ store.hsl.s }}
      </div>
      <div>
        <input v-model.number="store.hsl.s" type="range" min="0" max="100" />
      </div>
      <div>
        L:
        {{ store.hsl.l }}
      </div>
      <div>
        <input v-model.number="store.hsl.l" type="range" min="0" max="100" />
      </div>
    </div>
    <div>
      <h2>
        HEX:
        {{ store.hex }}
      </h2>
    </div>
    <div>
      <h2>
        RGB:
        {{ store.rgb }}
      </h2>
      <div>
        R:
        {{ store.rgb.r }}
      </div>
      <div>
        <input v-model.number="store.rgb.r" type="range" min="0" max="255" />
      </div>
      <div>
        G:
        {{ store.rgb.g }}
      </div>
      <div>
        <input v-model.number="store.rgb.g" type="range" min="0" max="255" />
      </div>
      <div>
        B:
        {{ store.rgb.b }}
      </div>
      <div>
        <input v-model.number="store.rgb.b" type="range" min="0" max="255" />
      </div>
    </div>
    <div>
      <h2>
        HSB:
        {{ store.hsb }}
      </h2>
      <div>
        H:
        {{ store.hsb.h }}
      </div>
      <div>
        <input v-model.number="store.hsb.h" type="range" min="0" max="360" />
      </div>
      <div>
        S:
        {{ store.hsb.s }}
      </div>
      <div>
        <input v-model.number="store.hsb.s" type="range" min="0" max="100" />
      </div>
      <div>
        B:
        {{ store.hsb.b }}
      </div>
      <div>
        <input v-model.number="store.hsb.b" type="range" min="0" max="100" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import AppLayout from './components/AppLayout.vue'
import ColorDisplay from './components/ColorDisplay.vue'
import PalleteSelector from './components/PalleteSelector.vue'
import HueSlider from './components/HueSlider.vue'
import TransparencySlider from './components/TransparencySlider.vue'
import ColorInput from './components/ColorInput.vue'
import colorModes from './config/colorModes'
import getColorType from './utils/color-types.js'
import { hsbToRgb, hsbToHex } from './utils/color-conversions.js'
import { transparencyToHex } from './utils/add-transparency.js'
import useColorStore from './store/colorStore'
import useColorManipulation from './composables/useColorManipulation.js'

const props = defineProps({
  modes: {
    type: Array,
    default: colorModes.map((m) => m.id)
  },
  value: {
    type: String,
    default: () => 'hsl(0deg 100% 50%)'
  }
})

const store = useColorStore()
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
    }

    store.updatingFromHueVue.value = false
  },
  {
    immediate: true
  }
)

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
    immediate: true,
    once: true
  }
)

// RGB Watcher
watch(
  [store.currentMode, store.rgb, store.transparency, store.showTransparency],
  () => {
    if (store.currentMode.value.id === 'rgb') {
      document.body.style.background = `rgb(${store.rgb.r}, ${store.rgb.g}, ${store.rgb.b}${
        store.showTransparency.value ? `, ${store.transparency.value / 100}` : ''
      })`

      // finalColor.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}${showTransparency.value ? `, ${transparency.value / 100}` : ''})`
    }
  },
  {
    immediate: true
  }
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

      document.body.style.background = hexColor
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped></style>

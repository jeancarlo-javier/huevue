<template>
  <div>
    <NumberInput
      @setValue="setRed"
      :min="0" :max="255"
      :inputValue="red" />
    <NumberInput
      @setValue="setGreen"
      :min="0" :max="255"
      :inputValue="green" />
    <NumberInput
      @setValue="setBlue"
      :min="0" :max="255"
      :inputValue="blue" />
    <NumberInput
      v-if="showTransparency"
      @setValue="(n) => emit('setTransparency', n)"
      :min="0" :max="100"
      :inputValue="transparency" />
  </div>
</template>

<script setup>
import { inject, defineEmits, ref, watch } from 'vue'
import NumberInput from '../appInputs/NumberInput.vue'
import { hslToRgb, rgbToHsl } from '@/utils/color-conversions.js'

const emit = defineEmits(['setHue', 'setSaturation', 'setLightness', 'setTransparency'])

const showTransparency = inject('showTransparency')

const hue = inject('hue')
const saturation = inject('saturation')
const lightness = inject('lightness')
const transparency = inject('transparency')

const red = ref(0)
const green = ref(0)
const blue = ref(0)

const updatingFromInput = ref(false)

watch([hue, saturation, lightness], () => {
  if (!updatingFromInput.value) {
    const { r, g, b } = hslToRgb(hue.value, saturation.value, lightness.value)

    red.value = r
    green.value = g
    blue.value = b
  }

  updatingFromInput.value = false
}, { immediate: true })

const setHsl = (h, s, l) => {
  emit('setHue', h)
  emit('setSaturation', s)
  emit('setLightness', l)
}

const setRed = (n) => {
  red.value = n

  const { h, s, l } = rgbToHsl(red.value, green.value, blue.value)
  setHsl(h, s, l)

  updatingFromInput.value = true
}

const setGreen = (n) => {
  green.value = n

  const { h, s, l } = rgbToHsl(red.value, green.value, blue.value)
  setHsl(h, s, l)

  updatingFromInput.value = true
}

const setBlue = (n) => {
  blue.value = n

  const { h, s, l } = rgbToHsl(red.value, green.value, blue.value)
  setHsl(h, s, l)

  updatingFromInput.value = true
}
</script>

<style scoped>
div {
  display: flex;
  column-gap: 3px; /* Compatibility with IE11 */
  gap: 3px;
  justify-content: space-between;
}
</style>

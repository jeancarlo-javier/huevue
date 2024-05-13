<template>
  <div>
    <HexTextInput
      :inputValue="hexColor"
      @setValue="setValue"
      :style="{ flex: 2 }" />
    <NumberInput
      v-if="showTransparency"
      @setValue="(n) => setTransparency(n)"
      :min="0" :max="100"
      :inputValue="transparency"
      :style="{ flex: 1 }" />
  </div>
</template>

<script setup>
import { inject, computed, defineEmits } from 'vue'
import HexTextInput from './HEXTextInput.vue'
import NumberInput from '../../appInputs/NumberInput.vue'
import { hslToHex, hexToHsl } from '@/utils/color-conversions.js'
import { validateHexColor } from '@/utils/color-validator.js'

const emit = defineEmits(['setTransparency', 'setHue', 'setSaturation', 'setLightness'])

const showTransparency = inject('showTransparency')

const hue = inject('hue')
const saturation = inject('saturation')
const lightness = inject('lightness')
const transparency = inject('transparency')

const hexColor = computed(() => {
  const hex = hslToHex(hue.value, saturation.value, lightness.value)

  const isValid = validateHexColor(hex)

  // ! Temporal
  if (!isValid) {
    throw new Error(`Invalid hex color: ${hex}`)
  }
  // ! Temporal

  return hex
})

const setValue = (value) => {
  const { h, s, l } = hexToHsl(value)

  emit('setHue', h)
  emit('setSaturation', s)
  emit('setLightness', l)
}

const setTransparency = (value) => {
  emit('setTransparency', value)
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

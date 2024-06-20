<template>
  <div>
    <NumberInput
      @setValue="setHue"
      :min="0" :max="360"
      :inputValue="hsl.h" />
    <NumberInput
      @setValue="setSaturation"
      :min="0" :max="100"
      :inputValue="hsl.s" />
    <NumberInput
      @setValue="setLightness"
      :min="0" :max="100"
      :inputValue="hsl.l" />
    <NumberInput
      v-if="showTransparency"
      :percent="true"
      @setValue="setTransparency"
      :min="0" :max="100"
      :inputValue="transparency" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import NumberInput from '../appInputs/NumberInput.vue'

const emit = defineEmits(['setHue', 'setSaturation', 'setLightness', 'setTransparency'])

const showTransparency = inject('showTransparency')

const hsl = inject('hsl')
const transparency = inject('transparency')

const setValue = (n, action) => {
  emit(action, n)
}

const setHue = (hslColor) => {
  emit('setHsl', { h: hslColor, s: hsl.s, l: hsl.l })
}

const setSaturation = (hslColor) => {
  emit('setHsl', { h: hsl.h, s: hslColor, l: hsl.l })
}

const setLightness = (hslColor) => {
  emit('setHsl', { h: hsl.h, s: hsl.s, l: hslColor })
}

const setTransparency = (transparency) => {
  emit('setTransparency', transparency)
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

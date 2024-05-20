<template>
  <div>
    <NumberInput
      @setValue="(n) => setValue(n, 'setHue')"
      :min="0" :max="360"
      :inputValue="hue" />
    <NumberInput
      @setValue="(n) => setValue(n, 'setSaturation')"
      :min="0" :max="100"
      :inputValue="saturation" />
    <NumberInput
      @setValue="(n) => setValue(n, 'setLightness')"
      :min="0" :max="100"
      :inputValue="lightness" />
    <NumberInput
      v-if="showTransparency"
      :percent="true"
      @setValue="(n) => setValue(n, 'setTransparency')"
      :min="0" :max="100"
      :inputValue="transparency" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import NumberInput from '../appInputs/NumberInput.vue'

const emit = defineEmits(['setHue', 'setSaturation', 'setLightness', 'setTransparency'])

const showTransparency = inject('showTransparency')

const hue = inject('hue')
const saturation = inject('saturation')
const lightness = inject('lightness')
const transparency = inject('transparency')

const setValue = (n, action) => {
  emit(action, n)
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

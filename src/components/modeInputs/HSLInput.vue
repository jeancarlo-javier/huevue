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
      @setValue="(n) => setValue(n, 'setTransparency')"
      :min="0" :max="100"
      :inputValue="transparency" />
  </div>
</template>

<script setup>
import { inject, defineEmits } from 'vue'
import NumberInput from '../appInputs/NumberInput.vue'

const emit = defineEmits(['setHue', 'setSaturation', 'setLightness', 'setTransparency'])

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
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(4, minmax(20px, 1fr));
}
</style>

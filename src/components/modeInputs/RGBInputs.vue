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
      :percent="true"
      @setValue="(n) => emit('setTransparency', n)"
      :min="0" :max="100"
      :inputValue="transparency" />
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import NumberInput from '../appInputs/NumberInput.vue'

const emit = defineEmits(['setRgb', 'setTransparency'])

const showTransparency = inject('showTransparency')

const rgba = inject('rgba')
const transparency = inject('transparency')

const red = ref()
const green = ref()
const blue = ref()

const updatingFromInput = ref(false)

watch(rgba, (newRgba) => {
  if (!updatingFromInput.value) {
    const { r, g, b } = newRgba

    red.value = r
    green.value = g
    blue.value = b
  }

  updatingFromInput.value = false
}, { immediate: true })

const setRed = (n) => {
  red.value = n

  emit('setRgb', { r: n, g: green.value, b: blue.value, a: rgba.a })

  updatingFromInput.value = true
}

const setGreen = (n) => {
  green.value = n

  emit('setRgb', { r: red.value, g: n, b: blue.value, a: rgba.a })

  updatingFromInput.value = true
}

const setBlue = (n) => {
  blue.value = n

  emit('setRgb', { r: red.value, g: green.value, b: n, a: rgba.a })

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

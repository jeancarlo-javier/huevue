<template>
  <div>
    <HexTextInput :inputValue="hexColor" @setValue="setValue" :style="{ flex: 2 }" />
    <NumberInput
      v-if="showTransparency"
      :percent="true"
      @setValue="(n) => setTransparency(n)"
      :min="0"
      :max="100"
      :inputValue="transparency"
      :style="{ flex: 1 }"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import HexTextInput from './HEXTextInput.vue'
import NumberInput from '../../appInputs/NumberInput.vue'

const emit = defineEmits(['setTransparency', 'setHue', 'setSaturation', 'setLightness'])

const showTransparency = inject('showTransparency')

const transparency = inject('transparency')

const hexColor = inject('hex')

const setValue = (value) => {
  emit('setHex', value)
}

const setTransparency = (newHexValue) => {
  emit('setTransparency', newHexValue)
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

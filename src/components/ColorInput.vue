<template>
  <div class="color-input-container">
    <span class="mode-text">{{ modeText }}</span>
    <HSLInputs
      v-if="mode.id ==='hsl'"
      @setHue="setHue"
      @setSaturation="setSaturation"
      @setLightness="setLightness"
      @setTransparency="setTransparency"
    />
    <HEXInputs
      v-if="mode.id ==='hex'"
      @setHue="setHue"
      @setSaturation="setSaturation"
      @setLightness="setLightness"
      @setTransparency="setTransparency"
    />
    <RGBInputs
      v-if="mode.id ==='rgb'"
      @setHue="setHue"
      @setSaturation="setSaturation"
      @setLightness="setLightness"
      @setTransparency="setTransparency"
    />
  </div>
</template>

<script setup>
import HSLInputs from './modeInputs/HSLInputs.vue'
import HEXInputs from './modeInputs/HEX/HEXInputs.vue'
import { computed, inject, defineEmits } from 'vue'
import RGBInputs from './modeInputs/RGBInputs.vue'

const mode = inject('mode')

if (!mode) {
  throw new Error('No mode provided')
}

const emit = defineEmits(['setLightness', 'setSaturation', 'setHue', 'setTransparency'])

const setLightness = (lightness) => {
  emit('setLightness', lightness)
}

const setSaturation = (saturation) => {
  emit('setSaturation', saturation)
}

const setHue = (hue) => {
  emit('setHue', hue)
}

const setTransparency = (transparency) => {
  emit('setTransparency', transparency)
}

const modeText = computed(() => {
  return mode.value.text.toUpperCase()
})
</script>

<style >
.color-input-container {
  grid-column: 1 / -1;
  height: 30px;
  padding: 0px 6px 0px 6px;
  background-color: white;
  border-radius: var(--border-radius);
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 5px;
  width: min-content;
  min-width: 160px;
}
.mode-text {
  margin: auto 0;
  font-size: 11px;
  font-weight: 400;
  color: #7C7C7C;
}
</style>

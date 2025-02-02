<template>
  <div class="color-input-container" :style="{ width: showTransparency ? '100%' : 'calc(100% - 8px)' }">
    <div class="inputs-container">
      <span class="mode-text">{{ modeText }}</span>
      <HSLInputs v-if="mode.id === 'hsl'" @setHsl="setHsl" @setTransparency="setTransparency" />
      <HEXInputs v-if="mode.id === 'hex'" @setHex="(hex) => emit('setHex', hex)" @setTransparency="setTransparency" />
      <RGBInputs v-if="mode.id === 'rgb'" @setRgb="setRgb" @setTransparency="setTransparency" />
    </div>
    <button
      v-if="isModeSwitchEnabled"
      data-test-id="hv-change-mode"
      @click="switchMode"
      role="button"
      class="hv-change-mode"
    >
      <img src="@/assets/swap-ver.svg" alt="swap" />
    </button>
    <button
      data-test-id="hv-copy-color"
      @click="copyColor"
      :class="{ 'hv-change-mode': true, confetti: showConfetti }"
      role="button"
    >
      <img v-show="showConfetti" src="@/assets/icons/conffeti.svg" alt="swap" />
      <img v-show="!showConfetti" src="@/assets/icons/copy.svg" alt="swap" />
    </button>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import HSLInputs from './modeInputs/HSLInputs.vue'
import HEXInputs from './modeInputs/HEX/HexInputs.vue'
import RGBInputs from './modeInputs/RGBInputs.vue'
import colorModes from '@/config/colorModes'

const showConfetti = ref(false)

const mode = inject('mode')

const showTransparency = inject('showTransparency')
const isModeSwitchEnabled = inject('isModeSwitchEnabled')

const finalColor = inject('finalColor')

if (!mode) {
  throw new Error('No mode provided')
}

const emit = defineEmits(['setMode', 'setHue', 'setTransparency', 'setRgb', 'setHsl'])

const setRgb = (rgbaColor) => {
  emit('setRgb', rgbaColor)
}

const setHsl = (hslColor) => {
  emit('setHsl', hslColor)
}

const setTransparency = (transparency) => {
  emit('setTransparency', transparency)
}

const switchMode = () => {
  const currentModeIndex = colorModes.findIndex((m) => m.id === mode.value.id)
  const nextModeIndex = currentModeIndex + 1 < colorModes.length ? currentModeIndex + 1 : 0

  return emit('setMode', colorModes[nextModeIndex].id)
}

const copyColor = () => {
  if (showConfetti.value) return

  navigator.clipboard.writeText(finalColor.value).then(() => {
    showConfetti.value = true
    setTimeout(() => {
      showConfetti.value = false
    }, 1500)
  })
}

const modeText = computed(() => {
  return mode.value.text.toUpperCase()
})
</script>

<style scoped>
.color-input-container {
  position: relative;
  grid-column: 1 / -1;
  height: 30px;
  display: flex;
}
.inputs-container {
  width: 100%;
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 5px;
  padding: 0px 6px 0px 6px;
  background-color: white;
  border-radius: var(--border-radius);
  z-index: 1;
  box-shadow: 0px 1px 3px 1px rgb(0 0 0 / 12%);
}
.mode-text {
  margin: auto 0;
  font-size: 11px;
  font-weight: 400;
  color: #7c7c7c;
}
.color-input-container .hv-change-mode {
  all: unset;
  cursor: pointer;
  position: absolute;
  left: calc(100% - 43px);
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaeaea;
  padding: 0px 4px 0 19px;
  border-radius: 9px;
  box-shadow: 0px 1px 3px 1px rgb(0 0 0 / 8%);
  transition: left 0.3s ease-in-out, background-color 0.1s;
}
.color-input-container .hv-change-mode.confetti {
  background-color: #53d800;
}
.color-input-container .hv-change-mode.confetti:hover {
  background-color: #53d800;
}
.color-input-container:hover .hv-change-mode {
  left: calc(100% - 16px);
}
.color-input-container .hv-change-mode:hover {
  background-color: #c7c7c7;
}
.color-input-container .hv-change-mode:active {
  background-color: #a7a7a7;
}
</style>

<template>
  <div class="hue-vue-container">
    <slot name="colorDisplay" />
    <div v-if="isOpen" class="color-picker-container">
      <slot name="colorInput" />
      <!-- <div /> -->
      <slot name="pallete" />
      <slot name="transparencySlider" />
      <slot name="hueSlider" />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const isOpen = inject('isOpen')
// const mode = inject('mode')
</script>

<style scoped>
  .hue-vue-container{
    position: relative;
    width: fit-content;
    user-select: none;
    --border-radius: 9px;
  }
  .color-picker-container {
    position: absolute;
    top: 2px;
    left: calc(100% + 10px);
    display: grid;
    grid-template-columns: 1fr min-content;
    gap: 8px;
  }
</style>

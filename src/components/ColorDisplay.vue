<template>
  <button @click="emit('handleOpen')" :style="{ background: backgroundColor }" class="colorDisplay" />
</template>

<script setup>
import { inject } from 'vue'

const emit = defineEmits(['handleOpen'])

const backgroundColor = inject('finalColor')
</script>

<style scoped>
.colorDisplay {
  position: relative;
  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-radius: 9px;
  cursor: pointer;
}
.colorDisplay::after {
  content: '';
  background-image: url(/src/assets/bg-transparency.svg);
  background-position: center;
  z-index: -1;
  left: -2px;
  top: -2px;
  width: inherit;
  height: inherit;
  position: absolute;
  border-radius: inherit;
}
</style>

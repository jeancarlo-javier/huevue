<template>
  <div class="color-input-container">
    <span class="mode-text">{{ modeText }}</span>
    <!-- <HSLInput /> -->
    <slot name="input" />
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
// import HSLInput from './inputs/HSLInput.vue'

const mode = inject('mode')

if (!mode) {
  throw new Error('No mode provided')
}

const modeText = computed(() => {
  return mode.value.text.toUpperCase()
})
</script>

<style >
.color-input-container {
  grid-column: 1 / -1;
  height: 30px;
  padding: 0px 10px;
  background-color: white;
  border-radius: var(--border-radius);
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 10px;
  width: min-content;
}
.mode-text {
  margin: auto;
  font-size: 11px;
  font-weight: 400;
  color: #7C7C7C;
}

input[type="number"] {
  -moz-appearance: textfield;
  all: unset;
  width: 100%;
  font: inherit;
  color: black;
  background-color: transparent;
  font-size: 12px;
  text-align: center;

  /* border-bottom: 1px solid #6f6f6f; */
  margin: 4px 0;
}
/* Para Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

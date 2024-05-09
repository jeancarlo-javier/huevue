<template>
  <input
    @keydown="setValue"
    @click="selectInputText"
    @blur="unselectInputText"
    :value="inputValue"
    ref="hueInput"
    type="text" />
</template>

<script setup>
import { defineProps, ref, toRefs, watch } from 'vue'
import { validateHexColor } from '@/utils/color-validator.js'

const props = defineProps({
  inputValue: {
    type: String,
    required: true
  }
})

const { inputValue } = toRefs(props)

const emit = defineEmits(['setValue'])

const lastValidValue = ref(inputValue.value)

watch(inputValue, (value) => {
  lastValidValue.value = value
})

const setValue = (e) => {
  const value = e.target.value

  // Confirm the current value with 'Enter' if it's a valid hex color
  if (e.key === 'Enter') {
    e.preventDefault()

    const isValid = validateHexColor(value)

    if (isValid) {
      lastValidValue.value = value

      e.target.blur()

      return emit('setValue', value)
    }

    // Find posible values of the current value
    e.target.value = lastValidValue.value
    emit('setValue', lastValidValue.value)
  }
}

const userIsTyping = ref(false)

const selectInputText = (e) => {
  if (!userIsTyping.value) {
    e.target.select()
    userIsTyping.value = true
  }
}

const unselectInputText = (e) => {
  userIsTyping.value = false

  if (e.target.value === '') {
    e.target.value = lastValidValue.value
    emit('setValue', lastValidValue.value)
  }
}
</script>

<style scoped>
input[type="text"] {
  -moz-appearance: textfield;
  appearance: textfield;
  all: unset;
  width: 100%;
  font: inherit;
  color: black;
  background-color: transparent;
  font-size: 12px;
  text-align: center;
  margin: 4px 0;
  background: #eaeaea;
  border-radius: 6px;
}
</style>

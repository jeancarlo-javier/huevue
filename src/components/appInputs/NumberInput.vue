<template>
  <input
    @keydown="setValue"
    @click="selectInputText"
    @blur="unselectInputText"
    :value="inputValue"
    ref="hueInput"
    :min="min" :max="max"
    type="number" />
</template>

<script setup>
import { defineProps, ref, toRefs, watch } from 'vue'

const props = defineProps({
  inputValue: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  }
})

const { inputValue, min, max } = toRefs(props)

const emit = defineEmits(['setValue'])

const lastValidNumber = ref(inputValue.value)

watch(inputValue, (value) => {
  lastValidNumber.value = value
})

const setValue = (e) => {
  let value = parseFloat(e.target.value)

  // Check if value is not a number when 'Enter' is pressed
  if (isNaN(value) && e.key === 'Enter') {
    e.preventDefault()

    // Revert to last valid number and emit that value
    e.target.value = lastValidNumber.value
    e.target.blur()

    return emit('setValue', lastValidNumber.value)
  }

  // Handle arrow up (increase value within max limit)
  if (e.key === 'ArrowUp') {
    e.preventDefault()

    if (e.shiftKey) value += 10
    else value += 1

    value = Math.min(value, max.value)
    lastValidNumber.value = value

    return emit('setValue', Math.round(value))
  }

  // Handle arrow down (decrease value within min limit)
  if (e.key === 'ArrowDown') {
    e.preventDefault()

    if (e.shiftKey) value -= 10
    else value -= 1

    value = Math.max(value, min.value)
    lastValidNumber.value = value

    return emit('setValue', Math.round(value))
  }

  // Confirm the current value with 'Enter' if it's within the valid range
  if (e.key === 'Enter') {
    e.preventDefault()

    value = Math.min(max.value, Math.max(value, min.value))
    e.target.value = lastValidNumber.value
    lastValidNumber.value = value

    e.target.blur()
    return emit('setValue', Math.round(value))
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
    e.target.value = lastValidNumber.value
    emit('setValue', lastValidNumber.value)
  }
}
</script>

<style scoped>
input[type="number"] {
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

/* Para Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

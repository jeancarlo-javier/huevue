<template>
  <input
    id="hv-hex-text-input"
    @keydown="setValue"
    @click="selectInputText"
    @blur="unselectInputText"
    :value="inputValue"
    ref="hueInput"
    type="text" />
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
import { isHexValid } from '@/utils/color-validators.js'
import suggestHexColor from '@/utils/suggestHexColor.js'

const props = defineProps({
  inputValue: {
    type: String,
    default: ''
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

    const isValid = isHexValid(value)

    if (isValid) {
      lastValidValue.value = value

      e.target.blur()

      return emit('setValue', value)
    }

    // Find posible values of the current value
    const suggestion = suggestHexColor(value)

    if (suggestion) {
      e.target.value = suggestion

      e.target.blur()

      return emit('setValue', suggestion)
    }

    e.target.value = lastValidValue.value
    emit('setValue', lastValidValue.value)

    e.target.blur()
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

  const isValid = isHexValid(e.target.value)

  if (isValid) {
    emit('setValue', e.target.value)
    return
  }

  e.target.value = lastValidValue.value
  emit('setValue', lastValidValue.value)
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

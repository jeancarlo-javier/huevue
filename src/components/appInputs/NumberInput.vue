<template>
  <div
    :class="{
      'hv-input-editing': userIsTyping,
      'hv-input-number-container': true,
      'hv-percent': percent}">
    <input
      @keydown="setValue"
      @click="selectInputText"
      @blur="unselectInputText"
      :value="inputValue"
      ref="hueInput"
      :min="min" :max="max"
      type="number"
      :class="{ 'hv-input-percent': percent }" />
      <span v-if="percent" class="hv-input-number-percent">%</span>
  </div>
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
  },
  percent: {
    type: Boolean,
    default: false
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
    e.target.value = value
    lastValidNumber.value = value

    return emit('setValue', Math.round(value))
  }

  // Handle arrow down (decrease value within min limit)
  if (e.key === 'ArrowDown') {
    e.preventDefault()

    if (e.shiftKey) value -= 10
    else value -= 1

    value = Math.max(value, min.value)
    e.target.value = value
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

  const inputVal = parseFloat(e.target.value)

  if (isNaN(inputVal) || e.target.value === '') {
    e.target.value = lastValidNumber.value
    emit('setValue', lastValidNumber.value)
    return
  }

  const normalizedValue = Math.min(max.value, Math.max(inputVal, min.value))

  lastValidNumber.value = normalizedValue
  emit('setValue', normalizedValue)
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

.hv-percent {
  flex: 1 1 calc(25% + 132px);
}

.hv-percent input[type="number"] {
  padding-right: 12px;
}

/* Para Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.hv-input-number-container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}

.hv-input-number-container .hv-input-number-percent {
  color: #000000;
  font-size: 12px;
  position: absolute;
  right: 3px;
  top: 7px;
  pointer-events: none;
}

.hv-input-editing .hv-input-number-percent {
  color: #7C7C7C;
}
</style>

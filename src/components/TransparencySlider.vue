<template>
  <div
    @mousedown="handlePositionAndStartDragging"
    @touchstart="handlePositionAndStartDragging"
    ref="transparencySelector"
    class="transparency-slider"
    :style="{ background: backgroundGradient }"
  >
    <SliderThumb
      @setThumbRef="handleThumbEvents"
      :thumbStyle="{ bottom: selectorBottomPosition }"
      :visualThumbDefaultStyle="{ transform: 'translate(-1px, 5px)' }"
    />
  </div>
</template>

<script setup>
import { computed, inject, ref, onUnmounted, onUpdated } from 'vue'
import SliderThumb from './SliderThumb.vue'

// Emits the setTransparency event to the parent component
const emit = defineEmits(['setTransparency'])
const transparencySelector = ref(null)

const thumbChildRef = ref(null)

const transparency = inject('transparency')

const mode = inject('mode')

const rgb = inject('rgb')
const hex = inject('hex')
const hsl = inject('hsl')

// Computes the background gradient based on the color mode
const backgroundGradient = computed(() => {
  let color
  if (mode.value.id === 'hex') {
    color = hex.value
  } else if (mode.value.id === 'rgb') {
    color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  } else if (mode.value.id === 'hsl') {
    color = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
  }

  return `linear-gradient(180deg, ${color}, transparent)`
})

// Calculates the position of the slider based on the transparency value
const selectorBottomPosition = computed(() => {
  try {
    const normalizeBottomPosition = (transparency.value / 100) * 6

    if (transparency.value < 0 || transparency.value > 100) {
      throw new Error('Transparency position out of bounds.')
    }

    return `calc(${transparency.value}% - ${Math.abs(normalizeBottomPosition)}px)`
  } catch (error) {
    console.error(error.message)
    return 'calc(0% - 0px)'
  }
})

// Handles the thumb events for dragging
const handleThumbEvents = (thumbRef) => {
  if (!thumbRef || !transparencySelector.value) {
    throw new Error('ThumbRef and transparencySelector must be initialized and non-null.')
  }

  thumbChildRef.value = thumbRef

  const selectorHeight = transparencySelector.value.offsetHeight
  if (selectorHeight <= 0) {
    throw new Error('transparencySelector height must be positive.')
  }

  let initialTopPosition = null
  let initialTransparencyValue = 0
  let basePosition = null

  const calculateNewPosition = (pageY) => {
    if (!pageY || !initialTopPosition) {
      throw new Error('Position data and initial position must be valid.')
    }

    const yPosition = basePosition + (initialTopPosition - pageY)
    const clampedYPosition = Math.min(Math.max(yPosition, 0), selectorHeight)

    if (clampedYPosition < 0 || clampedYPosition > selectorHeight) {
      throw new Error('clampedYPosition out of bounds.')
    }

    return clampedYPosition
  }

  const moveHandler = (e) => {
    if (initialTopPosition !== null) {
      const pageY = e.pageY !== undefined ? e.pageY : e.touches[0].pageY
      const newPosition = calculateNewPosition(pageY)

      let newTransparency = (newPosition * 100) / selectorHeight
      newTransparency = Math.round(newTransparency)

      emit('setTransparency', newTransparency)
    }
  }

  const downHandler = (e) => {
    e.stopPropagation()
    initialTopPosition = e.pageY !== undefined ? e.pageY : e.touches[0].pageY
    initialTransparencyValue = transparency.value
    basePosition = (selectorHeight * initialTransparencyValue) / 100

    document.body.addEventListener('mousemove', moveHandler, { passive: true })
    document.body.addEventListener('touchmove', moveHandler, { passive: true })
  }

  const upHandler = () => {
    document.body.removeEventListener('mousemove', moveHandler)
    document.body.removeEventListener('touchmove', moveHandler)

    initialTopPosition = null
    initialTransparencyValue = 0
    basePosition = null
  }

  // Add event listeners for mouse and touch events
  thumbRef.addEventListener('mousedown', downHandler)
  thumbRef.addEventListener('touchstart', downHandler)
  document.body.addEventListener('mouseup', upHandler)
  document.body.addEventListener('touchend', upHandler)
  document.body.addEventListener('mouseleave', upHandler)

  onUnmounted(() => {
    thumbRef.removeEventListener('mousedown', downHandler)
    thumbRef.removeEventListener('touchstart', downHandler)
    document.body.removeEventListener('mouseup', upHandler)
    document.body.removeEventListener('mousemove', moveHandler)
    document.body.removeEventListener('touchend', upHandler)
    document.body.removeEventListener('touchmove', moveHandler)
    document.body.removeEventListener('mouseleave', upHandler)
  })
}

const syntheticMouseDownState = ref({
  active: false,
  clientX: null,
  clientY: null
})

// Interpolates a value based on an input percentage
const interpolateValue = (entry, minReturn, maxReturn) => {
  try {
    if (entry < 0 || entry > 100) {
      throw new Error("The 'entry' parameter must be between 0 and 100.")
    }
    return minReturn + (entry / 100) * (maxReturn - minReturn)
  } catch (error) {
    console.error(error.message)
    return null
  }
}

// Handles the initial position and starts the dragging process
const handlePositionAndStartDragging = (e) => {
  if (!transparencySelector.value) throw new Error('transparencySelector cannot be null')

  const selectorTopPosition = transparencySelector.value.getBoundingClientRect().bottom

  let deltaY = selectorTopPosition - (e.clientY || e.touches[0].clientY)
  deltaY += interpolateValue((deltaY * 100) / transparencySelector.value.offsetHeight, -6, 6)

  if (!deltaY) return

  let bottomPercent = (deltaY * 100) / transparencySelector.value.offsetHeight
  bottomPercent = Math.round(bottomPercent)

  emit('setTransparency', bottomPercent)

  syntheticMouseDownState.value = {
    active: true,
    clientX: e.pageX !== undefined ? e.pageX : e.touches[0].pageX,
    clientY: e.pageY !== undefined ? e.pageY : e.touches[0].pageY
  }
}

onUpdated(() => {
  // Programmatically activate
  if (syntheticMouseDownState.value.active) {
    const eventMousedown = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX: syntheticMouseDownState.value.clientX,
      clientY: syntheticMouseDownState.value.clientY
    })

    thumbChildRef.value.dispatchEvent(eventMousedown)

    syntheticMouseDownState.value = {
      active: false,
      clientX: null,
      clientY: null
    }
  }
})
</script>

<style scoped>
.transparency-slider {
  position: relative;
  width: 18px;
  height: 100%;
  border: 2px white solid;
  border-radius: 9px;
}

.transparency-slider::after {
  content: '';
  background-image: url(/src/assets/bg-transparency.svg);
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: inherit;
}
</style>

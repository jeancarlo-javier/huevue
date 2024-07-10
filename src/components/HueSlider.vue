<template>
  <div
    data-test-id="hue-slider"
    ref="hueSlider"
    @mousedown="handlePositionAndStartDragging"
    @touchstart="handlePositionAndStartDragging"
    class="hue-slider"
  >
    <SliderThumb
      @setThumbRef="handleThumbEvents"
      :thumbStyle="{ left: hueLeftPosition }"
      :visualThumbDefaultStyle="{ transform: 'translate(-5px, -1px)', left: '0px', position: 'absolute' }"
    />
  </div>
</template>

<script setup>
import { computed, ref, onUnmounted, onUpdated, inject } from 'vue'
import SliderThumb from './SliderThumb.vue'

const emit = defineEmits(['setHue'])

const hueSlider = ref(null)
const thumbChildRef = ref(null)

const hue = inject('hue')

// Calculate the slider position from the hue value.
const hueLeftPosition = computed(() => {
  try {
    const thumbLeftPercent = (hue.value * 100) / 360
    const normalizeLeftPosition = (thumbLeftPercent / 100) * 6

    if (thumbLeftPercent < 0 || thumbLeftPercent > 100) {
      throw new Error('Hue Position out of bounds.')
    }

    return `calc(${thumbLeftPercent}% - ${normalizeLeftPosition}px)`
  } catch (error) {
    console.error(error.message)
    return 'calc(0% - 0px)'
  }
})

const calculateNewPosition = (pageX, initialLeftMousePosition, hueSliderWidth, basePosition) => {
  if (!pageX || initialLeftMousePosition === null || initialLeftMousePosition === undefined) {
    throw new Error('Mouse position data and initial mouse position must be valid.')
  }

  // Calculate new position ensuring it stays within bounds
  const xPosition = basePosition + pageX - initialLeftMousePosition
  const clampedXPosition = Math.min(Math.max(xPosition, 0), hueSliderWidth)

  // Postcondition: xPosition and yPosition must be within bounds of the palette.
  if (clampedXPosition < 0 || clampedXPosition > hueSliderWidth) {
    throw new Error('clampedXPosition out of bounds.')
  }

  return clampedXPosition
}

// Handle interaction events with the slider thumb.
const handleThumbEvents = (thumbRef) => {
  try {
    // Preconditions: Ensure necessary inputs are not null
    if (!thumbRef || !hueSlider.value) {
      throw new Error('ThumbRef and hueSlider must be initialized and non-null.')
    }

    thumbChildRef.value = thumbRef

    const hueSliderWidth = hueSlider.value.offsetWidth
    if (hueSliderWidth <= 0) {
      throw new Error('hueSlider width must be positive.')
    }

    let initialLeftMousePosition = null
    let initialHueValue = 0
    let basePosition = null

    const move = (pageX) => {
      if (initialLeftMousePosition !== null) {
        const newHuePosition = calculateNewPosition(pageX, initialLeftMousePosition, hueSliderWidth, basePosition)
        let newLeftPositionPercent = (newHuePosition * 100) / hueSliderWidth
        newLeftPositionPercent = (360 * newLeftPositionPercent) / 100
        newLeftPositionPercent = Math.round(newLeftPositionPercent)

        emit('setHue', newLeftPositionPercent)
      }
    }

    const mousemove = (e) => move(e.pageX)
    const touchmove = (e) => move(e.touches[0].pageX)

    const start = (pageX) => {
      initialLeftMousePosition = pageX
      initialHueValue = hue.value
      basePosition = (hueSliderWidth * (initialHueValue * 100)) / 360 / 100

      document.body.addEventListener('mousemove', mousemove, { passive: true })
      document.body.addEventListener('touchmove', touchmove, { passive: true })
    }

    const mousedown = (e) => {
      e.stopPropagation()
      start(e.pageX)
    }

    const touchstart = (e) => {
      e.stopPropagation()
      start(e.touches[0].pageX)
    }

    const end = () => {
      document.body.removeEventListener('mousemove', mousemove)
      document.body.removeEventListener('touchmove', touchmove)

      initialLeftMousePosition = null
      initialHueValue = 0
      basePosition = null
    }

    thumbRef.addEventListener('mousedown', mousedown)
    thumbRef.addEventListener('touchstart', touchstart)
    document.body.addEventListener('mouseup', end)
    document.body.addEventListener('touchend', end)
    document.body.addEventListener('mouseleave', end)

    onUnmounted(() => {
      thumbRef.removeEventListener('mousedown', mousedown)
      thumbRef.removeEventListener('touchstart', touchstart)
      document.body.removeEventListener('mouseup', end)
      document.body.removeEventListener('touchend', end)
      document.body.removeEventListener('mousemove', mousemove)
      document.body.removeEventListener('touchmove', touchmove)
      document.body.removeEventListener('mouseleave', end)
    })
  } catch (error) {
    console.error(error.message)
  }
}

const syntheticMouseDownState = ref({
  active: false,
  clientX: null,
  clientY: null
})

/** Interpolates a value based on an input percentage. */
const interpolateValue = (entry, minReturn, maxReturn) => {
  // Validate that entry is within the correct range
  if (entry < 0 || entry > 100) {
    throw new Error("The 'entry' parameter must be between 0 and 100.")
  }

  return minReturn + (entry / 100) * (maxReturn - minReturn)
}

const handlePositionAndStartDragging = (e) => {
  if (!hueSlider.value) throw new Error('hueSlider cannot be null')

  const selectorLeftPosition = hueSlider.value.getBoundingClientRect().left

  e.touches = e.touches || [{}]

  let deltaX = (e.clientX || e.touches[0].clientX) - selectorLeftPosition
  deltaX += interpolateValue((deltaX * 100) / hueSlider.value.offsetWidth, -6, 6)

  const leftPercent = (deltaX * 100) / hueSlider.value.offsetWidth

  // Set Hue
  let newHueValue = (360 * leftPercent) / 100
  newHueValue = Math.round(newHueValue)

  emit('setHue', newHueValue)

  syntheticMouseDownState.value = {
    active: true,
    clientX: e.pageX || e.touches[0].pageX,
    clientY: e.clientY || e.touches[0].clientY
  }
}

onUpdated(() => {
  // Activate Programmatically
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
.hue-slider {
  position: relative;
  width: 100%;
  height: 18px;
  border: 2px solid white;
  border-radius: 9px;
  background: linear-gradient(90deg, red 0%, yellow 17%, lime 33%, aqua 50%, blue 67%, magenta 83%, red);
  grid-column: 1;
  box-shadow: 0px 1px 3px 1px rgb(0 0 0 / 12%);
}
</style>

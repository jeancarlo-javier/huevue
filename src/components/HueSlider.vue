<template>
  <div ref="hueSelector" @mousedown="handlePositionAndStartDragging" class="hue-selector">
    <SliderThumb
      @setThumbRef="handleThumbEvents"
      :thumbStyle="{ left: hueLeftPosition }"
      :visualThumbDefaultStyle="{ transform: 'translate(-5px, -1px)', left: '0px', position: 'absolute' }"
    />
  </div>
</template>

<script setup>
import {
  computed, defineEmits, ref, onUnmounted, onUpdated, inject
} from 'vue'
import SliderThumb from './SliderThumb.vue'

const emit = defineEmits(['setHue'])

const hueSelector = ref(null)
const thumbChildRef = ref(null)

const hue = inject('hue')

// Calcula la posición del slider a partir del valor hue.
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

// Maneja los eventos de interacción con el thumb del slider.
const handleThumbEvents = (thumbRef) => {
  try {
    // Precondiciones: Verificar que los inputs necesarios no sean nulos
    if (!thumbRef || !hueSelector.value || !hueSelector.value) {
      throw new Error('ThumbRef and hueSelector must be initialized and non-null.')
    }

    thumbChildRef.value = thumbRef

    const hueSelectorWidth = hueSelector.value.offsetWidth
    if (hueSelectorWidth <= 0) {
      throw new Error('hueSelector width must be positive.')
    }

    let initialLeftMousePosition = null
    let initialHueValue = 0
    let basePosition = null

    const calculateNewPosition = (pageX) => {
      if (!pageX || !initialLeftMousePosition) throw new Error('Mouse position data and initial mouse position must be valid.')

      // Calcula nueva posición garantizando que esté dentro de los límites
      const xPosition = basePosition + pageX - initialLeftMousePosition

      const clampedXPosition = Math.min(Math.max(xPosition, 0), hueSelectorWidth)

      // Postcondition: xPosition y yPosition deben estar dentro de los límites del paleta.
      if (clampedXPosition < 0 || clampedXPosition > hueSelectorWidth) {
        throw new Error('clampedXPosition out of bounds.')
      }

      return clampedXPosition
    }

    const mousemove = (e) => {
      // Solo mueve si se ha inicializado la posición inicial del mouse
      if (initialLeftMousePosition !== null) {
        const newHuePosition = calculateNewPosition(e.pageX)

        let newLeftPositionPercent = (newHuePosition * 100) / hueSelectorWidth
        newLeftPositionPercent = ((360 * newLeftPositionPercent) / 100)
        newLeftPositionPercent = Math.round(newLeftPositionPercent)

        emit('setHue', newLeftPositionPercent)
      }
    }

    const mousedown = (e) => {
      e.stopPropagation()

      // Establece las variables iniciales cuando se presiona el mouse
      initialLeftMousePosition = e.pageX
      initialHueValue = hue.value
      basePosition = (hueSelectorWidth * (initialHueValue * 100) / 360) / 100

      document.body.addEventListener('mousemove', mousemove, { passive: true })
    }

    const mouseup = () => {
      // Restablece las variables al soltar el mouse y remueve el evento de movimiento
      document.body.removeEventListener('mousemove', mousemove)

      initialLeftMousePosition = null
      initialHueValue = 0
      basePosition = null
    }

    // Añade los eventos necesarios al thumbRef y maneja el desmontaje de eventos
    thumbRef.addEventListener('mousedown', mousedown)
    document.body.addEventListener('mouseup', mouseup)
    document.body.addEventListener('mouseleave', mouseup)

    onUnmounted(() => {
      thumbRef.removeEventListener('mousedown', mousedown)
      document.body.removeEventListener('mouseup', mouseup)
      document.body.removeEventListener('mousemove', mousemove)
      document.body.removeEventListener('mouseleave', mouseup)
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
  if (!hueSelector.value) throw new Error('hueSelector cannot be null')

  const selectorLeftPosition = hueSelector.value.getBoundingClientRect().left

  let deltaX = e.pageX - selectorLeftPosition
  deltaX += interpolateValue((deltaX * 100) / hueSelector.value.offsetWidth, -6, 6)

  const leftPercent = (deltaX * 100) / hueSelector.value.offsetWidth

  // Set Hue
  let newHueValue = (360 * leftPercent) / 100
  newHueValue = Math.round(newHueValue)

  emit('setHue', newHueValue)

  syntheticMouseDownState.value = {
    active: true,
    clientX: e.clientX,
    clientY: e.clientY
  }
}

onUpdated(() => {
  // Activa Programáticamente
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
.hue-selector {
  position: relative;
  width: 100%;
  height: 18px;
  border: 2px solid white;
  border-radius: 9px;
  background: linear-gradient(90deg, red 0%, yellow 17%, lime 33%, aqua 50%, blue 67%, magenta 83%, red);
}
</style>

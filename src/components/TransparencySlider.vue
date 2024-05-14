<template>
  <div
    @mousedown="handlePositionAndStartDragging"
    ref="transparencySelector"
    class="hue-slider"
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
import {
  computed, inject, defineEmits, ref, onUnmounted, onUpdated
} from 'vue'
import SliderThumb from './SliderThumb.vue'

const emit = defineEmits(['setTransparency'])
const transparencySelector = ref(null)

const thumbChildRef = ref(null)

const transparency = inject('transparency')

const hue = inject('hue')
const s = inject('saturation')
const l = inject('lightness')

const backgroundGradient = computed(() => {
  return `linear-gradient(180deg, hsl(${hue.value}deg ${s.value}% ${l.value}%), transparent)`
})

// Calcula la posición del slider a partir del valor hue.
const selectorBottomPosition = computed(() => {
  try {
    const normalizeBottomPosition = (transparency.value / 100) * 6

    if (transparency.value < 0 || transparency.value > 100) {
      throw new Error('Hue Position out of bounds.')
    }

    // Ahora se utiliza un solo return con la expresión completa
    return `calc(${transparency.value}% - ${Math.abs(normalizeBottomPosition)}px)`
  } catch (error) {
    console.error(error.message)
    return 'calc(0% - 0px)'
  }
})

// Maneja los eventos de interacción con el thumb del slider.
const handleThumbEvents = (thumbRef) => {
  // Precondiciones: Verificar que los inputs necesarios no sean nulos
  if (!thumbRef || !transparencySelector.value || !transparencySelector.value) {
    throw new Error('ThumbRef and transparencySelector must be initialized and non-null.')
  }

  thumbChildRef.value = thumbRef

  const selectorHeight = transparencySelector.value.offsetHeight
  if (selectorHeight <= 0) {
    throw new Error('transparencySelector width must be positive.')
  }

  let initialTopMousePosition = null
  let initialTransparencyValue = 0
  let basePosition = null

  const calculateNewPosition = (pageY) => {
    if (!pageY || !initialTopMousePosition) throw new Error('Mouse position data and initial mouse position must be valid.')

    // Calcula la nueva posición con un factor de escala para aumentar la "velocidad"
    const yPosition = (basePosition + (initialTopMousePosition - pageY))

    const clampedYPosition = Math.min(Math.max(yPosition, 0), selectorHeight)

    // Postcondition: yPosition debe estar dentro de los límites del selector.
    if (clampedYPosition < 0 || clampedYPosition > selectorHeight) {
      throw new Error('clampedYPosition out of bounds.')
    }

    return clampedYPosition
  }

  const mousemove = (e) => {
    // Solo mueve si se ha inicializado la posición inicial del mouse
    if (initialTopMousePosition !== null) {
      const newHuePosition = calculateNewPosition(e.pageY)

      let newTransparency = (newHuePosition * 100) / selectorHeight
      newTransparency = Math.round(newTransparency)

      emit('setTransparency', newTransparency)
    }
  }

  const mousedown = (e) => {
    e.stopPropagation()
    // Establece las variables iniciales cuando se presiona el mouse
    initialTopMousePosition = e.pageY
    initialTransparencyValue = transparency.value
    basePosition = (selectorHeight * initialTransparencyValue) / 100

    document.body.addEventListener('mousemove', mousemove, { passive: true })
  }

  const mouseup = () => {
    // Restablece las variables al soltar el mouse y remueve el evento de movimiento
    document.body.removeEventListener('mousemove', mousemove)

    initialTopMousePosition = null
    initialTransparencyValue = 0
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
}

const syntheticMouseDownState = ref({
  active: false,
  clientX: null,
  clientY: null
})

/** Interpolates a value based on an input percentage. */
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

const handlePositionAndStartDragging = (e) => {
  if (!transparencySelector.value) throw new Error('transparencySelector cannot be null')

  const selectorTopPosition = transparencySelector.value.getBoundingClientRect().bottom

  let deltaY = selectorTopPosition - e.clientY
  deltaY += interpolateValue((deltaY * 100) / transparencySelector.value.offsetHeight, -6, 6)

  if (!deltaY) return

  let bottomPercent = (deltaY * 100) / transparencySelector.value.offsetHeight
  bottomPercent = Math.round(bottomPercent)

  emit('setTransparency', bottomPercent)

  syntheticMouseDownState.value = {
    active: true,
    clientX: e.pageX,
    clientY: e.pageY
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
.hue-slider {
  position: relative;
  width: 18px;
  height: 100%;
  border: 2px white solid;
  border-radius: 9px;
}

.hue-slider::after {
  content: "";
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

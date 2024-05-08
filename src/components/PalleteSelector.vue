<template>
  <div
    ref="paletteSelector"
    role="slider"
    :style="{ background: hueBackground, color: 'red' }" class="pallete"
    @mousedown="handlePositionAndStartDragging"
  >
    <div class="white-gradient" />
    <div class="black-gradient" />
    <div class="border" />
    <SliderThumb
      :thumbStyle="{ left: palleteLeftPosition, bottom: palleteBottomPosition }"
      :visualThumbDefaultStyle="{ transform: 'translate(-2px, 2px)' }"
      @setThumbRef="handleThumbEvents"
    />
  </div>
</template>

<script setup>
import SliderThumb from './SliderThumb.vue'
import { hsbToHsl, hslToHsb } from '../utils/color-conversions.js'
import { defineProps, computed, toRefs, defineEmits, onUnmounted, ref, inject, watch, onUpdated } from 'vue'

const props = defineProps({
  hue: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['setLightness', 'setSaturation'])

const { hue } = toRefs(props)

const saturation = inject('saturation')
const lightness = inject('lightness')

const hueBackground = computed(() => `hsl(${hue.value}deg 100% 50%)`)

const paletteSelector = ref(null)

const thumbChildRef = ref(null)

const paletteSaturation = ref(null)
const paletteBrightness = ref(null)

const updatingFromThumb = ref(false)

// Detect saturation and lightness changes and set the default values of paletteSaturation and paletteBrightness
watch([saturation, lightness], () => {
  if (updatingFromThumb.value) {
    updatingFromThumb.value = false // Reset the flag after processing
    return
  }

  const { s, b } = hslToHsb(hue.value, saturation.value, lightness.value)

  paletteSaturation.value = s
  paletteBrightness.value = b
}, { immediate: true })

const palleteLeftPosition = computed(() => {
  try {
    const normalizeLeftPosition = (12 * paletteSaturation.value) / 100

    if (paletteSaturation.value < 0 || paletteSaturation.value > 100) {
      throw new Error('Saturation Position out of bounds.')
    }

    return `calc(${paletteSaturation.value}% - ${normalizeLeftPosition}px)`
  } catch (error) {
    console.error(error.message)
    return 'calc(0% - 0px)'
  }
})

const palleteBottomPosition = computed(() => {
  try {
    const brightness = paletteBrightness.value || 0

    const normalizeLeftPosition = (12 * brightness) / 100

    if (brightness < 0 || brightness > 100) {
      throw new Error('Brightness Position out of bounds.')
    }

    return `calc(${brightness}% - ${normalizeLeftPosition}px)`
  } catch (error) {
    console.error(error.message)
    return 'calc(0% - 0px)'
  }
})

const handleThumbEvents = (thumbRef) => {
  // Precondición: thumbRef debe existir.
  if (!thumbRef) throw new Error('thumbRef is required and cannot be null.')

  thumbChildRef.value = thumbRef

  // Precondición: Verificar que el elemento paletteSelector exista y tenga dimensiones.
  const paletteWidth = paletteSelector.value.offsetWidth
  const paletteHeight = paletteSelector.value.offsetHeight
  if (!paletteWidth || !paletteHeight) throw new Error('paletteSelector must have valid dimensions.')

  let initialX = null
  let initialY = null
  let baseX = null
  let baseY = null

  const calculatePositionWithinPalette = (pageX, pageY) => {
    // Invariante: las coordenadas iniciales deben ser establecidas antes del cálculo.
    if (initialX === null || initialY === null) throw new Error('Initial coordinates not set.')

    const deltaX = pageX - initialX
    const deltaY = pageY - initialY

    const xPosition = Math.max(0, Math.min(baseX + deltaX, paletteWidth))
    const yPosition = Math.max(0, Math.min((baseY - deltaY), paletteHeight))

    // Postcondición: xPosition y yPosition deben estar dentro de los límites del paleta.
    if (xPosition < 0 || xPosition > paletteWidth || yPosition < 0 || yPosition > paletteHeight) {
      throw new Error('Position out of bounds.')
    }

    return { x: xPosition, y: yPosition }
  }

  const onMouseMove = ({ pageX, pageY }) => {
    updatingFromThumb.value = true

    const { x, y } = calculatePositionWithinPalette(pageX, pageY)

    paletteSaturation.value = (x * 100) / paletteWidth
    paletteBrightness.value = (y * 100) / paletteHeight

    const { s, l } = hsbToHsl(hue.value, (x * 100) / paletteWidth, (y * 100) / paletteHeight)

    emit('setSaturation', s)
    emit('setLightness', l)
  }

  const mousedown = (e) => {
    e.stopPropagation() // Llamar directamente sobre el objeto de evento.

    const { pageX, pageY } = e

    initialX = pageX
    initialY = pageY
    baseX = (paletteWidth * paletteSaturation.value) / 100
    baseY = (paletteHeight * paletteBrightness.value) / 100

    document.body.addEventListener('mousemove', onMouseMove, { passive: true })
  }

  const mouseup = () => {
    document.body.removeEventListener('mousemove', onMouseMove)
  }

  thumbRef.addEventListener('mousedown', mousedown)
  document.body.addEventListener('mouseup', mouseup)
  document.body.addEventListener('mouseleave', mouseup)

  // Limpiar los manejadores de eventos cuando el componente se desmonte.
  onUnmounted(() => {
    thumbRef.removeEventListener('mousedown', mousedown)
    document.body.removeEventListener('mouseup', mouseup)
    document.body.removeEventListener('mousemove', onMouseMove)
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
  // Validate that entry is within the correct range
  if (entry < 0 || entry > 100) {
    throw new Error("The 'entry' parameter must be between 0 and 100.")
  }

  return minReturn + (entry / 100) * (maxReturn - minReturn)
}

const handlePositionAndStartDragging = (e) => {
  if (!paletteSelector.value) throw new Error('paletteSelector cannot be null')

  const selectorLeftPosition = paletteSelector.value.getBoundingClientRect().left
  const selectorTopPosition = paletteSelector.value.getBoundingClientRect().top

  let deltaX = e.pageX - selectorLeftPosition
  deltaX += interpolateValue((deltaX * 100) / paletteSelector.value.offsetWidth, -6, 6)

  let deltaY = paletteSelector.value.offsetWidth - (e.pageY - selectorTopPosition)
  deltaY += interpolateValue((deltaY * 100) / paletteSelector.value.offsetHeight, -6, 6)

  const leftPercent = (deltaX * 100) / paletteSelector.value.offsetWidth
  const topPercent = (deltaY * 100) / paletteSelector.value.offsetHeight

  paletteSaturation.value = (deltaX * 100) / paletteSelector.value.offsetWidth
  paletteBrightness.value = (deltaY * 100) / paletteSelector.value.offsetHeight

  const { s, l } = hsbToHsl(hue.value, leftPercent, topPercent)

  emit('setSaturation', s)
  emit('setLightness', l)

  syntheticMouseDownState.value = {
    active: true,
    clientX: e.clientX,
    clientY: e.clientY
  }
}

onUpdated(() => {
  // Activa Programáticamente el evento MouseDown del SliderThumb
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
  .pallete {
    position: relative;
    border-radius: var(--border-radius);
    width: 160px;
    height: 160px;
  }
  .white-gradient {
    background: linear-gradient(to right, white, transparent);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
  }
  .black-gradient {
    background: linear-gradient(to top, black, transparent);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
  }
  .border {
    border: 2px solid white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
  }
</style>

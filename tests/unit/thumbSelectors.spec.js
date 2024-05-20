// import { nextTick } from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import baseProvider from './utils/baseProvider'
import SliderThumb from '@/components/SliderThumb.vue'
import HueSlider from '@/components/HueSlider.vue'

describe('ThumbSelectors', () => {
  describe('SliderThumb', () => {
    it('should render and emit setThumbRef event', () => {
      const wrapper = shallowMount(SliderThumb)

      expect(wrapper.emitted()).toHaveProperty('setThumbRef')
    })
  })

  describe('HueSlider', () => {
    it('should render hue slider and thumb selector', () => {
      const wrapper = shallowMount(HueSlider, {
        global: {
          provide: baseProvider()
        }
      })

      expect(wrapper.findComponent({ name: 'SliderThumb' }).exists()).toBe(true)
    })

    it('should emit setHue on thumb click', () => {
      const wrapper = mount(HueSlider, {
        global: {
          provide: baseProvider()
        }
      })

      const SliderThumb = wrapper.findComponent({ name: 'SliderThumb' })
      SliderThumb.trigger('mousedown')

      expect(wrapper.emitted()).toHaveProperty('setHue')
    })

    it('should emit setHue on click anywhere on the slider', () => {
      const wrapper = shallowMount(HueSlider, {
        global: {
          provide: baseProvider()
        }
      })

      const slider = wrapper.find(['[data-test-id="hue-slider"]'])
      slider.trigger('mousedown')

      expect(wrapper.emitted()).toHaveProperty('setHue')
    })

    it('should return clampedXPosition on calculateNewPosition function', () => {
      const wrapper = shallowMount(HueSlider, {
        global: {
          provide: baseProvider()
        }
      })

      const { calculateNewPosition } = wrapper.vm

      const pageX = 100
      const initialLeftMousePosition = 0
      const hueSliderWidth = 200
      const basePosition = 0

      const clampedXPosition = calculateNewPosition(pageX, initialLeftMousePosition, hueSliderWidth, basePosition)

      expect(clampedXPosition).toBe(100)
    })

    it('should return clampedXPosition within the correct range', () => {
      const wrapper = shallowMount(HueSlider, {
        global: {
          provide: baseProvider()
        }
      })

      const { calculateNewPosition } = wrapper.vm

      // Test for the maximum range
      const pageXMax = 300
      const initialLeftMousePosition = 0
      const hueSliderWidth = 200
      const basePosition = 0
      const clampedXPositionMax = calculateNewPosition(pageXMax, initialLeftMousePosition, hueSliderWidth, basePosition)
      expect(clampedXPositionMax).toBe(200)

      // Test for the minimum range
      const pageXMin = -100
      const clampedXPositionMin = calculateNewPosition(pageXMin, initialLeftMousePosition, hueSliderWidth, basePosition)
      expect(clampedXPositionMin).toBe(0)
    })
  })
})

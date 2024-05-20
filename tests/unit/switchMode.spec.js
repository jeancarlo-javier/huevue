import ColorInput from '@/components/ColorInput.vue'
import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import baseProvider from './utils/baseProvider'
import colorModes from '@/config/colorModes'
import { ref } from 'vue'

describe('ColorInput > SwitchMode', () => {
  it('should render switch mode button', () => {
    const wrapper = shallowMount(ColorInput, {
      global: {
        provide: baseProvider()
      }
    })

    const button = wrapper.find('[data-test-id="hv-change-mode"]')

    expect(button.exists()).toBe(true)
  })

  it('should emit setMode event on click', () => {
    const wrapper = shallowMount(ColorInput, {
      global: {
        provide: baseProvider()
      }
    })

    const button = wrapper.find('[data-test-id="hv-change-mode"]')

    button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('setMode')
  })

  it('should emit setMode event on click', () => {
    const wrapper = shallowMount(ColorInput, {
      global: {
        provide: baseProvider()
      }
    })

    const button = wrapper.find('[data-test-id="hv-change-mode"]')

    button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('setMode')
  })

  it('should emit setMode event with the correct mode', () => {
    const mode = ref(colorModes[0])

    const wrapper = shallowMount(ColorInput, {
      global: {
        provide: baseProvider({
          mode
        })
      }
    })

    const switchMode = wrapper.vm.switchMode

    switchMode()
    expect(wrapper.emitted().setMode[0][0]).toBe('hsl')
    mode.value = colorModes[1]

    switchMode()
    expect(wrapper.emitted().setMode[1][0]).toBe('rgb')
    mode.value = colorModes[2]

    switchMode()
    expect(wrapper.emitted().setMode[2][0]).toBe('hex')
  })
})

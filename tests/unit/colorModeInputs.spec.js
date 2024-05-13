import { describe, it, expect } from 'vitest'
import HEXTextInput from '@/components/modeInputs/HEX/HEXTextInput.vue'
import { shallowMount } from '@vue/test-utils'

describe('HexInputs', () => {
  describe('HexTextInput', () => {
    it('should render', () => {
      const wrapper = shallowMount(HEXTextInput)

      const input = wrapper.find('input')

      expect(input.exists()).toBe(true)
    })

    it('should emit setValue event on enter', () => {
      const wrapper = shallowMount(HEXTextInput)

      const input = wrapper.find('input')

      input.setValue('#ffffff')
      input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted()).toHaveProperty('setValue')
    })

    it('should restore the last valid value if input is empty on enter', () => {
      const wrapper = shallowMount(HEXTextInput, {
        props: { inputValue: '#123456' }
      })

      const input = wrapper.find('input')

      input.setValue('')
      input.trigger('keydown', { key: 'Enter' })

      expect(input.element.value).toBe('#123456')
      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe('#123456')

      input.setValue('null-undefined')
      input.trigger('keydown', { key: 'Enter' })

      expect(input.element.value).toBe('#123456')
      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe('#123456')
    })

    it('should suggest a color if the current value is not a valid hex color', () => {
      const wrapper = shallowMount(HEXTextInput)

      const input = wrapper.find('input')

      input.setValue('#00')
      input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe('#000000')
    })

    it('should restore the last valid value if input is empty on blur', async () => {
      const wrapper = shallowMount(HEXTextInput, {
        props: { inputValue: '#123456' }
      })

      const input = wrapper.find('input')

      input.setValue('')
      input.trigger('blur')

      expect(input.element.value).toBe('#123456')
      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe('#123456')

      input.setValue('null-undefined')
      input.trigger('blur')

      expect(input.element.value).toBe('#123456')
      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe('#123456')
    })

    it('should emit setValue event if the input is valid on blur', () => {
      const wrapper = shallowMount(HEXTextInput)

      const input = wrapper.find('input')

      input.setValue('#123456')
      input.trigger('blur')

      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe('#123456')
    })
  })
})

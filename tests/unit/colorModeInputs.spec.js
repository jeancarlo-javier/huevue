import { describe, it, expect, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import HEXTextInput from '@/components/modeInputs/HEX/HEXTextInput.vue'
import NumberInput from '@/components/appInputs/NumberInput.vue'
import RGBInputs from '@/components/modeInputs/RGBInputs.vue'
import baseProvider from './utils/baseProvider'

describe('ColorModeInputs', () => {
  describe('NumberInput', () => {
    it('should render and check default props', () => {
      const wrapper = shallowMount(NumberInput, {
        props: {
          inputValue: 50
        }
      })

      const input = wrapper.find('input')

      expect(input.exists()).toBe(true)

      expect(wrapper.vm.min).toBe(0)
      expect(wrapper.vm.max).toBe(100)
      expect(wrapper.vm.inputValue).toBe(50)

      const { lastValidNumber } = wrapper.vm
      expect(lastValidNumber).toBe(50)
    })

    it('should emit setValue event on enter', () => {
      const wrapper = shallowMount(NumberInput, {
        props: {
          inputValue: 100,
          min: 0,
          max: 100
        }
      })

      const input = wrapper.find('input')

      input.setValue(50)
      input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted()).toHaveProperty('setValue')

      const { lastValidNumber } = wrapper.vm
      expect(lastValidNumber).toBe(50)
    })

    it('should add 1 to the input value on press arrow up', () => {
      const wrapper = shallowMount(NumberInput, {
        props: {
          inputValue: 50,
          min: 0,
          max: 100
        }
      })

      const input = wrapper.find('input')
      input.trigger('keydown', { key: 'ArrowUp' })

      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe(51)
      expect(input.element.value).toBe('51')

      const { lastValidNumber } = wrapper.vm
      expect(lastValidNumber).toBe(51)
    })

    it('should remove 1 from the input value on press arrow down', () => {
      const wrapper = shallowMount(NumberInput, {
        props: {
          inputValue: 50
        }
      })

      const input = wrapper.find('input')
      input.trigger('keydown', { key: 'ArrowDown' })

      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe(49)

      expect(input.element.value).toBe('49')

      const { lastValidNumber } = wrapper.vm
      expect(lastValidNumber).toBe(49)
    })

    it('should add/remove 10 to the input value on press shift + arrow up/arrow down', () => {
      const wrapper = shallowMount(NumberInput, {
        props: {
          inputValue: 50
        }
      })

      const input = wrapper.find('input')

      input.trigger('keydown', {
        key: 'ArrowUp',
        shiftKey: true
      })

      expect(input.element.value).toBe('60')
      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe(60)

      let { lastValidNumber } = wrapper.vm
      expect(lastValidNumber).toBe(60)

      input.trigger('keydown', {
        key: 'ArrowDown',
        shiftKey: true
      })

      expect(input.element.value).toBe('50')
      expect(wrapper.emitted().setValue.length).toBe(2)
      expect(wrapper.emitted().setValue[1][0]).toBe(50)

      lastValidNumber = wrapper.vm.lastValidNumber
      expect(lastValidNumber).toBe(50)
    })

    it('should verify minimum and maximum limit values using arrow up and down keys', () => {
      const wrapper = shallowMount(NumberInput, {
        props: {
          inputValue: 30,
          min: 0,
          max: 30
        }
      })

      const { setValue } = wrapper.vm

      setValue({
        target: { value: '30' },
        key: 'ArrowUp',
        preventDefault: () => {}
      })

      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe(30)

      let { lastValidNumber } = wrapper.vm
      expect(lastValidNumber).toBe(30)

      setValue({
        target: { value: '0', blur: () => {} },
        key: 'ArrowDown',
        preventDefault: () => {}
      })

      expect(wrapper.emitted().setValue.length).toBe(2)
      expect(wrapper.emitted().setValue[1][0]).toBe(0)

      lastValidNumber = wrapper.vm.lastValidNumber
      expect(lastValidNumber).toBe(0)
    })

    it('should call preventDefault on enter, arrow up and down', () => {
      const wrapper = shallowMount(NumberInput, {
        props: {
          inputValue: 50
        }
      })

      const { setValue } = wrapper.vm

      const preventDefaultMock = vi.fn()

      setValue({
        target: { value: '50', blur: () => {} },
        key: 'Enter',
        preventDefault: preventDefaultMock
      })

      expect(preventDefaultMock).toHaveBeenCalled()

      setValue({
        target: { value: '50', blur: () => {} },
        key: 'ArrowUp',
        preventDefault: preventDefaultMock
      })

      // Check number of times preventDefault was called
      expect(preventDefaultMock).toHaveBeenCalledTimes(2)

      setValue({
        target: { value: '50', blur: () => {} },
        key: 'ArrowDown',
        preventDefault: preventDefaultMock
      })

      expect(preventDefaultMock).toHaveBeenCalledTimes(3)
    })

    it('should restore the last valid value if input is not-valid or empty on enter', () => {
      const wrapper = shallowMount(NumberInput, {
        props: { inputValue: 50 }
      })

      const { setValue } = wrapper.vm

      setValue({
        target: { value: 'not-a-number', blur: () => {} },
        key: 'Enter',
        preventDefault: () => {}
      })

      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe(50)

      let { lastValidNumber } = wrapper.vm
      expect(lastValidNumber).toBe(50)

      setValue({
        target: { value: '', blur: () => {} },
        key: 'Enter',
        preventDefault: () => {}
      })

      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe(50)

      lastValidNumber = wrapper.vm.lastValidNumber
      expect(lastValidNumber).toBe(50)
    })

    it('should restore the last valid value if blur is called and the input value is empty', () => {
      const wrapper = shallowMount(NumberInput, {
        props: { inputValue: 50 }
      })

      const input = wrapper.find('input')
      input.setValue('')
      input.trigger('blur')

      expect(input.element.value).toBe('50')

      const { lastValidNumber } = wrapper.vm

      expect(lastValidNumber).toBe(50)
    })

    it('should emit the input value if blur is called and the input value is valid', () => {
      const wrapper = shallowMount(NumberInput, {
        props: { inputValue: 50 }
      })

      const input = wrapper.find('input')
      input.setValue('30')
      input.trigger('blur')

      expect(input.element.value).toBe('30')
      expect(wrapper.emitted()).toHaveProperty('setValue')
      expect(wrapper.emitted().setValue[0][0]).toBe(30)

      const { lastValidNumber } = wrapper.vm

      expect(lastValidNumber).toBe(30)
    })
  })

  describe('HexTextInput', () => {
    it('should render', () => {
      const wrapper = shallowMount(HEXTextInput)

      const input = wrapper.find('input')

      expect(input.exists()).toBe(true)
      expect(wrapper.vm.inputValue).toBe('')
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

    it('should restore the last valid value if input is empty on blur', () => {
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

    it('should set the input value if input value is valid on blur', () => {
      const wrapper = shallowMount(HEXTextInput, {
        props: { inputValue: '#000000' }
      })

      const input = wrapper.find('input')

      input.setValue('#123456')
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

  describe('RGBTextInputs', () => {
    it('should render', () => {
      const wrapper = shallowMount(RGBInputs, {
        global: {
          provide: baseProvider({
            showTransparency: true
          })
        }
      })

      const inputs = wrapper.findAllComponents({ name: 'NumberInput' })

      expect(inputs.length).toBe(4)
    })

    it('check default props and refs', () => {
      const wrapper = shallowMount(RGBInputs, {
        global: {
          provide: baseProvider({
            showTransparency: true
          })
        }
      })

      const transparency = wrapper.vm.transparency

      expect(transparency).toBe(50)

      const r = wrapper.vm.red
      const g = wrapper.vm.green
      const b = wrapper.vm.blue

      expect(r).toBe(255)
      expect(g).toBe(0)
      expect(b).toBe(0)
    })

    it('check default emits in defineEmits', () => {
      const wrapper = shallowMount(RGBInputs, {
        global: {
          provide: baseProvider({
            showTransparency: true
          })
        }
      })

      const emits = wrapper.vm.$options.emits

      expect(emits).toBeDefined()

      expect(emits).toContain('setRgb')
      expect(emits).toContain('setTransparency')
    })

    it('check injections', () => {
      const wrapper = shallowMount(RGBInputs, {
        global: {
          provide: baseProvider({
            showTransparency: true
          })
        }
      })

      const { rgba, transparency } = wrapper.vm

      expect(rgba).toBeDefined()
      expect(transparency).toBeDefined()
    })

    it('watch should update the refs if the props change', async () => {
      const provider = baseProvider({
        showTransparency: true
      })

      const wrapper = shallowMount(RGBInputs, {
        global: {
          provide: provider
        }
      })
      expect(wrapper.vm.rgba.r).toBe(255)
      expect(wrapper.vm.rgba.g).toBe(0)
      expect(wrapper.vm.rgba.b).toBe(0)

      provider.rgba.r = 255
      provider.rgba.g = 255
      provider.rgba.b = 255

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.rgba.r).toBe(255)
      expect(wrapper.vm.rgba.g).toBe(255)
      expect(wrapper.vm.rgba.b).toBe(255)
    })

    it('should emit the setRgba event if some RGB inputs are changed', () => {
      const wrapper = shallowMount(RGBInputs, {
        global: {
          provide: baseProvider({
            showTransparency: true
          })
        }
      })

      const { setRed, setGreen, setBlue } = wrapper.vm

      setRed(255)
      setGreen(255)
      setBlue(255)

      expect(wrapper.emitted().setRgb.length).toBe(3)
    })

    it('should emit setRgb event if rgbNumberInput are changed', () => {
      const wrapper = mount(RGBInputs, {
        global: {
          provide: baseProvider({
            showTransparency: true
          })
        }
      })

      const event = {
        preventDefault: () => {},
        target: {
          value: '255',
          blur: () => {}
        },
        key: 'Enter'
      }

      const numberInputs = wrapper.findAllComponents({ name: 'NumberInput' })

      numberInputs[0].vm.setValue(event)
      numberInputs[1].vm.setValue(event)
      numberInputs[2].vm.setValue(event)

      expect(wrapper.emitted().setRgb.length).toBe(3)
    })

    it('should emit setTransparency event if transparencyNumberInput are changed', () => {
      const wrapper = mount(RGBInputs, {
        global: {
          provide: baseProvider({
            showTransparency: true
          })
        }
      })

      const event = {
        preventDefault: () => {},
        target: {
          value: '255',
          blur: () => {}
        },
        key: 'Enter'
      }

      const numberInputs = wrapper.findAllComponents({ name: 'NumberInput' })

      numberInputs[3].vm.setValue(event)

      expect(wrapper.emitted().setTransparency.length).toBe(1)
    })

    it('check default props of TransparencyNumberInput', () => {
      const wrapper = shallowMount(RGBInputs, {
        global: {
          provide: baseProvider({
            showTransparency: true
          })
        }
      })

      const transparencyNumberInput = wrapper.findAllComponents({ name: 'NumberInput' })

      expect(transparencyNumberInput[3].vm.min).toBe(0)
      expect(transparencyNumberInput[3].vm.max).toBe(100)
    })
  })
})

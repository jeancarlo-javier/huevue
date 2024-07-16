import ColorInput from '@/components/ColorInput.vue'
import { shallowMount } from '@vue/test-utils'
import baseProvider from './utils/baseProvider'
import { expect } from 'vitest'

describe('actions', () => {
  describe('copy action', () => {
    it('copies the current color to the clipboard', () => {
      const mockWriteText = vi.fn().mockResolvedValue()
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText
        }
      })

      const wrapper = shallowMount(ColorInput, {
        global: {
          provide: baseProvider({
            finalColor: '#35E65E'
          })
        }
      })

      wrapper.vm.copyColor()

      expect(mockWriteText).toBeCalledTimes(1)
      expect(mockWriteText).toBeCalledWith('#35E65E')

      // Change the finalColor to a different color
      wrapper.vm.finalColor = 'rgb(255, 0, 0)'

      wrapper.vm.copyColor()

      expect(mockWriteText).toBeCalledTimes(2)
      expect(mockWriteText).toBeCalledWith('rgb(255, 0, 0)')

      // Change the finalColor to a different color
      wrapper.vm.finalColor = 'hsl(200, 50%, 50%)'

      wrapper.vm.copyColor()

      expect(mockWriteText).toBeCalledTimes(3)
      expect(mockWriteText).toBeCalledWith('hsl(200, 50%, 50%)')
    })
  })
})

import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HueVue from '@/HueVue.vue'

describe('hueVueProps', () => {
  describe('v-model', () => {
    it('should convert hex to hsl', () => {
      const wrapper = shallowMount(HueVue, {
        props: {
          mode: 'hex',
          value: '#16161D'
        }
      })

      expect(wrapper.vm.hue).toBe(240)
      expect(wrapper.vm.saturation).toBe(14)
      expect(wrapper.vm.lightness).toBe(10)
      expect(wrapper.vm.transparency).toBe(100)
    })
  })
})

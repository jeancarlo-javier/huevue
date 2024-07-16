import AppLayout from '@/components/AppLayout.vue'
import { mount, shallowMount } from '@vue/test-utils'
import baseProvider from './utils/baseProvider'

describe('HueVue', () => {
  it('renders AppLayout', () => {
    const wrapper = shallowMount(AppLayout, {
      global: {
        provide: baseProvider({})
      }
    })

    const container = wrapper.find('[data-test-id="app-layout"]')

    expect(container.exists()).toBe(true)
  })

  it('renders the ColorPickerContainer if isOpen is true', () => {
    const wrapper = shallowMount(AppLayout, {
      global: {
        provide: baseProvider({})
      }
    })

    const container = wrapper.find('[data-test-id="color-picker-container"]')

    expect(container.exists()).toBe(true)
  })

  it('does not render the ColorPickerContainer if isOpen is false', () => {
    const wrapper = shallowMount(AppLayout, {
      global: {
        provide: baseProvider({
          isOpen: false
        })
      }
    })

    const colorPickerContainer = wrapper.find('[data-test-id="color-picker-container"]')

    expect(colorPickerContainer.exists()).toBe(false)
  })

  it('renders the transparencySlider if showTransparency is true', () => {
    const wrapper = mount(AppLayout, {
      global: {
        provide: baseProvider({
          showTransparency: true
        })
      },
      slots: {
        transparencySlider: '<div data-test-id="transparency-slider" />'
      }
    })

    expect(wrapper.vm.showTransparency).toBe(true)

    const transparencySlider = wrapper.find('[data-test-id="transparency-slider"]')

    expect(transparencySlider.exists()).toBe(true)
  })

  it('does not render the transparencySlider if showTransparency is false', () => {
    const wrapper = mount(AppLayout, {
      global: {
        provide: baseProvider({
          showTransparency: false
        })
      },
      slots: {
        transparencySlider: '<div data-test-id="transparency-slider" />'
      }
    })

    expect(wrapper.vm.showTransparency).toBe(false)

    const transparencySlider = wrapper.find('[data-test-id="transparency-slider"]')

    expect(transparencySlider.exists()).toBe(false)
  })
})

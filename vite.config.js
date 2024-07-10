/// <reference types="vitest" />

import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
// import postcss from 'rollup-plugin-postcss'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [vuePlugin(), cssInjectedByJsPlugin()],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }]
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/HueVue.vue', import.meta.url)),
      name: 'HueVue',
      fileName: (format) => `hue-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

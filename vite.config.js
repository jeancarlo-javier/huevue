/// <reference types="vitest" />

import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vuePlugin()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})

import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vuePlugin()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
    ]
  }
})

import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vuePlugin()],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/') // Asegúrate de que apunta al directorio 'src'
      }
    }
  }
})

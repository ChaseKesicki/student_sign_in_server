import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: { //any time server makes request to /api, it will send it to localhost 3000
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})

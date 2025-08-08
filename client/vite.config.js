import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // everything starting with /api goes to your Express server
      '/api': 'http://localhost:3000'
    }
  }
})

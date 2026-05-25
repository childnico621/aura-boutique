import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5174,
    proxy: {
      '/widget.js': {
        target: 'https://inventa-ai.westus2.cloudapp.azure.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})

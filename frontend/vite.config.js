import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // Puerto del servidor de desarrollo
    allowedHosts: [
      'cineweb-sooty.vercel.app',
      'cineweb-pqwq.onrender.com'
    ]
  }
})

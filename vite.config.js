import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // En desarrollo, todo lo que empiece con /api se reenvía a la API (BackEnd en el puerto 3000).
    // Así el navegador solo habla con localhost:5173 y no hay problemas de CORS.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})

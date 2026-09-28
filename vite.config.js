import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // el proyecto se publica en https://felipebechan.github.io/ingenieria-web-y-movil/
  base: '/ingenieria-web-y-movil/',
  plugins: [react()],
})

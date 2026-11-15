import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // el proyecto se publica en https://felipebechan.github.io/ingenieria-web-y-movil/
  // En GitHub Pages la aplicacion vive dentro de una carpeta, pero en Docker
  // se sirve desde la raiz, asi que la base se puede cambiar por variable.
  base: process.env.VITE_BASE || '/ingenieria-web-y-movil/',
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base can be overridden for static hosting (e.g. GitHub Pages) via BASE_PATH.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})

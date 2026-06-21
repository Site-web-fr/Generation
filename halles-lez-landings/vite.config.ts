import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages: https://site-web-fr.github.io/Generation/
const base = process.env.GITHUB_PAGES === 'true' ? '/Generation/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@premium': path.resolve(__dirname, '../premium-landings/src'),
    },
  },
  preview: {
    host: true,
  },
});

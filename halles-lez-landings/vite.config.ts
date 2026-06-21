import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.GITHUB_PAGES === 'true' ? '/Generation/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@premium': path.resolve(__dirname, '../premium-landings/src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
  preview: { host: true },
});

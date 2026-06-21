import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.GITHUB_PAGES === 'true' ? '/Generation/' : '/';
const reactPath = path.resolve(__dirname, 'node_modules/react');
const reactDomPath = path.resolve(__dirname, 'node_modules/react-dom');

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
    alias: {
      '@premium': path.resolve(__dirname, '../premium-landings/src'),
      react: reactPath,
      'react-dom': reactDomPath,
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react-dom|react)[\\/]/,
              priority: 100,
            },
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  preview: { host: true },
});

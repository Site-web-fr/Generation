import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.GITHUB_PAGES === 'true' ? '/Generation/' : '/';
const root = path.resolve(__dirname, 'node_modules');

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom', 'framer-motion'],
    alias: {
      '@premium': path.resolve(__dirname, '../premium-landings/src'),
      react: path.join(root, 'react'),
      'react-dom': path.join(root, 'react-dom'),
      'react/jsx-runtime': path.join(root, 'react/jsx-runtime'),
      'react/jsx-dev-runtime': path.join(root, 'react/jsx-dev-runtime'),
    },
  },
  build: {
    modulePreload: { polyfill: true },
    rolldownOptions: {
      output: {
        strictExecutionOrder: true,
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react-dom|react|scheduler)[\\/]/,
              priority: 100,
            },
            {
              name: 'vendor-motion',
              test: /node_modules[\\/]framer-motion[\\/]/,
              priority: 90,
            },
            {
              name: 'vendor-router',
              test: /node_modules[\\/]react-router/,
              priority: 85,
            },
            {
              name: 'vendor-three',
              test: /node_modules[\\/]three[\\/]/,
              priority: 80,
            },
            {
              name: 'vendor-r3f',
              test: /node_modules[\\/]@react-three[\\/]/,
              priority: 75,
            },
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
  preview: { host: true },
});

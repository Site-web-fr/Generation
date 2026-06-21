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
    rolldownOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        mobile: path.resolve(__dirname, 'mobile.html'),
      },
      output: {
        strictExecutionOrder: true,
        codeSplitting: {
          groups: [
            { name: 'vendor-three', test: /node_modules\/three\//, priority: 100 },
            {
              name: 'vendor-postfx',
              test: /@react-three\/postprocessing|node_modules\/postprocessing\//,
              priority: 95,
            },
            { name: 'vendor-r3f', test: /@react-three\//, priority: 90 },
            { name: 'vendor-motion', test: /node_modules\/framer-motion/, priority: 80 },
            {
              name: 'vendor-react',
              test: /node_modules\/react-dom|node_modules\/react\//,
              priority: 70,
            },
            { name: 'vendor-router', test: /node_modules\/react-router/, priority: 60 },
          ],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  preview: { host: true },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages: https://site-web-fr.github.io/Generation/
const base = process.env.GITHUB_PAGES === 'true' ? '/Generation/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  preview: {
    host: true,
  },
});

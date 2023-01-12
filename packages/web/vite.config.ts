import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@packages/shared'],
  },
  build: {
    commonjsOptions: {
      include: [/@packages\/shared/, /.yarn/],
    },
  },
  envDir: './',
  plugins: [react()],
});

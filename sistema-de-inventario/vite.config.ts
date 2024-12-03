import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/bootstrap";`
      },
    },
  },
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost', // URL do backend PHP
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

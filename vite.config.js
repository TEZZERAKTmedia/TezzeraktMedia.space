import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 3, // Optimize GIFs
      },
      mozjpeg: {
        quality: 30, // Optimize JPGs
      },
      pngquant: {
        quality: [0.3, 0.5], // Optimize PNGs
      },
      svgo: {
        plugins: [{ removeViewBox: false }], // Optimize SVGs
      },
      webp: {
        quality: 30, // Automatically convert all images to WebP
      },
    }),
  ],
  server: {
    port: 3010, // Custom port for development
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});

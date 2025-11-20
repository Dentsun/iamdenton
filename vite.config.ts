import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Auto-detect deployment type:
// - If VITE_GH_PAGES=project -> project page (/iamdenton/)
// - Otherwise -> user page or local (/)
const base = process.env.VITE_GH_PAGES === 'project' ? '/iamdenton/' : '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: '.',
    assetsDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: 'index.js',
        assetFileNames: 'assets/[name][extname]'
      }
    },
    copyPublicDir: true,
  },
  publicDir: 'public',
});

import react from '@vitejs/plugin-react-swc';
import { glob } from 'glob';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: glob.sync('./src/{components/ui,hooks,lib}/*.{ts,tsx,js,jsx}'),
      name: 'ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'jsx-runtime'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

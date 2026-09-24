/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/konohaTech/', // <-- Adicionado o base path para o GitHub Pages
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        { find: '@/components/ui', replacement: path.resolve(__dirname, './src/components/ui') },
        { find: '@/lib', replacement: path.resolve(__dirname, './src/lib') },
        { find: '@/hooks', replacement: path.resolve(__dirname, './src/hooks') },
        { find: '@/components', replacement: path.resolve(__dirname, './src/components') },
        { find: '@/utils', replacement: path.resolve(__dirname, './src/utils') },
        { find: '@/data', replacement: path.resolve(__dirname, './src/data') },
        { find: '@', replacement: path.resolve(__dirname, './src') },
      ],
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  };
});
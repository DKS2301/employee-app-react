import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@store': path.resolve(__dirname, './src/store'),
      '@tests': path.resolve(__dirname, './src/tests'),
      '@api-services': path.resolve(__dirname, './src/api-services'),
    },
  },
});
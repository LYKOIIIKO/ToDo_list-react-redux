import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), EnvironmentPlugin('all')],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
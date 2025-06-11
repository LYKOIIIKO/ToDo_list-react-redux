import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), EnvironmentPlugin(['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN','VITE_FIREBASE_PROJECT_ID','VITE_FIREBASE_STORAGE_BUCKET','VITE_FIREBASE_MESSAGING_SENDER_ID','VITE_FIREBASE_APP_ID'])],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
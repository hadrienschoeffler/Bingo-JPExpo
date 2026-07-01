import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'characters/*'],
      manifest: {
        name: 'Cosplay Bingo',
        short_name: 'Bingo',
        description: 'Bingo mobile offline pour trouver des cosplays à la Japan Expo.',
        theme_color: '#171225',
        background_color: '#171225',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp}']
      }
    })
  ]
});
